import SuspendedVerifyInput from "@/app/_components/common/inputs/VerifyInput"
import Textbox from "@/app/_components/common/Text/Textbox"

const VerifyEmail = () => {
   return (
      <div className="min-h-screen bg-gray-100 w-full flex justify-center items-center">
         <div className="md:w-1/2 w-full bg-secondary container py-8 px-3 rounded flex flex-col items-start">
            <Textbox title="auth.verify_email" description="auth.verify_email_description" />
            <form className="w-1/2">
               <SuspendedVerifyInput />
            </form>
         </div>
      </div>
   )
}

export default VerifyEmail;