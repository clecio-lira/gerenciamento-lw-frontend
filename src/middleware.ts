import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // pega o valor do token salvo nos cookies (se existir)
  const token = request.cookies.get("nextauth.token")?.value;

  // define as rotas/pastas que precisam de autenticação
  const protectedRoutes = ["/admin/"];

  // verifica se a rota atual começa com alguma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // se tentar acessar a página de login e já tiver um token válido,
  // redireciona direto para o dashboard
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // se a rota for protegida e não houver token,
  // redireciona o usuário para a página de login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // se nenhuma das condições acima for atendida,
  // continua a requisição normalmente
  return NextResponse.next();
}
