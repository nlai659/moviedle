import { useEffect, useState } from 'react';

const DailyCountDown = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDate = new Date();
            const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
            const timeLeft = nextDate.getTime() - currentDate.getTime();
            setTime(timeLeft);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return (
        <div>
            <p className="text-white">Time until next daily: {hours}h {minutes}m {seconds}s</p>
        </div>
    );
}

export default DailyCountDown;