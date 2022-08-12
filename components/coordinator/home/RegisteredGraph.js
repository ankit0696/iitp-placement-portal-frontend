import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { API_URL } from '@/config/index'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default function RegisteredGraph({ token = '' }) {
  const [resultMap, setResultMap] = useState([])
  let result = {
    labels: resultMap.map((item) => item.key),
    datasets: [
      {
        label: 'Students Registered',
        data: resultMap.map((item) => item.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        console.log('occurences', occurences)

        const result = Object.keys(occurences).map(function (key) {
          return { key: key, value: occurences[key] }
        })
        setResultMap(result)
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <Radar data={result} />
    </div>
  )
}
