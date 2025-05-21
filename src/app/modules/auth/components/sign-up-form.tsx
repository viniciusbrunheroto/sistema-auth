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
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import ReCAPTCHA from 'react-google-recaptcha'

interface SignupFormClientProps {
  action: (formData: FormData) => Promise<void>
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

export default function SignupFormClient({ action }: SignupFormClientProps) {
  const searchParams = useSearchParams()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('error')

    if (error) {
      toast.error('Email já cadastrado.')
    }
  }, [searchParams])

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!captchaToken) {
      toast.error('Por favor, verifique o reCAPTCHA.')
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append('recaptchaToken', captchaToken)

    await action(formData)
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Vinidev</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar uma conta.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
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
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={SITE_KEY}
            onChange={handleCaptchaChange}
            className="py-4"
          />
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
