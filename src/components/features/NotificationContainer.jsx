import React, { useState } from 'react'
import Notification from './Notification';

const NotificationContainer = () => {
    const [notifications, setNotifications] = useState([]);

    const closeNotification = (index) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((_, i) => i !== index)
        );
    };

    const addNotification = (message, type) => {
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { message, type },
        ]);
        console.log(notifications);
    };

    setTimeout(() => closeNotification(notifications.length-1), 5000);

    return (
        <div className='fixed flex flex-col gap-y-3 inset-0 items-center justify-end pb-[5vh] '>
            {
                notifications.map((e, i) => {
                    return <Notification key={i} message={e.message} type={e.type} onClose={() => closeNotification(i)} />
                })
            }
            {/* <button onClick={() => addNotification('Lox', 'error')}>Click</button> */}
        </div>
    )
}

export default NotificationContainer