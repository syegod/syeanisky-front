import React from 'react'
import { Link } from 'react-router-dom'
import UserHeadLinks from './features/UserHeadLinks'

export default function Header() {
    return (
        <header className='border-b py-3 text-xl md:px-20 border-zinc-300 bg-white text-zinc-900 shadow-md z-[999]'>
            <nav className='flex flex-row justify-between items-center gap-x-5'>
                <a href={'/'} className='uppercase font-poppins font-bold text-3xl px-2 cursor-pointer outline-none'>syeanisky</a>
                {/* <div className='text-zinc-800 flex flex-row md:w-1/3 w-full divide-x divide-zinc-500'>
                    <input type="text" className='border-0 px-3 outline-none w-full text-base rounded-l' placeholder='Search for anime, manga, characters and users...'/>
                    <button className='px-2 bg-white outline-none flex items-center rounded-r'><i className="material-symbols-outlined">search</i></button>
                </div> */}
                <div className='flex flex-row gap-x-5 font-semibold'>
                    <span className=''></span>
                </div>
                <UserHeadLinks />
            </nav>
        </header>
    )
}
