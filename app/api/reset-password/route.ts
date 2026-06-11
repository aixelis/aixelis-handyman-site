import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getErrorMessage } from "@/lib/errors";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { hashPassword } from "@/lib/security";
import { validateReset } from "@/lib/validation";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientKey(request, "reset-password"), 8, 60_000)) {
      return NextResponse.json({ success: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const input = validateReset(await request.json());
    if (!input.ok) return NextResponse.json({ success: false, error: input.error }, { status: 400 });

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: "数据库未连接" }, { status: 500 });

    const reset = await db.prepare(`
      SELECT users.id
      FROM users
      JOIN password_reset_tokens ON password_reset_tokens.user_id = users.id
      WHERE users.email = ? AND password_reset_tokens.token = ? AND password_reset_tokens.expires_at > ?
    `)
      .bind(input.value.email, input.value.token, new Date().toISOString())
      .first<{ id: number }>();

    if (!reset) {
      return NextResponse.json({ success: false, error: "验证码无效或已过期" }, { status: 400 });
    }

    await db.prepare("UPDATE users SET password = ? WHERE id = ?")
      .bind(await hashPassword(input.value.password), reset.id)
      .run();
    await db.prepare("DELETE FROM password_reset_tokens WHERE user_id = ?").bind(reset.id).run();

    return NextResponse.json({ success: true, message: "密码已重置" });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
