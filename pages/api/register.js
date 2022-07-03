import { API_URL } from '@/config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, password, role } = req.body

    const strapiRes = await fetch(`${API_URL}/student/register-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': '*',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(200).json({ user: data.user })
    } else {
      res.status(data.error.status).json({ error: data.error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json(`Method ${req.method} Not Allowed`)
  }
}
