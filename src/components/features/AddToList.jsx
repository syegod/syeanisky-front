import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context';
import axios from '../../axios';
import { NotifContext } from './NotificationContainer';

export default function AddToList({ anime }) {
    const addNotification = useContext(NotifContext);
    const [open, setOpen] = useState(false);
    const { userData, isAuth } = useContext(AuthContext);
    const [userlist, setInUserList] = useState(null);

    useEffect(() => {
        try {
            if (userData?.list.some(e => e.anime?.mal_id === anime?.mal_id)) {
                setInUserList(userData?.list?.filter(e => e.anime?.mal_id === anime?.mal_id)[0].list);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userData])


    const handleAddToList = async (e) => {
        try {
            if (isAuth) {
                const list = e.target.name;
                const res = await axios.post('/add-to-list', { anime, list });
                addNotification( res.data.message, 'success')
                setTimeout(() => {
                    window.location = '/profile';
                }, 2000)
            }
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
        }
    }

    return (
        <div className='w-full relative text-start'>
            <button className={`${userlist ? `bg-green-400` : `bg-zinc-900`} text-white w-full rounded py-1 active:scale-[100.5%]`} onClick={() => setOpen(!open)}>{userlist ? userlist.charAt(0).toUpperCase() + userlist.slice(1) : 'Add to list'}</button>
            <div className={`flex flex-col w-full divide-y divide-zinc-200 bg-white rounded overflow-hidden ${open ? `` : `hidden`} origin-top duration-100 absolute border-zinc-400 border top-8`}>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='watching' onClick={e => handleAddToList(e)}>
                    Watching
                    {userlist === 'watching' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='planned' onClick={e => handleAddToList(e)}>
                    Planned
                    {userlist === 'planned' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='viewed' onClick={e => handleAddToList(e)}>
                    Viewed
                    {userlist === 'viewed' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='favorite' onClick={e => handleAddToList(e)}>
                    Favorite
                    {userlist === 'favorite' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='dropped' onClick={e => handleAddToList(e)}>
                    Dropped
                    {userlist === 'dropped' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='onhold' onClick={e => handleAddToList(e)}>
                    On hold
                    {userlist === 'onhold' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
            </div>
        </div>
    )
}
