'use client'

import { useSearchParams } from 'next/navigation'
import UsersList from '../../users/components/users-list'

import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function PortalPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')

    if (success === 'login') {
      toast.success('Login feito com sucesso', {
        position: 'bottom-right',
      })
    }
  }, [searchParams])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Página do Portal</h1>

      <div className="py-10">
        <p className="text-xl font-semibold">Usuários que passaram por aqui:</p>
        <UsersList />
        <p className="text-xl">Obrigado por testarem o formulário! :)</p>
      </div>

      <a
        href="/api/logout"
        className="bg-black py-3 px-6 rounded-md
      text-white hover:bg-black/80 transition-all duration-300"
      >
        Logout
      </a>
    </main>
  )
}
