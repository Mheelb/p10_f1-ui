"use client";

import { GP } from "@/types/GP";
import RaceCard from "@/components/RaceCard";
import { useEffect, useState } from "react";
import { GiPodium } from "react-icons/gi";
import { User } from "@/types/User";

export function LeagueStats() {

    const [pastRaces, setPastRaces] = useState<GP[]>([]);
    const [lastThreeRaces, setLastThreeRaces] = useState<GP[]>([]);
    const [topThreeUsers, setTopThreeUsers] = useState<User[]>([]);

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

    function generatePastRace(): GP {
        const date = new Date(Date.now() - Math.random() * 10000000000).toISOString(); // Toujours une date passée

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
            classement: [
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
            ],
        };
    };

    const getTopThreeUsers = () => {
        // Simulate fetching top three users from an API or database
        return [
            {
                id: "1",
                email: "fzf@gmai.com",
                username: "fzf",
                leagues: [],
                bets: [],
            },
            {
                id: "2",
                email: "ze@gmai.com",
                username: "ze",
                leagues: [],
                bets: [],
            },
            {
                id: "3",
                email: "mho@gmail.com",
                username: "mho",
                leagues: [],
                bets: [],
            },
        ];
    }

    useEffect(() => {
        const races = Array.from({ length: 10 }, () => generatePastRace());
        setPastRaces(races);
        setTopThreeUsers(getTopThreeUsers());
    }, []);

    useEffect(() => {
        if (pastRaces.length > 0)
            setLastThreeRaces(pastRaces.slice(0, 3));
    }, [pastRaces]);

    return (
        <div>
            <div className="w-90 card">
                <h2 className="text-2xl font-bold text-center my-4">Podium</h2>
                <div className="flex justify-center items-end relative">
                    <div className="flex flex-col items-center mx-4">
                        <div className="bg-gray-300 text-black text-center font-bold rounded-full w-16 h-16 flex items-center justify-center">
                            2
                        </div>
                        <p className="mt-2 text-center font-semibold">{topThreeUsers[1]?.username}</p>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <div className="bg-yellow-400 text-black text-center font-bold rounded-full w-20 h-20 flex items-center justify-center">
                            1
                        </div>
                        <p className="mt-2 text-center font-semibold">{topThreeUsers[0]?.username}</p>
                    </div>

                    <div className="flex flex-col items-center mx-4">
                        <div className="bg-orange-400 text-black text-center font-bold rounded-full w-16 h-16 flex items-center justify-center">
                            3
                        </div>
                        <p className="mt-2 text-center font-semibold">{topThreeUsers[2]?.username}</p>
                    </div>
                </div>
            </div>
            <div className="w-90 card">
                <h2 className="text-2xl font-bold text-center my-4">Last p10</h2>
                <div className="flex flex-col gap-4">
                    {lastThreeRaces.map((race) => (
                        <RaceCard key={race.id} race={race} type="past" page="league" />
                    ))}
                </div>
            </div>
        </div>
    );
};