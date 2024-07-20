type buttonContent = {
   content: string
   btnWidth?: string
}
function MainBtn({ content, btnWidth }: buttonContent) {
   return (
      <button className={`bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide ${btnWidth}`}>{content}</button>
   )
}

function SpinBtn({ content }: buttonContent) {
   return (
      <button className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide">
         <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
         </svg>
         {content}
      </button>
   )
}

export { MainBtn, SpinBtn };