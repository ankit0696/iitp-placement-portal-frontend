import CoordinatorsSection from '@/components/admin/coordinators/CoordinatorsSection'
import Layout from '@/components/admin/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import React from 'react'
import qs from 'qs'

export default function Coordinators({ data, token }) {
  return (
    <Layout>
      <CoordinatorsSection coordinators={data} token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const query = qs.stringify(
    {
      filters: {
        role: {
          type: {
            $eq: 'coordinator',
          },
        },
      },
      populate: ['role'],
    },
    {
      encodeValuesOnly: true, // prettify url
    }
  )

  const res = await axios.get(`${API_URL}/api/users?${query}`, config)
  console.log(res.data)

  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
