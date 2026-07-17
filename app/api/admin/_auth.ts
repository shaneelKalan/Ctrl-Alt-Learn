const COOKIE_NAME = "cal_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

async function sessionToken(password: string) {
  const bytes = new TextEncoder().encode(`ctrl-alt-learn-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function validAdminPassword(candidate: string) {
  const configured = adminPassword();
  return configured.length > 0 && candidate === configured;
}

export async function isAdminRequest(request: Request) {
  const configured = adminPassword();
  if (!configured) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  return Boolean(value) && value === (await sessionToken(configured));
}

export async function createAdminCookie() {
  const configured = adminPassword();
  return `${COOKIE_NAME}=${await sessionToken(configured)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`;
}

export function clearAdminCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
