import React from 'react'
import TableSearch from '../../../components/search/TableSearch'
import { getXataClient } from '../../../lib/xata'
import { auth } from '@clerk/nextjs';


const xata = getXataClient();

export default function Search() {
 const { userId, sessionClaims } = auth();

 const userRole = sessionClaims?.org_role
 const userFilial = sessionClaims?.org_slug

 const fetchDataTable = async (startDate, endDate) => {
  'use server'

  if (userRole === 'org:admin') {
   const records = await xata.db.mtr_info
    .filter({
     data: {
      $ge: startDate,
      $le: endDate,
     },
    })
    .select([
     "*",
     "link_id.cod_uni",
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
     "link_id.sistema"
    ])
    .getMany();

   const recordsJSON = JSON.parse(JSON.stringify(records));

   return recordsJSON;

  } else {

   const records = await xata.db.mtr_info
    .filter({
     data: {
      $ge: startDate,
      $le: endDate,
     },
     'link_id.filial': userFilial,
    })
    .select([
     "*",
     "link_id.cod_uni",
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
     "link_id.sistema",
    ])
    .getMany();

   const recordsJSON = JSON.parse(JSON.stringify(records));

   return recordsJSON;


  }



 }

 return (
  <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
   <TableSearch fetchDataTable={fetchDataTable} />
  </div>
 )
}
