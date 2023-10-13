import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { Link, json } from 'react-router-dom';
import axios from '../axios';

export default function Profile() {
    const { isAuth, userData } = useContext(AuthContext);
    const [sort, setSort] = useState('rated');
    if (userData) {
        console.log(Object.entries(userData?.lists));
    }

    const handleRemove = async (e) => {
        const anime = JSON.parse(e.target.dataset?.anime);
        const list = e.target.dataset?.list;
        if(window.confirm('Are you sure?')){
            try {
                const response = await axios.post('/remove-from-list', {anime, list});
                if(response.status === 202){
                    window.location.reload();
                }
                return; 
            } catch (err) {
                alert(err);
                return;
            }
        }
    }

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
                    {userData && Object.entries(userData?.lists).map(e =>
                        <div className='flex flex-col'>
                            {console.log(e)}
                            <span className='text-xl py-1 font-semibold px-2 bg-zinc-200'>{e[0].split('').splice(0, 1)[0].toUpperCase() + e[0].split('').splice(1, e[0].length - 1).join('')}</span>
                            <table className='table-fixed w-full text-sm border-collapse text-center font-medium'>
                                <thead className='border-b'>
                                    <tr className=''>
                                        <th className={` cursor-pointer ${sort === 'title' && 'underline underline-offset-2'} py-2 w-2/4`} onClick={() => setSort('title')}>
                                            <span>Title</span>
                                        </th>
                                        <th className={`cursor-pointer ${sort === 'date' && 'underline underline-offset-2'} py-2`} onClick={() => setSort('date')}>
                                            <span>Date added</span>
                                        </th>
                                        {/* <th className={`font-medium cursor-pointer ${sort === 'rated' && 'underline underline-offset-2'} py-2`} onClick={() => setSort('rated')}>
                                            <span>Rated</span>
                                        </th> */}
                                        <th className={`cursor-pointer ${sort === 'rated' && 'underline underline-offset-2'} py-2 w-1/12`} onClick={() => setSort('rated')}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-zinc-600 relative'>
                                    {e[1].length > 0 ? e[1].map((i, index) => (
                                        <tr className='border-b'>
                                            <td className='p-3'>
                                                <Link className='hover:underline underline-offset-2' to={'/anime/'+i.anime?.mal_id}>{i.anime?.title_english}</Link>
                                            </td>
                                            <td>{new Date(i.date).toLocaleDateString()}</td>
                                            {/* <td>{i.rated}</td> */}
                                            <td><button className="material-symbols-outlined select-none" data-anime={JSON.stringify(i.anime)} data-list={e[0]} onClick={e => handleRemove(e)}>delete</button></td>
                                        </tr>
                                    ))
                                        :
                                        <tr className='absolute w-full'>
                                            No items found.
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
