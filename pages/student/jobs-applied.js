import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function jobsApplied({
  data = '',
  statusCode = '',
  token = '',
}) {
  const router = useRouter()
  // check if student is approved or not

  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.approved !== 'approved') {
          router.push('/student/profile')
        }
      })
  }, [])

  const [rowData] = useState(data)

  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field: 'job.company.company_name',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Job Title',
      field: 'job.job_title',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Student Status',
      field: 'status',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Classification',
      field: 'job.classification',
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
    <Layout heading='Jobs Applied'>
      <div className='ag-theme-alpine mt-4' style={{ height: 800 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const res = await axios.get(`${API_URL}/api/student/applied-jobs`, config)

  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
