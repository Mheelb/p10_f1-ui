"use client";

import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Button from "./common/Button";
import { BetSelectionResult } from "@/types/BetSelectionResult";
import { toast } from 'react-toastify';
// import { User } from "@/types/User";
import { GP } from "@/types/GP";

interface BetPopupProps {
  isVisible: boolean;
  togglePopup: () => void;
}

export default function BetPopup({ isVisible, togglePopup }: BetPopupProps) {

  // const [userData, setUserData] = useState<User | null>(null);
  const [betData, setBetData] = useState<BetSelectionResult>({
    id: "",
    user: {
        id: "",
        email: "",
        username: "",
        leagues: [],
        bets: [],
    },
    gp: {
        id: 0,
        name: "",
        round: 1,
        track: {
            id: "",
            trackName: "",
            countryName: "",
            pictureCountry: "",
            pictureTrack: "",
        },
        dateTime: "",
        pilotes: [],
        classement: [],
    },
    pointsP10: 5,
    piloteP10: {
        id: "",
        name: "",
        picture: "",
        trigram: "",
        ecurie: {
            id: "",
            name: "",
            logo: "",
            color: "",
            pilotes: [],
        },
    },
  });

  const [isClosing, setIsClosing] = useState(false);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      setIsClosing(false);
    }, 400);
  };

  const promptToBet = () => {
    
    if (betData.piloteP10.id === "") {
      toast.error("Please choose a driver");
      return;
    }
    toast.success("Bet done successfully");
    console.log(betData);
  };

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

  return (
    isVisible && (
      <div className="popup-fullscreen-bg">
        <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
          <RiCloseLargeLine
            onClick={() => closePopup()}
            className="absolute top-4 right-4 text-2xl"
          />
          <h1 className="text-4xl font-bold text-center mt-5">Bet on a driver</h1>
            <select id="selectBet" className="mt-10"
              value={betData.piloteP10.id}
                onChange={e => setBetData(prev => ({
                    ...prev,
                    piloteP10: {
                        ...prev.piloteP10,
                        id: e.target.value,
                        name: pilotes.find(p => p.id === e.target.value)?.name || "",
                        picture: pilotes.find(p => p.id === e.target.value)?.picture || "",
                        trigram: pilotes.find(p => p.id === e.target.value)?.trigram || "",
                        ecurie: {
                            id: `ecurie_${e.target.value}`,
                            name: pilotes.find(p => p.id === e.target.value)?.ecurie.name || "",
                            logo: pilotes.find(p => p.id === e.target.value)?.ecurie.logo || "",
                            color: pilotes.find(p => p.id === e.target.value)?.ecurie.color || "",
                            pilotes: [],
                        },
                    }
                }))}
            >
                <option value="">Select a driver</option>
                    {pilotes.map((pilote) => (
                        <option key={pilote.id} value={pilote.id}>
                        {pilote.name} ({pilote.trigram})
                        </option>
                    ))}
            </select>
            
            <div className="mt-5">
              <Button type="submit" onClick={promptToBet}>Bet</Button>
            </div>
        </div>
      </div>
    )
  );
}