import React, { useEffect, useState } from 'react'

export default function Checkbox({ label, value, type = 1, handleChange = null, selected = null }) {
    const [state, setState] = useState(null);

    useEffect(() => {
        setState(selected);
    }, [])

    const changeState = () => {
        if (state === 'enabled' && type === 2) {
            if(handleChange)handleChange(value, 'exclude');
            return setState('disabled');
        } else if (state === 'enabled' && type === 1) {
            if(handleChange)handleChange(value, 'disable');
            return setState(null);
        }
        if (state === 'disabled') {
            if(handleChange)handleChange(value, 'disable');
            return setState(null);
        }
        if (state === null) {
            if(handleChange)handleChange(value, 'include');
            return setState('enabled');
        }
    }

    return (
        <div className='flex flex-row gap-x-3 items-center cursor-pointer select-none' onClick={() => changeState()}>
            <div className={`w-5 h-5 border-gray-300 ${!state && 'border'} rounded text-white`} id={label}>
                {state === 'enabled' &&
                    <div className='w-full h-full bg-zinc-900 flex justify-center items-center rounded'>
                        <span className="material-symbols-outlined text-xl">
                            done
                        </span>
                    </div>
                }
                {state === 'disabled' && type === 2 &&
                    <div className='w-full h-full bg-red-400 flex justify-center items-center rounded'>
                        <span className="material-symbols-outlined text-xl">
                            close
                        </span>
                    </div>
                }
            </div>
            <label htmlFor={label} className='cursor-pointer w-max text-sm'>{label}</label>
        </div>
    )
}
