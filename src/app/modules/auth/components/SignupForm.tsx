import AuthActions from '../actions/auth-actions'
import SignupFormClient from './sign-up-form'

export default function SignupForm() {
  return <SignupFormClient action={AuthActions.createAccount} />
}
