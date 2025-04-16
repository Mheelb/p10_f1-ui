"use client";

import { League } from "@/types/League";
import { useEffect, useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import Chip from "@/components/common/Chip";

interface SettingsLeagueProps {
    league: League | null;
};

export default function SettingsLeague({ league }: SettingsLeagueProps) {
    const [isPrivate, setIsPrivate] = useState(false);
    const [maxParticipants, setMaxParticipants] = useState(10);
    const [sharedLink, setSharedLink] = useState("");

    const copyToClipboard = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.success("Copied to clipboard");
            })
            .catch((error) => {
                console.error("Failed to copy text: ", error);
            });
    };

    const handleSaveSettings = () => {
        // Save settings logic here
        console.log("Settings saved:", { isPrivate, maxParticipants, sharedLink });
    };

    useEffect(() => {
        if (league) {
            setIsPrivate(league.isPrivate);
            setMaxParticipants(league.maxParticipants);
            setSharedLink(`p10fantasy.com/league/join/${league.sharedLink}`);
        }
    }, [league]);

    return (
        <div className="card flex justify-center items-center flex-col">
            <h1 className="my-4">Settings</h1>
            <div className="flex flex-col gap-4">
                <label>
                    <p className="text-lg font-semibold">Max Participants</p>
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        className="input w-95"
                    />
                </label>
                <label>
                    <p className="text-lg font-semibold">Shared link</p>
                    <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-5">
                            <Input type="text" value={sharedLink} disabled={true} />
                        </div>
                        <div className="col-start-6 col-span-1">
                            <Button onClick={() => copyToClipboard(sharedLink)} color="secondary">
                                <div className="flex justify-center items-center">
                                    <FaCopy className="text-lg" />
                                </div>
                            </Button>
                        </div>
                    </div>
                </label>
                <label className="">
                    <p className="text-lg font-semibold">League type</p>
                    <div className="flex gap-4 mt-4 justify-center">
                        <Chip
                            label="Public"
                            isSelected={!isPrivate}
                            onClick={() => setIsPrivate(false)}
                        />
                        <Chip
                            label="Private"
                            isSelected={isPrivate}
                            onClick={() => setIsPrivate(true)}
                        />
                    </div>
                </label>

                <Button onClick={handleSaveSettings} color="primary">
                    Save
                </Button>
                <Button onClick={handleSaveSettings} color="secondary">
                    Leave
                </Button>
            </div>
        </div>
    );
};