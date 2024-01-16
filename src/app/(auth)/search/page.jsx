import React from 'react'
import TableSearch from '../../../components/search/TableSearch'
import { getXataClient } from '../../../lib/xata'

const xata = getXataClient();

export default function Search() {

 const fetchDataTable = async (startDate, endDate) => {
  'use server'
  const records = await xata.db.mtr_info
   .filter({
    data: {
     $ge: startDate,
     $le: endDate,
    },
   })
   .select([
    "*",
    "link_id.filial",
    "link_id.cod_ibama",
    "link_id.cnpj_dest",
    "link_id.cnpj_filial",
    "link_id.cnpj_transp",
    "link_id.dest",
    "link_id.transp",
    "link_id.tratamento",
    "link_id.uf",
    "link_id.und",
   ])
   .getMany();

  const recordsJSON = JSON.parse(JSON.stringify(records));

  return recordsJSON;

 }

 return (
  <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
   <TableSearch fetchDataTable={fetchDataTable} />
  </div>
 )
}
