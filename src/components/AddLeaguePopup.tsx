"use client";
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Input from "./common/Input";

interface AddLeaguePopupProps {
    isVisible: boolean;
    togglePopup: () => void;
}

export default function AddLeaguePopup({ isVisible, togglePopup }: AddLeaguePopupProps) {

    const [leagueData, setLeagueData] = useState<{
        type: boolean;
        name: string;
        maxPlayers: number;
        code: number;
    }>({
        type: false,
        name: "",
        maxPlayers: 0,
        code: 0,
    });
    const [isClosing, setIsClosing] = useState(false);

    const closePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            togglePopup();
            setIsClosing(false);
        }, 500);
    };

    const changeLeagueData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLeagueData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const promptToCreateLeague = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    return (
        isVisible && (
            <div className="popup-fullscreen-bg">
                <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
                    <RiCloseLargeLine
                        onClick={() => closePopup()}
                        className="absolute top-4 right-4 text-2xl cursor-pointer"
                    />
                    <h1 className="text-4xl font-bold text-center mt-5">Log in</h1>
                    <p className="text-center mt-2">Please log in to your account</p>
                    <form onSubmit={promptToCreateLeague} className="flex flex-col gap-4 mt-10">
                        <Input
                            name="name"
                            type="text"
                            placeholder="name"
                            value={leagueData.name}
                            onChange={changeLeagueData}
                        />
                    </form>

                </div>
            </div>
        )
    )
}

