import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NotApproved from '@/components/student/NotApproved'

export default function eligibleJobs({ statusCode = '', token = '' }) {
  const router = useRouter()
  // check if student is approved or not
  const [approved, setApproved] = useState(true)
  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp)
        if (resp.approved !== 'approved') {
          setApproved(false)
        }
      })
  }, [])

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/student/alljobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data)
        console.log(data)
      })
  }, [])

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
      headerName: 'Job Category',
      field: 'classification',
      filter: 'agTextColumnFilter',
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
    <Layout heading='All Jobs'>
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
