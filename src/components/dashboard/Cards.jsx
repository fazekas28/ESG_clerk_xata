import React from 'react'


export default async function Cards(sum) {


 return (
  <section>
   <div className="flex flex-col m-4 gap-2 md:flex-row ">
    <div className="flex-1 px-2 justify-center w-64 md:w-16 bg-blue-200 shadow rounded h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">Total Descartado</p>
      <p className="py-4 font-bold">{sum.sum.toFixed(2)} </p>
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16  bg-blue-200 shadow rounded h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">{sum.pateo}</p>
      <p className="py-4 font-bold ">{sum.filial}</p>
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16 bg-blue-200 shadow rounded max-h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">Óleo Descartado</p>
      <p className="py-4 font-bold">{sum.oleo.totalVolume130201.toFixed(2)}</p>
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16  bg-blue-200 shadow rounded max-h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">Filtro Descartado</p>
      <p className="py-4 font-bold">{sum.oleo.totalVolume150202.toFixed(2)} </p>
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
   </div>
  </section>
 )
}
