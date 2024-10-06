"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useTranslations } from 'next-intl';

interface AccordionItem {
   question: string;
   answer: string;
}

const items: AccordionItem[] = [
   {
      question: "faqQuestion1",
      answer: "faqAnswer1",
   },
   {
      question: "faqQuestion2",
      answer: "faqAnswer2",
   },
   {
      question: "faqQuestion3",
      answer: "faqAnswer3",
   },
   {
      question: "faqQuestion4",
      answer: "faqAnswer4",
   },
   {
      question: "faqQuestion5",
      answer: "faqAnswer5",
   },
   {
      question: "faqQuestion6",
      answer: "faqAnswer6",
   },
   {
      question: "faqQuestion7",
      answer: "faqAnswer7",
   },
   {
      question: "faqQuestion8",
      answer: "faqAnswer8",
   },
   {
      question: "faqQuestion9",
      answer: "faqAnswer9",
   },
   {
      question: "faqQuestion10",
      answer: "faqAnswer10",
   },
];

export default function Accordion() {
   const [openIndex, setOpenIndex] = useState<number | null>(null);
   const t = useTranslations("faq");

   const toggleAnswer = (index: number) => {
      setOpenIndex(openIndex === index ? null : index); // Toggle the current index, close if clicked again
   };

   return (
      <section className="container mx-auto px-2 grid grid-cols-1 gap-5 md:w-3/4 w-full">
         {items.map((item, index) => (
            <div key={index} className="according-item col-span-1">
               <div
                  className="according-question my-3 cursor-pointer flex justify-between items-center bg-gray-200 hover:bg-gray-300 p-3 rounded-md"
                  onClick={() => toggleAnswer(index)}
               >
                  <h2 className="text-lg font-medium tracking-wide">{t(item.question)}</h2>
                  <div className="icon">
                     {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
               </div>
               <div
                  className={`transition-all duration-400 overflow-hidden ${openIndex === index ? "max-h-[500px] py-3" : "max-h-0 py-0"
                     }`}
               >
                  <p className="px-4 capitalize tracking-wide">{t(item.answer)}</p>
               </div>
            </div>
         ))}
      </section>
   );
}
