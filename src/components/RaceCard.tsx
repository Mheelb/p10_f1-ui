"use client";

import { FC } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import Chip from '@/components/common/Chip';

interface RaceCardProps {
    race: {
        id: number;
        round: number;
        competition: {
            name: string;
            country: string;
        };
        circuit: {
            image: string;
        };
        date: string;
        result?:{
			driver_name: string;
			driver_trigram: string
			driver_team: {
				name: string;
				color: string;
			}
			timer: string;
			position: string;
			points: number;
		}[];
        p10?: {
            trigram: string;
            team: {
                color: string;
            };
        };
    };
    type: string;
}

const RaceCard: FC<RaceCardProps> = ({ race, type }) => {

    function toDay(date: string) {
        return new Date(date).toLocaleDateString('en-GB', { day: '2-digit' });
    };

    function toMonth(date: string) {
        return new Date(date).toLocaleDateString('en-GB', { month: 'short' });
    }

    return (
        <div className="race-card w-90">
            <div className='container flex justify-between items-center'>
                <div className='flex flex-col items-center date-section'>
                    <h3>{toDay(race.date)}</h3>
                    <Chip label={toMonth(race.date)} />
                </div>
                <div className='flex flex-col flex-grow'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2>round {race.round}</h2>
                            <h1>{race.competition.country}</h1>
                            <p>{race.competition.name}</p>
                        </div>
                        <IoIosArrowForward className="arrow text-2xl" />
                    </div>
                    {type === 'past' ? (
                        <div className='flex items-center mt-2'>
                            <Chip label='P10' color="green" />
                            <div className='trigram flex items-center'>
                                {race.p10 && (
                                    <div className='team-color-rectangle' style={{ backgroundColor: race.p10.team.color }}></div>
                                )}
                                {race.p10 && <h3 className='team-name'>{race.p10.trigram}</h3>}
                            </div>
                        </div>
                    ) : ('')}
                </div>
            </div>
        </div>
    );
};

export default RaceCard;