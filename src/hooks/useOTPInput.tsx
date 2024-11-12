import { useState, useRef, useEffect, ChangeEvent } from 'react';

interface UseOTPInputProps {
   length: number;  // Length of the OTP
}

export function useOTPInput({ length }: UseOTPInputProps) {
   const [values, setValues] = useState<string[]>(Array(length).fill(''));  // Array of strings for each digit
   const inputRef = useRef<HTMLInputElement>(null);  // Single ref for the input

   useEffect(() => {
      inputRef.current?.focus();  // Focus the input on mount
   }, []);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Restrict input to digits only and to the specified length
      if (/^\d*$/.test(newValue) && newValue.length <= length) {
         // Split the input into an array of characters and fill any remaining spots with an empty string
         const newValues = newValue.split('').concat(Array(length).fill('')).slice(0, length);
         setValues(newValues);
      }
   };

   return { values, inputRef, handleChange };
}
