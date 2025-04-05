'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { getCode } from 'country-list';
import Flag from 'react-world-flags'
import Timer from '@/components/common/Timer';
import { useAuth } from '@/context/AuthProvider';
import AuthPopup from '@/components/AuthPopup';
import { toast } from 'react-toastify';


const BetCard: FC = () => {

    const { isAuthenticated } = useAuth();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
    };

    const bettingHandler = () => {
        if (isAuthenticated) {
            console.log('Betting...');
        } else {
            toast.error("Please login to place a bet");
            togglePopup();
        }
    };

    const fakeNextRace = {
        id: 1676,
        competition: {
            id: 32,
            name: "Saudi Arabia Grand Prix",
            location: {
                country: "Saudi Arabia",
                city: "Djeddah",
            },
        },
        circuit: {
            id: 29,
            name: "Jeddah Corniche Circuit",
            image: "https://media.api-sports.io/formula-1/circuits/29.png",
        },
        season: 2023,
        type: "Race",
        laps: {
            current: null,
            total: 50,
        },
        fastest_lap: {
            driver: {
                id: 25,
            },
            time: "1:31.906"
        },
        distance: "308.8 Kms",
        timezone: "utc",
        date: "2025-03-29T08:00:00Z",
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
            <Button onClick={bettingHandler}>Bet</Button>
            <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup} />
        </div>
    )
}

export default BetCard;