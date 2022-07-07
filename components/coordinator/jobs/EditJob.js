import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TrashIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import moment from 'moment'

export default function EditJob({ token = '', job = '' }) {
  const id = job.id
  const { company, createdAt, updatedAt, publishedAt, jaf, ...newJob } =
    job.attributes

  if (newJob.start_date) {
    newJob.start_date = moment(newJob.start_date)
      .local()
      .format('yyyy-MM-DDThh:mm:ss.SSS')
  }
  if (newJob.last_date) {
    newJob.last_date = moment(newJob.last_date)
      .local()
      .format('yyyy-MM-DDThh:mm:ss.SSS')
  }

  const [values, setValues] = useState(newJob)

  const router = useRouter()

  const eligibleCourses = new Set(values.eligible_courses?.split(','))

  const [programs, setPrograms] = useState([])

  const handleCheckboxChange = (e) => {
    const { value } = e.target
    if (e.target.checked) {
      eligibleCourses.add(parseInt(value))
    } else {
      eligibleCourses.delete(parseInt(value))
    }
  }

  const handleDateChange = (e) => {
    let { name, value } = e.target
    value = moment(value).local().format('yyyy-MM-DDThh:mm:ss.SSS')
    console.log(value)
    setValues({ ...values, [name]: value === '' ? undefined : value })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    fetch(`${API_URL}/api/programs?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data.data)
      })
      .catch((err) => console.log(err))

    console.log(eligibleCourses)
  }, [])

  return (
    <form>
      <div className='space-y-6 mt-4'>
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className=''>
            <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
              Job Details
            </h3>
            {/* <p className='mt-1 text-sm text-gray-500'>
              Some other details of the job
            </p> */}
          </div>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='mt-5 md:mt-0 md:col-span-3'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company_address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Company
                  </label>
                  <p className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                    {company.data.attributes.company_name}
                  </p>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='job_title'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Job Title
                  </label>
                  <input
                    disabled
                    value={values.job_title}
                    onChange={handleInputChange}
                    type='text'
                    name='job_title'
                    id='job_title'
                    autoComplete='job_title'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='classification'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Classification
                  </label>
                  <select
                    name='classification'
                    onChange={handleInputChange}
                    value={values.classification}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value=''>Select Classification</option>
                    <option value='A1'>A1</option>
                    <option value='A2'>A2</option>
                    <option value='X'>X</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Internship / FTE
                  </label>
                  <select
                    name='category'
                    onChange={handleInputChange}
                    value={values.category}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value=''>Select</option>
                    <option value='Internship'>Internship</option>
                    <option value='FTE'>FTE</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='job_status'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Job Status
                  </label>
                  <select
                    name='job_status'
                    onChange={handleInputChange}
                    value={values.job_status}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value=''>Select</option>
                    <option value='open'>open</option>
                    <option value='ongoing'>ongoing</option>
                    <option value='results_declared'>results_declared</option>
                    <option value='abandoned'>abandoned</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='min_X_marks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Minimum X Marks
                  </label>
                  <input
                    disabled
                    value={values.min_X_marks}
                    onChange={handleInputChange}
                    type='number'
                    name='min_X_marks'
                    id='min_X_marks'
                    autoComplete='min_X_marks'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='min_XII_marks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Minimum XII Marks
                    <small className='text-gray-500 ml-1'>
                      Ex: 88.5 (out of 100)
                    </small>
                  </label>
                  <input
                    disabled
                    value={values.min_XII_marks}
                    onChange={handleInputChange}
                    type='number'
                    name='min_XII_marks'
                    id='min_XII_marks'
                    autoComplete='min_XII_marks'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='min_cpi'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Minimum CPI
                    <small className='text-gray-500 ml-1'>
                      Ex: 8.86 (out of 10)
                    </small>
                  </label>
                  <input
                    disabled
                    value={values.min_cpi}
                    onChange={handleInputChange}
                    type='number'
                    name='min_cpi'
                    id='min_cpi'
                    autoComplete='min_cpi'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='start_date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Start Date
                  </label>
                  <input
                    disabled
                    defaultValue={values.start_date}
                    onChange={handleDateChange}
                    type='datetime-local'
                    name='start_date'
                    id='start_date'
                    autoComplete='start_date'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='last_date'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Last Date
                  </label>
                  <input
                    disabled
                    defaultValue={values.last_date}
                    onChange={handleDateChange}
                    type='datetime-local'
                    name='last_date'
                    id='last_date'
                    autoComplete='last_date'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='only_for_female'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Only for female
                  </label>
                  <select
                    disabled
                    name='only_for_female'
                    onChange={handleInputChange}
                    value={values.only_for_female}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='only_for_pwd'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Only for PWD
                  </label>
                  <select
                    disabled
                    name='only_for_pwd'
                    onChange={handleInputChange}
                    value={values.only_for_pwd}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='only_for_ews'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Only for EWS
                  </label>
                  <select
                    disabled
                    name='only_for_ews'
                    onChange={handleInputChange}
                    value={values.only_for_ews}
                    className='mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option value='false'>No</option>
                    <option value='true'>Yes</option>
                  </select>
                </div>
                <div className='col-span-12 sm:col-span-6'>
                  <div className='grid grid-cols-12 gap-6'>
                    {programs.map((program) => (
                      <div
                        key={program.id}
                        className='col-span-6 sm:col-span-4'
                      >
                        <fieldset>
                          <legend className='block text-sm font-medium text-gray-900'>
                            {program.attributes.program_name}
                          </legend>
                          <div className='pt-6 space-y-3'>
                            {program.attributes.courses.data.map((course) => (
                              <div
                                key={course.id}
                                className='flex items-center'
                              >
                                <input
                                  disabled
                                  id={course.id}
                                  name={course.id}
                                  type='checkbox'
                                  defaultChecked={eligibleCourses.has(
                                    course.id.toString()
                                  )}
                                  onChange={handleCheckboxChange}
                                  className='h-4 w-4 border-red-300 rounded text-indigo-600 focus:ring-indigo-500'
                                />
                                <label
                                  htmlFor={`${course.id}`}
                                  className='ml-3 text-sm text-gray-600'
                                >
                                  {course.attributes.course_name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
