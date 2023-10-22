import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from './features/Checkbox';
import axios from 'axios';
import {Slider} from '@mui/material'
import { useContext } from 'react';
import { NotifContext } from './features/NotificationContainer';

export default function Filter({ }) {
    const addNotification = useContext(NotifContext);
    const queryParams = new URLSearchParams(useLocation().search);
    const [allgenres, setAllGenres] = useState([]);
    const [filter, setFilter] = useState({
        genres: new Map(),
        score: [0, 10],
        format: '',
        status: '',
        year: [1970, 2030],
        your_lists: ''
    });
    const [opened, setOpened] = useState('main');

    function handleReset() {
        // console.log(filter);
        window.location = '/';
    }

    useEffect(() => {
        const genres_include = queryParams.get('genres_include')?.split(',') || [];
        const genres_exclude = queryParams.get('genres_exclude')?.split(',') || [];
        const format = queryParams.get('format') || '';
        const status = queryParams.get('status') || '';
        const min_score = queryParams.get('min_score') || 0;
        const max_score = queryParams.get('max_score') || 10;
        const year_from = queryParams.get('year_from') || filter.year[0];
        const year_to = queryParams.get('year_to') || filter.year[1];
        setFilter({ ...filter, format, status, year: [year_from, year_to], score: [min_score, max_score] });
        for (var i of genres_include) {
            filter.genres.set(Number(i), "include");
        }
        for (var i of genres_exclude) {
            filter.genres.set(Number(i), "exclude");
        }
        async function getGenres() {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/genres/anime');
                setAllGenres(response.data.data)
            } catch (err) {
                console.log(err);
                addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error');
            }
        }
        getGenres();
    }, [])

    function handleGenres(value, type) {
        const updatedGenres = filter.genres;
        if (type === "include") {
            if (updatedGenres.has(value)) {
                updatedGenres.delete(value);
            }
            updatedGenres.set(value, type);
            return setFilter({ ...filter, genres: updatedGenres });
        } else if (type === "exclude") {
            if (updatedGenres.has(value)) {
                updatedGenres.delete(value);
            }
            updatedGenres.set(value, type);
            return setFilter({ ...filter, genres: updatedGenres });
        } else {
            if (updatedGenres.has(value)) {
                updatedGenres.delete(value);
                return setFilter({ ...filter, genres: updatedGenres });
            }
        }
    }

    function handleRadios(e) {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    }

    function handleSlider(e) {
        setFilter({...filter, [e.target.name]: e.target.value});
    }

    function handleConfirm() {
        const genres_include = [];
        const genres_exclude = [];
        for (var i of filter.genres) {
            if (i[1] === "include") genres_include.push(i[0])
            else genres_exclude.push(i[0]);
        }
        const url = `/?genres_include=${genres_include.join(',')}&genres_exclude=${genres_exclude.join(',')}&format=${filter.format || ''}&status=${filter.status || ''}&min_score=${filter.score[0] || 0}&max_score=${filter.score[1] || 10}&year_from=${filter.year[0] || null}&year_to=${filter.year[1] || null}`
        // console.log(filter);
        // console.log(url);   
        window.location = url;
    }

    function changeOpened(e) {
        if (opened === 'main') return setOpened(e.target.id);
        if (opened === e.target.id) return setOpened('main');
    }

    return (
        <div className='relative hidden lg:block right-0 px-2 bg-white'>
            <div className="w-[300px] max-h-[80vh] overflow-x-hidden overflow-y-scroll pb-3 px-2">
                {opened === 'main' && <div className="flex flex-col gap-y-3 w-full">
                    <button className="w-full flex flex-row justify-between gap-x-2 py-1 px-1 hover:bg-zinc-300 rounded transition-all cursor-pointer" id='genres' onClick={(e) => changeOpened(e)}>
                        <span className='font-semibold' id='genres'>Genres</span>
                        <span className="material-symbols-outlined" id='genres'>chevron_right</span>
                    </button>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                        <span className='font-semibold'>Score</span>
                        <div className='flex flex-row gap-x-3 items-center justify-between'>
                            <Slider
                                value={filter.score}
                                onChange={e => handleSlider(e)}
                                valueLabelDisplay="auto"
                                max={10}
                                name='score'
                                disableSwap
                                sx={{color:'black', width: '90%'}}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-1">
                        <span className='font-semibold'>Year</span>
                        <div className='flex flex-row gap-x-3 items-center justify-between'>
                            <Slider
                                value={filter.year}
                                onChange={e => handleSlider(e)}
                                valueLabelDisplay="auto"
                                min={1970}
                                max={2030}
                                name='year'
                                disableSwap
                                sx={{color:'black', width: '90%'}}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Format</span>
                        <form className='grid grid-cols-2 items-center gap-y-2' onChange={e => handleRadios(e)}>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'tv'} id='format1' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'tv'}/>
                                <label htmlFor='format1'>TV series</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'movie'} id='format2' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'movie'} />
                                <label htmlFor='format2'>Movie</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'ova'} id='format3' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'ova'} />
                                <label htmlFor='format3'>OVA</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'special'} id='format4' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'special'} />
                                <label htmlFor='format4'>Special</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'ona'} id='format5' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'ona'} />
                                <label htmlFor='format5'>ONA</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='format' value={'music'} id='format6' className='outline-none focus:ring-0 text-zinc-900' checked={filter.format === 'music'} />
                                <label htmlFor='format6'>Music</label>
                            </div>
                        </form>
                    </div>
                    <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Status</span>
                        <form className='grid grid-cols-2 items-center gap-y-2' onChange={e => handleRadios(e)}>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='status' value={'complete'} id='status1' className='outline-none focus:ring-0 text-zinc-900' checked={filter.status === 'complete'} />
                                <label htmlFor='status1'>Complete</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='status' value={'airing'} id='status2' className='outline-none focus:ring-0 text-zinc-900' checked={filter.status === 'airing'} />
                                <label htmlFor='status2'>Airing</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='status' value={'upcoming'} id='status3' className='outline-none focus:ring-0 text-zinc-900' checked={filter.status === 'upcoming'} />
                                <label htmlFor='status3'>Upcoming</label>
                            </div>
                        </form>
                    </div>
                    {/* <div className="w-full flex flex-col py-1 px-1 gap-y-2">
                        <span className='font-semibold'>Your lists</span>
                        <form className='grid grid-cols-1 items-center gap-y-2' onChange={e => handleRadios(e)}>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='your_lists' value={'watching'} id='your_lists1' className='outline-none focus:ring-0 text-zinc-900' checked={filter.your_lists === 'watching'} />
                                <label htmlFor='your_lists1'>Watching</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='your_lists' value={'planned'} id='your_lists2' className='outline-none focus:ring-0 text-zinc-900' checked={filter.your_lists === 'planned'} />
                                <label htmlFor='your_lists2'>Planned</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='your_lists' value={'abandoned'} id='your_lists3' className='outline-none focus:ring-0 text-zinc-900' checked={filter.your_lists === 'abandoned'} />
                                <label htmlFor='your_lists3'>Abandoned</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='your_lists' value={'viewed'} id='your_lists4' className='outline-none focus:ring-0 text-zinc-900' checked={filter.your_lists === 'viewed'} />
                                <label htmlFor='your_lists4'>Viewed</label>
                            </div>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <input type='radio' name='your_lists' value={'favorite'} id='your_lists5' className='outline-none focus:ring-0 text-zinc-900' checked={filter.your_lists === 'favorite'} />
                                <label htmlFor='your_lists5'>Favorite</label>
                            </div>
                        </form>
                    </div> */}
                </div>}
                {
                    opened === 'genres' &&
                    <div className='flex flex-col gap-y-3'>
                        <button className="w-full flex flex-row justify-between gap-x-2 py-1 px-1 hover:bg-zinc-300 rounded transition-all cursor-pointer" id='genres' onClick={e => changeOpened(e)}>
                            <span className='font-semibold' id='genres'>Genres</span>
                            <span className="material-symbols-outlined" id='genres'>chevron_left</span>
                        </button>
                        {allgenres && allgenres.sort((a, b) => a.name.localeCompare(b.name)).map((e, i) => {
                            var selected = null
                            if (filter.genres.has(e.mal_id) && filter.genres.get(e.mal_id) === "include") selected = "enabled";
                            if (filter.genres.has(e.mal_id) && filter.genres.get(e.mal_id) === "exclude") selected = "disabled";
                            return <Checkbox label={e.name} value={e.mal_id} type={2} handleChange={handleGenres} selected={selected} key={i} />
                        })}
                    </div>
                }
            </div >
            <div className='flex flex-row gap-x-2 font-semibold bg-white py-2 px-2 overflow-hidden'>
                <button className='px-5 py-1 bg-zinc-300 w-1/2 rounded' onClick={e => handleReset(e)}>Reset</button>
                <button className='w-1/2 bg-zinc-900 text-white rounded' onClick={() => handleConfirm()}>Confirm</button>
            </div>
        </div >
    )
}
