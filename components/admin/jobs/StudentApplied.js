import { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function StudentApplied({ token = '', id = '' }) {
  const [students, setStudents] = useState([])
  const gridRef = useRef()
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      onlySelected: true,
    })
  }, [])
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
      checkboxSelection: true,
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
      headerName: 'Institute Email',
      field: 'attributes.student.data.attributes.institute_email_id',
    },
    {
      headerName: 'Personal Email',
      field: 'attributes.student.data.attributes.personal_email_id',
    },

    {
      headerName: 'CPI',
      field: 'attributes.student.data.attributes.cpi',
    },

    {
      headerName: 'Classification',
      field: 'attributes.job.data.attributes.classification',
    },
    {
      headerName: 'Resume Link',
      field: 'attributes.student.data.attributes.resume_link',
      cellRenderer: function (params) {
        return (
          <div>
            <a
              href={params.value}
              target='_blank'
              className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-indigo-600 hover:text-indigo-700 focus:text-indigo-800'
            >
              View Resume
            </a>
          </div>
        )
      },
    },
  ])
  return (
    <div className='my-4'>
      <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Students Applied
          </h3>
        </div>
        <div className='mt-4 flex sm:mt-0 sm:ml-4'>
          <button
            type='button'
            className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-0 sm:ml-0'
          >
            Deactivate
          </button>
          <button
            type='button'
            onClick={onBtExport}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
          >
            Export
          </button>

          <Link href={`/admin/companies/add`}>
            <button
              type='button'
              className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
            >
              Add Company
            </button>
          </Link>
        </div>
      </div>

      <div className='ag-theme-alpine mt-4' style={{ height: 200 }}>
        <AgGridReact
          ref={gridRef}
          rowMultiSelectWithClick={true}
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
