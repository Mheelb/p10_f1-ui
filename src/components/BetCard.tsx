'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { getCode } from 'country-list';
import Flag from 'react-world-flags'
import Timer from '@/components/common/Timer';
import { faker } from '@faker-js/faker';

const BetCard: FC = () => {

    //faker
    function generateNextRace() {
        return {
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
        };
      }

    const hasBet = false;

    const [bet, setBet] = useState(getBet());
    const [nextRace, setNextRace] = useState(generateNextRace());

    const countryName = nextRace.competition.country;
    const countryCode = getCode(nextRace.competition.country);
    const grandPrixName = nextRace.competition.name;
    const circuitImage = "https://media.api-sports.io/formula-1/circuits/29.png";
    const date = new Date(nextRace.date);

    function getBet() {
        if (hasBet)
            return 'Hamilton';
        else
            return '';
    };

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
            {hasBet ? (
                <div >
                    <h2>your bet :</h2>
                    <h1 className='mb-2'>{bet}</h1>
                    <Button onClick={() => console.log('clicked')} color="secondary">Change</Button>
                </div>
                ) : <Button onClick={() => console.log('clicked')}>Bet</Button>}
        </div>
    )
}

export default BetCard;