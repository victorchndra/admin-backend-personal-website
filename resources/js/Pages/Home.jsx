import React from 'react'
import GuestLayout from '../Layouts/Guest/GuestLayout'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[600px]'>
        <span className='font-semibold text-2xl text-slate-800'>Sorry..</span>
        <span className='text-sm text-slate-500'>home page is under construction</span>
    </div>
  )
}

Home.layout = page => <GuestLayout children={page} />

export default Home
