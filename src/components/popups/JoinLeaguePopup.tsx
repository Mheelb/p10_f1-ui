"use client";

import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Button from "../common/Button";
import { League } from "@/types/League";
import { toast } from "react-toastify";

interface JoinLeaguePopupProps {
  isVisible: boolean;
  togglePopup: () => void;
  league: League;
  email: string;
}

export default function JoinLeaguePopup({ isVisible, togglePopup, league, email }: JoinLeaguePopupProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      setIsClosing(false);
    }, 400);
  };

  const handleJoinLeague = () => {
    if (league.users.some((user) => user.user.email === email)) {
      toast.error("You are already in this league!");
      return;
    }

    if (league.users.length >= league.maxParticipants) {
      toast.error("This league is full!");
      return;
    }

    setIsJoining(true);
    
    setTimeout(() => {
      console.log(`User ${email} joined league ${league.leagueName}`);
      toast.success("You have successfully joined the league!");
      setIsJoining(false);
      closePopup();
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-fullscreen-bg">
      <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
        <RiCloseLargeLine
            onClick={() => closePopup()}
            className="absolute top-4 right-4 text-2xl"
          />
        <h1 className="text-4xl font-bold text-center mt-5">Join League</h1>
        <h3 className="text-center mt-4">
          <strong>League Name:</strong> {league.leagueName}
        </h3>
        <h3 className="text-center mt-2">
          <strong>Players:</strong> {league.users.length} / {league.maxParticipants}
        </h3>
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={handleJoinLeague} disabled={isJoining}>
            {isJoining ? "Joining..." : "Join"}
          </Button>
        </div>
      </div>
    </div>
  );
}