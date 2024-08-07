import { usePage } from "@inertiajs/react"
import AreaChartComponent from "../../Components/AreaChartComponent"
import AdminLayout from "../../Layouts/Admin/AdminLayout"

const Dashboard = () => {

    const { userAuth } = usePage().props

    return (
        // Dashboard Content
        <div className='flex flex-col py-12 px-10'>
            <div>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
                <span>Progress Tracking...</span>
            </div>

            {userAuth && (
            <>
            {/* if user logged in */}
                <div className='flex space-x-8'>
                    <div className='w-2/5 h-24 border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-600'>
                        <span className="text-lg">Total Blog Articles</span>
                        <span className=' text-gray-500'>20</span>
                    </div>
                    <div className='w-2/5 h-24 border rounded-xl flex flex-col justify-center p-4 mt-5 text-gray-600'>
                        <span className="text-lg">Total Projects</span>
                        <span className=' text-gray-500'>5</span>
                    </div>
                </div>

                <div className="mt-4 p-3">
                    <AreaChartComponent />
                </div>
            </>
            )}

        </div>
    )
}

// Admin Layout
Dashboard.layout = page => {
    return <AdminLayout children={page} navActive={page.props.navActive}/>
}

export default Dashboard
