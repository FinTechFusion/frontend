"use client"
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface AccordionItem {
   question: string;
   answer: string;
}

const items: AccordionItem[] = [
   {
      question: "What is FinTechFusion?",
      answer: "FinTechFusion is a leading fintech platform that provides advanced trading bots designed to optimize your trading strategies and maximize profits in any market condition, whether the market is up, down, or stable.",
   },
   {
      question: "How do FinTechFusion's trading bots work?",
      answer: "Our trading bots use sophisticated algorithms to analyze market trends and execute trades at the most opportune times. They are designed to buy low and sell high, capitalizing on price fluctuations to enhance your trading outcomes.",
   },
   {
      question: "Can FinTechFusion's bots make profits in bear markets?",
      answer: "Yes, our bots are equipped to make gains even when prices are falling. They do this by selling high and buying back at lower prices, ensuring that you can profit from downward trends.",
   },
   {
      question: "How do the bots perform in sideways markets?",
      answer: "In sideways markets, where prices fluctuate within a range, our bots are programmed to buy on dips and sell on highs. This strategy helps to secure better profits as prices oscillate.",
   },
   {
      question: "What about stable markets?",
      answer: "In stable markets, our bots trade between support and resistance levels to earn steady gains. They are adept at identifying these levels and executing trades to capitalize on small price movements.",
   },
   {
      question: "Is FinTechFusion suitable for beginners?",
      answer: "Absolutely! FinTechFusion is designed to be user-friendly and accessible for traders of all experience levels. Our intuitive interface and comprehensive support resources make it easy for beginners to get started and succeed.",
   },
   {
      question: "How secure is the FinTechFusion platform?",
      answer: "Security is our top priority. FinTechFusion employs state-of-the-art encryption and security protocols to protect your data and transactions. You can trade with confidence knowing your assets are secure.",
   },
   {
      question: "What markets can I trade with FinTechFusion?",
      answer: "FinTechFusion supports a wide range of markets, including cryptocurrencies, stocks, forex, and commodities. Our bots are versatile and can optimize trading strategies across different asset classes.",
   },
   {
      question: "How do I start using FinTechFusion?",
      answer: "To start using FinTechFusion, simply sign up for an account on our platform, verify your identity, and fund your trading account. Once your account is set up, you can select a trading bot, configure its settings, and start trading.",
   },
   {
      question: "What kind of support does FinTechFusion offer?",
      answer: "We offer comprehensive support through various channels, including live chat, email, and a detailed knowledge base. Our support team is always ready to assist you with any questions or issues you may have.",
   },
];


export default function According() {
   const [openIndexes, setOpenIndexes] = useState<number[]>([]);

   const toggleAnswer = (index: number) => {
      setOpenIndexes((prevOpenIndexes) =>
         prevOpenIndexes.includes(index)
            ? prevOpenIndexes.filter((i) => i !== index)
            : [...prevOpenIndexes, index]
      );
   };

   return (
      <section className="container mx-auto px-2">
         {items.map((item, index) => (
            <div key={index} className="according-item mx-auto lg:w-2/3 md:w-3/4 w-full">
               <div
                  className="according-question my-3 cursor-pointer flex justify-between items-center bg-gray-200 hover:bg-gray-300 p-3 rounded-md"
                  onClick={() => toggleAnswer(index)}
               >
                  <h2 className="text-xl font-medium tracking-wide">
                     {item.question}
                  </h2>
                  <div className="icon">
                     {openIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
               </div>
               <div
                  className={`according-answer overflow-hidden transition-all duration-300 ${openIndexes.includes(index) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                     }`}
               >
                  <p className="pb-2 capitalize tracking-wide">
                     {item.answer}
                  </p>
               </div>
            </div>
         ))}
      </section>
   );
}
