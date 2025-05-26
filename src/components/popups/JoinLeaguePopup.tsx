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
  const [leagueMember, setLeagueMember] = useState([]);
  const { isAuthenticated } = useAuth();

  const getUserId = async (email: string) => {
    try {
      const response = await userService().getAll();
      if (response.status === 200) {
        const user = response.data.find((user: User) => user.email === email);
        return user?.id || null;
      }
      console.error("Failed to fetch user data:", response.error);
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const joinLeague = async () => {
    if (!isAuthenticated || !email) return;

    const userId = await getUserId(email);
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

  const getLeagueMember = (leagueId: string) => {
    leagueService().getUsersByLeague(leagueId)
      .then((response) => {
        if (response.status === 200) {
          setLeagueMember(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching league members:", error);
      });
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      setIsClosing(false);
    }, 400);
  };

  const handleJoinLeague = () => {
    if (leagueMember.some((user) => user.user.email === email)) {
      toast.error("You are already in this league!");
      return;
    }

    if (leagueMember.length >= league.maxParticipants) {
      toast.error("This league is full!");
      return;
    }

    setIsJoining(true);

    joinLeague()
      .finally(() => {
        setIsJoining(false);
        window.location.reload();
      }
    );
  };

  useEffect(() => {
    getLeagueMember(league.id);
  });

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
          <strong>Players:</strong> {leagueMember.length} / {league.maxParticipants}
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