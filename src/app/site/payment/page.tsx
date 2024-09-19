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

   // Check if clientSecret is valid
   if (!clientSecret) {
      return <div>Missing or invalid client secret</div>;
   }

   const options = {
      fetchClientSecret: () => Promise.resolve(clientSecret), // Return a promise
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

// function PaymentForm() {
//    const stripe = useStripe();
//    const elements = useElements();
//    const [loading, setLoading] = useState(false);

//    const confirmPayment = async () => {
//       if (!stripe || !elements) {
//          console.error('Stripe has not loaded or client secret is not available');
//          return;
//       }

//       setLoading(true);

//       const result = await stripe.confirmPayment({
//          elements,
//          redirect: 'if_required',
//       });

//       if (result.error) {
//          console.error(result.error.message);
//          // Handle error, show message to user
//       } else {
//          if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
//             console.log('Payment succeeded!');
//             // Handle successful payment here
//          }
//       }

//       setLoading(false);
//    };

//    return (
//       <div>
//          <PaymentElement />
//          <button onClick={confirmPayment} disabled={!stripe || loading}>
//             {loading ? 'Processing...' : 'Confirm Payment'}
//          </button>
//       </div>
//    );
// }
