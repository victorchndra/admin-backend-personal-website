import AdminLayout from "../../Layouts/Admin/AdminLayout"

const Dashboard = () => {
  return (
    // Dashboard Content
    <div className='flex flex-col py-12 px-10'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <span>Progress Tracking...</span>

        <div className='flex space-x-8'>
            <div className='w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 mt-5 text-gray-600'>
                <span>Total Blog Articles</span>
                <span className=' text-gray-500'>20</span>
            </div>
            <div className='w-2/5 h-[150px] border rounded flex flex-col justify-center p-4 mt-5 text-gray-600'>
                <span>Total Projects</span>
                <span className=' text-gray-500'>5</span>
            </div>
        </div>
    </div>
  )
}

// Admin Layout
Dashboard.layout = page => <AdminLayout children={page} />

export default Dashboard
