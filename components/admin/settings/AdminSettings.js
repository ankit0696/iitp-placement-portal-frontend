import { useState, useEffect } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminSettings() {
  const [cpiChangeAllowed, setCpiChangeAllowed] = useState(true)
  const [registrationsAllowed, setRegistrationsAllowed] = useState(true)

  useEffect(() => {
    // TODO: Get those boolean values from $SERVER/api/setting
  })

  const handleUpdateSetting = (e) => {
    e.preventDefault(e.target)

    // TODO: Use PUT $SERVER/api/setting, to update the settings
    // Keys are: `registrations_allowed`, `cpi_change_allowed` on backend
  }

  return (
    <main className='mt-4'>
      <div className='max-w-screen-xl mx-auto pb-6 '>
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x'>
            <form
              className='divide-y divide-gray-200 lg:col-span-12'
              action='#'
              method='POST'
	      onSubmit={handleUpdateSetting}
            >
              {/* Profile section */}
              {/* <div className='py-6 px-4 sm:p-6 lg:pb-8'>
                <div>
                  <h2 className='text-lg leading-6 font-medium text-gray-900'>
                    Profile
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>

                <div className='mt-6 flex flex-col lg:flex-row'>
                  <div className='flex-grow space-y-6'>
                    <div>
                      <label
                        htmlFor='username'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Username
                      </label>
                      <div className='mt-1 rounded-md shadow-sm flex'>
                        <span className='bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm'>
                          workcation.com/
                        </span>
                        <input
                          type='text'
                          name='username'
                          id='username'
                          autoComplete='username'
                          className='focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                          //   defaultValue={user.handle}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium text-gray-700'
                      >
                        About
                      </label>
                      <div className='mt-1'>
                        <textarea
                          id='about'
                          name='about'
                          rows={3}
                          className='shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                          defaultValue={''}
                        />
                      </div>
                      <p className='mt-2 text-sm text-gray-500'>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                  </div>

                  <div className='mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0'>
                    <p
                      className='text-sm font-medium text-gray-700'
                      aria-hidden='true'
                    >
                      Photo
                    </p>
                    <div className='mt-1 lg:hidden'>
                      <div className='flex items-center'>
                        <div
                          className='flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12'
                          aria-hidden='true'
                        >
                          <img
                            className='rounded-full h-full w-full'
                            // src={user.imageUrl}
                            alt=''
                          />
                        </div>
                        <div className='ml-5 rounded-md shadow-sm'>
                          <div className='group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500'>
                            <label
                              htmlFor='mobile-user-photo'
                              className='relative text-sm leading-4 font-medium text-gray-700 pointer-events-none'
                            >
                              <span>Change</span>
                              <span className='sr-only'> user photo</span>
                            </label>
                            <input
                              id='mobile-user-photo'
                              name='user-photo'
                              type='file'
                              className='absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='hidden relative rounded-full overflow-hidden lg:block'>
                      <img
                        className='relative rounded-full w-40 h-40'
                        // src={user.imageUrl}
                        alt=''
                      />
                      <label
                        htmlFor='desktop-user-photo'
                        className='absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100'
                      >
                        <span>Change</span>
                        <span className='sr-only'> user photo</span>
                        <input
                          type='file'
                          id='desktop-user-photo'
                          name='user-photo'
                          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md'
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className='mt-6 grid grid-cols-12 gap-6'>
                  <div className='col-span-12 sm:col-span-6'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-12 sm:col-span-6'>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='family-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-12'>
                    <label
                      htmlFor='url'
                      className='block text-sm font-medium text-gray-700'
                    >
                      URL
                    </label>
                    <input
                      type='text'
                      name='url'
                      id='url'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-12 sm:col-span-6'>
                    <label
                      htmlFor='company'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company
                    </label>
                    <input
                      type='text'
                      name='company'
                      id='company'
                      autoComplete='organization'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
                    />
                  </div>
                </div>
              </div> */}

              {/* Privacy section */}
              <div className='pt-6 divide-y divide-gray-200'>
                <div className='px-4 sm:px-6'>
                  <div>
                    <h2 className='text-lg leading-6 font-medium text-gray-900'>
                      Admin Settings
                    </h2>
                    <p className='mt-1 text-sm text-gray-500'>
                      Universal setting managed by admins.
                    </p>
                  </div>
                  <ul role='list' className='mt-2 divide-y divide-gray-200'>
                    <Switch.Group
                      as='li'
                      className='py-4 flex items-center justify-between'
                    >
                      <div className='flex flex-col'>
                        <Switch.Label
                          as='p'
                          className='text-sm font-medium text-gray-900'
                          passive
                        >
                          Allow editing CPI and SPI
                        </Switch.Label>
                        <Switch.Description className='text-sm text-gray-500'>
                          This will allow all students to edit their CPI and
                          SPI.
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={cpiChangeAllowed}
                        onChange={setCpiChangeAllowed}
                        className={classNames(
                          cpiChangeAllowed ? 'bg-teal-500' : 'bg-gray-200',
                          'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                        )}
                      >
                        <span
                          aria-hidden='true'
                          className={classNames(
                            cpiChangeAllowed ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                    <Switch.Group
                      as='li'
                      className='py-4 flex items-center justify-between'
                    >
                      <div className='flex flex-col'>
                        <Switch.Label
                          as='p'
                          className='text-sm font-medium text-gray-900'
                          passive
                        >
                          Allow Student Registration
                        </Switch.Label>
                        <Switch.Description className='text-sm text-gray-500'>
                          Change this to allow or disallow student registration
                        </Switch.Description>
                      </div>
                      <Switch
                        checked={registrationsAllowed}
                        onChange={setRegistrationsAllowed}
                        className={classNames(
                          registrationsAllowed ? 'bg-teal-500' : 'bg-gray-200',
                          'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                        )}
                      >
                        <span
                          aria-hidden='true'
                          className={classNames(
                            registrationsAllowed ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </ul>
                </div>
                <div className='mt-4 py-4 px-4 flex justify-end sm:px-6'>
                  <button
                    type='button'
                    className='bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
