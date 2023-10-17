import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { Link } from 'react-router-dom';
import axios from '../axios';

export default function Profile() {
    const { isAuth, userData } = useContext(AuthContext);
    const [sort, setSort] = useState('rated');
    if (userData) {
        console.log(Object.entries(userData?.lists));
    }

    const handleRating = async (e) => {
        if(e.target.value > 10){
            e.target.value = 10;
        } else if(e.target.value < 0){
            e.target.value = 1;
        }
        if(e.target.value && e.target.value.length < 3 && e.target.value > 0){
            try {
                const anime = JSON.parse(e.target.dataset?.anime);
                const list = e.target.dataset?.list;
                const rating = e.target.value;
                const response = await axios.post('/change-rating', {anime, list, rating});
                if(response.status === 202){
                    console.log(response.data);
                }
            } catch (err) {
                return console.log(err);
            }
        }
    }

    const handleRemove = async (e) => {
        const anime = JSON.parse(e.target.dataset?.anime);
        const list = e.target.dataset?.list;
        if (window.confirm('Are you sure?')) {
            try {
                const response = await axios.post('/remove-from-list', { anime, list });
                if (response.status === 202) {
                    window.location.reload();
                }
                return;
            } catch (err) {
                alert(err.message);
                return;
            }
        }
    }

    if (!isAuth && !localStorage.getItem('token')) return window.location = '/';

    return (
        <div className='w-full min-h-[93vh] relative bg-zinc-200 py-[5%]'>
            <div className="w-[50%] h-full mx-auto flex rounded-md bg-white flex-col gap-y-5 py-5 shadow-lg items-center">
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
                            <span className='text-xl py-1 font-semibold px-2 bg-zinc-200'>{e[0].split('').splice(0, 1)[0].toUpperCase() + e[0].split('').splice(1, e[0].length - 1).join('')}</span>
                            <table className='table-fixed w-full text-sm border-collapse text-center font-medium'>
                                <thead className='border-b'>
                                    <tr className=''>
                                        <th className='w-[5%]'></th>
                                        <th className={`cursor-pointer ${sort === 'title' && 'underline underline-offset-2'} py-2`} onClick={() => setSort('title')}>
                                            <span>Title</span>
                                        </th>
                                        <th className={`cursor-pointer ${sort === 'date' && 'underline underline-offset-2'} py-2 w-2/12`} onClick={() => setSort('date')}>
                                            <span>Date added</span>
                                        </th>
                                        {/* <th className={`cursor-pointer ${sort === 'date' && 'underline underline-offset-2'} py-2 w-1/12`} onClick={() => setSort('episodes')}>
                                            <span>Episodes</span>
                                        </th> */}
                                        <th className={`cursor-pointer ${sort === 'rated' && 'underline underline-offset-2'} py-2 w-1/12`} onClick={() => setSort('rated')}>
                                            <span>Rated</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='text-zinc-600 relative py-3'>
                                    {e[1].length > 0 ? e[1].map((i, index) => (
                                        <tr className='border-b'>
                                            <td><button className="material-symbols-outlined select-none" data-anime={JSON.stringify(i.anime)} data-list={e[0]} onClick={e => handleRemove(e)}>close</button></td>
                                            <td className='p-3'>
                                                <Link className='hover:underline underline-offset-2' to={'/anime/' + i.anime?.mal_id}>{i.anime?.title_english}</Link>
                                            </td>
                                            <td>{new Date(i.date).toLocaleDateString()}</td>
                                            {/* <td className='flex flex-row items-center justify-center'>
                                                <button className='text-lg'>-</button>
                                                <input type="number" className='w-[4ch] outline-none text-center' maxLength={4} defaultValue={i.episodes_watched}/>
                                                <button className='text-lg'>+</button>
                                            </td> */}
                                            <td>
                                                <input type="number" defaultValue={i.rated || '0'} data-list={e[0]} data-anime={JSON.stringify(i.anime)} onChange={e => handleRating(e)} className='outline-none border-0 p-0 border-b focus:ring-0 w-[2ch] text-center text-zinc-900 appearance-none'/>
                                            </td>
                                        </tr>
                                    ))
                                        :
                                        <div className='w-full absolute'>
                                            No items found.
                                        </div>
                                    }
                                </tbody>
                            </table>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
