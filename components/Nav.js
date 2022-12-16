import { useState } from 'react'
import Slideover from './Slideover'

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  //   { name: 'Guidelines', href: '#', current: true },
  //   { name: 'Team', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  // Add slideover on click
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function toggleSlideover() {
    setOpen(!open)
  }
  return (
    <div>
      <Slideover open={open} setOpen={setOpen} />
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
          //   defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(e) => setOpen(true)}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200 px-4'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map((tab) => (
              <a
                key={tab.name}
                // toggle slideover on click
                onClick={toggleSlideover}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition duration-150 ease-in-out select-none focus:outline-none focus:text-indigo-800 focus:border-indigo-700'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
