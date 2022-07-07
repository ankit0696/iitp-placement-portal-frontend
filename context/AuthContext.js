import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL, NEXT_URL } from '@/config/index'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('student')
  const [error, setError] = useState(null)

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  //register user
  const register = async (user) => {
    fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        if (data.message.status === 400) {
          toast.error(data.message.message)
        } else {
          setUser(data)
          toast.success('Successfully Registered')
          router.push('/student/profile')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //login user
  const login = async ({ username: identifier, password }) => {
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
      setRole(data.role)
      if (data.role === 'student') {
        router.push('student/profile')
      } else if (data.role === 'admin') {
        router.push('admin/home')
      } else if (data.role === 'coordinator') {
        router.push('coordinator/home')
      } else {
        toast.error(data.error)
      }
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
      setRole('')
      router.push('/')
    }
  }

  //check user logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      setRole(data.role)
    } else {
      setUser(null)
      setRole('')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
