import { Heading } from "@/utils/types";
const SectionHeading = ({ title }: Heading) => {
   return (
      <div className="mb-6">
         <h2 className="text-3xl font-medium capitalize text-dark">{title}</h2>
      </div>
   )
}
export default SectionHeading;