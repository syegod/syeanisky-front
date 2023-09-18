import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from 'axios';
import Filter from "./components/Filter";

function App() {
    const [pagination, setPagination] = useState(null);
    const [data, setData] = useState(null);
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        genres: [],
        themes: []
    });

    async function getData(q=null) {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/anime',
                {
                    params: {
                        'q': q,
                        'order_by': 'popularity',
                    }
                });
            setPagination(response?.data?.pagination);
            setData(response?.data?.data);
            return;
        } catch (err) {
            setError('Some error occured.');
            return;
        }
    }

    async function handleSearch(e){
        setTimeout(() => getData(e.target.value), 500);
    }

    async function addData(q=null) {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/anime',
                {
                    params: {
                        'q': q,
                        'order_by': 'popularity',
                        'page': pagination && pagination?.has_next_page ? pagination.current_page + 1 : 1
                    }
                });
            setPagination(response?.data?.pagination);
            const arr = [].concat(data).concat(response?.data?.data);
            setData(arr);
            return;
        } catch (err) {
            setError('Some error occured.');
            return;
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="lg:container lg:px-32 mx-auto my-5 ">
            <div className="relative flex flex-row gap-x-10 px-2">
                <div className="lg:w-[80%] flex flex-col gap-y-5 mx-auto ">
                    <div className='text-zinc-800 flex flex-row w-full divide-x divide-zinc-300 border rounded border-zinc-300'>
                        <input type="text" className='border-0 px-3 outline-none w-full text-base rounded-l' placeholder='Search for title...' onChange={(e) => handleSearch(e)}/>
                        <button className='px-2 bg-white outline-none flex items-center rounded-r'><i className="material-symbols-outlined">search</i></button>
                    </div>
                    <div className="flex flex-wrap w-full gap-x-1 lg:gap-x-2 gap-y-5 justify-between">
                        {data && !error &&
                            data.map((e, i) => {
                                return <Card obj={e} key={i} />
                            })}
                    </div>
                    <div className="w-full bg-zinc-200 text-center py-3 items-center flex flex-row justify-center group cursor-pointer select-none" onClick={e => addData()}>
                        <span className="">Load more</span>
                        <span className="material-symbols-outlined font-bold group-hover:animate-spin">
                            refresh
                        </span>
                    </div>
                </div>
                <Filter filter={filter} setFilter={setFilter} />
            </div>
        </div>
    );
}

export default App;
