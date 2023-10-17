import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context';
import axios from '../../axios';

export default function AddToList({ anime }) {
    const [open, setOpen] = useState(false);
    const { userData, isAuth } = useContext(AuthContext);
    const [userlist, setInUserList] = useState(null);

    useEffect(() => {
        try {
            const userlists = Object.entries(userData?.lists);
            for (var i of userlists) {
                console.log(i);
                if (i[1].some(e => e.anime.mal_id === anime.mal_id)) {
                    setInUserList(i[0]);
                    break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [userData])


    const handleAddToList = async (e) => {
        try {
            const list = e.target.name;
            await axios.post('/add-to-list', { anime, list });
            window.location = '/profile';
            return;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return (
        <div className='w-full relative text-start'>
            <button className={`${userlist ? `bg-green-400` : `bg-zinc-900`} text-white w-full rounded py-1 active:scale-[100.5%]`} onClick={() => setOpen(!open)}>{userlist ? userlist.charAt(0).toUpperCase() + userlist.slice(1) : 'Add to list'}</button>
            <div className={`flex flex-col w-full divide-y divide-zinc-200 bg-white rounded overflow-hidden ${open ? `` : `hidden`} origin-top duration-100 absolute border-zinc-400 border top-8`}>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='watching' disabled={userlist !== null} onClick={e => handleAddToList(e)}>
                    Watching
                    {userlist === 'watching' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='planned' disabled={userlist !== null} onClick={e => handleAddToList(e)}>
                    Planned
                    {userlist === 'planned' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='viewed' disabled={userlist !== null} onClick={e => handleAddToList(e)}>
                    Viewed
                    {userlist === 'viewed' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='favorite' disabled={userlist !== null} onClick={e => handleAddToList(e)}>
                    Favorite
                    {userlist === 'favorite' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
                <button className='py-2 w-full flex flex-row gap-x-2 items-center justify-center' name='abandoned' disabled={userlist !== null} onClick={e => handleAddToList(e)}>
                    Abandoned
                    {userlist === 'abandoned' && <span class="material-symbols-outlined">
                        done
                    </span>}
                </button>
            </div>
        </div>
    )
}
