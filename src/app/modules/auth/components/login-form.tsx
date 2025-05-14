'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import { Label } from '@/components/ui/label'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { toast } from 'react-toastify'

export default function LoginFormClient({
  action,
}: {
  action: (formData: FormData) => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (success === 'signup')
      toast.success('Conta criada com sucesso!', {
        position: 'bottom-right',
      })
    if (error === 'invalid-user')
      toast.error('Usuário não existe.', {
        position: 'bottom-right',
      })
    if (error === 'invalid-login')
      toast.error('Email ou senha inválidos.', {
        position: 'bottom-right',
      })
  }, [searchParams])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Vinidev</CardTitle>
        <CardDescription>Faça login para continuar.</CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-5">
          <Button type="submit" className="cursor-pointer">
            Entrar
          </Button>
          <Link
            href="/portal/cadastro"
            className={buttonVariants({ variant: 'link' })}
          >
            Criar Conta
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
