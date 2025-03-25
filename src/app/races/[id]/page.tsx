"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Race = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  interface Race {
    competition: {
      name: string;
      location: {
        country: string;
      };
    };
    date: string;
    results: {
      driver: {
        name: string;
      };
      team: {
        name: string;
      };
    }[];
  }

  const fakeRace = {
    competition: {
      name: "Bahrain Grand Prix",
      location: {
        country: "Bahrain",
      },
    },
    date: "2023-03-05T15:00:00+00:00",
    results: [
      {
        position: 1,
        driver: {
          name: "Lewis Hamilton",
          trigram: "HAM",
        },
        team: {
          name: "Mercedes",
          color: "#00D2BE",
        },
        timer: "1:33.996",
        points: 25,
      },
      {
        position: 2,
        driver: {
          name: "Max Verstappen",
          trigram: "VER",
        },
        team: {
          name: "Red Bull Racing",
          color: "#0600EF",
        },
        timer: "1:34.100",
        points: 18,
      },
    ],
  };

  const [race, setRace] = useState(getRace());

  function getRace () {
    //fetch
    return fakeRace;
  }

  if (!race) {
    return <div>Loading...</div>;
  }

  return (
    <div className='classification'>
      <div className='grid grid-cols-5 justify-items-center header-classification'>
        <h3>Pos</h3>
        <h3>driver</h3>
        <h3 className='col-span-2'>time</h3>
        <h3>pts</h3>
      </div>
      {race.results.map((result, index) => (
        <div key={index} className='grid grid-cols-5 justify-items-center body-classification'>
          <h1>{result.position}</h1>
          <div className='trigram flex items-center'>
            <div className='team-color-rectangle' style={{ backgroundColor: result.team.color }}></div>
            <h1 className='team-name'>{result.driver.trigram}</h1>
          </div>
          <h1 className='col-span-2'>{result.timer}</h1>
          <h1>{result.points}</h1>
        </div>
      ))}

    </div>
  );
};

export default Race;