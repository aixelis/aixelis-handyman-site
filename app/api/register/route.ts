import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getErrorMessage } from "@/lib/errors";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { hashPassword } from "@/lib/security";
import { validateAuth } from "@/lib/validation";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientKey(request, "register"), 5, 60_000)) {
      return NextResponse.json({ success: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const input = validateAuth(await request.json(), true);
    if (!input.ok) return NextResponse.json({ success: false, error: input.error }, { status: 400 });

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: "数据库未连接" }, { status: 500 });

    const existing = await db.prepare("SELECT id FROM users WHERE username = ? OR email = ?")
      .bind(input.value.username, input.value.email)
      .first();

    if (existing) {
      return NextResponse.json({ success: false, error: "用户名或邮箱已存在" }, { status: 409 });
    }

    await db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)")
      .bind(input.value.username, input.value.email, await hashPassword(input.value.password))
      .run();

    return NextResponse.json({ success: true, message: "注册成功" });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
