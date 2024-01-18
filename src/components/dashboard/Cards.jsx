'use client'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import filterBarChart1 from '../../utils/BarChartFunction'
import filterBarChart2 from '../../utils/BarChartFunctions2'
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



export default function Cards({ fetchDataChart, fetchBarChartData }) {
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(new Date());
 const [data, setData] = useState([]);
 const [labels1, setLabels1] = useState([]);
 const [labels2, setLabels2] = useState([]);
 const [volumes1, setVolumes1] = useState([]);
 const [volumes2, setVolumes2] = useState([]);


 const options = {
  responsive: true,
  plugins: {
   legend: {
    position: 'top',
   },
   title: {
    display: true,
    text: 'Comparativo Lojas do mesmo porte',
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
    text: 'Comparativo Lojas do mesmo porte',
   },
  },
 };


 const data1 = {
  labels: labels1,
  datasets: [
   {
    label: 'Óleo',
    data: volumes1,
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
   },
  ],
 };

 const data2 = {
  labels: labels2,
  datasets: [
   {
    label: 'Filtro',
    data: volumes2,
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
   },
  ],
 };

 const handleStartDateChange = (event) => {
  setStartDate(new Date(event.target.value));
 };

 const handleEndDateChange = (event) => {
  setEndDate(new Date(event.target.value));
 };

 const handleSearch = async () => {
  const res = await fetchDataChart(startDate, endDate);
  const res2 = await fetchBarChartData(startDate, endDate)
  const res3 = await filterBarChart1(res2.summaries)
  const res4 = await filterBarChart2(res2.summaries)
  setData(res.summaries)
  setLabels1(res3.filteredFiliais)
  setVolumes1(res3.totalVolumes)
  setLabels2(res4.filteredFiliais)
  setVolumes2(res4.totalVolumes)

 };

 return (
  <section>

   <div className="flex flex-col items-center gap-2 md:flex-row pb-3">
    <label htmlFor="startDate" className="text-gray-600">Data Inicial:</label>
    <input
     type="date"
     id="startDate"
     value={startDate.toISOString().split('T')[0]}
     onChange={handleStartDateChange}
     className="border rounded p-2 focus:outline-none focus:border-blue-500"
    />

    <label htmlFor="endDate" className="text-gray-600">Data Final:</label>
    <input
     type="date"
     id="endDate"
     value={endDate.toISOString().split('T')[0]}
     onChange={handleEndDateChange}
     className="border rounded p-2 focus:outline-none focus:border-blue-500"
    />

    <button
     onClick={handleSearch}
     className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
    >
     <RiSearchLine className="inline-block mr-2" />
     Search
    </button>
   </div>

   <div className="flex flex-col m-4 gap-2 md:flex-row ">
    <div className="flex-1 px-2 justify-center w-64 md:w-16 bg-blue-200 shadow rounded h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">volume óleo</p>
      {data.length === 0 ? (
       <p className="py-4 font-bold">Loading...</p>
      ) : (
       <p className="py-4 font-bold">{data[0]?.total_volume}</p>
      )}
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16  bg-blue-200 shadow rounded h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">qnt coleta(s) óleo</p>
      {data.length === 0 ? (
       <p className="py-4 font-bold">Loading...</p>
      ) : (
       <p className="py-4 font-bold">{data[0]?.total_records}</p>
      )}
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16 bg-blue-200 shadow rounded max-h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">Volume Filtro</p>
      {data.length === 0 ? (
       <p className="py-4 font-bold">Loading...</p>
      ) : (
       <p className="py-4 font-bold">{data[1]?.total_volume}</p>
      )}
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
    <div className="flex-1 px-2 justify-center w-64 md:w-16  bg-blue-200 shadow rounded max-h-300px">
     <div className="">
      <p className="text-gray-900 font-bold uppercase">qnt coleta(s) Filtro</p>
      {data.length === 0 ? (
       <p className="py-4 font-bold">Loading...</p>
      ) : (
       <p className="py-4 font-bold">{data[1]?.total_records}</p>
      )}
      <p className="text-blue-700 font-bold">TON</p>
     </div>
    </div>
   </div>
   <div className='flex flex-col my-4 px-4 gap-3 md:flex-row'>
    <div className="w-full md:w-1/2 h-[300px] bg-blue-200 rounded">
     <Bar options={options} data={data1} />
    </div>

    <div className="w-full md:w-1/2 h-[300px] bg-blue-200 rounded">
     <Bar options={options2} data={data2} />
    </div>
   </div>
  </section>
 )
}
