"use client";

import { FC, useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import Chip from '@/components/common/Chip';
import { GP } from '@/types/GP';

interface RaceCardProps {
  race: GP;
  type: 'past' | 'upcoming';
  page: 'league' | 'races';
}

const RaceCard: FC<RaceCardProps> = ({ race, type, page }) => {
  const [day, setDay] = useState<string | null>(null);
  const [month, setMonth] = useState<string | null>(null);

  useEffect(() => {
    const dateObj = new Date(race.dateTime);
    setDay(dateObj.toLocaleDateString('en-GB', { day: '2-digit' }));
    setMonth(dateObj.toLocaleDateString('en-GB', { month: 'short' }));
  }, [race.dateTime]);

  if (!day || !month) return null;

  return (
    <div className={`${page === 'league' ? 'w-80 league-race' : 'race-card w-90'}`}>
      <div className="container flex justify-between items-center">
        <div className="flex flex-col items-center date-section mr-4">
          <h3>{day}</h3>
          <Chip label={month} />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <h2>Round {race.round}</h2>
              <h1>{race.track.countryName}</h1>
              <p>{race.name}</p>
            </div>
            {page === "races" && (
              <IoIosArrowForward className="arrow text-2xl" />
            )}
          </div>
          {type === 'past' && race.classement && (
            <div className="flex items-center mt-2">
              <Chip label="P10" color="green" />
              <div className="trigram flex items-center">
                <div
                  className="team-color-rectangle"
                  style={{
                    backgroundColor: race.classement[0].pilote.ecurie.color,
                  }}
                ></div>
                <h3 className="team-name">{race.classement[0].pilote.trigram}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceCard;