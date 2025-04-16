"use client";

import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Chip from "@/components/common/Chip";
import { League } from "@/types/League";

interface LeagueCardProps {
  league: League;
  onJoin: (league: League) => void;
}

const LeagueCard: FC<LeagueCardProps> = ({ league, onJoin }) => {
  return (
    <div className="league-card w-90" onClick={() => onJoin(league)}>
      <div className="container flex justify-between items-center">
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