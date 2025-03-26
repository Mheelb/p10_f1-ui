"use client";

import { useActiveTab } from '@/context/ActiveTabProvider';
import { useEffect, useState } from 'react';
import RaceCard from '@/components/RaceCard';
import Link from 'next/link';
import { faker } from '@faker-js/faker';

export default function Races() {

  const { activeTab, setActiveTab } = useActiveTab();
  interface Race {
    id: number;
    round: number;
    competition: {
      name: string;
      country: string;
    };
    circuit: {
      name: string;
      image: string;
    };
    date: string;
    result?: {
      driver_name: string;
      driver_trigram: string;
      driver_team: {
        name: string;
        color: string;
      };
      timer: string;
      position: string;
      points: number;
    }[];
    p10?: {
      name: string;
      trigram: string;
      team: {
        color: string;
      };
    };
  }
  
  const [pastRaces, setPastRaces] = useState<Race[]>([]);
  const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);

  //faker
  function generateRaceResult() {
    return {
      driver_name: faker.person.fullName(),
      driver_trigram: faker.string.alpha({ length: 3, casing: 'upper' }),
      driver_team: {
        name: faker.company.name(),
        color: faker.color.rgb({ prefix: '#' }),
      },
      timer: faker.string.numeric(2) + ':' + faker.string.numeric(2) + '.' + faker.string.numeric(3),
      position: faker.string.numeric(),
      points: faker.number.int({ min: 0, max: 25 }),
    };
  }

  function generatePastRace() {
    return {
      id: faker.number.int({ min: 1000, max: 9999 }),
      round: faker.number.int({ min: 1, max: 24 }),
      competition: {
        name: faker.lorem.words(3),
        country: faker.location.country(),
      },
      circuit: {
        name: faker.location.streetAddress(),
        image: faker.image.urlLoremFlickr({ category: 'sports' }),
      },
      date: faker.date.past().toISOString(),
      result: Array.from({ length: 10 }, generateRaceResult),
      p10: {
        name: faker.person.fullName(),
        trigram: faker.string.alpha({ length: 3, casing: 'upper' }),
        team: {
          color: faker.color.rgb({ prefix: '#' }),
        },
      },
    };
  }

  function generateUpcomingRace() {
    return {
      id: faker.number.int({ min: 1000, max: 9999 }),
      round: faker.number.int({ min: 1, max: 24 }),
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

  function getPastRaces() {
    return Array.from({ length: 10 }, generatePastRace);
  }

  function getUpcomingRaces() {
    return Array.from({ length: 10 }, generateUpcomingRace);
  }

  useEffect(() => {
    setPastRaces(getPastRaces());
    setUpcomingRaces(getUpcomingRaces());
  }, []);

  return (
    <div>
      {activeTab === 'upcoming' ? upcomingRaces.map((race) => (
        <RaceCard key={race.id} race={race} type="upcoming" />
      )) : pastRaces.map((race) => (
        <Link key={race.id} href={`/races/${race.id}?name=${race.competition.country}`}>
          <RaceCard race={race} type="past" />
        </Link>
      ))}
    </div>
  );
}