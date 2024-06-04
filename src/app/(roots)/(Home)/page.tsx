import Image from "next/image";
import homeImage from '/public/assets/images/headerimg.webp';
export default function Hero() {
   return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-12 md:justify-between justify-center items-center md:space-x-40 md:space-y-0 space-y-4 md:min-h-[80vh] min-h-[100vh]" >
         <div className="text-title mt-12 flex flex-col justify-start items-start">
            <h1 className="font-semibold text-4xl tracking-wide capitalize text-dark">Meet your new crypto trading bots</h1>
            <p className="text-gray-500 py-6 text-lg">Meet your new trading edge Bot Analysis and Bot AI. Simple, smart,
               and secure. Bot Analysis finds opportunities. Bot AI predicts the market.
               Both designed to boost your profits with ease and safety in mind.</p>
            <button className="bg-primary-600 text-secondary hover:bg-primary-700 capitalize rounded px-3 py-2 text-2xl">start trial</button>
         </div>
         <div className="w-3/4 mx-auto md:h-fit h-full">
            <Image
               src={homeImage}
               alt="home-image"
               width={800}
               height={600}
               priority
               quality={75}
               sizes="(max-width: 768px) 100vw, 800px"
            />
         </div>
      </div >
   )
}
