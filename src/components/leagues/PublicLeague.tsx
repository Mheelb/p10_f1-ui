"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import leagueService from "@/services/leagueService";
import Button from "@/components/common/Button";
import { League } from "@/types/League";
import LeagueCard from "@/components/leagues/LeagueCard";
import { toast } from "react-toastify";
import eventEmitter from "@/utils/eventEmitter";

export default function PublicLeague() {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const leaguesPerPage = 10;

    const getLeagues = async () => {
        leagueService().getAllLeagues()
            .then((response) => {
                if (response.status === 200) {
                    const leagues = response.data;
                    setLeagues(leagues);
                    setFilteredLeagues(leagues);
                } else {
                    toast.error(response.error.message);
                }
            })
            .catch((error) => {
                console.error("Error :", error);
            });
    };

    useEffect(() => {
        getLeagues();
        eventEmitter.on("create-league", () => getLeagues());
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

    return (
        <div>
            <div className="flex justify-between items-center my-4 mx-2">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            {currentLeagues.map((league) => (
                <LeagueCard key={league.id} league={league} />
            ))}
            <div className="flex justify-center items-center mt-6 mb-20">
                <IoIosArrowBack
                    className={`arrow text-2xl mr-2 ${currentPage === 1 ? "text-gray-400" : "cursor-pointer"}`}
                    onClick={handlePreviousPage}
                />
                <p>
                    Page {currentPage} of {totalPages}
                </p>
                <IoIosArrowForward
                    className={`arrow text-2xl ml-2 ${currentPage === totalPages ? "text-gray-400" : "cursor-pointer"}`}
                    onClick={handleNextPage}
                />
            </div>
        </div>
    );
}