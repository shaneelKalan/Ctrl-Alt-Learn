import { clearAdminCookie, createAdminCookie, isAdminRequest, validAdminPassword } from "../_auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return Response.json({ authenticated: await isAdminRequest(request) });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { password?: string };
  if (!(await validAdminPassword(payload.password ?? ""))) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  return Response.json(
    { authenticated: true },
    { headers: { "Set-Cookie": await createAdminCookie() } },
  );
}

export async function DELETE() {
  return Response.json(
    { authenticated: false },
    { headers: { "Set-Cookie": clearAdminCookie() } },
  );
}
