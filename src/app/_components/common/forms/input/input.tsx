import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
   label?: string;
   name: Path<TFieldValue>;
   type?: string;
   placeholder: string;
   register: UseFormRegister<TFieldValue>;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onPaste?: (e: React.ClipboardEvent) => void; // Add onPaste prop
   error?: string;
   value?:string;
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
   ...rest
}: InputProps<TFieldValue>) => {
   return (
      <div className="pb-4">
         <label htmlFor="firstName" className="block capitalize pb-1 text-lg font-medium tracking-wide">{label}</label>
         <input
            type={type}
            className={`auth_input border-2 ${error ? 'border-red-600 shadow' : ''}`}
            {...register(name)}
            id={name}
            placeholder={placeholder}
            {...rest}
         />
         {error && <span className="text-red-600 text-sm pt-2">{error}</span>}
      </div>
   )
}

export default Input;