import { useEffect, useState } from "react";
import Card from "../components/features/Card";
import axios from 'axios';
import Filter from "../components/Filter";
import { useLocation } from "react-router";
import { useContext } from "react";
import { NotifContext } from "../components/features/NotificationContainer";
import getDay from "../utils/getDay";


export default function Main() {
    const addNotification = useContext(NotifContext);
    const [pagination, setPagination] = useState(null);
    const queryParams = new URLSearchParams(useLocation().search);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getData(q = null, asNew = false) {
        try {
            var nextPage;
            if (pagination && pagination?.has_next_page) nextPage = pagination.current_page + 1;
            else if (pagination && !pagination?.has_next_page) nextPage = nextPage;
            else nextPage = 1;
            const response = await axios.get('https://api.jikan.moe/v4/anime',
                {
                    params: {
                        'q': q,
                        'order_by': 'score',
                        'genres': queryParams.get('genres_include') || null,
                        'genres_exclude': queryParams.get('genres_exclude') || null,
                        'min_score': queryParams.get('min_score') || 0,
                        'max_score': queryParams.get('max_score') || 10,
                        'start_date': queryParams.get('year_from') ? queryParams.get('year_from') + '-01-01' : null,
                        // 'end_date': queryParams.get('year_to') ? queryParams.get('year_to') + '-01-01' : null,
                        'type': queryParams.get('format') || null,
                        'status': queryParams.get('status') || null,
                        'sort': 'desc',
                        'page': asNew ? 1 : nextPage
                    }
                });
            setPagination(response?.data?.pagination);
            !asNew ? setData(prev => [...prev, ...response?.data?.data]) : setData(response?.data?.data);
            return;
        } catch (err) {
            setError('Some error occured.');
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
        }
    }

    let searchTimeout;
    async function handleSearch(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            getData(e.target.value, true);
        }, 500);
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(async () => await getData(query), 500);
        setLoading(false);
    }, [])


    return (
        <div className="lg:container xl:px-32 mx-auto my-5 ">
            <div className="relative flex flex-row gap-x-10 px-2">
                <div className="lg:w-[80%] flex flex-col gap-y-5 mx-auto ">
                    <div className='text-zinc-800 flex flex-row w-full divide-x divide-zinc-300 border rounded border-zinc-300'>
                        <input type="text" className='border-0 px-3 outline-none w-full text-base rounded-l' placeholder='Search for title...' onChange={(e) => handleSearch(e)} />
                    </div>
                    <div className="flex flex-wrap w-full gap-x-1 lg:gap-x-2 gap-y-5 justify-start">
                        {data.length < 1 && loading &&
                            <div className="text-zinc-600 w-full mt-10 text-2xl text-center">
                                Nothing found
                            </div>
                        }
                        {data.length > 0 && !loading ?
                            data.map((e, i) => {
                                return <Card obj={e} key={i} />
                            })
                            :
                            <span className="material-symbols-outlined animate-spin text-4xl mx-auto mt-[10%]">
                                progress_activity
                            </span>
                        }
                    </div>
                    {pagination && !loading && pagination?.has_next_page &&
                        <div className="w-full bg-zinc-200 text-center py-3 items-center flex flex-row justify-center group cursor-pointer select-none" onClick={e => getData(query)}>
                            <span className="">Load more</span>
                            <span className="material-symbols-outlined font-bold group-hover:animate-spin">
                                refresh
                            </span>
                        </div>}
                </div>
                <Filter />
            </div>
        </div>
    )
}
