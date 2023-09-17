import React from 'react'

export default function Card({ obj }) {
    return (
        <div className='sm:w-[20%] xl:w-[19%] z-50 cursor-pointer'>
            <div className='w-full h-full relative drop-shadow-xl'>
                <div className='bg-gradient-to-t from-black via-transparent to-transparent opacity-70 absolute w-full h-full top-0 left-0 z-20 rounded'/>
                <img src={obj?.images?.jpg?.image_url} alt="anime_jpg" className='w-full h-full object-cover rounded' />
                <div className='absolute left-0 bottom-0 pb-1 px-1 pl-2 text-base z-30 text-white line-clamp-2 leading-5'>
                    {obj.title_english || obj.title}
                </div>
            </div>
        </div>
    )
}
