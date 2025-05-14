import { Suspense } from 'react'
import AuthActions from '../actions/auth-actions'
import SignupFormClient from './sign-up-form'

export default function SignupForm() {
  return (
    <Suspense fallback={null}>
      <SignupFormClient action={AuthActions.createAccount} />
    </Suspense>
  )
}
