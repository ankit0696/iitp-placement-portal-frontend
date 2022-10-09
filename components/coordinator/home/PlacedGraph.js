import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'FTE Placed Stats',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

export default function PlacedGraph({ student = [] }) {
  // Display Stack bar chart for students placed for each program and registered for FTE
  const [a1, setA1] = useState()
  const [a2, setA2] = useState()
  const [x, setX] = useState()
  const [unplaced, setUnplaced] = useState()
  const [label, setLabel] = useState([])

  let a1occurences = {},
    a2occurences = {},
    xoccurences = {},
    unplacedoccurences = {}

  useEffect(() => {
    const ftestudent = student.filter(
      (item) => item.attributes.registered_for === 'FTE'
    )
    //set label for x axis
    const label = ftestudent.map(
      (item) => item.attributes.program.data.attributes.program_name
    )
    const labelSet = new Set(label)
    setLabel(Array.from(labelSet))
    // Create dataset for placed a1 students
    const a1student = ftestudent.filter(
      (item) => item.attributes.placed === 'A1'
    )
    a1occurences = a1student.reduce(function (r, row) {
      r[row.attributes.program.data.attributes.program_name] =
        ++r[row.attributes.program.data.attributes.program_name] || 1
      return r
    }, {})
    const a1count = Object.values(a1occurences)
    setA1(a1count)

    // Create dataset for placed a2 students
    const a2student = ftestudent.filter(
      (item) => item.attributes.placed === 'A2'
    )
    a2occurences = a2student.reduce(function (r, row) {
      r[row.attributes.program.data.attributes.program_name] =
        ++r[row.attributes.program.data.attributes.program_name] || 1
      return r
    }, {})
    const a2count = Object.values(a2occurences)
    setA2(a2count)

    // Create dataset for place x students
    const xstudent = ftestudent.filter((item) => item.attributes.placed === 'X')
    xoccurences = xstudent.reduce(function (r, row) {
      r[row.attributes.program.data.attributes.program_name] =
        ++r[row.attributes.program.data.attributes.program_name] || 1
      return r
    }, {})
    const xcount = Object.values(xoccurences)
    setX(xcount)

    // Create dataset for unplaced students
    const unplacedstudent = ftestudent.filter(
      (item) => item.attributes.placed === 'Not Placed'
    )
    unplacedoccurences = unplacedstudent.reduce(function (r, row) {
      r[row.attributes.program.data.attributes.program_name] =
        ++r[row.attributes.program.data.attributes.program_name] || 1
      return r
    }, {})

    const unplacedcount = Object.values(unplacedoccurences)
    setUnplaced(unplacedcount)
  }, [student])

  let result = {
    labels: label,
    datasets: [
      {
        barPercentage: 0.5,
        label: 'A1',
        data: a1,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',

        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: 'A2',
        data: a2,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: 'X',
        data: x,
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        barPercentage: 0.5,
        label: 'Not Placed',
        data: unplaced,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <p className='text-center text-xl font-bold'>Students Placed</p>
      <Bar data={result} options={options} />
    </div>
  )
}
