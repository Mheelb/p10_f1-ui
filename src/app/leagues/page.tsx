"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import AddBtn from "@/components/buttons/AddBtn";
import AddLeaguePopup from "@/components/AddLeaguePopup";
import Button from "@/components/common/Button";
import AuthPopup from "@/components/AuthPopup";
import { useActiveTab } from "@/context/ActiveTabProvider";
import PublicLeague from "@/components/leagues/PublicLeague";

export default function Leagues() {

    const { activeTab } = useActiveTab();

    const { isAuthenticated } = useAuth();
    const [isAuthPopupVisible, setIsAuthPopupVisible] = useState(false);
    const [isLeaguePopupVisible, setIsLeaguePopupVisible] = useState(false);


    const toggleAuthPopup = () => {
        setIsAuthPopupVisible((prev) => !prev);
    };

    const toggleLeaguePopup = () => {
        setIsLeaguePopupVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isAuthPopupVisible || isLeaguePopupVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isAuthPopupVisible, isLeaguePopupVisible]);

    useEffect(() => {
        if (!isAuthenticated)
            setIsAuthPopupVisible(true);
        else
            setIsAuthPopupVisible(false);
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-100">
                <div className="bg-white p-6 rounded-lg shadow-md m-4">
                    <h1 className="text-2xl font-bold mb-10 text-center">Leagues</h1>
                    <p className="text-center text-gray-600 mb-10">
                        Please log in to access and manage your leagues.
                    </p>
                    <Button onClick={toggleAuthPopup} color="primary" width="40">
                        Log In
                    </Button>
                    <AuthPopup isVisible={isAuthPopupVisible} togglePopup={toggleAuthPopup} />
                </div>
            </div>
        );
    }

    return (
        <div>
            {activeTab === "public-leagues" ? (
                <PublicLeague />
            ) : (
                <div>autre</div>
            )}
            {!isLeaguePopupVisible ? (
                <div className="fixed bottom-4 right-4 z-50">
                    <AddBtn handleClick={toggleLeaguePopup} />
                </div>
            ) : (
                <AddLeaguePopup isVisible={isLeaguePopupVisible} togglePopup={toggleLeaguePopup} />
            )}
        </div>
    );
}