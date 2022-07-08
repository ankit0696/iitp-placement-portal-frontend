import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function StudentPasswordReset({ token = '' }) {
  const [students, setStudents] = useState([])

  const handleChange = async (id) => {
    // id : student id
    const roll = '2111mc02'
    const password = 'Apwd@12345'
    // change student password
    if (confirm('Are you sure you want to change password ?')) {
      // get user id
      const res = await fetch(
        `${API_URL}/api/users?filters[username][$eq]=${roll}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('res', res)
      if (res.ok) {
        const data = await res.json()
        const userId = data[0].id
        // change password
        const resChange = await fetch(`${API_URL}/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: roll,
            password: password,
          }),
        })
        const dataChange = await resChange.json()
        if (resChange.ok) {
          toast.success('Password changed successfully!')
          // change student field password_change_requested
          const resChangeRequest = await fetch(
            `${API_URL}/api/students/${id}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                password_change_requested: false,
              }),
            }
          )
          const dataChangeRequest = await resChangeRequest.json()
          if (resChangeRequest.ok) {
            toast.success('Password change requested Completed!')
          }
        } else {
          toast.error('Something went wrong!')
        }
      }
    }
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(
      `${API_URL}/api/students?filters[password_change_requested][$eq]=true&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await res.json()
    if (res.ok) {
      setStudents(data.data)
    } else {
      console.log('error', data)
      toast.warning('Something Went Wrong!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'Student Name',
      field: 'attributes.name',
      cellRenderer: function (params) {
        return (
          <Link href={`/admin/students/${params.data.id}`}>
            <a>{params.value}</a>
          </Link>
        )
      },
    },
    {
      headerName: 'Roll No.',
      field: 'attributes.roll',
      cellRenderer: function (params) {
        return (
          <Link href={`/admin/students/${params.data.id}`}>
            <a>{params.value}</a>
          </Link>
        )
      },
    },
    {
      headerName: 'Program',
      field: 'attributes.program.data.attributes.program_name',
    },
    {
      headerName: 'Course',
      field: 'attributes.course.data.attributes.course_name',
    },
    {
      headerName: 'Registered For',
      field: 'attributes.registered_for',
    },
    {
      headerName: 'Enter New Password',
      // turns on editing
      editable: true,
    },
    {
      headerName: 'Change Password',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleChange(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Change Password
            </button>
          </div>
        )
      },
    },
  ])
  return (
    <div>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Student Password Reset
          </h2>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 300 }}>
        <AgGridReact
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
