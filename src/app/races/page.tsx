"use client";

import { useActiveTab } from '@/context/ActiveTabProvider';
import { useEffect, useState } from 'react';
import RaceCard from '@/components/RaceCard';
import Link from 'next/link';
import { GP } from '@/types/GP';

export default function Races() {
  const { activeTab } = useActiveTab();
  const [pastRaces, setPastRaces] = useState<GP[]>([]);
  const [upcomingRaces, setUpcomingRaces] = useState<GP[]>([]);

  function generatePilote(id: string, name: string, trigram: string, teamName: string, teamColor: string): GP['pilotes'][number] {
    return {
      id,
      name,
      picture: `https://example.com/pilotes/${trigram.toLowerCase()}.jpg`,
      trigram,
      ecurie: {
        id: `ecurie_${id}`,
        name: teamName,
        logo: `https://example.com/logos/${teamName.toLowerCase().replace(/\s+/g, '-')}.png`,
        color: teamColor,
        pilotes: [],
      },
    };
  }

  // Générer un faux GP
  function generateRace(isPast: boolean): GP {
    const date = isPast
      ? new Date(Date.now() - Math.random() * 10000000000).toISOString() // Date passée
      : new Date(Date.now() + Math.random() * 10000000000).toISOString(); // Date future

    return {
      id: Math.floor(Math.random() * 1000),
      name: "Grand Prix " + Math.random().toString(36).substring(7),
      round: Math.floor(Math.random() * 24) + 1,
      track: {
        id: `track_${Math.floor(Math.random() * 100)}`,
        trackName: "Circuit " + Math.random().toString(36).substring(7),
        countryName: "Country " + Math.random().toString(36).substring(7),
        pictureCountry: "https://example.com/flags/country.png",
        pictureTrack: "https://example.com/tracks/track.jpg",
      },
      dateTime: date,
      pilotes: [
        generatePilote("01", "Max Verstappen", "VER", "Red Bull Racing", "#0600EF"),
        generatePilote("02", "Lewis Hamilton", "HAM", "Mercedes", "#00D2BE"),
        generatePilote("03", "Charles Leclerc", "LEC", "Ferrari", "#DC0000"),
      ],
      classement: isPast
        ? [
            {
              id: "classement_01",
              race: {} as GP,
              pilote: generatePilote("01", "Max Verstappen", "VER", "Red Bull Racing", "#0600EF"),
              isDNF: false,
              position: 1,
              time: "1:30:00",
              points: 25,
            },
            {
              id: "classement_02",
              race: {} as GP,
              pilote: generatePilote("02", "Lewis Hamilton", "HAM", "Mercedes", "#00D2BE"),
              isDNF: false,
              position: 2,
              time: "1:31:00",
              points: 18,
            },
            {
              id: "classement_03",
              race: {} as GP,
              pilote: generatePilote("03", "Charles Leclerc", "LEC", "Ferrari", "#DC0000"),
              isDNF: false,
              position: 3,
              time: "1:32:00",
              points: 15,
            },
          ]
        : undefined,
    };
  }

  function getPastRaces(): GP[] {
    return Array.from({ length: 3 }, () => generateRace(true));
  }

  function getUpcomingRaces(): GP[] {
    return Array.from({ length: 3 }, () => generateRace(false));
  }

  useEffect(() => {
    setPastRaces(getPastRaces());
    setUpcomingRaces(getUpcomingRaces());
  }, []);

  return (
    <div>
      {activeTab === 'upcoming'
        ? upcomingRaces.map((race) => (
            <RaceCard key={race.id} race={race} type="upcoming" page='races'/>
          ))
        : pastRaces.map((race) => (
            <Link key={race.id} href={`/races/${race.id}?name=${race.track.countryName}`}>
              <RaceCard race={race} type="past" page='races'/>
            </Link>
          ))}
    </div>
  );
}