import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CharacterCard from '../components/features/CharacterCard';
import RelationCard from '../components/features/RelationCard';
import AddToList from '../components/features/AddToList';

export default function Anime() {
    const { id } = useParams()
    const [anime, setAnime] = useState();
    const [anime_characters, setAnimeCharacters] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                const responseChars = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
                setAnimeCharacters(responseChars.data?.data);
                setAnime(response?.data.data);
                return;
            } catch (err) {
                return console.log(err);
            }
        }
        setLoading(true);
        setTimeout(() => getData(), 500);
        setLoading(false);
    }, [])
    return (
        <div className='bg-zinc-200 w-full min-h-[100vh]'>
            <div className='xl:w-1/2 mx-auto py-10 h-full relative'>
                {anime && !loading ?
                    <div className='flex flex-row gap-x-5'>
                        <div className='lg:w-[35%] h-full flex flex-col gap-y-5'>
                            <div className='w-full'>
                                <img src={anime.images?.jpg?.large_image_url} alt="" className='w-full h-full object-cover rounded' />
                            </div>
                            {/* <button className='px-3 py-1 bg-green-600 text-white rounded' disabled>
                                Log in to add this anime to your lists
                            </button> */}
                            <AddToList />
                            <div className='bg-white py-3 px-2 flex flex-col gap-y-2 rounded-md w-full'>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Type</span>
                                    <span>{anime?.type}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Episode duration</span>
                                    <span>{anime?.duration}{anime?.duration?.endsWith("ep") && 'isode'}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Airing</span>
                                    <span>{anime?.aired?.string}</span>
                                </div>
                                {anime?.airing && <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Broadcast</span>
                                    <span>{anime?.broadcast?.string}</span>
                                </div>}
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Episodes</span>
                                    <span>{anime?.episodes}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Status</span>
                                    <span>{anime?.status}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Source</span>
                                    <span>{anime?.source}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Rating</span>
                                    <span>{anime?.rating}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-zinc-400'>Studios</span>
                                    <div className='flex flex-col gap-y-1'>
                                        {anime?.studios && anime?.studios.length > 0 &&
                                            anime.studios.map(e => <a className='underline' href={e.url} target='_blank'>{e.name}</a>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-full h-full rounded flex flex-col gap-y-5'>
                            <div className='flex flex-row justify-between bg-white p-2'>
                                <div className='flex flex-col'>
                                    <span className='text-2xl font-semibold'>{anime?.title_english}</span>
                                    <span className='text-zinc-400'>{anime?.title}</span>
                                </div>
                                <div className='flex flex-col text-end'>
                                    <span className='text-2xl font-bold'>{anime?.score}</span>
                                    <span className='text-lg'>Rank: <span className='font-semibold'>{anime?.popularity}</span></span>
                                </div>
                            </div>
                            <div className='flex flex-col bg-white p-3 rounded gap-y-5'>
                                <span dangerouslySetInnerHTML={{ __html: anime.synopsis?.replace(/\n/g, "<br>").replace("<br><br>[Written by MAL Rewrite]", '') }}></span>
                                <div className='flex flex-wrap gap-x-3 gap-y-2'>
                                    {anime.genres?.length > 0 && anime.genres.map(e => <span className='border px-2 rounded-sm cursor-pointer text-zinc-500'>{e?.name}</span>)}
                                    {anime.themes?.length > 0 && anime.themes.map(e => <span className='border px-2 rounded-sm cursor-pointer text-zinc-500'>{e?.name}</span>)}
                                </div>
                                <div className='flex flex-wrap gap-x-[5%] gap-y-5'>
                                    {anime_characters?.length > 0 && anime_characters.map(e => e.role === "Main" && <CharacterCard char={e.character} />)}
                                </div>
                            </div>

                            {/* {anime.relations && anime?.relations?.length > 0 &&
                                <div className='flex flex-col gap-y-3 p-2 bg-white'>
                                    <span className='w-full text-start text-lg font-semibold'>Relations</span>
                                    <div className='flex flex-row gap-x-5'>
                                        {anime.relations?.map(e => <RelationCard relation={e.relation} obj={e.entry[0]} />)}
                                    </div>
                                </div>
                            } */}
                        </div>
                    </div>
                    :
                    <span className="material-symbols-outlined animate-spin absolute top-1/3 left-1/2 mt-[10%] text-4xl">
                        progress_activity
                    </span>
                }
            </div>
        </div>
    )
}
