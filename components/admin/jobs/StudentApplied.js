import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function StudentApplied({ token = '', id = '' }) {
  const [students, setStudents] = useState([])
  useEffect(() => {
    fetch(
      `${API_URL}/api/applications?populate=*&filters[job][id][$eq]=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data)
      })
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
    },
    {
      headerName: 'Status',
      field: 'attributes.status',
    },
    {
      headerName: 'Student Name',
      field: 'attributes.student.data.attributes.name',
    },
    {
      headerName: 'Roll',
      field: 'attributes.student.data.attributes.roll',
      cellRenderer: function (params) {
        return (
          <div>
            <Link href={`/admin/students/${params.data.id}`}>
              <a>{params.value}</a>
            </Link>
          </div>
        )
      },
    },
    {
      headerName: 'CPI',
      field: 'attributes.student.data.attributes.cpi',
    },

    {
      headerName: 'Classification',
      field: 'attributes.classification',
    },
    {
      headerName: 'Job Status',
      field: 'attributes.job_status',
    },
    {
      headerName: 'JAF',
      field: 'jaf.url',
      cellRenderer: function (params) {
        return (
          <div>
            <a
              href={API_URL + params.value}
              className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-indigo-600 hover:text-indigo-700 focus:text-indigo-800'
            >
              View JAF
            </a>
          </div>
        )
      },
    },
  ])
  return (
    <div className='my-4'>
      <div className='pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Students Applied
        </h3>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 200 }}>
        <AgGridReact
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
