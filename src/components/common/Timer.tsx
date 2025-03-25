"use client";

import { FC, useEffect, useState } from 'react';
import parse from 'html-react-parser';

interface TimerProps {
    dateCircuit: Date; //ISO 8601
}

const Timer: FC<TimerProps>= ({ dateCircuit }) => {

        const getTimeLeft = () => {
            const now = new Date();
            const diff = dateCircuit.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            return parse(`<h1>${days}</h1><p>d :&nbsp;</p><h1>${hours}</h1><p>h :&nbsp;</p><h1>${minutes}</h1><p>m</p>`);
        }
    
        const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    
        useEffect(() => {
            const timer = setInterval(() => {
                setTimeLeft(getTimeLeft());
            }, 1000);
    
            return () => clearInterval(timer);
        }, []);

    return (
        <div className='timer-box flex justify-between items-center'>
            <p>Time left to bet</p>
            <div className='flex items-center timer'>{timeLeft}</div>
        </div>
    );
};

export default Timer;