import Link from "next/link";
import Logo from "../Logo";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Footer() {
   return (
      <div className="bg-dark md:px-0 px-3 py-6 ">
         <div className="border-b-2 border-gray-600 my-6">
            <div className="container mx-auto pb-6">
               <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">trading</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/botai" className="capitalize text-lg hover:text-primary-500">bot ai</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/botanalysis" className="capitalize text-lg hover:text-primary-500">bot analysis</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/plans" className="capitalize text-lg hover:text-primary-500">plans</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">Information</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/faq" className="capitalize text-lg hover:text-primary-500">FAQ</Link>
                        </li>
                        <li className="py-3">
                           <Link href="" className="capitalize text-lg hover:text-primary-500">blog</Link>
                        </li>
                        <li className="py-3">
                           <Link href="" className="capitalize text-lg hover:text-primary-500">support</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">Company</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/about" className="capitalize text-lg hover:text-primary-500">about us</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/botanalysis" className="capitalize text-lg hover:text-primary-500">bot analysis</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/contact" className="capitalize text-lg hover:text-primary-500">contact us</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="subscripe-box rounded-md py-6 px-8 bg-[#3d3b3b]">
                     <h2 className="text-secondary text-2xl font-medium">Subscribe</h2>
                     <div className="subscripe-input relative my-4 w-full h-fit">
                        <input
                           type="email"
                           id="UserEmail"
                           placeholder="Email"
                           className="rounded-md w-full border-none bg-transparent outline-none focus:border-none p-2"
                        />
                        <span className="absolute top-0 bottom-0 right-0 ">
                           <AiOutlineArrowRight className="bg-primary-700  text-secondary text-3xl h-full w-10 cursor-pointer rounded-tr-md rounded-br-md" />
                        </span>
                     </div>
                     <p className="text-base text-primary-50">Hello, we are Lift Media. Our goal is to translate the positive
                        effects from revolutionizing how companies engage with their clients & their team.</p>
                  </div>
               </div>
            </div>

         </div>
         <div className="container mx-auto">
            <div className="flex md:justify-between justify-center items-center">
               <div className="md:block hidden">
                  <Logo />
               </div>
               <ul className="flex text-primary-50 space-x-6">
                  <li>
                     <Link href="/site/terms" className="capitalize text-lg hover:text-primary-500">terms</Link>
                  </li>
                  <li>
                     <Link href="/site/privacy" className="capitalize text-lg hover:text-primary-500">privacy</Link>
                  </li>
                  <li>
                     <Link href="/site/cookies" className="capitalize text-lg hover:text-primary-500">cookies</Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}
