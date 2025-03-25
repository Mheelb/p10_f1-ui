'use client';

import { FC } from 'react';
import Button from '@/components/common/Button';

const BetCard: FC = () => {

    const fakeNextRace = {
        id: 1671,
        competition: {
            id: 2,
            name: "Bahrain Grand Prix",
            location: {
                country: "Bahrain",
                city: "Sakhir",
            }
        },
        circuit: {
            id: 2,
            name: "Bahrain International Circuit",
            image: "https://media.api-sports.io/formula-1/circuits/2.png",
        },
        season: 2023,
        type: "Race",
        laps: {
            current: null,
            total: 57,
        },
        fastest_lap: {
            driver: {
                id: 83,
            },
            time: "1:33.996",
        },
        distance: "308.5 Kms",
        timezone: "utc",
        date: "2023-03-05T15:00:00+00:00",
        weather: null,
        status: "Completed",
    }
    
    return (
        <div className='bet-card w-90 '>
            <Button onClick={() => console.log('clicked')}>Bet</Button>
        </div>
    )
}

export default BetCard;