import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import axios from '../../axios';

export default function AddToList({ anime }) {
    const [open, setOpen] = useState(false);
    const { userData, isAuth } = useContext(AuthContext);
    const [userlist, setInUserList] = useState();
    const handleAddToList = async (e) => {
        try {
            const list = e.target.name;
            await axios.post('/add-to-list', {anime, list});
            window.location = '/profile';
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return (
        <div className='w-full relative text-start'>
            <button className={`${userlist ? `bg-green-400` : `bg-zinc-900`} text-white w-full rounded py-1 active:scale-[100.5%]`} onClick={() => setOpen(!open)}>{userlist ? userlist : 'Add to list'}</button>
            <div className={`flex flex-col w-full divide-y divide-zinc-200 bg-white rounded overflow-hidden ${open ? `` : `hidden`} origin-top duration-100 absolute border-zinc-400 border top-8`}>
                <button className='py-2 w-full' name='watching' onClick={e => handleAddToList(e)}>Watching</button>
                <button className='py-2 w-full' name='planned' onClick={e => handleAddToList(e)}>Planned</button>
                <button className='py-2 w-full' name='viewed' onClick={e => handleAddToList(e)}>Viewed</button>
                <button className='py-2 w-full' name='favorite' onClick={e => handleAddToList(e)}>Favorite</button>
                <button className='py-2 w-full' name='abandoned' onClick={e => handleAddToList(e)}>Abandoned</button>
            </div>
        </div>
    )
}
