import GuestNavbar from './GuestNavbar'

const GuestLayout = ({ children }) => {
  return (
    <>
        {/* Navbar */}
        <header>
            <GuestNavbar />
        </header>

        {/* Main */}
        <main>
            {children}
        </main>
    </>
  )
}

export default GuestLayout
