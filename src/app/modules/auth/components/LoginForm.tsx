import { Suspense } from 'react'
import AuthActions from '../actions/auth-actions'
import LoginFormClient from './login-form'

export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormClient action={AuthActions.login} />
    </Suspense>
  )
}
