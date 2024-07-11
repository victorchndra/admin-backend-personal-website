import React from 'react'
import GuestLayout from '../../Layouts/Guest/GuestLayout'
import BlogCardList from '../../Components/BlogCardList'

const Blog = () => {
  return (
    // container
    <div className=' max-w-screen-xl mx-auto flex flex-col'>
        {/* (order by category) */}
        <div className='flex space-x-4 mt-4 px-6'>
            <button className='border rounded-xl py-1 px-4'>All</button>
            <button className=' rounded-xl py-1 px-4'>Web3</button>
            <button className=' rounded-xl py-1 px-4'>Technology</button>
            <button className=' rounded-xl py-1 px-4'>Blockchain</button>
        </div>

        {/* card list component */}
        <div className='flex flex-wrap'>
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
            <BlogCardList />
        </div>

        {/* back to top button */}
    </div>
  )
}

Blog.layout = page => <GuestLayout children={page} />

export default Blog
