import { TextData } from "@/utils/types";

export default function TextInfo({ content }: TextData) {
   return (
      <div className="py-2 text-lg text-gray-500">{content}</div>
   )
}
