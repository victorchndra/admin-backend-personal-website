import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({children, navActive}) => {

    return (
        // Container screen dashboard
        <div className="flex w-full">
            {/* Sidebar */}
            <AdminSidebar navActive={navActive}/>

            {/* Main Content */}
            <main className="grow">
                {children}
            </main>
        </div>
    )
}

export default AdminLayout
