import React from 'react'
import GuestLayout from '../../Layouts/Guest/GuestLayout'

const Project = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[600px]'>
        <span className='font-semibold text-2xl text-slate-800'>Sorry..</span>
        <span className='text-sm text-slate-500'>project page is under construction</span>
    </div>
  )
}

Project.layout = page => <GuestLayout children={page} />

export default Project
