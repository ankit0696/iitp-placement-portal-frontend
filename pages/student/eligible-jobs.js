import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import NotApproved from '@/components/student/NotApproved'

export default function eligibleJobs({ token = '' }) {
  const router = useRouter()
  const [approved, setApproved] = useState(false)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.approved === 'approved') {
          setApproved(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/student/eligiblejobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  async function handleApply(id) {
    if (confirm('Are you sure to apply ?')) {
      const res = await fetch(`${API_URL}/api/student/apply?jobId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('Invalid User')
          return
        }
        console.log(res)
        toast.error('Something Went Wrong')
      } else {
        const data = await res.json()
        toast.success('Successfully Applied')
        router.push(`/student/jobs-applied`)
      }
    }
  }

  const [columnDefs] = useState([
    {
      headerName: 'Job Title',
      field: 'job_title',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job Status',
      field: 'job_status',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Company',
      field: 'company.company_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'JAF',
      field: 'jaf.url',
      cellRenderer: function (params) {
        return (
          <div>
            <a
              href={API_URL + params.value}
              target='_blank'
              className='inline-flex items-center py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-indigo-600 hover:text-indigo-700 focus:text-indigo-800'
            >
              View JAF
            </a>
          </div>
        )
      },
    },
    {
      headerName: 'Job Category',
      field: 'classification',
      filter: 'agTextColumnFilter',
    },

    { headerName: 'Deadline', field: 'last_date' },
    {
      headerName: 'Apply',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApply(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Apply
            </button>
          </div>
        )
      },
    },
  ])
  if (!approved) {
    return (
      <Layout>
        <NotApproved />
      </Layout>
    )
  }
  return (
    <Layout heading='Eligible Jobs'>
      <div className='ag-theme-alpine mt-4' style={{ height: 800 }}>
        <AgGridReact
          rowData={jobs}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
