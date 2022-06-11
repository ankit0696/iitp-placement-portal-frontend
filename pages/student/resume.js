import Layout from '@/components/student/Layout'
import FileUpload from '@/components/student/resume/FileUpload'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function resume({ token }) {
  return (
    <Layout heading='Resume'>
      <FileUpload token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
