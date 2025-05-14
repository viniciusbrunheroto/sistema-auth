import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Homepage do Site</h1>
      <hr />
      <nav className="mt-6">
        <Link href="/portal" className="text-blue-500">
          {' '}
          Acesse o Portal{' '}
        </Link>
        ou{' '}
        <Link href="/portal/cadastro" className="text-blue-500">
          {' '}
          Crie uma conta
        </Link>
      </nav>

      <Link
        href="https://github.com/viniciusbrunheroto/sistema-auth"
        target="_blank"
        className="hover:text-blue-500 transition-all duration-300 py-4 inline-block"
      >
        <span className="flex gap-2 items-center underline">
          {' '}
          Acessar esse projeto no <FaGithub size={30} />
        </span>
      </Link>
    </main>
  )
}
