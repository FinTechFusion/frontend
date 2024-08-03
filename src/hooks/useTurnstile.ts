import { useEffect } from 'react';

declare global {
   interface Window {
      turnstile: {
         render: (selector: string, options: { sitekey: string; callback: (token: string) => void; theme?: string }) => void;
      };
   }
}

const useTurnstile = (sitekey: string, callback: (token: string) => void, theme: string = 'light') => {
   useEffect(() => {
      if (!window.turnstile) {
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
      } else {
         window.turnstile.render('#turnstile-container', {
            sitekey,
            callback,
            theme
         });
      }
   }, []);
};

export default useTurnstile;