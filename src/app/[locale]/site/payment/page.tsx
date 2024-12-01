"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '@/app/_components/common/loading/Loading';
import { useRouter } from '@/i18n/routing';

const stripePromise = loadStripe(process.env.NEXT_DEV_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
   const searchParams = useSearchParams();
   const fetchClientSecret = searchParams.get('clientSecret');
   const [clientSecret, setClientSecret] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true); 
   const router = useRouter();
   useEffect(() => {
      if (fetchClientSecret) {
         // Simulate an async operation (like fetching the client secret)
         const getClientSecret = async () => {
            setClientSecret(fetchClientSecret); 
            setLoading(false);
         };
         getClientSecret();
      } else {
         setLoading(true);
      }
   }, [fetchClientSecret]);
   if (loading) {
      return <Loading/>;
   }
   if (!clientSecret) {
      router.push('/site/plans');
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


