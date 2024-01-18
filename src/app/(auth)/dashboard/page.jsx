import React from 'react';
import Cards from '../../../components/dashboard/Cards';
import { getXataClient } from '../../../lib/xata';
import { auth } from '@clerk/nextjs';

const xata = getXataClient();

export default async function Dashboard() {
 const { sessionClaims } = auth();
 const filial_name = sessionClaims?.org_slug;
 const role = sessionClaims?.org_role;

 const groups = [
  [{ 'link_id.filial': 'pateo-ilha' }, { 'link_id.filial': 'pateo-retiro' }, { 'link_id.filial': 'pateo-holandeses' }, { 'link_id.filial': 'pateo-joao-pessoa' }],
  [{ 'link_id.filial': 'pateo-manaus' }, { 'link_id.filial': 'pateo-feira' }, { 'link_id.filial': 'pateo-olinda' }],
  [{ 'link_id.filial': 'pateo-bequimao' }, { 'link_id.filial': 'pateo-piedade' }]
 ];

 const matchingGroup = groups.find(group => group.some(filial => filial["link_id.filial"] === filial_name));


 const fetchDataChart = async (startDate, endDate) => {
  'use server'

  const records = await xata.db.mtr_info
   .filter({
    data: {
     $ge: startDate,
     $le: endDate,
    },
    "link_id.filial": filial_name,
   })
   .summarize({
    columns: ["link_id.cod_ibama"],
    summaries: {
     total_volume: { sum: "volume" },
     total_records: { 'count': '*' },
    },
   });

  const recordsJSON = JSON.parse(JSON.stringify(records));

  return recordsJSON

 }

 const fetchBarChartData = async (startDate, endDate) => {
  'use server'

  const records = await xata.db.mtr_info
   .filter({
    data: {
     $ge: startDate,
     $le: endDate,
    },
    $any: matchingGroup,
   }).summarize({
    columns: ["link_id.cod_ibama", 'link_id.filial'],
    summaries: {
     total_volume: { sum: "volume" },
     total_records: { count: "*" },
    },
   });


  const recordsJSON = JSON.parse(JSON.stringify(records));

  return recordsJSON

 }


 return (
  <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
   <Cards fetchDataChart={fetchDataChart} fetchBarChartData={fetchBarChartData} />
  </div>
 );
}
