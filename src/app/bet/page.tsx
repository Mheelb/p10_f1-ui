"use client";

import BetCard from '@/components/BetCard';
import { Pilote } from '@/types/Pilote';
import { GP } from '@/types/GP';
import { useAuth } from '@/context/AuthProvider';
import AuthPopup from '@/components/popups/AuthPopup';
import Button from '@/components/common/Button';
import { useState } from 'react';

export default function Bet() {

    const { isAuthenticated } = useAuth();
    const [isAuthPopupVisible, setIsAuthPopupVisible] = useState(false);

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
  
  
    const pilotes = [
        generatePilote("01", "Max Verstappen", "VER", "Red Bull Racing", "#0600EF"),
        generatePilote("02", "Lewis Hamilton", "HAM", "Mercedes", "#00D2BE"),
        generatePilote("03", "Charles Leclerc", "LEC", "Ferrari", "#DC0000"),
    ]

    const toggleAuthPopup = () => {
        setIsAuthPopupVisible((prev) => !prev);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-100">
                <div className="bg-white p-6 rounded-lg shadow-md m-4">
                    <h1 className="text-2xl font-bold mb-10 text-center">Bet</h1>
                    <p className="text-center text-gray-600 mb-10">
                        Please log in to access to your bet.
                    </p>
                    <Button onClick={toggleAuthPopup} color="primary" width="40">
                        Log In
                    </Button>
                    <AuthPopup isVisible={isAuthPopupVisible} togglePopup={toggleAuthPopup} />
                </div>
            </div>
        );
    }

  return (
    <div className="mb-20">
        <div className="flex justify-center mt-10">
            <BetCard />
        </div>

        <div>
            <h1 className="text-center text-xl mt-10 mb-4">Drivers&apos; list</h1>

            <div className="mx-auto">
                {pilotes.map((pilote:Pilote) => 
                    <div key={pilote.id} className="bg-white m-2 w-7/8 mx-auto rounded-lg shadow-md">
                        <div className="flex p-4">
                            <div>
                                <img 
                                    src={pilote.picture}
                                    alt={pilote.name}
                                    className="w-15 h-15 border border-gray-300 shadow-md"
                                />
                            </div>

                            <div className="flex flex-col m-auto">
                                <h2 className="text-lg font-semibold text-center">{pilote.name}</h2>
                                <p className="text-center font-semibold text-gray-600">{pilote.trigram}</p>
                                <p className="text-center text-gray-600">{pilote.ecurie.name}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
