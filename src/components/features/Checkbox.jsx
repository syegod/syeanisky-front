import React, { useState } from 'react'

export default function Checkbox({label, checked}) {
    const [state, setState] = useState(null);

    const changeState = () => {
        if (state === 'enabled') return setState('disabled');
        if (state === 'disabled') return setState(null);
        if (state === null) return setState('enabled');
    }

    return (
        <div className='flex flex-row gap-x-3 items-center cursor-pointer select-none' onClick={() => changeState()}>
            <div className={`w-5 h-5 border-gray-300 ${!state && 'border'} rounded text-white`} id={label}>
                {state === 'enabled' &&
                    <div className='w-full h-full bg-green-400 flex justify-center items-center rounded'>
                        <span class="material-symbols-outlined text-xl">
                            done
                        </span>
                    </div>
                }
                {state === 'disabled' &&
                    <div className='w-full h-full bg-red-400 flex justify-center items-center rounded'>
                        <span class="material-symbols-outlined text-xl">
                            close
                        </span>
                    </div>
                }
            </div>
            <label htmlFor={label} className='cursor-pointerw-max text-sm'>{label}</label>
        </div>
    )
}
