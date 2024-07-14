import { useState } from 'react'
import { useRoute } from '../../../../../vendor/tightenco/ziggy/src/js'
import { Link } from '@inertiajs/react'
import { EllipsisVertical, Eye, Pencil, ThumbsUp, Trash2 } from 'lucide-react'
import AdminLayout from '../../../Layouts/Admin/AdminLayout'
import Select from 'react-select'
import moment from 'moment'
import BlogViewModal from '../../../Components/BlogViewModal'
import BlogDeleteModal from '../../../Components/BlogDeleteModal'

const options = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'Stack', label: 'Stack' }
]

const Blog = ({ posts, navActive }) => {

    const route = useRoute();

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

    const viewModalClicked = (id, title, summary, body, img_name, is_archive, published_at, created_at, updated_at, categories) => {
        const post = {
            id: id,
            title: title,
            summary: summary,
            body: body,
            img_name: img_name,
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

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState({});

    const deleteModalClicked = (id) => {
        setDeleteId({ id: id })
        setActionDropdown(false)
        setDeleteModal(true)
    }

    return (
        <div className='flex flex-col py-12 px-10'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-2xl font-bold'>My Blog Article</h1>
                    <span>Share briliant insights!</span>
                </div>
                <Link
                    className='bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600'
                    href={route('blogs.create')}
                    >
                    + New Post
                </Link>
            </div>

            {/* View Modal */}
            <BlogViewModal post={postData} modalView={modalView} setModalView={() => setModalView(false)} />
            <BlogDeleteModal post={deleteId} modalDelete={deleteModal} setModalDelete={setDeleteModal} />

            {/* Data content */}
            <div className=' flex flex-col my-8 border rounded-xl shadow-xl shadow-slate-50'>
                <div className='flex p-3'>
                    <input type='text' className='border border-slate-300 px-5 py-1 rounded-lg mr-4' placeholder='Search...' />
                    <Select className=' bg-white rounded-lg w-1/3'
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChange}
                            // unstyled
                            // styles={{
                            //     option: () => ({
                            //         backgroundColor: '#F1F5F9',
                            //         margin: "3px"
                            //     })
                            // }}
                        />
                </div>

                {/* Table -> parse it into component later */}
                <table className='border mt-4'>
                    <thead className='bg-slate-50 font-semibold'>
                        <tr>
                            <td>#</td>
                            <td>Title</td>
                            <td>Summary</td>
                            <td>Category</td>
                            <td><ThumbsUp className='w-4 h-4'/></td>
                            <td>Archive Status</td>
                            <td>Last published</td>
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
                                                <span key={index} className=' text-center text-xs bg-slate-700 text-white py-1 px-2 rounded-lg w-fit'>{category.name}</span>))
                                            : (<span className='text-xs italic text-slate-400'>not defined</span>)}
                                    </div>
                                </td>
                                <td>{post.upvote}</td>
                                <td>
                                    {post.is_archive
                                        ? (<span className='text-xs text-white px-2 py-1 rounded-lg bg-yellow-400'>Archived</span>)
                                        : (<span className='text-xs text-white px-2 py-1 rounded-lg bg-green-500'>Published</span>)}
                                </td>
                                <td>{post.published_at ? moment(post.published_at).format('DD MMM YYYY - HH:mm:ss (A)') : (<span className='text-sm text-slate-500'>-</span>)}</td>
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
                                                    onClick={() => viewModalClicked(post.id, post.title, post.summary, post.body, post.img_name, post.is_archive, post.published_at, post.created_at, post.updated_at, post.categories)}
                                                >
                                                    <Eye className='w-4 h-4' />
                                                    <span className='ml-3 text-sm'>View</span>
                                                </li>

                                                <Link className='flex items-center px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer'
                                                    href={route('blogs.edit', post)}
                                                >
                                                    <Pencil className='w-4 h-4' />
                                                    <span className='ml-3 text-sm'>Edit</span>
                                                </Link>

                                                {post.is_archive == true && (
                                                    <li onClick={() => deleteModalClicked(post.id)} className='flex items-center px-3 py-2 rounded-md hover:bg-slate-50 cursor-pointer text-red-500'>
                                                        <Trash2 className='w-4 h-4' />
                                                        <span className='ml-3 text-sm'>Delete</span>
                                                    </li>
                                                )}
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
Blog.layout = (page) => {
    return <AdminLayout children={page} navActive={page.props.navActive}/>
}

export default Blog
