import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getErrorMessage } from "@/lib/errors";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { validateEmail } from "@/lib/validation";

export const runtime = "edge";

function createToken(): string {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return String(values[0] % 1_000_000).padStart(6, "0");
}

async function notifyResetCode(email: string, token: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `AIXELIS password reset code\nEmail: ${email}\nCode: ${token}`,
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientKey(request, "forgot-password"), 5, 60_000)) {
      return NextResponse.json({ success: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const input = validateEmail(await request.json());
    if (!input.ok) return NextResponse.json({ success: false, error: input.error }, { status: 400 });

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: "数据库未连接" }, { status: 500 });

    const user = await db.prepare("SELECT id FROM users WHERE email = ?")
      .bind(input.email)
      .first<{ id: number }>();

    if (user) {
      const token = createToken();
      await db.prepare("DELETE FROM password_reset_tokens WHERE user_id = ?").bind(user.id).run();
      await db.prepare("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)")
        .bind(user.id, token, new Date(Date.now() + 15 * 60 * 1000).toISOString())
        .run();
      await notifyResetCode(input.email, token);
    }

    return NextResponse.json({ success: true, message: "如果邮箱存在，验证码将会发送" });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
