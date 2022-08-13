import React, { useEffect, useState } from 'react'
import RegisteredGraph from '@/components/admin/home/RegisteredGraph'
import NewRequest from './NewRequest'
import { API_URL } from '@/config/index'

export default function Home({ token = '' }) {
  const [student, setStudent] = useState([])
  const [job, setJob] = useState([])
  const [company, setCompany] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/api/students?populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setStudent(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(
      `${API_URL}/api/jobs?filters[approval_status][$eq]=pending&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setJob(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/companies?filters[status][$eq]=pending&populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompany(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])

  return (
    <div className='mt-4'>
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
      >
        <li className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <RegisteredGraph student={student} />
        </li>
        <li className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <NewRequest student={student} job={job} company={company} />
        </li>
      </ul>
    </div>
  )
}
