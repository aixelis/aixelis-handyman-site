import { NextRequest, NextResponse } from "next/server";
import { getErrorMessage } from "@/lib/errors";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { createAdminSessionCookie, getAdminPassword, setAdminCookie } from "@/lib/security";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    if (!checkRateLimit(getClientKey(request, "admin-login"), 6, 60_000)) {
      return NextResponse.json({ success: false, error: "请求过于频繁，请稍后再试" }, { status: 429 });
    }

    const { password } = await request.json();
    const adminPassword = getAdminPassword();
    if (!adminPassword) {
      return NextResponse.json({ success: false, error: "管理员密码未配置" }, { status: 500 });
    }

    if (typeof password !== "string" || password !== adminPassword) {
      return NextResponse.json({ success: false, error: "密码错误" }, { status: 401 });
    }

    const token = await createAdminSessionCookie();
    if (!token) {
      return NextResponse.json({ success: false, error: "管理员会话密钥未配置" }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    setAdminCookie(response, token);
    return response;
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
