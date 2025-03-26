"use client";

import { useActiveTab } from '@/context/ActiveTabProvider';
import { useEffect, useState } from 'react';
import RaceCard from '@/components/RaceCard';
import Link from 'next/link';
import { faker } from '@faker-js/faker';

export default function Races() {

  const { activeTab, setActiveTab } = useActiveTab();
  const [pastRaces, setPastRaces] = useState(getPastRaces());
  const [upcomingRaces, setUpcomingRaces] = useState(getUpcomingRaces());

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
      id : faker.string.numeric(4),
      round: faker.number.int(24),
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
      id: faker.number.int(),
      round: faker.number.int(24),
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
    // using faker to generate fake data until the API is available
    return Array.from({ length: 10 }, generatePastRace);
  }

  function getUpcomingRaces() {
    // using faker to generate fake data until the API is available
    return Array.from({ length: 10 }, generateUpcomingRace);
  }

  return (
    <div>
      {activeTab === 'upcoming' ? upcomingRaces.map((race) => (
        <RaceCard key={race.id} race={race} type="upcoming" />
      )) : pastRaces.map((race) => (
        <Link key={race.id} href={`/races/${race.id}?name=${race.competition.country}`}><RaceCard race={race} type="past" /></Link>
      ))}
    </div>
  );
}