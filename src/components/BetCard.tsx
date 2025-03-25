'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { getCode } from 'country-list';
import Flag from 'react-world-flags'
import Timer from '@/components/common/Timer';

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
        date: "2025-03-29T07:00:00Z",
        weather: null,
        status: "Completed",
    }

    const countryName = fakeNextRace.competition.location.country;
    const countryCode = getCode(fakeNextRace.competition.location.country);
    const grandPrixName = fakeNextRace.competition.name;
    const circuitImage = fakeNextRace.circuit.image;
    const date = new Date(fakeNextRace.date);
    
    return (
        <div className='bet-card w-90 '>
            <div className='grand-prix-info flex justify-between'>
                <div>
                    <div className='flex'>
                        <Flag code={countryCode} className="w-8 h-8 mr-2" />
                        <h1>{countryName}</h1>
                    </div>
                    <p>{grandPrixName}</p>
                </div>
                <img src={circuitImage} alt="circuit" className='w-20 h-20' />
            </div>
            <Timer dateCircuit={date} />
            <Button onClick={() => console.log('clicked')}>Bet</Button>
        </div>
    )
}

export default BetCard;