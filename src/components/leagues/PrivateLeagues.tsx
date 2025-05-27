"use client";

import { useEffect, useState, useCallback } from "react";
import SearchBar from "@/components/common/SearchBar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import leagueService from "@/services/leagueService";
import userService from "@/services/userService";
import { League } from "@/types/League";
import { User } from "@/types/User";
import LeagueCard from "@/components/leagues/LeagueCard";
import eventEmitter from "@/utils/eventEmitter";
import { useAuth } from "@/context/AuthProvider";
import { useActiveTab } from "@/context/ActiveTabProvider";
import { get } from "http";

export default function PrivateLeagues() {
    const { isAuthenticated, email, userId } = useAuth();
    const [leagues, setLeagues] = useState<League[]>([]);
    const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const leaguesPerPage = 10;


    const getPrivateLeagues = async () => {
        if (!isAuthenticated || !email) return;
        
        await leagueService().getLeaguesByUserId(userId ? userId : "")
        .then((response) => {                        
            if (response.status === 200) {
                const privateLeagues = response.data.filter((league: League) => league.isPrivate);
                setLeagues(privateLeagues);
            } else {
                console.error("Failed to fetch private leagues:", response.error);
            }
        })
        .catch((error) => {
            console.error("Error fetching private leagues:", error);
        });
    };

    useEffect(() => {
        getPrivateLeagues();
    }, []);

    useEffect(() => {
        const filtered = leagues.filter((league) =>
            league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLeagues(filtered);
        setCurrentPage(1);
    }, [searchTerm, leagues]);

    const indexOfLastLeague = currentPage * leaguesPerPage;
    const indexOfFirstLeague = indexOfLastLeague - leaguesPerPage;
    const currentLeagues = filteredLeagues.slice(indexOfFirstLeague, indexOfLastLeague);

    const totalPages = Math.ceil(filteredLeagues.length / leaguesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleJoinLeague = (league: League) => {
        console.log("Cannot join private league from this view");
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-8">
                <p>Veuillez vous connecter pour voir vos ligues privées.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center my-4 mx-2">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {currentLeagues.length === 0 ? (
                <div className="text-center mt-8">
                    <p>Vous n'avez pas encore de ligues privées.</p>
                </div>
            ) : (
                currentLeagues.map((league) => (
                    <div key={league.id} className="flex justify-between items-center">
                        <LeagueCard league={league} onJoin={() => handleJoinLeague(league)} />
                    </div>
                ))
            )}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 mb-20">
                    <IoIosArrowBack
                        className={`arrow text-2xl mr-2 ${currentPage === 1 ? "text-gray-400" : "cursor-pointer"}`}
                        onClick={handlePreviousPage}
                    />
                    <p>
                        Page {currentPage} sur {totalPages}
                    </p>
                    <IoIosArrowForward
                        className={`arrow text-2xl ml-2 ${currentPage === totalPages ? "text-gray-400" : "cursor-pointer"}`}
                        onClick={handleNextPage}
                    />
                </div>
            )}
        </div>
    );
}
