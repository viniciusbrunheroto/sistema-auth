'use client'

import { User } from '@/generated/prisma'
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa6'

export default function UsersList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users').then((response) =>
      response.json().then((data) => {
        setUsers(data.users)
      }),
    )
  }, [])

  return (
    <div className="bg-gray-100">
      <ul className="my-5 py-3 px-6 flex flex-col gap-5">
        {users.map((user: User) => {
          return (
            <li key={user.id} className="flex gap-2 items-center">
              <FaUser />
              <span>{user.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
