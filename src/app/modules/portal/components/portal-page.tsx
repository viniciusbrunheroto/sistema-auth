'use client'

import { useSearchParams } from 'next/navigation'
import UsersList from '../../users/components/users-list'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

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

      <UsersList />

      <Link href="/api/logout">Logout</Link>
    </main>
  )
}
