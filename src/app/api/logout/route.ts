import AuthService from '@/app/modules/auth/services/auth-service'
import { NextResponse } from 'next/server'

export function GET(req: NextResponse) {
  AuthService.destroySession()

  return NextResponse.redirect(new URL('/portal/login', req.url))
}
