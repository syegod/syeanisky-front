import React, { useContext } from 'react'
import { Link, redirect } from 'react-router-dom';
import { AuthContext } from '../../context';

export default function UserHeadLinks() {
    const { isAuth, userData, state } = useContext(AuthContext);

    const handleLogout = () => {
        if (window.confirm('Are you sure?')) {
            localStorage.removeItem('token');
            return window.location = '/';
        }
    }

    if (isAuth || state === 'loading') {
        return (
            <div className=''>
                {state === 'loading' ? <button className="material-symbols-outlined text-3xl">
                    account_circle
                </button>
                    :
                    <div className='flex flex-row gap-x-5 md:gap-x-10 items-center font-bold'>
                        <Link to={'/profile'} className='hover:underline underline-offset-2 font-normal text-xl'>{userData?.username}</Link>
                        <button className="material-symbols-outlined text-2xl font-extrabold" onClick={() => handleLogout()}>
                            logout
                        </button>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div className='flex flex-row gap-x-5 text-zinc-900 font-semibold text-lg'>
                <Link to={'/login'} className='px-2 py-0.5 bg-white rounded'>Login</Link>
                <Link to={'/register'} className='px-2 py-0.5 bg-white rounded'>Register</Link>
            </div>
        )
    }

}
