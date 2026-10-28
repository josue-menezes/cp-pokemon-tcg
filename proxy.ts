import { NextRequest, NextResponse } from "next/server";
import { isValidSession, SESSION_COOKIE } from "@/lib/session";

// Roda no servidor ANTES da página: só usuário logado acessa o sistema
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = await isValidSession(request.cookies.get(SESSION_COOKIE)?.value);

  // Já logado tentando abrir o login -> vai direto pras cartas
  if (pathname === "/" && loggedIn) {
    return NextResponse.redirect(new URL("/cards", request.url));
  }

  // Área privada sem login -> volta pro login
  if (pathname !== "/" && !loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/cards/:path*", "/favorites/:path*"],
};
