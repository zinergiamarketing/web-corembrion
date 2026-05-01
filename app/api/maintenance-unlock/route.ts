import { NextResponse } from "next/server";

/**
 * Candado activo por defecto.
 * Se desactiva solo cuando MAINTENANCE_MODE=false.
 */

export async function POST(request: Request) {
  const modeOn = process.env.MAINTENANCE_MODE !== "false";
  if (!modeOn) {
    return NextResponse.json({ ok: false, error: "disabled" }, { status: 400 });
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const pinEnv = process.env.MAINTENANCE_PIN;
  const expected = pinEnv != null && pinEnv !== "" ? String(pinEnv).trim() : "1105";
  const code = body.code != null ? String(body.code).trim() : "";

  if (/^\d{4}$/.test(code) && code === expected) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "wrong" }, { status: 401 });
}
