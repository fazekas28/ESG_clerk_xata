import React from 'react'
import Send_mtr_form from '../../../components/form/Send_mtr_form'
import { getXataClient } from '../../../lib/xata'
import { auth } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

const xata = getXataClient()

export default async function SendMtrInfo() {
  const { sessionClaims, userId } = auth();
  const filial_name = sessionClaims?.org_slug

  const getFilialInfo = async (cod) => {
    'use server'
    const cod_ibama = parseInt(cod)
    const filialInfo = await xata.db.filial_info.filter({
      filial: filial_name,
      cod_ibama: cod_ibama
    }).getMany();

    if (!filialInfo) {
      return "aconteceu algum erro!"
    } else return filialInfo[0].id

  }

  const saveMtrInfo = async (formData, id) => {
    'use server'

    const inputDate = new Date(formData.data);
    const formatedDate = inputDate.toISOString();

    const volumeFloat = parseFloat(formData.volume)

    try {
      const saveMtrInfo = await xata.db.mtr_info.create({
        link_id: id,
        data: formatedDate,
        volume: volumeFloat,
        n_mtr: formData.n_mtr,
        n_cdf: formData.n_cdf,
        n_nf: formData.n_nf,
        chave_nf: formData.chave_nf,
        userId: userId
      })


    } catch (error) {
      return "error"
    }
    return 'Informações salvas com sucesso!'

  }




  return (
    <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
      <Send_mtr_form getFilialInfo={getFilialInfo} saveMtrInfo={saveMtrInfo} />
      <Toaster
        toastOptions={{
          duration: 4000
        }} />
    </div>
  )
}
