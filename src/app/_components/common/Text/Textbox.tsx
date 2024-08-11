import { TextBox } from '@/utils/types';
import React from 'react';

const Textbox = ({ title, description, mainClass="", titleClass="", descriptionClass="" }: TextBox) => {
   return (
      <div className={`text-box ${mainClass}`}>
         <h2 className={`md:text-3xl text-2xl font-bold text-dark hover:text-primary-700 ${titleClass}`}>{title}</h2>
         <p className={`py-4 text-lg text-gray-500 ${descriptionClass}`}>{description}</p>
      </div>
   );
};

export default Textbox;
