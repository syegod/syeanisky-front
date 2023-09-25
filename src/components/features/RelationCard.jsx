import React from 'react'

export default function RelationCard({obj, relation}) {
  return (
    <div className='w-[20%] text-black rounded overflow-hidden relative flex flex-col gap-y-5'>
      <span className='underline cursor-pointer'>{obj.name}</span>
      <span>{obj.type}</span>
      <span>{relation}</span>
    </div>
  )
}
