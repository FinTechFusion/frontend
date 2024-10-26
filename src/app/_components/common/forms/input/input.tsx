import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
   label?: string;
   name: Path<TFieldValue>;
   type?: string;
   placeholder: string;
   register?: UseFormRegister<TFieldValue>;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onPaste?: (e: React.ClipboardEvent) => void;
   error?: string;
   value?: string;
   step?: string;
   readOnly?: boolean; // New prop
};

const Input = <TFieldValue extends FieldValues>({
   label,
   type = "text",
   register,
   name,
   placeholder,
   error,
   onChange,
   onPaste,
   value,
   readOnly = false, // Default to false
   ...rest
}: InputProps<TFieldValue>) => {
   const inputProps = register
      ? {
         ...register(name, { valueAsNumber: type === 'number' }),
         readOnly,
      }
      : {
         name,
         onChange,
         onPaste,
         value,
         readOnly,

      };

   return (
      <div className="pb-4">
         {label && (
            <label
               htmlFor={name}
               className="block capitalize pb-1 text-lg font-medium tracking-wide"
            >
               {label}
            </label>
         )}
         <input
            type={type}
            className={`main_input border-2 ${error && 'border-red-600 shadow'} ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            id={name}
            placeholder={placeholder}
            {...inputProps}
            {...rest}
            step={type === 'number' ? '0.1' : undefined}
         />
         {error && <span className="text-red-600 text-sm pt-2">{error}</span>}
      </div>
   );
};

export default Input;