import React, { useState, createContext } from 'react'
import Notification from './Notification';

export const NotifContext = createContext();

const NotificationContainer = ({ children }) => {
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
    };

    setTimeout(() => closeNotification(notifications.length - 1), 5000);

    return (
        <NotifContext.Provider value={addNotification}>
            {children}
            <div className='fixed w-max h-max top-20 right-5 z-50'>
                {
                    notifications.map((e, i) => {
                        return <Notification key={i} message={e.message} type={e.type} onClose={() => closeNotification(i)} />
                    })
                }
            </div>
        </NotifContext.Provider>
    )
}

export default NotificationContainer