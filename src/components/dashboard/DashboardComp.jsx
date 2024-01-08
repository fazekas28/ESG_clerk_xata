'use client'
import React from 'react'
import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
 CategoryScale,
 LinearScale,
 BarElement,
 Title,
 Tooltip,
 Legend
);





export default function DashboardComp(chartdata) {

 const labels = chartdata.chartdata.labels
 const labels2 = chartdata.chartdata2.labels

 const options = {
  responsive: true,
  plugins: {
   legend: {
    position: 'top',
   },
   title: {
    display: true,
    text: 'Quantida de resíduo descartado por filial',
   },
  },
 };

 const options2 = {
  responsive: true,
  plugins: {
   legend: {
    position: 'top',
   },
   title: {
    display: true,
    text: `Quantida de resíduo descartado ${chartdata.pateo}`,
   },
  },
 };


 const data = {
  labels: labels,
  datasets: [
   {
    label: 'Óleo',
    data: chartdata.chartdata.volumes.oleo,
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
   },
   {
    label: 'Filtro',
    data: chartdata.chartdata.volumes.filtro,
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
   },
  ],
 };

 const data2 = {
  labels: labels2,
  datasets: [
   {
    label: 'Óleo',
    data: chartdata.chartdata2.volumes.oleo,
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
   },
   {
    label: 'Filtro',
    data: chartdata.chartdata2.volumes.filter,
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
   },
  ],
 };




 return (
  <section className="flex flex-col my-4 px-4 gap-3 md:flex-row">
   <div className="w-full md:w-1/2 h-[300px] bg-blue-200 rounded">
    <Bar options={options} data={data} />
   </div>

   <div className="w-full md:w-1/2 h-[300px] bg-blue-200 rounded">
    <Bar options={options2} data={data2} />
   </div>
  </section>
 )
}
