import VerifyInput from "@/app/_components/common/inputs/VerifyInput";
import Textbox from "@/app/_components/common/Text/Textbox"

const VerifyEmail = () => {

   return (
      <section className="verify-email mx-auto md:w-1/2 py-16">
         <div className="text-center">
            <Textbox title="Verify Your Email" description="Enter the 6-digit code sent to your email to confirm your identity." />
            <form className="space-y-4">
               <div className="flex justify-center gap-2 mb-4 mt-2">
                  <VerifyInput />
               </div>
            </form>
         </div>
      </section>
   )
}

export default VerifyEmail