import { useState, useEffect, createContext } from 'react'
import Router, { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  //register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/student/profile')
    } else {
      toast.error(data.error)
      console.log(data)
    }
  }

  //login user
  const login = async ({ username: identifier, password, role }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
        role,
      }),
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/student/profile')
    } else {
      toast.error(data.error)
    }
  }

  //logout user
  const logout = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })
    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  //check user logged in
  const checkUserLoggedIn = async (user) => {}

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
