'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { getCode } from 'country-list';
import Flag from 'react-world-flags';
import Timer from '@/components/common/Timer';
import { faker } from '@faker-js/faker';
import { useRouter } from 'next/navigation';

const BetCard: FC = () => {
    const hasBet = false;
    const [bet, setBet] = useState(getBet());
    const [nextRace, setNextRace] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        setNextRace({
            id: faker.number.int(),
            competition: {
                name: faker.lorem.words(3),
                country: faker.location.country(),
            },
            circuit: {
                name: faker.location.streetAddress(),
                image: faker.image.urlLoremFlickr({ category: 'sports' }),
            },
            date: faker.date.future().toISOString(),
        });
    }, []);

    function getBet() {
        return hasBet ? 'Hamilton' : '';
    }

    if (!nextRace) return null;

    const countryName = nextRace.competition.country;
    const countryCode = getCode(nextRace.competition.country);
    const grandPrixName = nextRace.competition.name;
    const circuitImage = "https://media.api-sports.io/formula-1/circuits/29.png";
    const date = new Date(nextRace.date);

    return (
        <div className='bet-card w-90'>
            <div className='grand-prix-info flex justify-between'>
                <div>
                    <div className='flex'>
                        <Flag code={countryCode} className="w-8 h-8 mr-2" />
                        <h1 id='country-name'>{countryName}</h1>
                    </div>
                    <p id='grand-prix-name'>{grandPrixName}</p>
                </div>
                <img id="circuit-image" src={circuitImage} alt="circuit" className='w-20 h-20' />
            </div>
            <Timer dateCircuit={date} />
            {hasBet ? (
                <div>
                    <h2>Your bet:</h2>
                    <h1 className='mb-2'>{bet}</h1>
                    <Button id="bet-button" onClick={() => router.push("/bet")} color="secondary">Change</Button>
                </div>
            ) : (
                <Button id="bet-button" onClick={() => router.push("/bet")}>Bet</Button>
            )}
        </div>
    );
};

export default BetCard;