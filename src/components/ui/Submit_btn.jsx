import React from "react";
import { FaEdit, FaPaperPlane } from "react-icons/fa"

export default function SubmitBtn(text) {


 return (
  <button
   type="submit"
   className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
  >
   <>
    {text.text === 'Editar' && (
     <>
      {text.text}{' '}
      <FaEdit className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{' '}
     </>
    )}
    {text.text === 'Enviar' && (
     <>
      {text.text}{' '}
      <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{' '}
     </>
    )}
   </>

  </button>
 );
}
