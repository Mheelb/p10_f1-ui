"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DriverClassification from '@/components/DriverClassification';
import { GP } from '@/types/GP';

const Race = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const fakeRace: GP = {
    id: 1,
    name: "Bahrain Grand Prix",
    round: 1,
    track: {
      id: "track_01",
      trackName: "Bahrain International Circuit",
      countryName: "Bahrain",
      pictureCountry: "https://example.com/flags/bahrain.png",
      pictureTrack: "https://example.com/tracks/bahrain.jpg",
    },
    dateTime: "2023-03-05T15:00:00+00:00",
    pilotes: [],
    classement: [
      {
        id: "classement_01",
        race: {} as GP, // Référence circulaire, peut être ignorée ou remplacée par null
        pilote: {
          id: "pilote_01",
          name: "Lewis Hamilton",
          picture: "https://example.com/pilotes/hamilton.jpg",
          trigram: "HAM",
          ecurie: {
            id: "ecurie_01",
            name: "Mercedes",
            logo: "https://example.com/logos/mercedes.png",
            color: "#00D2BE",
            pilotes: [],
          },
        },
        isDNF: false,
        position: 1,
        time: '1:31:00',
        points: 25
      },
      {
        id: "classement_02",
        race: {} as GP, // Référence circulaire, peut être ignorée ou remplacée par null
        pilote: {
          id: "pilote_02",
          name: "Max Verstappen",
          picture: "https://example.com/pilotes/verstappen.jpg",
          trigram: "VER",
          ecurie: {
            id: "ecurie_02",
            name: "Red Bull Racing",
            logo: "https://example.com/logos/redbull.png",
            color: "#0600EF",
            pilotes: [],
          },
        },
        isDNF: false,
        position: 2,
        time: '1:32:00',
        points: 18
      },
    ],
  };

  const [race, setRace] = useState<GP | null>(null);

  useEffect(() => {
    // Simuler un appel API pour récupérer les données de la course
    const fetchRace = async () => {
      // Remplacez par un appel API réel si nécessaire
      setRace(fakeRace);
    };

    fetchRace();
  }, [id]);

  if (!race) {
    return <div>Loading...</div>;
  }

  return (
    <div className="classification">
      <div className="grid grid-cols-5 justify-items-center header-classification">
        <h3>Pos</h3>
        <h3>Driver</h3>
        <h3 className="col-span-2">Time</h3>
        <h3>Pts</h3>
      </div>
      {race.classement?.map((result, index) => (
        <DriverClassification key={result.id} result={result} index={index} />
      )) ?? null}
    </div>
  );
};

export default Race;