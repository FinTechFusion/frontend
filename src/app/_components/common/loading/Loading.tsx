import { FaSpinner } from "react-icons/fa6";

export default function Loading() {
   return (
      <div className="min-h-screen flex justify-center items-center">
         <FaSpinner className="spinner text-primary-600 w-10 h-10" />
      </div>
   )
}
