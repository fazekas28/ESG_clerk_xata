'use client'
import React, { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { Table } from 'flowbite-react'
import { FaFileCsv } from 'react-icons/fa'

export default function TableSearch({ fetchDataTable }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const handleSearch = async () => {
    const res = await fetchDataTable(startDate, endDate);
    setData(res)
  };


  function arrayToCSV(data) {
    if (!data.length) {
      return '';
    }

    const columnOrder = [
      'data',
      'link_id.cod_uni',
      'link_id.filial',
      'link_id.cnpj_filial',
      'link_id.transp',
      'link_id.cnpj_transp',
      'link_id.dest',
      'link_id.cnpj_dest',
      'link_id.tratamento',
      'link_id.uf',
      'link_id.und',
      'n_mtr',
      'n_cdf',
      'n_nf',
      'chave_nf',
      'volume',
    ];
    const rows = data.map(record => columnOrder.map(column => {
      const nestedProps = column.split('.');
      return nestedProps.reduce((obj, prop) => obj[prop], record);
    }));
    const csv = '\ufeff' + [columnOrder.join(';')].concat(rows.map(row => row.join(';'))).join('\n');
    return csv;
  }

  function downloadCSV(data) {
    const csvContent = arrayToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();

    URL.revokeObjectURL(url);
    setData([])
  }



  return (
    <div>
      <div className="flex space-x-4 items-center">
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

        {data.length > 0 && (
          <button
            onClick={() => downloadCSV(data)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            <FaFileCsv className="inline-block mr-2" />
            Download
          </button>
        )}
      </div>
      <div className="pt-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>COD_UNI</Table.HeadCell>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>COD_IBAMA</Table.HeadCell>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>MTR</Table.HeadCell>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>CDF</Table.HeadCell>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>NF</Table.HeadCell>
            <Table.HeadCell className='bg-blue-800 text-white font-medium'>VOLUME</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((record) => (
              <Table.Row key={record.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='text-center'>{record.link_id.cod_uni}</Table.Cell>
                <Table.Cell className='text-center'>{record.link_id.cod_ibama}</Table.Cell>
                <Table.Cell className='text-center'>{record.n_mtr}</Table.Cell>
                <Table.Cell className='text-center'>{record.n_cdf}</Table.Cell>
                <Table.Cell className='text-center'>{record.n_nf}</Table.Cell>
                <Table.Cell className='text-center'>{record.volume}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

      </div>
    </div>
  );
}
