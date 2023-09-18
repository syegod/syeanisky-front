import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from 'axios';
import Filter from "./components/Filter";

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        genres: ['action', 'fantasy', 'romantic', 'isekai', 'aboba'],
        themes: ['isekai', 'military']
    });

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/anime',
                    {
                        params: {
                            'q': '',
                            'type': 'tv',
                            'order_by': 'popularity',
                            'limit': 25
                        }
                    });
                setData(response?.data?.data);
                return;
            } catch (err) {
                setError('Some error occured.');
                return;
            }
        }
        getData();
    }, [])

    return (
        <div className="lg:container lg:px-32 mx-auto my-5 ">
            <div className="relative flex flex-row gap-x-10 px-2">
                <div className="lg:w-[80%] flex flex-col gap-y-5 mx-auto ">
                    <div className='text-zinc-800 flex flex-row w-full divide-x divide-zinc-300 border rounded border-zinc-300'>
                        <input type="text" className='border-0 px-3 outline-none w-full text-base rounded-l' placeholder='Search for anime, manga, characters and users...' />
                        <button className='px-2 bg-white outline-none flex items-center rounded-r'><i className="material-symbols-outlined">search</i></button>
                    </div>
                    <div className="flex flex-wrap w-full gap-x-1 lg:gap-x-2 gap-y-5 justify-between">
                        {data && !error &&
                            data.map((e, i) => {
                                return <Card obj={e} key={i} />
                            })}
                    </div>
                </div>
                <Filter filter={filter} setFilter={setFilter} />
            </div>
        </div>
    );
}

export default App;
