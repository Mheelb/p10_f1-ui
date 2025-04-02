"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import AddBtn from "@/components/buttons/AddBtn";
import AddLeaguePopup from "@/components/AddLeaguePopup";

export default function Leagues() {
    const { isAuthenticated } = useAuth();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
      };

      useEffect(() => {
        if (isPopupVisible) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isPopupVisible]);

    if (!isAuthenticated) {
        return <h1>Please log in to view your leagues.</h1>;
    }

    return (
        <div>
            <AddLeaguePopup isVisible={isPopupVisible} togglePopup={() => togglePopup()} />
            <div className="fixed bottom-4 right-4 z-50">
                <AddBtn handleClick={togglePopup}/>
            </div>
        </div>
    );
}