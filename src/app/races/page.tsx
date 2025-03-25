"use client";

import { useActiveTab } from '@/context/ActiveTabProvider';
import { useEffect, useState } from 'react';
import RaceCard from '@/components/RaceCard';
import Link from 'next/link';

export default function Races() {

  const { activeTab, setActiveTab } = useActiveTab();

  const fakeRaces = [
    {
      id: 1671,
      competition: {
        id: 2,
        name: "Bahrain Grand Prix",
        location: {
          country: "Bahrain",
          city: "Sakhir",
        },
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
      p10: {
        id: 25,
        name: "Lewis Hamilton",
        trigram: "HAM",
        team: {
          id: 2,
          name: "Mercedes",
          trigram: "MER",
          color: "#00D2BE",
        },
      },
    },
    {
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
          id: 25
        },
        time: "1:31.906",
      },
      distance: "308.8 Kms",
      timezone: "utc",
      date: "2023-03-19T17:00:00+00:00",
      weather: null,
      status: "Completed",
      p10: {
        id: 25,
        name: "Lewis Hamilton",
        trigram: "HAM",
        team: {
          id: 2,
          name: "Mercedes",
          trigram: "MER",
          color: "#00D2BE",
        },
      },
    },
    {
      id: 1681,
      competition: {
        id: 1,
        name: "Australia Grand Prix",
        location: {
          country: "Australia",
          city: "Melbourne",
        },
      },
      circuit: {
        id: 1,
        name: "Albert Park Circuit",
        image: "https://media.api-sports.io/formula-1/circuits/1.png",
      },
      season: 2023,
      type: "Race",
      laps: {
        current: null,
        total: 58,
      },
      fastest_lap: {
        driver: {
          id: 10,
        },
        time: "1:20.235",
      },
      distance: "307.6 Kms",
      timezone: "utc",
      date: "2023-04-02T05:00:00+00:00",
      weather: null,
      status: "Completed",
      p10: {
        id: 10,
        name: "Max Verstappen",
        trigram: "VER",
        team: {
          id: 1,
          name: "Red Bull Racing",
          trigram: "RBR",
          color: "#1E41FF",
        },
      },
    },
  ];

  const [races, setRaces] = useState(getRaces());

  function getRaces() {
    // fetch
    return fakeRaces;
  }

  return (
    <div>
      {races.map((race) => (
        activeTab === 'upcoming' ? <RaceCard key={race.id} race={race} type="upcoming" />
          : <Link href={`/races/${race.id}`}><RaceCard key={race.id} race={race} type="past" /></Link>
      ))}
    </div>
  );
}