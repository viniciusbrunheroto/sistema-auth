import * as jose from 'jose'

import { cookies } from 'next/headers'

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const { payload } = await jose.jwtVerify(token, secret)

  return payload
}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret)

  const { exp } = await openSessionToken(session)

  const cookieStorie = await cookies()

  cookieStorie.set('session', session, {
    expires: new Date((exp as number) * 1000),
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Condicional com base no ambiente
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' para permitir cross-site em produção
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.COOKIE_DOMAIN || undefined
        : undefined, // Definir domínio em produção
  })
}

async function isSessionValid() {
  const sessionCookie = (await cookies()).get('session')

  if (sessionCookie) {
    const { value } = sessionCookie
    const { exp } = await openSessionToken(value)
    const currentDate = new Date().getTime()

    return (exp as number) * 1000 > currentDate
  }

  return false
}

async function destroySession() {
  const sessionCookie = await cookies()
  sessionCookie.set('session', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.COOKIE_DOMAIN || undefined
        : undefined,
    expires: new Date(0), // força expiração
  })
  console.log('Cookie apagado!')
  return true
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
}

export default AuthService
