import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface UseOTPInputProps {
   length: number;
}

export function useOTPInput({ length }: UseOTPInputProps) {
   const [values, setValues] = useState<string[]>(Array(length).fill(''));
   const inputRef = useRef<(HTMLInputElement | null)>(null);

   useEffect(() => {
      inputRef.current.focus();
   }, []);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setValues(value)
   };
   return { values, inputRef, handleChange };
}
