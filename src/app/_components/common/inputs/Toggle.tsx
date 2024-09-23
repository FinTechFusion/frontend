interface ToggleProps {
   isOn: boolean;
   handleToggle: () => void;
}

export const Toggle = ({ isOn, handleToggle }: ToggleProps) => {
   return (
      <label className="flex items-center cursor-pointer">
         <div className="relative">
            <input
               type="checkbox"
               className="sr-only"
               checked={isOn}
               onChange={handleToggle}
            />
            <div
               className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${isOn ? 'bg-primary-600' : ''}`}
            ></div>
            <div
               className={`absolute w-4 h-4 bg-secondary rounded-full shadow inset-y-1 left-1 transition-transform ${isOn ? 'transform translate-x-full' : ''}`}
            ></div>
         </div>
      </label>
   );
};
