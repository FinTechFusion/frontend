import Loginform from "@/app/_components/common/forms/loginform";
import Logo from "@/app/_components/common/Logo";
export default function page() {
   return (
      <section className="w-full mx-auto md:px-0 px-2 py-6">
         <div className="form-card rounded-md border-2 lg:w-1/3 md:w-3/4 w-full px-5 py-8 mx-auto">
            <div className="card">
               <div className="card-content text-center pb-5">
                  <h2 className="text-2xl font-bold capitalize text-dark">Sign in to your account</h2>
                  <p className="py-2 text-lg text-gray-500">Enter your email and password below to access your account.</p>
               </div>
            </div>
            <div className="w-full py-6">
               <Loginform />
            </div>
         </div>

      </section>
   )
}
