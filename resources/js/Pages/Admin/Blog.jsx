import { useState } from 'react'
import AdminLayout from '../../Layouts/Admin/AdminLayout'
import Select from 'react-select'
import { Archive, EllipsisVertical, ExternalLink, Eye, Pencil, ThumbsUp, Trash2 } from 'lucide-react'
import moment from 'moment'
import BlogDetailModal from '../../Components/BlogDetailModal'
import { Button, Modal } from 'flowbite-react'

const options = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'Stack', label: 'Stack' }
]

const Blog = ({ posts }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    // list action dropdown
    const [actionDropdown, setActionDropdown] = useState(false);
    const [selectedAction, setSelectedAction] = useState();

    // modal view detail button
    const [modalView, setModalView] = useState(false);
    const [postData, setPostData] = useState({
        categories: []
    });

    const handleChange = (selectedOption) => {
        setSelectedOptions(selectedOption)
    }

    const toggleModal = (id, title, summary, body, img_name, img_path, upvote, is_archive, published_at, created_at, updated_at, categories) => {
        const post = {
            id: id,
            title: title,
            summary: summary,
            body: body,
            img_name: img_name,
            img_path: img_path,
            upvote: upvote,
            is_archive: is_archive,
            published_at: published_at,
            created_at: created_at,
            updated_at: updated_at,
            categories: categories
        }

        setPostData(post)
        setActionDropdown(false)
        setModalView(true)
    }

    return (
        <div className='flex flex-col py-12 px-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold'>My Blog Article</h1>
                    <span>Share briliant insights!</span>
                </div>
                <button className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600'>+ New Post</button>

            </div>

            <Modal dismissible show={modalView} onClose={() => setModalView(false)}>
                <Modal.Header>
                    <span>{postData.title}</span>
                </Modal.Header>
                <Modal.Body className='flex flex-col space-y-3'>
                    <span className='text-slate-600 text-sm'>{moment(postData.created_at).format('dddd, DD MMMM YYYY - HH:mm:ss')}</span>
                    <img src='' alt={postData.img_name} className='bg-slate-200 h-72 rounded-lg'/>
                    <div className='flex space-x-1 items-center'>
                        <span className='text-sm'>Category: </span>
                        {postData.categories.length > 0
                            ? (postData.categories).map((category, index) => (<span key={index} className='bg-slate-600 text-white px-2 py-1 text-xs rounded-lg'>{category.name}</span>))
                            : (<span className='bg-slate-100 px-2 py-1 text-xs rounded-lg'>not defined</span>)}
                    </div>
                    <h1 className='font-bold underline'>Summary</h1>
                    <span>{postData.summary}</span>
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

            {/* Data content */}
            <div className=' flex flex-col mt-4 border rounded-xl shadow-xl shadow-slate-50'>
                <div className='flex p-3'>
                    <input type='text' className='border px-5 py-1 rounded-lg mr-4' placeholder='Search...' />
                    <Select className=' bg-white rounded-lg py-1 w-1/3'
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChange}
                            // unstyled
                            // styles={{
                            //     option: () => ({
                            //         backgroundColor: '#F1F5F9'
                            //     })
                            // }}
                        />
                </div>

                {/* Table */}
                <table className='border mt-4'>
                    <thead className='bg-slate-50 font-semibold'>
                        <tr>
                            <td>#</td>
                            <td>Title</td>
                            <td>Summary</td>
                            <td>Category</td>
                            <td><ThumbsUp className='w-4 h-4'/></td>
                            <td>Archive Status</td>
                            <td>Published at</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={post.id}>
                                <td>{index+1}</td>
                                <td>{post.title}</td>
                                <td>{post.summary}</td>
                                <td>
                                    <div className='flex flex-col space-y-1'>
                                        {post.categories.length > 0
                                            ? post.categories.map((category, index) => (
                                                <span key={index} className=' text-xs bg-slate-700 text-white py-1 px-2 rounded-lg max-w-max'>{category.name}</span>))
                                            : (<span className='text-xs italic text-slate-400'>not defined</span>)}
                                    </div>
                                </td>
                                <td>{post.upvote}</td>
                                <td>
                                    {post.is_archive
                                        ? (<span className='text-xs text-white px-2 py-1 rounded-lg bg-yellow-400'>Archived</span>)
                                        : (<span className='text-xs text-white px-2 py-1 rounded-lg bg-green-500'>Published</span>)}
                                </td>
                                <td>{moment(post.published_at).format('DD MMM YYYY - HH:mm:ss (A)')}</td>
                                <td>
                                    <button type='button' className=' hover:bg-slate-200 p-1 rounded-full'
                                        onClick={() => {
                                            setActionDropdown(!actionDropdown)
                                            setSelectedAction(index)
                                        }}>
                                        <EllipsisVertical className='w-4 h-4'/>
                                    </button>

                                    {
                                        (actionDropdown && selectedAction === index) && (
                                        <div className='border bg-white rounded-lg absolute w-[120px] right-20 p-1 shadow-md shadow-slate-100'>
                                            <ul className='flex flex-col space-y-1'>
                                                <li className='flex items-center px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer'
                                                    onClick={() => toggleModal(post.id, post.title, post.summary, post.body, post.cover_img_name, post.cover_img_path, post.upvote, post.is_archive, post.published_at, post.created_at, post.updated_at, post.categories)}>
                                                    <Eye className='w-4 h-4' />
                                                    <span className='ml-3 text-sm'>View</span>
                                                </li>
                                                <li className='flex items-center px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer'>
                                                    <Pencil className='w-4 h-4' />
                                                    <span className='ml-3 text-sm'>Edit</span>
                                                </li>
                                                <li className='flex items-center px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer text-red-500'>
                                                    <Trash2 className='w-4 h-4' />
                                                    <span className='ml-3 text-sm'>Delete</span>
                                                </li>
                                            </ul>
                                        </div>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center p-3'>
                    <span>pagination</span>
                </div>
            </div>
        </div>
    )
}

// Admin layout
Blog.layout = page => <AdminLayout children={page} />

export default Blog
