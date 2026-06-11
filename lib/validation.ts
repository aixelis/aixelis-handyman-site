export type BookingInput = {
  name: string;
  phone: string;
  service: string;
  date: string;
  description: string;
};

export type AuthInput = {
  username: string;
  password: string;
  email: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateBooking(data: unknown): { ok: true; value: BookingInput } | { ok: false; error: string } {
  const body = (data || {}) as Record<string, unknown>;
  const value = {
    name: clean(body.name),
    phone: clean(body.phone),
    service: clean(body.service),
    date: clean(body.date),
    description: clean(body.description),
  };

  if (value.name.length < 2 || value.name.length > 80) return { ok: false, error: "姓名长度不正确" };
  if (!/^[+()\-\d\s]{7,24}$/.test(value.phone)) return { ok: false, error: "电话格式不正确" };
  if (value.service.length < 2 || value.service.length > 80) return { ok: false, error: "服务类型不正确" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value.date)) return { ok: false, error: "日期格式不正确" };
  if (value.description.length > 1000) return { ok: false, error: "留言过长" };

  return { ok: true, value };
}

export function validateAuth(data: unknown, requireEmail: boolean): { ok: true; value: AuthInput } | { ok: false; error: string } {
  const body = (data || {}) as Record<string, unknown>;
  const value = {
    username: clean(body.username),
    password: clean(body.password),
    email: clean(body.email).toLowerCase(),
  };

  if (!/^[a-zA-Z0-9_.-]{3,40}$/.test(value.username)) return { ok: false, error: "用户名需为 3-40 位字母、数字或 ._-" };
  if (value.password.length < 6 || value.password.length > 128) return { ok: false, error: "密码长度需为 6-128 位" };
  if (requireEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return { ok: false, error: "邮箱格式不正确" };

  return { ok: true, value };
}

export function validateEmail(data: unknown): { ok: true; email: string } | { ok: false; error: string } {
  const email = clean((data as Record<string, unknown> | null)?.email).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "邮箱格式不正确" };
  return { ok: true, email };
}

export function validateReset(data: unknown): { ok: true; value: { email: string; token: string; password: string } } | { ok: false; error: string } {
  const body = (data || {}) as Record<string, unknown>;
  const value = {
    email: clean(body.email).toLowerCase(),
    token: clean(body.token),
    password: clean(body.password),
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) return { ok: false, error: "邮箱格式不正确" };
  if (!/^\d{6}$/.test(value.token)) return { ok: false, error: "验证码格式不正确" };
  if (value.password.length < 6 || value.password.length > 128) return { ok: false, error: "密码长度需为 6-128 位" };

  return { ok: true, value };
}
