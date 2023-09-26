import React, { useContext, useState } from 'react'
import { AuthContext } from '../context'
import { Link } from 'react-router-dom';

export default function Profile() {
    const { isAuth, userData } = useContext(AuthContext);
    const [sort, setSort] = useState('rated');


    if (!isAuth && !localStorage.getItem('token')) return window.location = '/';

    return (
        <div className='w-full min-h-[93vh] relative bg-zinc-200 py-[5%]'>
            <div className="w-1/3 h-full mx-auto flex rounded-md bg-white flex-col gap-y-5 py-5 shadow-lg items-center">
                <button className="material-symbols-outlined text-6xl">
                    account_circle
                </button>
                <div className='text-center flex flex-col gap-y-5'>
                    <span className='text-2xl font-semibold'>@{userData?.username}</span>
                </div>
                <hr className='w-full' />
                <div className='flex flex-col gap-y-6'>
                    <div className='flex flex-col'>
                        <span className='text-xl py-1 font-semibold px-2 bg-zinc-200'>Favorite</span>
                        <table className='table-fixed w-full text-sm border-collapse text-center '>
                            <thead className='border-b'>
                                <tr className=''>
                                    <th className={`font-medium cursor-pointer ${sort === 'title' && 'underline underline-offset-2'} py-2`} >
                                        <span onClick={() => setSort('title')}>Title</span>
                                    </th>
                                    <th className={`font-medium cursor-pointer ${sort === 'date' && 'underline underline-offset-2'} py-2`} >
                                        <span onClick={() => setSort('date')}>Date added</span>
                                    </th>
                                    <th className={`font-medium cursor-pointer ${sort === 'rated' && 'underline underline-offset-2'} py-2`} >
                                        <span onClick={() => setSort('rated')}>Rated</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='font-medium text-zinc-600'>
                                <tr className='border-b'>
                                    <td className='p-3'><Link>Naruto Shippuden</Link></td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>10</td>
                                </tr>
                                <tr className='border-b'>
                                    <td className='p-3'><Link>One Punch Man</Link></td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>9</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
