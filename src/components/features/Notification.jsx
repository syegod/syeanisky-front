import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setMounted(true);
      clearTimeout(delay);
    }, 100);
  }, []);

  return (
    <div
      className={`bg-white flex flex-row gap-x-3 border-2 px-5 py-2 rounded-md items-center text-center ${type === 'error' ? 'border-red-500' : 'border-green-500'} ${
        mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      } transition-transform duration-300 ease-in-out `}
    >
      <span>{message}</span>
      <button className='material-symbols-outlined text-base' onClick={onClose}>close</button>
    </div>
  );
};

export default Notification;