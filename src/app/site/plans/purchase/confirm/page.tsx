"use client"
import { useSearchParams } from "next/navigation"

export default function Page() {
   const searchParams = useSearchParams();
   const sessionId = searchParams.get('session_id');
   return (
      <div>
         <h5>session Id {sessionId}</h5>
      </div>
   )
}
