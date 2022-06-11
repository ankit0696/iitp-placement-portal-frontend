import Layout from '@/components/admin/Layout'
import StudentProfile from '@/components/admin/students/StudentProfile'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import ApplicationDetails from '@/components/admin/students/ApplicationDetails'
import Eligiblejobs from '@/components/admin/students/EligibleJobs'

export default function StudentProfilePage({
  data = '',
  applications = '',
  eligiblejobs = '',
}) {
  const pages = [
    { name: 'Students', href: '/admin/students', current: false },
    { name: `${data.data.attributes.name}`, href: '#', current: true },
  ]

  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <ApplicationDetails applications={applications} />
      <Eligiblejobs jobs={eligiblejobs} />
      <StudentProfile student={data.data.attributes} />
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

  const applicationRes = await axios.get(
    `${API_URL}/api/applications?${query}`,
    config
  )

  const eligibleJobRes = await axios.get(`${API_URL}/api/jobs`, config)

  return {
    props: {
      data: res.data,
      applications: applicationRes.data,
      eligiblejobs: eligibleJobRes.data,
      statusCode: res.status,
      token: token,
    }, // will be passed to the page component as props
  }
}
