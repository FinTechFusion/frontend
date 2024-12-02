"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '@/app/_components/common/loading/Loading';
import { useRouter } from '@/i18n/routing';

const isProduction = process.env.NODE_ENV === 'production';

const stripeKey = isProduction
   ? process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE_KEY
   : process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE_KEY;

console.log(isProduction)
console.log(stripeKey)

if (!stripeKey) {
   throw new Error('Stripe publishable key is not set in environment variables');
}

const stripePromise = loadStripe(stripeKey);

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
