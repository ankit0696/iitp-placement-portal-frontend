import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import axios from 'axios'
import { useState } from 'react'

export default function eligibleJobs({
  data = '',
  statusCode = '',
  token = '',
}) {
  const [rowData] = useState(data)

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
  return (
    <Layout heading='All Jobs'>
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

  const res = await axios.get(`${API_URL}/api/student/alljobs`, config)

  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
