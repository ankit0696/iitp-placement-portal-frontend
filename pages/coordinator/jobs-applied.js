import Layout from '@/components/student/Layout'
import axios from 'axios'
import qs from 'qs'
import { API_URL } from '@/config/index'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { useState } from 'react'

export default function jobsApplied({ data }) {
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ])

  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ])
  return (
    <Layout heading='Jobs Applied'>
      <div className='ag-theme-alpine' style={{ height: 400 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.GET_TOKEN}` },
  }
  const query = qs.stringify(
    {
      populate: ['student', 'job.company'],
    },
    {
      encodeValuesOnly: true,
    }
  )

  const res = await axios.get(`${API_URL}/api/applications?${query}`, config)

  return {
    props: { data: res.data }, // will be passed to the page component as props
  }
}
