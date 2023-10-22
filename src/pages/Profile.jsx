import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context';
import { Link } from 'react-router-dom';
import axios from '../axios';
import {NotifContext} from '../components/features/NotificationContainer';

export default function Profile() {
    const addNotification = useContext(NotifContext);
    const { isAuth, userData } = useContext(AuthContext);
    const [slide, setSlide] = useState('watching');
    const [sort, setSort] = useState('rated');
    const [updatedList, setUpdatedList] = useState([]);

    useEffect(() => {
        setUpdatedList(userData?.list);
    }, [userData]);

    const handleSlide = async (e) => {
        setSlide(e.target.name);
    }

    const handleEpisodes = async (e) => {
        const max_eps = Number(e.target.dataset?.anime_episodes);
        console.log(max_eps);
        if (e.target.value < 0) {
            e.target.value = 0;
        }
        if (e.target.value > max_eps) {
            e.target.value = max_eps;
        }
    }

    let epsTimeout;
    const updateEpisodes = async (e) => {
        clearTimeout(epsTimeout);
        epsTimeout = setTimeout(async () => {
            try {
                const animeId = e.target.dataset?.anime;
                const episodes = e.target.value;
                if (episodes) {
                    const response = await axios.post('/change-episodes', { animeId, episodes });
                    console.log(response.data);
                }
            } catch (err) {
                console.log(err);
                addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            }
        }, 500);
    }

    const handleRating = async (e) => {
        if (e.target.value > 10) {
            e.target.value = 10;
        } else if (e.target.value < 0) {
            e.target.value = 1;
        }
    }

    let ratingTimeout;
    const updateRating = async (e) => {
        clearTimeout(ratingTimeout);
        ratingTimeout = setTimeout(async () => {
            try {
                const animeId = e.target.dataset?.anime;
                const rating = e.target.value;
                if (rating) {
                    const response = await axios.post('/change-rating', { animeId, rating });
                    console.log(response.data);
                }
            } catch (err) {
                console.log(err);
                addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            }
        }, 500);
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
                console.log(err);
                addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
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
                <div className='mt-5 flex flex-col gap-y-0 w-full'>
                    <div className='flex flex-row w-full justify-between px-5 border-b-2'>
                        <button className={`${slide === 'watching' && 'border-b-2 border-zinc-900'}`} name={'watching'} onClick={e => handleSlide(e)}>Watching</button>
                        <button className={`${slide === 'viewed' && 'border-b-2 border-zinc-900'}`} name={'viewed'} onClick={e => handleSlide(e)}>Viewed</button>
                        <button className={`${slide === 'favorite' && 'border-b-2 border-zinc-900'}`} name={'favorite'} onClick={e => handleSlide(e)}>Favorite</button>
                        <button className={`${slide === 'planned' && 'border-b-2 border-zinc-900'}`} name={'planned'} onClick={e => handleSlide(e)}>Plan to watch</button>
                        <button className={`${slide === 'dropped' && 'border-b-2 border-zinc-900'}`} name={'dropped'} onClick={e => handleSlide(e)}>Dropped</button>
                        <button className={`${slide === 'onhold' && 'border-b-2 border-zinc-900'}`} name={'onhold'} onClick={e => handleSlide(e)}>On hold</button>
                    </div>
                    {updatedList && updatedList.filter(e => e.list === slide).length > 0 ? (
                        <table className='table-fixed mt-5 text-center'>
                            <thead className='border-b'>
                                <tr className='font-thin text-center'>
                                    <th className='w-[50%] font-medium'>Title</th>
                                    <th className='font-medium'>Rating</th>
                                    <th className='font-medium'>Episodes</th>
                                    <th className='font-medium'>Date added</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {updatedList
                                    .filter(e => e.list === slide)
                                    .map(e => (
                                        <tr className='border-b even:bg-white odd:bg-slate-100' key={e.anime.mal_id}>
                                            <td className='w-[50%] py-2'>
                                                <Link className='line-clamp-2 hover:underline' to={'/anime/' + e.anime?.mal_id}>{e.anime?.title}</Link>
                                            </td>
                                            <td>
                                                <input type="number" defaultValue={e.rating} data-anime={e.anime.mal_id} className='w-[4ch] p-0 focus:ring-0 outline-none border-0 bg-transparent border-b text-center' onChange={e => { handleRating(e); updateRating(e) }} />
                                            </td>
                                            <td>
                                                <input type="number" defaultValue={e.episodes} data-anime_episodes={e.anime.episodes} data-anime={e.anime.mal_id} className='w-[4ch] p-0 focus:ring-0 outline-none border-0 bg-transparent border-b text-center' onChange={e => { handleEpisodes(e); updateEpisodes(e) }} />
                                            </td>
                                            <td>
                                                {new Date(e.date).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button className="material-symbols-outlined select-none" onClick={e => handleRemove(e)} data-anime={JSON.stringify(e.anime)} data-list={e.list}>
                                                    close
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>) : (
                        <div className='w-full pt-5 text-center'>
                            No data to display.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
