import { useCallback, useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import qs from 'qs'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function StudentApplied({ token = '', id = '' }) {
  const [students, setStudents] = useState([])
  const gridRef = useRef()
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      onlySelected: true,
    })
  }, [])

  const handlePlaced = async () => {
    const selectedRows = gridRef.current.api.getSelectedRows()
    const selectedStudents = selectedRows.map(
      (row) => row.attributes.student.data.attributes.name
    )
    if (
      confirm(
        `Are you sure you want to place these students? ${selectedStudents}`
      )
    ) {
      selectedRows.map((row) => {
        fetch(`${API_URL}/api/applications/${row.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              status: 'selected',
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(
              `${row.attributes.student.data.attributes.name} marked as placed`
            )
          })
          .catch((err) => {
            console.log(err)
            toast.error(
              `${row.attributes.student.data.attributes.name} failed to place`
            )
          })
      })
    }
  }

  const getSelectedRowData = () => {
    const selectedRows = gridRef.current.api.getSelectedRows()
    let selectedData = selectedRows.map(
      (node) => node.attributes.student.data.attributes.roll
    )
    selectedData = selectedData.toString()
    downloadCV(selectedData)
    return selectedData
  }

  const downloadCV = async (ids) => {
    // download zip file
    fetch(`${API_URL}/api/admin/resume-zip?rolls=${ids}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'resume.zip')
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const query = qs.stringify(
    {
      populate: ['student.course', 'job.company', 'student.program'],
      filters: {
        job: {
          id: {
            $eq: id,
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  )

  useEffect(() => {
    fetch(`${API_URL}/api/applications?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
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
      headerName: 'Mobile Number',
      field: 'attributes.student.data.attributes.mobile_number_1',
    },
    {
      headerName: 'Alternate Mobile Number',
      field: 'attributes.student.data.attributes.mobile_number_2',
    },
    {
      headerName: 'Program',
      field:
        'attributes.student.data.attributes.program.data.attributes.program_name',
    },
    {
      headerName: 'Course',
      field:
        'attributes.student.data.attributes.course.data.attributes.course_name',
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
        <div className='mt-4 sm:mt-0 sm:ml-4'>
          <button
            type='button'
            className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-0 sm:ml-0'
          >
            Deactivate
          </button>
          <button
            type='button'
            onClick={handlePlaced}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3'
          >
            Mark as Placed
          </button>
          <button
            type='button'
            onClick={onBtExport}
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
          >
            Export
          </button>

          <button
            onClick={getSelectedRowData}
            type='button'
            className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
          >
            Download CV
          </button>
        </div>
      </div>

      <div className='ag-theme-alpine mt-4' style={{ height: 200 }}>
        <AgGridReact
          ref={gridRef}
          rowMultiSelectWithClick={true}
          rowSelection='multiple'
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, filter: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
