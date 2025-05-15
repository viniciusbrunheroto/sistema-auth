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
        ? process.env.COOKIE_DOMAIN
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
  try {
    const cookiesStore = await cookies()

    cookiesStore.set('session', '', {
      path: '/',
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.COOKIE_DOMAIN
          : undefined,
      httpOnly: true,
    })

    console.log('Cookie de sessão excluído no AuthService')
    return true
  } catch (error) {
    console.error('Erro ao excluir sessão:', error)
    return false
  }
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
}

export default AuthService
