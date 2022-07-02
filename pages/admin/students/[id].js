import Layout from '@/components/admin/Layout'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import ApplicationDetails from '@/components/admin/students/ApplicationDetails'
import Eligiblejobs from '@/components/admin/students/EligibleJobs'
import StudentProfileEdit from '@/components/admin/students/StudentProfileEdit'

export default function StudentProfilePage({
  token = '',
  id = '',
  student = {},
}) {
  const pages = [
    { name: 'Students', href: '/admin/students', current: false },
    { name: `${student.attributes.name}`, href: '#', current: true },
  ]
  const [applications, setApplications] = useState([])
  const query = qs.stringify(
    {
      filters: {
        student: {
          id: {
            $eq: id,
          },
        },
      },
      populate: ['student', 'job.company'],
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  )
  useEffect(() => {
    fetch(`${API_URL}/api/applications?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.data)
        setApplications(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <ApplicationDetails applications={applications} />
      {/* <Eligiblejobs jobs={eligiblejobs} /> */}
      <StudentProfileEdit student={student} token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { token } = parseCookies(req)
  const id = params.id

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const res = await axios.get(
    `${API_URL}/api/students/${id}?populate=*`,
    config
  )

  // const query = qs.stringify(
  //   {
  //     filters: {
  //       student: {
  //         id: {
  //           $eq: id,
  //         },
  //       },
  //     },
  //     populate: ['student', 'job.company'],
  //   },
  //   {
  //     encodeValuesOnly: true, // prettify url
  //   }
  // )

  // const applicationRes = await axios.get(
  //   `${API_URL}/api/applications?${query}`,
  //   config
  // )

  // const eligibleJobRes = await axios.get(`${API_URL}/api/jobs`, config)

  return {
    props: {
      // data: res.data,
      // applications: applicationRes.data,
      // eligiblejobs: eligibleJobRes.data,
      // statusCode: res.status,
      student: res.data.data,
      token: token,
      id: id,
    }, // will be passed to the page component as props
  }
}
