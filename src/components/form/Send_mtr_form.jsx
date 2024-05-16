'use client'
import React, { useState } from 'react';
import Submit_btn from '../ui/Submit_btn'
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function SendMtrForm({ getFilialInfo, saveMtrInfo }) {
 const [isFormVisible, setIsFormVisible] = useState(false);
 const [selectedValue, setSelectedValue] = useState('');
 const [filialId, setFilialId] = useState('');

 const [formData, setFormData] = useState({
  data: '',
  volume: '',
  n_mtr: '',
  n_cdf: '',
  n_nf: '',
  chave_nf: '',
 });

 const handleDropdownChange = async (event) => {
  const selectedOption = event.target.value;

  setSelectedValue(selectedOption);

  if (selectedOption !== '') {
   const filialInfo = await getFilialInfo(selectedOption);
   setFilialId(filialInfo);
   setIsFormVisible(true);
  } else {
   setIsFormVisible(false);
  }
 };

 const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
   ...prevFormData,
   [name]: value,
  }));
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const rawFormData = {
   data: formData.data,
   volume: formData.volume,
   n_mtr: formData.n_mtr,
   n_cdf: formData.n_cdf,
   n_nf: formData.n_nf,
   chave_nf: formData.chave_nf,
  };

  const res = await saveMtrInfo(rawFormData, filialId);

  if (res === 'Informações salvas com sucesso!') {
   toast.success(res)
  } else toast.error(res)

  setFormData({
   data: '',
   volume: '',
   n_mtr: '',
   n_cdf: '',
   n_nf: '',
   chave_nf: '',
  });
  return

 };



 return (
  <div>
   <div className="flex items-center justify-center gap-2">
    {selectedValue ? (
     <label htmlFor="selectOption" className="block text-gray-900 pb-1 items-center justify-center">
      Você selecionou
     </label>
    ) : (
     <label htmlFor="selectOption" className="block text-red-900 text-xl pb-1 items-center justify-center underline">
      Selecione o
     </label>
    )}
    <select
     id="selectOption"
     name="selectOption"
     value={selectedValue}
     onChange={handleDropdownChange}
     className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pb-1"
    >
     <option value="" className="text-gray-500">
      resíduo
     </option>
     <option value="130201" className="text-gray-900">
      Óleo
     </option>
     <option value="150202" className="text-gray-900">
      Filtro
     </option>
    </select>
    <Image src={'/residuos-radioativos.png'} alt="ESG" width={40} height={40}></Image>
   </div>

   {isFormVisible && (
    <form onSubmit={handleSubmit}>
     <div className="grid gap-6 mb-6 md:grid-cols-2 pt-5">
      <div>
       <label htmlFor="data" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Data de lançamento da MTR</label>
       <input
        type="date"
        id="data"
        name='data'
        value={formData.data}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
       />
      </div>
      <div>
       <label htmlFor="volume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Volume coletado</label>
       <input
        type="number"
        step={0.1}
        max={5}
        id="volume"
        name='volume'
        value={formData.volume}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
       />
      </div>
      <div>
       <label htmlFor="n_mtr" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Numeração MTR</label>
       <input
        type="number"
        id="n_mtr"
        name='n_mtr'
        value={formData.n_mtr}
        onChange={handleInputChange}
        maxLength={12}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
       />
      </div>
      <div>
       <label htmlFor="n_cdf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Numeração CDF</label>
       <input
        type="number"
        id="n_cdf"
        name='n_cdf'
        value={formData.n_cdf}
        onChange={handleInputChange}
        maxLength={11}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
       />
      </div>
      <div>
       <label htmlFor="n_nf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Número NF</label>
       <input
        type="number"
        id="n_nf"
        name='n_nf'
        value={formData.n_nf}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
       />
      </div>
      <div>
       <label htmlFor="chave_nf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700 uppercase">Chave de acesso NF</label>
       <input
        type="text"
        id="chave_nf"
        maxLength={44}
        name='chave_nf'
        value={formData.chave_nf}
        onChange={handleInputChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase"
       />
      </div>

     </div>
     <div className='flex items-center justify-center lg:pt-10'>
      <Submit_btn text={'Enviar'} />
     </div>

    </form>
   )
   }



  </div>
 )
}
