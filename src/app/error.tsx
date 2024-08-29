"use client"
import Link from "next/link"

// interface ErrorPageProps {
//    error: Error,
//    reset: () => void
// }

export default function error() {
   return (
      <div className="flex flex-col justify-center items-center min-h-96">
         <h2 className="text-3xl font-bold py-6">Oops! Something went wrong.</h2>
         {/* <h2 className="text-3xl font-bold py-6">{error.message}</h2> */}
         <p className="text-xl text-gray-700">We &lsquo; re sorry, but the page you were trying to access is not available.</p>

         <Link href="/">
            <button className="bg-primary-700 hover:bg-teal-800 py-2 px-3 rounded-md my-6 text-lg font-medium text-secondary">Back Home</button>
         </Link>
      </div>
   )
}
