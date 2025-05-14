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
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function SignupFormClient({
  action,
}: {
  action: (formData: FormData) => void
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')

    if (error)
      toast.error('Email já cadastrado. Tente novamente.', {
        position: 'bottom-right',
      })
  }, [searchParams])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Vinidev</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar uma conta.
        </CardDescription>
      </CardHeader>
      <form action={action}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>

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
            Criar Conta
          </Button>
          <Link
            href="/portal/login"
            className={buttonVariants({ variant: 'link' })}
          >
            Já Tenho Conta
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}
