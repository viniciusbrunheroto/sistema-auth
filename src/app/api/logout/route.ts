import AuthService from '@/app/modules/auth/services/auth-service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL('/portal/login', req.url))

  await AuthService.destroySession()

  return response
}
