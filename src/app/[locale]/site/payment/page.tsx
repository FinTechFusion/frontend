"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '@/app/_components/common/loading/Loading';
import { useRouter } from '@/i18n/routing';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
   const searchParams = useSearchParams();
   const fetchClientSecret = searchParams.get('clientSecret');
   const [clientSecret, setClientSecret] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [checkoutLoading, setCheckoutLoading] = useState<boolean>(true);
   const router = useRouter();

   useEffect(() => {
      if (fetchClientSecret) {
         const getClientSecret = async () => {
            setClientSecret(fetchClientSecret);
            setLoading(false);
         };
         getClientSecret();
      } else {
         setLoading(false);
      }
   }, [fetchClientSecret]);

   // Show the loading spinner until both `loading` and `checkoutLoading` are false
   if (loading || checkoutLoading || clientSecret === null) {
      return <Loading />;
   }

   if (!clientSecret) {
      router.push('/site/plans');
      return <div>Missing or invalid client secret</div>;
   }
   const options = {
      fetchClientSecret: () => Promise.resolve(clientSecret),
      onLoaderStart: () => setCheckoutLoading(true),
      onLoaderEnd: () => setCheckoutLoading(false),
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
