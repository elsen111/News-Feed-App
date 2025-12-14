import FormTitle from "../../components/Auth/_shared/FormTitle"
import LoginContent from "../../components/Auth/LoginPage/LoginForm"

export default function Login() {
  return (
    <div className="w-full sm:w-[85%] xl:w-[65%]">
      <FormTitle title="Sign in to your account" />
      <LoginContent />
    </div>
  )
}
