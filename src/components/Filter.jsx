import React, { useEffect, useState } from 'react'
import Checkbox from './features/Checkbox';
import axios from 'axios';

export default function Filter({ filter, setFilter }) {
    const [allgenres, setAllGenres] = useState([]);
    const [queryParams, setQueryParams] = useState([]);
    const [opened, setOpened] = useState('main');

    useEffect(() => {
        async function getGenres() {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
                setAllGenres(response.data.data)
            } catch (err) {
                console.log(err);
            }
        }
        getGenres();
    }, [])

    function changeOpened(e) {
        console.log(filter);
        if (opened === 'main') return setOpened(e.target.id);
        if (opened === e.target.id) return setOpened('main');
    }

    return (
        <div className='relative hidden lg:block right-0 px-2 bg-white'>
            <div className="w-[300px] h-[85vh] overflow-x-hidden overflow-y-scroll pb-3 px-2">
                {opened === 'main' && <div className="flex flex-col gap-y-3 w-full">
                    <button className="w-full flex flex-row justify-between gap-x-2 py-1 px-1 hover:bg-zinc-300 rounded transition-all cursor-pointer" id='genres' onClick={(e) => changeOpened(e)}>
                        <span className='font-semibold' id='genres'>Genres</span>
                        <span className="material-symbols-outlined" id='genres'>chevron_right</span>
                    </button>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                        <span className='font-semibold'>Score</span>
                        <div className='flex flex-row gap-x-3 items-center justify-between'>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...' />
                            <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...' />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                        <span className='font-semibold'>Episodes amount</span>
                        <div className='flex flex-row gap-x-3 items-center justify-between'>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...' />
                            <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...' />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                        <span className='font-semibold'>Year</span>
                        <div className='flex flex-row gap-x-3 items-center justify-between'>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...' />
                            <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                            <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...' />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Audience rating</span>
                        <div className='grid grid-cols-2 items-center gap-y-2'>
                            <Checkbox label={'G'} />
                            <Checkbox label={'PG'} />
                            <Checkbox label={'PG-13'} />
                            <Checkbox label={'R-17'} />
                            <Checkbox label={'R+'} />
                            <Checkbox label={'Rx'} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Format</span>
                        <div className='grid grid-cols-2 items-center gap-y-2'>
                            <Checkbox label={'TV serial'} />
                            <Checkbox label={'Movie'} />
                            <Checkbox label={'OVA'} />
                            <Checkbox label={'Special'} />
                            <Checkbox label={'ONA'} />
                            <Checkbox label={'Music'} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Status</span>
                        <div className='grid grid-cols-2 items-center gap-y-2'>
                            <Checkbox label={'Airing'} />
                            <Checkbox label={'Complete'} />
                            <Checkbox label={'Upcoming'} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Your lists</span>
                        <div className='grid grid-cols-1 items-center gap-y-2'>
                            <Checkbox label={'Watching'} />
                            <Checkbox label={'Planned'} />
                            <Checkbox label={'Abandoned'} />
                            <Checkbox label={'Viewed'} />
                            <Checkbox label={'Favorite'} />
                        </div>
                    </div>
                </div>}
                {opened === 'genres' &&
                    <div className='flex flex-col gap-y-3'>
                        <button className="w-full flex flex-row justify-between gap-x-2 py-1 px-1 hover:bg-zinc-300 rounded transition-all cursor-pointer" id='genres' onClick={e => changeOpened(e)}>
                            <span className='font-semibold' id='genres'>Genres</span>
                            <span className="material-symbols-outlined" id='genres'>chevron_left</span>
                        </button>
                        {allgenres && allgenres.sort((a, b) => a.name.localeCompare(b.name)).map(e => <Checkbox label={e.name} value={e.mal_id} type={2} />)}
                    </div>
                }
            </div>
            <div className='flex flex-row gap-x-2 font-semibold bg-white py-2 px-2 overflow-hidden'>
                <button className='px-5 py-1 bg-zinc-300 w-1/2 rounded'>Reset</button>
                <button className='w-1/2 bg-zinc-900 text-white rounded'>Confirm</button>
            </div>
        </div>
    )
}
