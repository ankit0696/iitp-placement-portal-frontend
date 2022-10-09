import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Pie } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function RegisteredGraph({ student = [] }) {
  const [resultMap, setResultMap] = useState([])

  useEffect(() => {
    const occurences = student.reduce(function (r, row) {
      r[row.attributes.program.data.attributes.program_name] =
        ++r[row.attributes.program.data.attributes.program_name] || 1
      return r
    }, {})

    const mapData = Object.keys(occurences).map(function (key) {
      return { key: key, value: occurences[key] }
    })
    setResultMap(mapData)
  }, [student])
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

  return (
    <div>
      <p className='text-center text-xl font-bold'>Students Registered</p>
      <Pie data={result} />
    </div>
  )
}
