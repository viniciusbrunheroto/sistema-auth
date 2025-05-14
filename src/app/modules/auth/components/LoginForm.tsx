import AuthActions from '../actions/auth-actions'
import LoginFormClient from './login-form'

export default function LoginForm() {
  return <LoginFormClient action={AuthActions.login} />
}
