import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';
import { checkRateLimit, getClientKey } from '@/lib/rate-limit';
import { hashPassword, verifyPassword } from '@/lib/security';
import { validateAuth } from '@/lib/validation';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientKey(request, 'login'), 10, 60_000)) {
      return NextResponse.json({ success: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const input = validateAuth(await request.json(), false);
    if (!input.ok) return NextResponse.json({ success: false, error: input.error }, { status: 400 });

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: "数据库未连接" }, { status: 500 });

    const user = await db.prepare("SELECT id, password FROM users WHERE username = ?")
      .bind(input.value.username)
      .first<{ id: number; password: string }>();

    if (!user) {
      // 执行一次假哈希校验，消耗等额算力，防范时序分析与用户名枚举
      await verifyPassword(input.value.password, "pbkdf2_sha256$210000$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      return NextResponse.json({ success: false, error: "账号或密码错误" }, { status: 401 });
    }

    const isHashed = user.password.startsWith("pbkdf2_sha256$");
    const isValid = isHashed ? await verifyPassword(input.value.password, user.password) : user.password === input.value.password;

    if (!isValid) {
      return NextResponse.json({ success: false, error: "账号或密码错误" }, { status: 401 });
    }

    if (!isHashed) {
      await db.prepare("UPDATE users SET password = ? WHERE id = ?")
        .bind(await hashPassword(input.value.password), user.id)
        .run();
    }

    return NextResponse.json({ success: true, message: "登录成功" });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
