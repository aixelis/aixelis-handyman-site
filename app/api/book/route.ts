export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';
import { checkRateLimit, getClientKey } from '@/lib/rate-limit';
import { validateBooking } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(getClientKey(request, 'book'), 8, 60_000)) {
      return NextResponse.json({ success: false, error: '请求过于频繁，请稍后再试' }, { status: 429 });
    }

    // 1. 接收前端传来的表单数据
    const input = validateBooking(await request.json());
    if (!input.ok) {
      return NextResponse.json({ success: false, error: input.error }, { status: 400 });
    }
    const { name, phone, service, date, description } = input.value;

    // 2. 连接 D1 数据库
    const db = getDb();
    if (!db) {
      return NextResponse.json({ success: false, error: '数据库未连接' }, { status: 500 });
    }

    // 3. 将数据插入到 appointments 表中
    await db.prepare(
      "INSERT INTO appointments (name, phone, service, date, description) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, phone, service, date, description).run();

    // ==========================================
    // 4. 新增：发送 Telegram 通知
    // ==========================================
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 组合你要收到的消息内容
    const message = `🔧 收到新的 Handyman 预约！\n\n👤 姓名：${name}\n📞 电话：${phone}\n🛠️ 服务：${service}\n📅 日期：${date}\n📝 问题描述：${description || '无'}`;

    if (BOT_TOKEN && CHAT_ID) {
      // 呼叫 Telegram API 发送消息；通知失败不能影响已经入库的预约。
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        })
      }).catch(console.error);
    }
    // ==========================================

    // 5. 返回成功信息给前端
    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) });
  }
}
