import { useState } from 'react'
import { motion } from "framer-motion"
import {
    LayoutDashboard,
    Newspaper,
    BriefcaseBusiness,
    LogOut,
    Activity,
    ChevronRight,
    ChevronLeft
} from 'lucide-react'
import { Link, useForm } from '@inertiajs/react'

const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        name: "Blogs",
        icon: Newspaper,
        href: "/admin/blogs",
    },
    {
        name: "Projects",
        icon: BriefcaseBusiness,
        href: "/admin/projects",
    },
]

const variants = {
    expanded: { width: "20%" },
    nonExpanded: { width: "5%" }
}

const AdminSidebar = ({navActive}) => {
    const [isActiveNav, setIsActiveNav] = useState(navActive);
    const [isExpanded, setIsExpanded] = useState(true);

    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('auth.logout'));
    }

    return (
        // Container sidebar with motion prefix to use motion frame
        <motion.div
            animate = {
                isExpanded ? 'expanded' : 'nonExpanded'
            }
            variants={variants}
            className={'py-12 flex flex-col w-1/5 h-screen border border-r-1 sticky top-0' + (isExpanded ? ' min-w-[294px] px-6' : ' min-w-[74px] px-3')}>

            <div className='flex font-bold space-x-3'>
                <Activity className={isExpanded ? '' : 'ml-2'}/>
                <span className={isExpanded ? "block" : "hidden"}>VICTOR CHANDRA</span>
            </div>

            <div className='absolute -right-[12px] bg-white rounded-full border border-1 w-6 h-6 flex justify-center items-center hover:bg-slate-50 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronLeft className='w-4 h-4' /> : <ChevronRight className='w-4 h-4' />}
            </div>

            <div className='flex flex-col space-y-3 mt-9 grow'>
                {navLinks.map((navLink, index) => (
                    <Link key={index} href={navLink.href} className={'flex space-x-3 p-3 rounded-md hover:bg-slate-100 cursor-pointer' + (isActiveNav === navLink.name ? (' bg-slate-100') : '') + (isExpanded ? ' justify-start' : ' justify-center')}
                        onClick={() => setIsActiveNav(navLink.name)}>
                        <navLink.icon className='w-5 h-5'/>
                        <span className={isExpanded ? 'block' : 'hidden'}>{navLink?.name}</span>
                    </Link>
                ))}
            </div>

            <button type='button' onClick={handleLogout} className='flex space-x-3 p-3 rounded-md bg-red-500 hover:bg-red-400 text-white cursor-pointer'>
                <LogOut/>
                <span className={isExpanded ? 'block' : 'hidden'}>Logout</span>
            </button>
        </motion.div>
    )
}

export default AdminSidebar
