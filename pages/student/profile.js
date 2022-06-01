import Layout from '@/components/student/Layout'
import React from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import StudentRegistration from '@/components/student/profile/StudentRegistration'

export default function profile({ data }) {
  console.log(data)
  return (
    <Layout heading='Profile'>
      <StudentRegistration />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const config = {
    headers: { Authorization: `Bearer ${process.env.GET_TOKEN}` },
  }

  const res = await axios.get(
    `${API_URL}/api/students?filters[roll][$eq]=2111mc02`,
    config
  )

  return {
    props: { data: res.data }, // will be passed to the page component as props
  }
}
