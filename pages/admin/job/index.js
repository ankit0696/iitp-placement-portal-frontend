import Layout from '@/components/admin/Layout'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState } from 'react'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { API_URL } from '@/config/index'

export default function students({ data }) {
  const [rowData] = useState(data.data)

  const [columnDefs] = useState([
    {
      headerName: 'S.No.',
      valueGetter: 'node.rowIndex + 1',
    },
    {
      headerName: 'Company',
      field: 'attributes.company.data.attributes.company_name',
    },
    {
      headerName: 'Job Title',
      field: 'attributes.job_title',
    },
    {
      headerName: 'Classification',
      field: 'attributes.classification',
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
    <Layout>
      <div className='ag-theme-alpine mt-4' style={{ height: 600 }}>
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

  const res = await axios.get(`${API_URL}/api/jobs?populate=*`, config)

  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
