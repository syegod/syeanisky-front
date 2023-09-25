import React from 'react'
import {Link} from 'react-router-dom'

export default function Card({ obj }) {
    return (
        <Link to={'/anime/'+obj?.mal_id} className='w-[32%] sm:w-[24%] lg:w-[23%] xl:w-[19%] z-50 cursor-pointer'>
            <div className='w-full h-full relative drop-shadow-xl'>
                <div className='bg-gradient-to-t from-black via-transparent to-transparent opacity-70 absolute w-full h-full top-0 left-0 z-20 rounded'/>
                <img src={obj?.images?.jpg?.large_image_url} alt="anime_jpg" className='w-full h-full object-cover rounded' />
                <div className='absolute left-0 bottom-0 pb-1 px-1 pl-2 text-base z-30 text-white  flex flex-col'>
                    <span>{obj?.type}</span>
                    <span className='line-clamp-2 leading-5'>{obj?.title_english || obj?.title}</span>
                </div>
            </div>
        </Link>
    )
}
