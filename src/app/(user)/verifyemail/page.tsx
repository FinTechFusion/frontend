import { MainBtn } from "@/components/common/Buttons/MainBtn"
import VerifyInput from "@/components/common/inputs/VerifyInput";
import Textbox from "@/components/common/Text/Textbox"

const VerifyEmail = () => {
   return (
      <section className="verify-email mx-auto md:w-1/2 py-16">
         <div className="text-center">
            <Textbox title="Verify Your Email" description="Enter the 6-digit code sent to your email to confirm your identity." />
            <form className="space-y-4">
               <div className="flex justify-center gap-2 mb-4 mt-2">
                  {Array.from({ length: 6 }, (_, index) => (
                     <VerifyInput key={index} />
                  ))}
               </div>
               <MainBtn content="verify" btnWidth="md:w-1/4 w-1/2" />
            </form>
         </div>
      </section>
   )
}

export default VerifyEmail