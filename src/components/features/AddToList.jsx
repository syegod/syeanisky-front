import React, { useState } from 'react'

export default function AddToList() {
    const [open, setOpen] = useState(false);
    const [userlist, setInUserList] = useState();
    return (
        <div className='w-full relative text-start'>
            <button className={`${userlist ? `bg-green-400` : `bg-zinc-900`} text-white w-full rounded py-1 active:scale-[100.5%]`} onClick={() => setOpen(!open)}>{userlist ? userlist : 'Add to list'}</button>
            <div className={`flex flex-col w-full divide-y divide-zinc-200 bg-white rounded overflow-hidden ${open ? `` : `hidden`} origin-top duration-100 absolute border-zinc-400 border top-8`}>
                <button className='py-2 w-full' name='watching'>Watching</button>
                <button className='py-2 w-full' name='planned'>Planned</button>
                <button className='py-2 w-full' name='viewed'>Viewed</button>
                <button className='py-2 w-full' name='favorite'>Favorite</button>
                <button className='py-2 w-full' name='abandoned'>Abandoned</button>
            </div>
        </div>
    )
}
