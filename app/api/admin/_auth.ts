const COOKIE_NAME = "cal_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

async function sessionToken(password: string) {
  const secret = process.env.AUTH_SECRET ?? password;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("ctrl-alt-learn-admin"));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function validAdminPassword(candidate: string) {
  const configured = adminPassword();
  if (!configured || candidate.length !== configured.length) return false;
  let difference = 0;
  for (let index = 0; index < configured.length; index += 1) difference |= configured.charCodeAt(index) ^ candidate.charCodeAt(index);
  return difference === 0;
}

export async function isAdminRequest(request: Request) {
  const configured = adminPassword();
  if (!configured) return false;
  const value = (request.headers.get("cookie") ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  return Boolean(value) && value === (await sessionToken(configured));
}

export async function createAdminCookie() {
  return `${COOKIE_NAME}=${await sessionToken(adminPassword())}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`;
}

export function clearAdminCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
