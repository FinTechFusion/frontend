import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface UseOTPInputProps {
   length: number;
}

export function useOTPInput({ length }: UseOTPInputProps) {
   const [values, setValues] = useState<string[]>(Array(length).fill(''));
   const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));

   useEffect(() => {
      inputRefs.current[0]?.focus();
   }, []);

   const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target;
      if (value.length > 1) return;

      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputRefs.current.length - 1) {
         inputRefs.current[index + 1]?.focus();
      }
   };

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && values[index] === '') {
         if (index > 0) {
            inputRefs.current[index - 1]?.focus();
         }
      }
   };

   return { values, inputRefs, handleChange, handleKeyDown };
}
