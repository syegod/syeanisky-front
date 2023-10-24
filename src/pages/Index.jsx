import axios from 'axios';
import { useState, useEffect } from 'react'
import getDay from '../utils/getDay';
import { useContext } from 'react';
import { NotifContext } from '../components/features/NotificationContainer';
import Card from '../components/features/Card';

const Index = () => {
    // const [seasonOpened, setSeasonOpened] = useState(false);
    // const [scheduleOpened, setScheduleOpened] = useState(false);
    const [scheduleList, setScheduleList] = useState([]);
    const [seasonList, setSeasonList] = useState([]);
    const addNotification = useContext(NotifContext);
    const [loading, setLoading] = useState(true);

    async function getScheduleData() {
        try {
            setLoading(true);
            const response = await axios.get('https://api.jikan.moe/v4/schedules', {
                params: {
                    'filter': getDay(),
                }
            });
            if (response.status === 200) {
                var list = response.data.data;
                list = list.filter(e => e.score !== null).sort((a, b) => b.score - a.score)
                setScheduleList(list);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            setLoading(false);
        }
    }

    async function getSeasonData() {
        try {
            setLoading(true);
            const response = await axios.get('https://api.jikan.moe/v4/seasons/now', {
                params: {
                    'filter': 'tv',
                }
            });
            if (response.status === 200) {
                var list = response.data.data;
                list = list.filter(e => e.score !== null).sort((a, b) => b.score - a.score)
                setSeasonList(list);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            setLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(async () => {
            await getScheduleData();
            await getSeasonData();
        }, 1000);
    }, [])

    return (
        <div className='flex flex-col container xl:px-24 mx-auto mt-5 gap-y-10 items-center'>
            <div className='text-lg text-center'>
                <p className='text-2xl font-bold '>Syeanisky - Your Source for Tracking Anime Online</p>
                <br />
                <p>
                    For many years, Japanese animation, known as anime, has captured the hearts of fans worldwide. This unique genre is celebrated for its vibrant storytelling, original art style, and intense emotions.
                    We provide a wealth of information, resources, and a vibrant community for anime enthusiasts. From news, reviews, and recommendations to discussions and fan art, our platform serves as a hub for anime lovers. We share your passion for anime and strive to make our site as engaging and informative as possible.
                </p>
            </div>

            {(scheduleList.length > 0 && !loading) &&
                <div className='flex flex-col gap-y-2 w-full'>
                    <div className='w-full bg-zinc-200 border-l-4 border-zinc-400 py-1 px-3 text-xl font-bold rounded-r-md flex flex-row justify-between items-center'>
                        <span>Today's releases</span>
                        {/* <button class={`material-symbols-outlined ${scheduleOpened && 'rotate-90 duration-100'}`} onClick={() => setScheduleOpened(prev => !prev)}>
                            chevron_right
                        </button> */}
                    </div>
                    <div className='flex flex-wrap gap-x-3 w-full gap-y-3 justify-center'>
                        {scheduleList.map((e, i) => {
                            return <Card obj={e} key={i} />
                        })}
                    </div>
                </div>
            }
            {(seasonList.length > 0 && !loading) &&
                <div className='flex flex-col gap-y-2 w-full'>
                    <div className='w-full bg-zinc-200 border-l-4 border-zinc-400 py-1 px-3 text-xl font-bold rounded-r-md flex flex-row justify-between items-center'>
                        <span>Seasonal anime</span>
                        {/* <button class={`material-symbols-outlined ${seasonOpened && 'rotate-90 duration-100'}`} onClick={() => setSeasonOpened(prev => !prev)}>
                            chevron_right
                        </button> */}
                    </div>
                    <div className='flex flex-wrap gap-x-3 w-full gap-y-3 justify-center'>
                        {seasonList.map((e, i) => {
                            return <Card obj={e} key={i} />
                        })}
                    </div>
                </div>}

            {loading &&
                <span className="fixed material-symbols-outlined animate-spin text-4xl top-1/2 left-1/2">
                    progress_activity
                </span>}
        </div>
    )
}

export default Index