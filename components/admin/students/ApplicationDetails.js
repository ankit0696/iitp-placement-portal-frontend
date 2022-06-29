import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

export default function ApplicationDetails({ applications = '' }) {
  const [rowData] = useState(applications.data)
  const [columnDefs] = useState([
    {
      headerName: 'Company',
      field:
        'attributes.job.data.attributes.company.data.attributes.company_name',
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
    <div className='my-4'>
      <div className='pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Applied Jobs
        </h3>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ height: 200 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
        ></AgGridReact>
      </div>
    </div>
  )
}
