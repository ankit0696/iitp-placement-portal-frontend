import Layout from '@/components/student/Layout'
import FileUpload from '@/components/student/resume/FileUpload'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function resume({ token }) {
  const router = useRouter()
  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.approved !== 'approved') {
          router.push('/student/profile')
        }
      })
  }, [])
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
