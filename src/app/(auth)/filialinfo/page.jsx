import React from 'react'
import Filial_info_form from '../../../components/form/Filial_info_form';
import { getXataClient } from '../../../lib/xata';
import { auth } from '@clerk/nextjs';
import toast, { Toaster } from 'react-hot-toast';


const xata = getXataClient();

export default async function FilialInfo() {
  const { sessionClaims } = auth();
  const notify = () => { toast("Wow so easy!") };

  const role = sessionClaims?.org_role
  const filial_name = sessionClaims?.org_slug

  const fetchData = async (cod) => {
    'use server'
    const cod_ibama = parseInt(cod)
    const info = await xata.db.filial_info.filter({
      filial: filial_name,
      cod_ibama: cod_ibama,
    }).getMany();


    const data = JSON.parse(JSON.stringify(info))
    return data
  };

  const editData = async (formData, id) => {
    'use server'

    const updatedFilial = await xata.db.filial_info.update(id, {
      cnpj_filial: formData.cnpj_filial,
      cnpj_transp: formData.cnpj_transp,
      cnpj_dest: formData.cnpj_dest,
      tratamento: formData.tratamento,
      uf: formData.uf,
      und: formData.und
    });

    return


  }

  return (
    <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
      <Filial_info_form fetchData={fetchData} editData={editData} />
      <Toaster
        toastOptions={{
          duration: 4000
        }} />
    </div>
  )
}