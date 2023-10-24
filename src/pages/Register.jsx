import React, { useContext, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { AuthContext } from '../context';
import {NotifContext} from '../components/features/NotificationContainer';
import axios from '../axios';

export default function Register() {
    const addNotification = useContext(NotifContext)
    const [form, setForm] = useState({
        username: '', password: ''
    });
    const {isAuth} = useContext(AuthContext);


    const handleChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', form);
            if('token' in res.data){
                localStorage.setItem('token', res.data.token);
                return window.location = '/';
            }
        } catch (err) {
            console.log(err);
            addNotification(err.response.data.message || 'An error occurred. Try again. ', 'error')
        }
    }

    if (isAuth && localStorage.getItem('token')) return window.location = '/';


    return (
        <div className='w-full'>
            <form className='w-1/3 mx-auto text-center flex flex-col items-center my-10 text-zinc-900 gap-y-7 text-lg font-medium' onChange={e => handleChange(e)} onSubmit={e => handleSubmit(e)}>
                <span className='text-3xl font-medium'>
                    REGISTER
                </span>
                <hr className='w-full'/>
                <div className='flex flex-col gap-y-2 w-full items-center'>
                    <span className=''>Username:</span>
                    <input type="text" name="username" id="" className='border bg-white border-zinc-300 rounded py-2 px-4 font-normal w-full md:w-1/2' value={form.username} required minLength={4}/>
                </div>
                <div className='flex flex-col gap-y-2 w-full items-center'>
                    <span className=''>Password:</span>
                    <input type="password" name="password" id="" className='border bg-white border-zinc-300 rounded py-2 px-4 font-normal w-full md:w-1/2' value={form.password} required minLength={6}/>
                </div>
                <div className='flex flex-col gap-y-5 w-full items-center mt-5'>
                    <button className='bg-black px-2 py-1 text-white rounded w-1/2 md:w-1/3' type='submit'>Submit</button>
                    <Link to={'/login'} className='underline'>Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}
