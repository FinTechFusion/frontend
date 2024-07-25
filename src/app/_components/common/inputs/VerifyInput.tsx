"use client"
import { useRouter } from "next/navigation";
import { API_BASE_URL } from '@/utils/api';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';
import Toast from '../Tostify/Toast';


function VerifyInput() {
   const route = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get('email');

   const [values, setValues] = useState<string[]>(Array(6).fill('')); // Assuming 6 input fields
   const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

   useEffect(() => {
      // Focus on the first input when the component mounts
      inputRefs.current[0]?.focus();
   }, []);

   const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target;
      if (value.length > 1) return; // Ensure only single character is allowed

      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move focus to the next input if the current one is filled
      if (value && index < inputRefs.current.length - 1) {
         inputRefs.current[index + 1]?.focus();
      }
   };
   async function sendCodeToApi(code: number) {
      try {
         const response = await fetch(`${API_BASE_URL}/auth/verify?otp_code=${code}&email=${email}`, {
            method: 'POST',
         })
         const responseData = await response.json();
         console.log(responseData);
         if (!responseData.success) {
            toast.error(responseData.detail[0].msg || responseData.detail);
         }
         else {
            toast.success("Account is verified Successfully");
            route.push('/login')
         }
         if (!response.ok) {
            throw new Error("An error has occurred");
         }
      }
      catch (error: any) {
         console.error(error);
      }
   }

   const handleVerify = (e: React.FormEvent) => {
      e.preventDefault();
      const combinedValue = values.join('');
      sendCodeToApi(Number(combinedValue))
      console.log(Number(combinedValue));
   }
   return (
      <>
         <Toast />
         <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
               {values.map((val, index) => (
                  <input
                     key={index}
                     type="text"
                     maxLength={1}
                     value={val}
                     ref={(el) => { inputRefs.current[index] = el; }}
                     onChange={(e) => handleChange(e, index)}
                     className="w-10 h-10 bg-gray-200 rounded text-center text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary-700"
                  />
               ))}
            </div>
            <button
               onClick={handleVerify}
               className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide"
            >
               Verify
            </button>
         </div>
      </>

   );
}

export default VerifyInput;
