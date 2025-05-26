"use client";
import { League } from "@/types/League";
import { useEffect, useState } from "react";
import BetCard from "../../BetCard";
import { LeagueStats } from "./LeagueStats";

interface GeneralLeagueProps {
    league: League | null;
};

export default function GeneralLeague({ league }: GeneralLeagueProps) {

    return (
        <div className="flex flex-col items-center">
            <div className="mt-10" >
            <BetCard/>
            </div>
            <div className="mb-20" >
                <LeagueStats />
            </div>
        </div>
    )
}