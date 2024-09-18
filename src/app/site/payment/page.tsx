"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentPage() {
   const searchParams = useSearchParams();
   const clientSecret = searchParams.get('clientSecret');

   // Check if clientSecret is valid
   if (!clientSecret) {
      return <div>Missing or invalid client secret</div>;
   }

   return (
      <div>
         <h2>Complete Your Payment</h2>
         <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
         </Elements>
      </div>
   );
}

function PaymentForm() {
   const stripe = useStripe();
   const elements = useElements();
   const [loading, setLoading] = useState(false);

   const confirmPayment = async () => {
      if (!stripe || !elements) {
         console.error('Stripe has not loaded or client secret is not available');
         return;
      }

      setLoading(true);

      const result = await stripe.confirmPayment({
         elements,
         redirect: 'if_required',
      });

      if (result.error) {
         console.error(result.error.message);
         // Handle error, show message to user
      } else {
         if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
            // Handle successful payment here
         }
      }

      setLoading(false);
   };

   return (
      <div>
         <PaymentElement />
         <button onClick={confirmPayment} disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Confirm Payment'}
         </button>
      </div>
   );
}
