import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

export default function ForgotPassword() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${API_URL}/api/student/request-password-change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roll: username, institute_email_id: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error)
          toast.error(
            data.error.details[0].messages[0].id || data.error.message
          )
        } else if (data.message.messages) {
          // For eg. in case of "Too many requests", ie 429 this will happen
          toast.error(data.message.messages[0].message)
        } else {
          toast.success('Successfully Requested. Wait for reply')
          // redirect after 5 seconds
          setTimeout(() => {
            router.push('/')
          }, 5000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='mx-auto text-center'>
            <Image
              className='mx-auto'
              width={100}
              height={100}
              alt='IIT Patna'
              src='/images/logo.svg'
            />
          </div>

          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Training and Placement Cell
          </h2>
          <h2 className='text-center font-extrabold text-3xl uppercase'>
            IIT Patna
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Forgot Password (Only for Students)
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-gray-50 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form
              className='space-y-6'
              action='#'
              method='POST'
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-gray-700'
                >
                  Roll Number
                </label>
                <div className='mt-1'>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    id='username'
                    name='username'
                    pattern='[0-9]{4}[a-zA-Z]{2}[0-9]{2}'
                    type='text'
                    autoComplete='username'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Roll Number'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Institute Email Address
                </label>
                <div className='mt-1'>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    id='email'
                    name='email'
                    pattern='.+@iitp\.ac\.in'
                    type='text'
                    autoComplete='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Institute email address'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Send Request to Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
