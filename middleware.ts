import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./i18n/config";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ignora arquivos e rotas internas
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const seg = pathname.split("/")[1];

  // se já tiver locale na URL, segue
  if (isLocale(seg)) return NextResponse.next();

  // redireciona pro default
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};