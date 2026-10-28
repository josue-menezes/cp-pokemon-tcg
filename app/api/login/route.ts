import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/session";

interface LoginBody {
  username?: string;
  password?: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  let body: LoginBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Requisição inválida." }, { status: 400 });
  }

  const username = body.username?.trim();
  const password = body.password;

  if (!username || !password) {
    return NextResponse.json(
      { ok: false, message: "Informe usuário e senha." },
      { status: 400 },
    );
  }

  // A senha fica SÓ no servidor (.env.local / variáveis da Vercel)
  if (!process.env.APP_PASSWORD) {
    console.error("APP_PASSWORD não configurada");
    return NextResponse.json(
      { ok: false, message: "Servidor sem senha configurada." },
      { status: 500 },
    );
  }

  if (password !== process.env.APP_PASSWORD) {
    return NextResponse.json(
      { ok: false, message: "Usuário ou senha inválidos." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  // Cookie httpOnly: o JavaScript do navegador não consegue ler nem falsificar
  response.cookies.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
