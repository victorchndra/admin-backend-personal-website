import { Modal } from 'flowbite-react'
import { Archive, ExternalLink } from 'lucide-react'
import moment from 'moment'

const BlogViewModal = ({ post, modalView, setModalView }) => {
  return (
    <Modal dismissible show={modalView} onClose={() => setModalView(false)}>
        <Modal.Header>
            <span>{post.title}</span>
        </Modal.Header>
        <Modal.Body className='flex flex-col space-y-3'>
            <span className='text-slate-600 text-sm'>{moment(post.created_at).format('dddd, DD MMMM YYYY - HH:mm:ss')}</span>
            <div className=' h-72'>
                <img src='' alt="cover image" className='bg-slate-200 h-72 rounded-lg'/>
            </div>
            <div className='flex space-x-1 items-center'>
                <span className='text-sm'>Category: </span>
                {post.categories.length > 0
                    ? (post.categories).map((category, index) => (<span key={index} className='bg-slate-600 text-white px-2 py-1 text-xs rounded-lg'>{category.name}</span>))
                    : (<span className='bg-slate-100 px-2 py-1 text-xs rounded-lg'>not defined</span>)}
            </div>
            <h1 className='font-bold underline'>Summary</h1>
            <span>{post.summary}</span>
        </Modal.Body>
        <Modal.Footer>
            <button className='px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg flex justify-center items-center space-x-1'>
                <Archive className="w-5 h-5" />
                <span>Archive</span>
            </button>
            <button className='px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg flex justify-center items-center space-x-1'>
                <ExternalLink className='w-5 h-5' />
                <span>Open</span>
            </button>
        </Modal.Footer>
    </Modal>
  )
}

export default BlogViewModal
