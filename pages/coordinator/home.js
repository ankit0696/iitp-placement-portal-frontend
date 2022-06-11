import Layout from '@/components/coordinator/Layout'
import React from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import StudentRegistration from '@/components/student/profile/StudentRegistration'
import Profile from '@/components/student/profile/Profile'
import { parseCookies } from '@/helpers/index'

export default function profile() {
  return (
    <Layout heading='Home'>
      <StudentRegistration />
      {/* <Profile student={data} /> */}
    </Layout>
  )
}
