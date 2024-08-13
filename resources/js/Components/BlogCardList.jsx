import { MessageSquare, ThumbsUp } from 'lucide-react'
import React from 'react'

const BlogCardList = () => {
  return (
    <div className='flex flex-col p-4 rounded-2xl w-72 border bg-white ml-6 my-3'>
        <span className='text-sm text-slate-500'>Thursday, 11 July 2024</span>
        <span className='text-lg font-semibold mt-2'>10 things software developers should learn about learning</span>
        <div className='mt-2 space-x-1'>
            <span className='text-xs bg-blue-400 px-2 py-1 rounded-md text-white'>Web3</span>
            <span className='text-xs bg-indigo-500 px-2 py-1 rounded-md text-white'>Blockchain</span>
            <span className='text-xs bg-gray-700 px-2 py-1 rounded-md text-white'>Solidity</span>
        </div>
        <img src='' alt='cover img' className='bg-slate-50 w-full h-32 rounded-xl mt-4'/>
        <div className='flex space-x-6 mt-3 ml-1'>
            <div className='flex space-x-1'>
                <ThumbsUp className='w-5 h-5'/>
                <span>10</span>
            </div>
            <div className='flex space-x-1'>
                <MessageSquare className='w-5 h-5' />
                <span>2</span>
            </div>
        </div>
    </div>
  )
}

export default BlogCardList
