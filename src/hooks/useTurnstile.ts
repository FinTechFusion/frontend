import { useEffect } from 'react';

declare global {
   interface Window {
      onloadTurnstileCallback: () => void;
      turnstile: {
         render: (selector: string, options: { sitekey: any; callback: (token: string) => void, theme?: string }) => void;
      };
   }
}

const useTurnstile = (sitekey: any, callback: (token: string) => void, theme: string = 'light') => {
   useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
         if (window.turnstile) {
            window.turnstile.render('#turnstile-container', {
               sitekey,
               callback,
               theme
            });
         } else {
            console.error('Turnstile script failed to load');
         }
      };

      script.onerror = () => {
         console.error('Failed to load the Turnstile script');
      };

      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
      };
   }, [sitekey, callback]);
};

export default useTurnstile;
