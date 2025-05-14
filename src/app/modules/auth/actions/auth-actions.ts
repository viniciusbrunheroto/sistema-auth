import { PrismaClient } from '@/generated/prisma'
import * as bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import AuthService from '../services/auth-service'

const prisma = new PrismaClient()

async function createAccount(formData: FormData) {
  'use server'

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const hashPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })
  } catch (e) {
    console.error('Erro ao criar conta:', e)
    redirect('/portal/cadastro?error=1')
  }

  redirect('/portal/login?success=signup')
}

async function login(formData: FormData) {
  'use server'
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    console.log('Usuário não encontrado!')
    redirect('/portal/login?error=invalid-user')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    console.log('Usuário ou senha inválidos')
    redirect('/portal/login?error=invalid-login')
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  })

  redirect('/portal?success=login')
}
const AuthActions = {
  createAccount,
  login,
}

export default AuthActions
