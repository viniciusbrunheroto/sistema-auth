import { Suspense } from 'react'
import LoginFormClient from './login-form'
import AuthActions from '../actions/auth-actions'

export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormClient action={AuthActions.login} />
    </Suspense>
  )
}
