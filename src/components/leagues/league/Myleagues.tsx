"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import leagueService from "@/services/leagueService";
import userService from "@/services/userService";
import { League } from "@/types/League";
import { User } from "@/types/User";
import LeagueCard from "@/components/leagues/LeagueCard";
import eventEmitter from "@/utils/eventEmitter";
import { useAuth } from "@/context/AuthProvider";

export default function MyLeagues() {
    const { isAuthenticated, email } = useAuth();
    const [leagues, setLeagues] = useState<League[]>([]);
    const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const leaguesPerPage = 10;

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

    const getLeagues = async () => {
        if (!isAuthenticated || !email) return;

        const userId = await getUserId(email);
        if (!userId) return;

        await leagueService().getLeaguesByUserId(userId)
            .then((response) => {
                if (response.status === 200) {
                    setLeagues(response.data);
                } else {
                    console.error("Failed to fetch leagues:", response.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching leagues:", error);
            });
    };

    useEffect(() => {
        getLeagues();
        eventEmitter.on("create-league", () => getLeagues());
    }, [isAuthenticated, email]);

    useEffect(() => {
        const filtered = leagues.filter((league) =>
            league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLeagues(filtered);
        setCurrentPage(1);
    }, [searchTerm, leagues]);

    useEffect(() => {
        eventEmitter.on("refresh-leagues", getLeagues);
        return () => {
            eventEmitter.off("refresh-leagues", getLeagues);
        };
    }, []);

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
        console.log("Cannot join league from this view");
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-8">
                <p>Veuillez vous connecter pour voir vos ligues.</p>
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
                    <p>Vous n'avez pas encore de ligues.</p>
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
