import { NextRequest, NextResponse } from 'next/server'
import AuthService from './app/modules/auth/services/auth-service'

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}

const publicRoutes = ['/', '/portal/cadastro', '/portal/login']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }
  const session = await AuthService.isSessionValid() // validar a sessão do JWT

  if (!session) {
    const isAPIRoute = pathname.startsWith('/api')

    if (isAPIRoute) {
      return NextResponse.json({ message: 'Não Autorizado' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/portal/login', req.url))
  }

  return NextResponse.next()
}
