"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useActiveTab } from "@/context/ActiveTabProvider";
import type { League } from "@/types/League";
import GeneralLeague from "@/components/leagues/league/GeneralLeague";
import SettingsLeague from "@/components/leagues/league/SettingsLeague";
import { User } from "@/types/User";

export default function League() {
    const { name } = useParams();
    const { isAuthenticated } = useAuth();
    const { activeTab } = useActiveTab();
    const [ leagueData, setLeagueData ] = useState<League | null>(null);
    const [ userData, setUserData ] = useState<User | null>(null);

    const getCurrentUser = () => {
        // Fetch current user data
        const currentUser: User = {
            id: "user_789",
            email: "user@example.com",
            username: "JohnDoe",
            leagues: [],
            bets: [],
        };
        return currentUser;
    };
    
    const getLeague = (leagueName: string) => {
        // Fetch league data based on the name
        setLeagueData({
            id: "zfn78EFUQNCc9CSQ9C",
            leagueName: leagueName,
            users: [
                { id: "userLeague_1", league: {} as League, user: userData, admin: true },
                { id: "userLeague_2", league: {} as League, user: { id: "user_789", email: "other@example.com", username: "JaneDoe" }, admin: false },
            ],
            maxParticipants: 10,
            isPrivate: false,
            sharedLink: "HDS6SQN"
        } as League);
    };

    useEffect(() => {
        if (isAuthenticated)
            setUserData(getCurrentUser());
    }, [isAuthenticated]);
    
    useEffect(() => {
        if (name && typeof name === "string" && userData)
            getLeague(name);
    }, [name, userData]);

    if (activeTab === "general") {
        return (
            <GeneralLeague league={leagueData} />
        )
    } else if (activeTab === "ranking") {
        return (<div></div>)
    } else if (activeTab === "settings") {
        return (
            <SettingsLeague league={leagueData} currentUser={userData}/>
        )
    }
}