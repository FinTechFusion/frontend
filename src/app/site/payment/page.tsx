"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '@/app/_components/common/loading/Loading';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
   const searchParams = useSearchParams();
   const fetchClientSecret = searchParams.get('clientSecret');
   const [clientSecret, setClientSecret] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true); // Loading state

   useEffect(() => {
      if (fetchClientSecret) {
         // Simulate an async operation (like fetching the client secret)
         const getClientSecret = async () => {
            setClientSecret(fetchClientSecret); // Assuming it's already the secret you need
            setLoading(false); // Set loading to false once clientSecret is set
         };
         getClientSecret();
      } else {
         setLoading(false);
      }
   }, [fetchClientSecret]);


   if (loading) {
      return <Loading/>;
   }
   if (!clientSecret) {
      return <div>Missing or invalid client secret</div>;
   }

   const options = {
      fetchClientSecret: () => Promise.resolve(clientSecret),
   };

   return (
      <div id="checkout">
         <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
         >
            <EmbeddedCheckout />
         </EmbeddedCheckoutProvider>
      </div>
   );
}


