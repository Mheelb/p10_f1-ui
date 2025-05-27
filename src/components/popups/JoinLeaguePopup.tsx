"use client";

import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Button from "../common/Button";
import { League } from "@/types/League";
import { toast } from "react-toastify";
import leagueService from "@/services/leagueService";
import { useEffect } from "react";
import { User } from "@/types/User";
import userService from "@/services/userService";
import { useAuth } from "@/context/AuthProvider";
import eventEmitter from "@/utils/eventEmitter";

interface JoinLeaguePopupProps {
  isVisible: boolean;
  togglePopup: () => void;
  league: League;
  email: string;
}

export default function JoinLeaguePopup({ isVisible, togglePopup, league, email }: JoinLeaguePopupProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { isAuthenticated, userId } = useAuth();

  const joinLeague = async () => {
    if (!isAuthenticated || !email) return;
    if (!userId) return;

    await leagueService().addUserToLeague(league.id, userId)
      .then((response) => {
        if (response.status === 200) {
          toast.success("You have successfully joined the league!");
          closePopup();
        } else {
          toast.error("Failed to join league. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while joining the league.");
      }
    );
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      setIsClosing(false);
    }, 400);
  };

  const handleJoinLeague = () => {
    if (league.users.some((user) => user.id === userId)) {
      toast.error("You are already in this league!");
      return;
    }

    if (league.users.length >= league.maxParticipants) {
      toast.error("This league is full!");
      return;
    }

    setIsJoining(true);

    joinLeague()
      .finally(() => {
        setIsJoining(false);
      }
    );
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