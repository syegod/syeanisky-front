import React, { useState } from 'react'

const AddNewTopic = () => {
    const [form, setForm] = useState({
        title: '',

    });
    return (
        <div className='container md:px-20 lg:px-4 xl:px-80 sm:mx-auto'>
            <div className='w-full min-h-screen border-x flex flex-col gap-y-3 py-5 items-center'>
                <span className='text-3xl font-bold text-center'>
                    Create new topic
                </span>
                <hr className='w-full md:w-[80%]' />
                <div className='w-full flex flex-col gap-y-10 mt-5'>
                    <div className='w-full text-center'>
                        <input type="text" className='w-[80%] focus-within:ring-0 outline-none focus-within:border-0 border-0 border-b focus-within:border-b-2 text-xl' placeholder='Title...' />
                    </div>
                    <div className='w-full text-center'>
                        <input type="text" className='w-[80%] focus-within:ring-0 outline-none focus-within:border-0 border-0 border-b focus-within:border-b-2 text-xl' placeholder='Title...' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewTopic