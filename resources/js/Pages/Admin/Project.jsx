import AdminLayout from '../../Layouts/Admin/AdminLayout'

const Project = () => {
  return (
    <div className='flex flex-col py-12 px-10'>
        <h1 className='text-2xl font-bold'>My Project Collection</h1>
        <span>Bring benefits to community..</span>


    </div>
  )
}

// Admin layout
Project.layout = page => <AdminLayout children={page} />

export default Project
