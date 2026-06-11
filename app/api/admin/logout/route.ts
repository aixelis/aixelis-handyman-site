import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/security";

export const runtime = "edge";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAdminCookie(response);
  return response;
}
