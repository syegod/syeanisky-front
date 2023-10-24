import React, { useContext, useState } from 'react'
import { AuthContext } from '../context'
import { Link } from 'react-router-dom';

const Forum = () => {
    const { isAuth } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    return (
        <div className='container md:px-20 lg:px-44 xl:px-72 sm:mx-auto'>
            <div className='border-x min-h-screen flex flex-col gap-y-2'>
                <span className='w-full bg-zinc-200 border-l-4 border-zinc-400 text-xl p-2 font-semibold'>
                    News & Discussions
                </span>
                {isAuth &&
                    <Link to={'/forum/addnew'} className='text-center bg-blue-500 rounded text-white text-xl font-bold p-2 shadow-md hover:shadow m-2'>Add new topic</Link>
                }
                {hasNextPage &&
                    <div className='flex flex-row gap-x-2 justify-end'>
                        <span>Page: <span className='font-medium'>{page}</span></span>
                        <div className='flex flex-row border rounded divide-x w-max '>
                            <button class="material-symbols-outlined px-2 font-bold disabled:text-zinc-500" disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>
                                arrow_back
                            </button>
                            <button class="material-symbols-outlined px-2 font-bold disabled:text-zinc-500" disabled={page >= 10} onClick={() => setPage(prev => prev + 1)}>
                                arrow_forward
                            </button>
                        </div>
                    </div>}
                <table class="table-fixed w-full font-normal text-xs">
                    <thead className='border-y'>
                        <tr className='divide-x'>
                            <th className='w-[80%] p-2'>Topic</th>
                            <th className='w-[10ch]'>Replies</th>
                            <th className=''>Last Post</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='divide-x border-b'>
                            <td className='p-2 flex flex-col gap-y-1'>
                                <Link className='text-blue-700 hover:underline'>New 'Isekai de Cheat Skill wo Te ni Shita Ore wa, Genjitsu Sekai wo mo Musou Suru' Anime Project in Progress</Link>
                                <div className='flex flex-row gap-x-1 items-center text-zinc-500 '>
                                    <Link className='font-bold hover:underline w-max'>syegod</Link>
                                    <span>-</span>
                                    <span className=''>23.01.2023</span>
                                </div>
                            </td>
                            <td className='text-center'>5</td>
                            <td className='truncate text-center'>
                                <Link className='text-blue-700 hover:underline'>
                                    FONZACUS
                                </Link>
                                <br />
                                <span>23 minutes ago</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {hasNextPage &&
                <div className='flex flex-col mt-3 gap-y-1 items-center'>
                    <span>Page: <span className='font-medium'>{page}</span></span>
                    <div className='flex flex-row border rounded divide-x w-max '>
                        <button class="material-symbols-outlined px-2 font-bold disabled:text-zinc-500" disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>
                            arrow_back
                        </button>
                        <button class="material-symbols-outlined px-2 font-bold disabled:text-zinc-500" disabled={page >= 10} onClick={() => setPage(prev => prev + 1)}>
                            arrow_forward
                        </button>
                    </div>
                </div>}
        </div>
    )
}

export default Forum