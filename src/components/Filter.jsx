import React, { useState } from 'react'

export default function Filter({ filter, setFilter }) {
    const [opened, setOpened] = useState(null);
    return (
        <div className="w-[300px] h-[90vh] relative right-0 z-50 overflow-x-hidden overflow-y-scroll px-2 py-1 hidden lg:block">
            <div className="flex flex-col gap-y-1 w-full">
                <div className="w-full flex flex-row justify-between gap-x-2 py-1 px-1 hover:bg-zinc-300 rounded transition-all cursor-pointer">
                    <span className='font-semibold'>Genres</span>
                    <span className="flex flex-row items-center">
                        <span className="text-xs line-clamp-1 max-w-[100%] text-zinc-400">
                            {
                                filter.genres ? filter.genres.join(', ') : 'Any'
                            }
                        </span>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </span>
                </div>
                <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                    <span className='font-semibold'>Score</span>
                    <div className='flex flex-row gap-x-3 items-center justify-between'>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...'/>
                        <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...'/>
                    </div>
                </div>
                <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                    <span className='font-semibold'>Episodes amount</span>
                    <div className='flex flex-row gap-x-3 items-center justify-between'>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...'/>
                        <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...'/>
                    </div>
                </div>
                <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                    <span className='font-semibold'>Year</span>
                    <div className='flex flex-row gap-x-3 items-center justify-between'>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='From...'/>
                        <span className='bg-zinc-500 h-[1px] w-[2.5ch]'></span>
                        <input type="number" className='border border-zinc-300 py-0.5 px-1 w-[40%] outline-none rounded' placeholder='To...'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
