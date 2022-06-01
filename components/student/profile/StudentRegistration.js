import React from 'react'

export default function StudentRegistration() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('are you sure?')
  }

  return (
    <div className='space-y-6 mt-4'>
      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Personal Information
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Student Personal Information, account will be active after admin
              approval.
            </p>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form action='#' method='POST'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='given-name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='roll'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Roll No.
                  </label>
                  <input
                    type='text'
                    name='roll'
                    id='roll'
                    autoComplete='family-name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='personal-email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Personal Email
                  </label>
                  <input
                    type='text'
                    name='personal-email'
                    id='personal-email'
                    autoComplete='email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='institute-email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Institute Email
                  </label>
                  <input
                    type='text'
                    name='institute-email'
                    id='institute-email'
                    autoComplete='email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mobile-number-1'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mobile Number 1
                  </label>
                  <input
                    type='text'
                    name='mobile-number-1'
                    id='mobile-number-1'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mobile-number-2'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mobile Number 2
                  </label>
                  <input
                    type='text'
                    name='mobile-number-2'
                    id='mobile-number-2'
                    autoComplete='email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='gender'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Gender
                  </label>
                  <select
                    id='gender'
                    name='gender'
                    autoComplete='gender'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    name='category'
                    autoComplete='category'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>general</option>
                    <option>obc</option>
                    <option>sc</option>
                    <option>st</option>
                    <option>ews</option>
                    <option>pwd</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='dob'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Date of Birth
                  </label>
                  <input
                    type='date'
                    name='dob'
                    id='dob'
                    autoComplete='email'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Academic Details
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Student Academic Information, account will be active after admin
              approval.
            </p>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form action='#' method='POST'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='rank'
                    className='block text-sm font-medium text-gray-700'
                  >
                    GATE / JEE Rank
                  </label>
                  <input
                    type='text'
                    name='rank'
                    id='rank'
                    autoComplete='rank'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='categoryRank'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Category Rank
                  </label>
                  <input
                    type='text'
                    name='categoryRank'
                    id='categoryRank'
                    autoComplete='family-name'
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='registering-for'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Registering for
                  </label>
                  <select
                    id='registering-for'
                    name='registering-for'
                    autoComplete='registering-for'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>Internship</option>
                    <option>FTE</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='program'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Program
                  </label>
                  <select
                    id='program'
                    name='program'
                    autoComplete='program'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>general</option>
                    <option>obc</option>
                    <option>sc</option>
                    <option>st</option>
                  </select>
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='department'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Department
                  </label>
                  <select
                    id='department'
                    name='department'
                    autoComplete='department'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>general</option>
                    <option>obc</option>
                    <option>sc</option>
                    <option>st</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='course'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Course
                  </label>
                  <select
                    id='course'
                    name='course'
                    autoComplete='course'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>general</option>
                    <option>obc</option>
                    <option>sc</option>
                    <option>st</option>
                  </select>
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-1'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-1
                  </label>
                  <input
                    type='text'
                    name='spi-1'
                    id='spi-1'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-2'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-2
                  </label>
                  <input
                    type='text'
                    name='spi-2'
                    id='spi-2'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-3'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-3
                  </label>
                  <input
                    type='text'
                    name='spi-3'
                    id='spi-3'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-4'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-4
                  </label>
                  <input
                    type='text'
                    name='spi-4'
                    id='spi-4'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-5'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-5
                  </label>
                  <input
                    type='text'
                    name='spi-5'
                    id='spi-5'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-6'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-6
                  </label>
                  <input
                    type='text'
                    name='spi-6'
                    id='spi-6'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-7'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-7
                  </label>
                  <input
                    type='text'
                    name='spi-7'
                    id='spi-7'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='spi-8'
                    className='block text-sm font-medium text-gray-700'
                  >
                    SPI-8
                  </label>
                  <input
                    type='text'
                    name='spi-8'
                    id='spi-8'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='cpi'
                    className='block text-sm font-medium text-gray-700'
                  >
                    CPI
                  </label>
                  <input
                    type='text'
                    name='cpi'
                    id='cpi'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='X_percentage'
                    className='block text-sm font-medium text-gray-700'
                  >
                    X Marks
                  </label>
                  <input
                    type='text'
                    name='X_percentage'
                    id='X_percentage'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='XII_percentage'
                    className='block text-sm font-medium text-gray-700'
                  >
                    XII Marks
                  </label>
                  <input
                    type='text'
                    name='XII_percentage'
                    id='XII_percentage'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='bachlor_marks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Bachelor's Marks
                  </label>
                  <input
                    type='text'
                    name='bachlor_marks'
                    id='bachlor_marks'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-2'>
                  <label
                    htmlFor='master_marks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Master's Marks
                  </label>
                  <input
                    type='text'
                    name='master_marks'
                    id='master_marks'
                    autoComplete=''
                    className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          onClick={handleSubmit}
          type='submit'
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Submit for approval
        </button>
      </div>
    </div>
  )
}
