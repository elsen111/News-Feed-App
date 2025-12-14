import FormTitle from "../../components/Auth/_shared/FormTitle"
import SignupContent from "../../components/Auth/Signup/SignupForm"

export default function Signup() {
  return (
    <div className="w-full sm:w-[85%] xl:w-[65%]">
      <FormTitle title="Create an account" />
      <SignupContent />
    </div>
  )
}