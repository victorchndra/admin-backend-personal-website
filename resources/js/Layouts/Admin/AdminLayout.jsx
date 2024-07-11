import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({children}) => {
  return (
    // Container screen dashboard
    <div className="flex w-full">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="grow">
            {children}
        </main>
    </div>
  )
}

export default AdminLayout
