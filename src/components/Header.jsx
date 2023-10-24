import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserHeadLinks from './features/UserHeadLinks'
import { AuthContext } from '../context'

export default function Header() {
    const {isAuth} = useContext(AuthContext);
    return (
        <header className='border-b py-3 text-xl md:px-20 border-zinc-300 bg-white text-zinc-900 shadow-md z-[999]'>
            <nav className='flex flex-row justify-between items-center gap-x-5'>
                <a href={'/'} className='uppercase font-poppins font-bold text-3xl px-2 cursor-pointer outline-none'>syeanisky</a>
                <Link to={'/anime'} className='font-medium'>Anime list</Link>
                {/* {isAuth && <Link to={'/chats'} className='font-medium'>Your chats</Link>} */}
                {/* <Link to={'/communities'} className='font-medium'>Communities</Link> */}
                <UserHeadLinks />
            </nav>
        </header>
    )
}
