import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'react-chartjs-2'
import { API_URL } from '@/config/index'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function RegisteredGraph({ token = '' }) {
  const [resultMap, setResultMap] = useState([])
  let result = {
    labels: resultMap.map((item) => item.key),
    datasets: [
      {
        label: 'Students Registered',
        data: resultMap.map((item) => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

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
        console.log(res)
        const occurences = res.data.reduce(function (r, row) {
          r[row.attributes.program.data.attributes.program_name] =
            ++r[row.attributes.program.data.attributes.program_name] || 1
          return r
        }, {})

        const result = Object.keys(occurences).map(function (key) {
          return { key: key, value: occurences[key] }
        })
        setResultMap(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <p className='text-center text-xl font-bold'>Students Registered</p>
      <Pie data={result} />
    </div>
  )
}
