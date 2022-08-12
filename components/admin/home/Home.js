import React from 'react'
import RegisteredGraph from '@/components/admin/home/RegisteredGraph'

export default function Home({ token = '' }) {
  return (
    <div className='mt-4'>
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
      >
        <li className='col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200'>
          <RegisteredGraph token={token} />
        </li>
      </ul>
    </div>
  )
}
