"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { useActiveTab } from "@/context/ActiveTabProvider";
import type { League } from "@/types/League";
import GeneralLeague from "@/components/leagues/league/GeneralLeague";
import SettingsLeague from "@/components/leagues/league/SettingsLeague";
import { User } from "@/types/User";
import leagueService from "@/services/leagueService";

export default function League() {
    const { name } = useParams();
    const searchParams = useSearchParams();
    const joinCode = searchParams.get('joinCode');
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
    
    const getLeague = (joinCode: string) => {
        leagueService().getLeagueByJoinCode(joinCode)
            .then((response) => {
                if (response.status === 200) {
                    setLeagueData(response.data);
                } else {
                    console.error("Failed to fetch league data:", response.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching league data:", error);
            });
    };

    useEffect(() => {
        if (isAuthenticated)
            setUserData(getCurrentUser());
    }, [isAuthenticated]);
    
    useEffect(() => {
        if (joinCode) {
            getLeague(joinCode);
        }
    }, [joinCode]);

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