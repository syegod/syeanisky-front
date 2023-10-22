import axios from 'axios';
import { useState, useEffect } from 'react'
import getDay from '../utils/getDay';
import { useContext } from 'react';
import { NotifContext } from '../components/features/NotificationContainer';
import Card from '../components/features/Card';

const Index = () => {
    const [scheduleList, setScheduleList] = useState([]);
    const addNotification = useContext(NotifContext);
    const [loading, setLoading] = useState(true);

    async function getData() {
        try {
            setLoading(true);
            const response = await axios.get('https://api.jikan.moe/v4/schedules', {
                params: {
                    'filter': getDay(),
                    'kids': 'false'
                }
            });
            if (response.status === 200) {
                const list = response.data.data;
                list.sort((a, b) => a.rank - b.rank)
                setScheduleList(list);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            setLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(async () => await getData(), 1000);
    }, [])

    return (
        <div className='flex flex-col container xl:px-24 mx-auto mt-5'>
            <div className='flex flex-row gap-x-3'>
                {(scheduleList.length > 0 && !loading) && scheduleList.map((e, i) => {
                    return <Card obj={e} key={i}/>
                })}
            </div>
            {loading &&
                <span className="fixed material-symbols-outlined animate-spin text-4xl top-1/2 left-1/2">
                    progress_activity
                </span>}
        </div>
    )
}

export default Index