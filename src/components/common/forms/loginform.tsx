
"use client"
import MainBtn from "../Buttons/MainBtn";

export default function Loginform() {
   function handlePast(e: any) {
      e.preventDefault();
   }
   return (
      <form>
         <div className="pb-3">
            <div className="grid grid-cols-1 gap-4">
               <div className="pb-4">
                  <label htmlFor="email" className="block capitalize pb-1 text-lg font-medium tracking-wide">Email</label>
                  <input
                     type="email"
                     className={`auth_input border-2`}
                     id="email"
                     placeholder="Enter your email"
                  />
               </div>
               <div className="pb-3">
                  <label htmlFor="password" className="block capitalize pb-1 text-lg font-medium tracking-wide">password</label>
                  <input
                     type="password"
                     className={`auth_input border-2`}
                     id="password"
                     placeholder="Enter your password"
                     onPaste={handlePast}
                  />
               </div>
               <div className="login-btn w-full mx-auto">
                  <MainBtn content="Login" />
               </div>
            </div>
         </div>
      </form>
   )
}
