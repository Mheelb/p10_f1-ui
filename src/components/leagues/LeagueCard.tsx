"use client";

import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Chip from "@/components/common/Chip";
import { League } from "@/types/League";

interface LeagueCardProps {
  league: League;
}

const LeagueCard: FC<LeagueCardProps> = ({ league }) => {
  return (
    <div className="league-card w-90">
      <div className="container flex justify-between items-center">
        <div className="flex flex-col items-center join-section">
          <Chip label="Join" color="blue" />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{league.leagueName}</h2>
              <p className="my-1">PLayers: {league.users.length}</p>
            </div>
            <IoIosArrowForward className="arrow text-2xl" />
          </div>
          <div className="flex items-center mt-2">
          <Chip label={league.isPrivate ? "Private" : "Public"} color={league.isPrivate ? "red" : "green"} />
          <p className="ml-2">Max Players: {league.maxParticipants}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueCard;