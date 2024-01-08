import React from 'react';
import Cards from '../../../components/dashboard/Cards';
import DashboardComp from '../../../components/dashboard/DashboardComp'
import { getXataClient } from '../../../lib/xata';
import { sumVolumesByMonth } from '../../../utils/sumVolumesByMonth';
import { sumVolumesByMonthAndIbama } from '../../../utils/sumVolumesByMonthAndIbama';
import { sumVolumesByFilial } from '../../../utils/sumVolumesByFilial';
import { auth } from '@clerk/nextjs';
import processChartData from '../../../utils/barChartData'
import processMonthlyData from '../../../utils/barChartDataMonth'

const xata = getXataClient();

export default async function Dashboard() {
 const { sessionClaims } = auth();
 const filial_name = sessionClaims?.org_slug;

 const data = await xata.db.mtr_info.select(["*", "link_id.filial", "link_id.cod_ibama"]).getAll();
 const result = sumVolumesByMonth(data);
 const result2 = sumVolumesByMonthAndIbama(data, null);
 const result3 = sumVolumesByFilial(data, null, filial_name);
 const loja = filial_name;
 const barChart = processChartData(data)
 const barChart2 = processMonthlyData(loja, data)


 return (
  <div className='flex flex-col pl-[4.25em] pt-10 gap-5'>
   <Cards sum={result} oleo={result2} filial={result3} pateo={loja} />
   <DashboardComp chartdata={barChart} chartdata2={barChart2} pateo={loja} />
  </div>
 );
}
