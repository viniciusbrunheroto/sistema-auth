'use client'

import { User } from '@/generated/prisma'
import { useEffect, useState } from 'react'

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
    <ul className="my-10">
      {users.map((user: User) => {
        return (
          <li key={user.id}>
            {user.name} / {user.email}
          </li>
        )
      })}
    </ul>
  )
}
