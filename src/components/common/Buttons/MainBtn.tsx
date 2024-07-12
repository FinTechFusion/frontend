type buttonContent = {
   content: string
   btnWidth: string
}

export default function MainBtn({ content, btnWidth }: buttonContent) {
   return (
      <button className={`bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide ${btnWidth}`}>{content}</button>
   )
}
