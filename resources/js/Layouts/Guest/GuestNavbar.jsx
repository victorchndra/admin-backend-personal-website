import { Link } from '@inertiajs/react'
import { Activity, PencilRuler, Pickaxe } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
    {
        name: "Blogs",
        icon: PencilRuler,
        href: "/blog",
    },
    {
        name: "Projects",
        icon: Pickaxe,
        href: "/project",
    },
]

const GuestNavbar = () => {
    const [isActiveNav, setIsActiveNav] = useState(0);

    return (
        <nav className=' border-b-2 bg-white'>
            <div className='px-6 py-3 mx-auto flex items-center justify-between'>
                <Link href='/' className='flex cursor-pointer hover:text-slate-800' onClick={() => setIsActiveNav(-1)}>
                    <Activity className='text-red-600' />
                    <span className='font-semibold ml-2 text-slate-800'>Victor Chandra</span>
                </Link>

                {/* Search Post */}
                <input type='text' className={'border shadow-sm px-4 py-2 rounded-lg w-1/3 ' + (isActiveNav !== 0 && ' cursor-not-allowed bg-slate-100')} placeholder='🔎 Search posts...' disabled={isActiveNav !== 0}/>

                <div className='flex space-x-4'>
                    {navLinks.map((navLink, index) => (
                        <Link key={index} href={navLink.href} className={'px-4 py-2 border-slate-300 rounded-lg border text-slate-500 hover:text-slate-800 hover:border-slate-500 hover:bg-white flex items-center justify-center' + (isActiveNav === index ? ' border-slate-500 text-slate-800' : '')} onClick={() => setIsActiveNav(index)}>
                            <navLink.icon className='w-4 h-4 mr-2'/>
                            <span>{navLink.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default GuestNavbar
