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
    secure: true,
    sameSite: 'lax', // ou 'strict'
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
  sessionCookie.delete('session')
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
}

export default AuthService
