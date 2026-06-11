export const runtime = 'edge';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getErrorMessage } from '@/lib/errors';
import { isAdminRequest } from '@/lib/security';

// 1. 获取所有订单 (原来的功能)
export async function GET(request: Request) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ success: false, error: '未授权' }, { status: 401 });
    }

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: '数据库未连接' }, { status: 500 });

    const { results } = await db.prepare("SELECT * FROM appointments ORDER BY created_at DESC").all();
    return NextResponse.json({ success: true, data: results });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) });
  }
}

// 2. 新增：删除已处理的订单
export async function DELETE(request: Request) {
  try {
    if (!(await isAdminRequest(request))) {
      return NextResponse.json({ success: false, error: '未授权' }, { status: 401 });
    }

    const { id } = await request.json();
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ success: false, error: '订单编号不正确' }, { status: 400 });
    }

    const db = getDb();
    if (!db) return NextResponse.json({ success: false, error: '数据库未连接' }, { status: 500 });

    // 告诉数据库删掉对应 ID 的记录
    await db.prepare("DELETE FROM appointments WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) });
  }
}
