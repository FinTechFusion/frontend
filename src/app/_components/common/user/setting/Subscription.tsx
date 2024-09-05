"use cleint"

import { useAuth } from "@/context/AuthContext";

export default function Subscription() {
   const { user } = useAuth();

   return (
      <div>Subscription</div>
   )
}
