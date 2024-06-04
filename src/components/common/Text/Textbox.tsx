import { TextBox } from '@/utils/types';
import React from 'react';

const Textbox = ({ title, description }: TextBox) => {
   return (
      <div className='text-box'>
         <h2 className='text-2xl font-bold text-dark hover:text-primary-700'>{title}</h2>
         <p className='py-4 text-lg text-gray-500 capitalize'>{description}</p>
      </div>
   );
};

export default Textbox;
