'use client'

import Link from 'next/link'
import UsersList from '../modules/users/components/users-list'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'

export default function PortalPage() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')

    if (success === 'login')
      toast.success('Login com sucesso!', {
        position: 'bottom-right',
      })
  }, [searchParams])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Página do Portal</h1>

      <UsersList />

      <Link href="/api/logout">Logout</Link>
    </main>
  )
}
