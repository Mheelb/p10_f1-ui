"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useActiveTab } from "@/context/ActiveTabProvider";
import type { League } from "@/types/League";
import GeneralLeague from "@/components/leagues/GeneralLeague";

export default function League() {
    const { name } = useParams();
    const { isAuthenticated } = useAuth();
    const { activeTab } = useActiveTab();
    const [ leagueData, setLeagueData ] = useState<League | null>(null);
    
    const getLeague = (leagueName: string) => {
        // Fetch league data based on the name
        setLeagueData({
            id: "zfn78EFUQNCc9CSQ9C",
            leagueName: leagueName,
            users: [],
            maxParticipants: 10,
            isPrivate: false,
            sharedLink: ""
        } as League);
    };

    useEffect(() => {
        if (name && typeof name === "string")
            getLeague(name);
    }, [name]);

    if (activeTab === "general") {
        return (
            <GeneralLeague league={leagueData} />
        )
    } else if (activeTab === "ranking") {
        return (<div></div>)
    } else if (activeTab === "settings") {
        return (<div></div>)
    }
}