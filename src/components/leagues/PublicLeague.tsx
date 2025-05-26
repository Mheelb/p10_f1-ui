"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import leagueService from "@/services/leagueService";
import { League } from "@/types/League";
import LeagueCard from "@/components/leagues/LeagueCard";
import eventEmitter from "@/utils/eventEmitter";
import { useAuth } from "@/context/AuthProvider";
import JoinLeaguePopup from "@/components/popups/JoinLeaguePopup";

export default function PublicLeague() {
  const { email, isAuthenticated } = useAuth();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const leaguesPerPage = 10;

  const getAllLeagues = async () => {
    const response = await leagueService().getAllLeagues();
    if (response.status === 200) {
      setLeagues(response.data);
    } else {
      console.error("Failed to fetch leagues:", response.error);
    }
  };

  useEffect(() => {
    getAllLeagues();
    eventEmitter.on("create-league", () => getAllLeagues());
  }, []);

  useEffect(() => {
    const filtered = leagues.filter((league) =>
      league.leagueName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeagues(filtered);
    setCurrentPage(1);
  }, [searchTerm, leagues]);

  useEffect(() => {
    eventEmitter.on("refresh-leagues", getAllLeagues);
    return () => {
      eventEmitter.off("refresh-leagues", getAllLeagues);
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

  const openJoinPopup = (league: League) => {
    setSelectedLeague(league);
    setIsPopupVisible(true);
  };

  const closeJoinPopup = () => {
    setIsPopupVisible(false);
    setSelectedLeague(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center my-4 mx-2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {currentLeagues.map((league) => (
        <div key={league.id} className="flex justify-between items-center">
          <LeagueCard league={league} onJoin={() => openJoinPopup(league)} />
        </div>
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
      {selectedLeague && (
        <JoinLeaguePopup
          isVisible={isPopupVisible}
          togglePopup={closeJoinPopup}
          league={selectedLeague}
          email={email || ""}
        />
      )}
    </div>
  );
}