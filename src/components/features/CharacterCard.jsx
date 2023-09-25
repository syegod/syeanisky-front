import React from 'react'

export default function CharacterCard({char}) {
  return (
    <div className='w-[20%] rounded cursor-pointer relative overflow-hidden shadow-xl'>
        <img src={char?.images?.jpg?.image_url} alt="" className='w-full h-full object-cover'/>
        <span className='absolute bottom-0 left-0 text-start text-white z-40 text-sm line-clamp-2 px-2 pb-1'>
            {char?.name}
        </span>
        <div className='absolute bg-gradient-to-t from-black via-transparent to-transparent z-30 left-0 top-0 w-full h-full opacity-60'/>
    </div>
  )
}
