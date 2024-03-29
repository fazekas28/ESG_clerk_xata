'use client'
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Image from 'next/image'
import Submit_btn from '../ui/Submit_btn'
import InputMask from 'react-input-mask'

export default function Filial_info_form({ fetchData, editData }) {
 const [info, setInfo] = useState([]);
 const [selectedValue, setSelectedValue] = useState(Number);
 const [isFormVisible, setIsFormVisible] = useState(false);

 const handleDropdownChange = async (event) => {
  const selectedOption = event.target.value;
  setSelectedValue(selectedOption);

  if (selectedOption !== '') {
   const data = await fetchData(selectedOption);
   setInfo(data);
   setIsFormVisible(true);
  } else {
   setIsFormVisible(false);
  }
 };

 const formData = async (formData) => {
  const id = info[0].id;
  const rawFormData = {
   cnpj_filial: formData.get('cnpj_filial'),
   cnpj_transp: formData.get('cnpj_transp'),
   cnpj_dest: formData.get('cnpj_dest'),
   tratamento: formData.get('tratamento'),
   uf: formData.get('uf'),
   und: formData.get('und'),
   sistema: formData.get('sistema')
  };

  const res = await editData(rawFormData, id);


  if (res === 'Dados editados com sucesso!') {
   toast.success(res)
  } else toast.error(res)

 };

 return (

  <div>
   <div className='flex items-center justify-center gap-2'>

    {selectedValue ? (
     < label htmlFor="selectOption" className="block text-gray-900 pb-1 items-center justify-center">Você selecionou  </label>
    ) : (
     < label htmlFor="selectOption" className="block text-red-900 text-xl pb-1 items-center justify-center underline">Selecione o </label>
    )}
    <select
     id="selectOption"
     name="selectOption"
     value={selectedValue}
     onChange={handleDropdownChange}
     className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pb-1"
    >
     <option value="" className="text-gray-500">resíduo</option>
     <option value="130201" className="text-gray-900">Óleo</option>
     <option value="150202" className="text-gray-900">Filtro</option>
    </select>
    <Image src={'/residuos-radioativos.png'} alt='ESG' width={40} height={40}></Image>
   </div>

   {
    isFormVisible && (
     <form onSubmit={(e) => {
      e.preventDefault();
      formData(new FormData(e.target));
     }}>
      <div className="grid gap-6 mb-2 md:grid-cols-2 pt-5">
       <div>
        <label htmlFor="cnpj_filial" className="block mb-2 text-sm font-medium text-gray-900 uppercase">{info[0]?.filial} CNPJ</label>
        <InputMask
         mask="99.999.999/9999-99"
         maskChar="-"
         type="text"
         id="cnpj_filial"
         name='cnpj_filial'
         value={info[0]?.cnpj_filial || ''}
         onChange={(e) => setInfo([{ ...info[0], cnpj_filial: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         required
        />
       </div>
       <div>
        <label htmlFor="cnpj_transportador" className="block mb-2 text-sm font-medium text-gray-900 uppercase">{info[0]?.transp} Transportador CNPJ</label>
        <InputMask
         mask="99.999.999/9999-99"
         maskChar="-"
         type="text"
         id="cnpj_transportador"
         name='cnpj_transp'
         value={info[0]?.cnpj_transp || ''}
         onChange={(e) => setInfo([{ ...info[0], cnpj_transp: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         required
        />
       </div>
       <div>
        <label htmlFor="cnpj_destinador" className="block mb-2 text-sm font-medium text-gray-900 uppercase">{info[0]?.dest} Destinador CNPJ</label>
        <InputMask
         mask="99.999.999/9999-99"
         maskChar="-"
         type="text"
         id="cnpj_destinador"
         name='cnpj_dest'
         value={info[0]?.cnpj_dest || ''}
         onChange={(e) => setInfo([{ ...info[0], cnpj_dest: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         required
        />
       </div>
       <div>
        <label htmlFor="tratamento" className="block mb-2 text-sm font-medium text-gray-900 uppercase">Tipo de Tratamento</label>
        <input
         type="text"
         id="tratamento"
         name='tratamento'
         value={info[0]?.tratamento || ''}
         onChange={(e) => setInfo([{ ...info[0], tratamento: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
         required
        />
       </div>
       <div>
        <label htmlFor="uf" className="block mb-2 text-sm font-medium text-gray-900 uppercase">UF</label>
        <input
         type="text"
         id="uf"
         name='uf'
         value={info[0]?.uf || ''}
         onChange={(e) => setInfo([{ ...info[0], uf: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
         required
        />
       </div>
       <div>
        <label htmlFor="und" className="block mb-2 text-sm font-medium text-gray-900 uppercase">UND </label>
        <input
         type="text"
         id="und"
         name='und'
         value={info[0]?.und || ''}
         onChange={(e) => setInfo([{ ...info[0], und: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
         required
        />
       </div>
       <div>
        <label htmlFor="sistema" className="block mb-2 text-sm font-medium text-gray-900 uppercase">SISTEMA </label>
        <input
         type="text"
         id="sistema"
         name='sistema'
         value={info[0]?.sistema || ''}
         onChange={(e) => setInfo([{ ...info[0], sistema: e.target.value }])}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
         required
        />
       </div>

      </div>
      <div className='flex items-center justify-center lg:pt-10'>
       <Submit_btn text={"Editar"} />
      </div>

     </form>
    )
   }
  </div >

 )
}
