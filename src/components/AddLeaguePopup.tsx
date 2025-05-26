"use client";

import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Input from "./common/Input";
import Chip from "./common/Chip";
import { toast } from "react-toastify";
import Button from "./common/Button";
import { useActiveTab } from "@/context/ActiveTabProvider";
import { FaCopy } from "react-icons/fa";
import { League } from "@/types/League";

interface AddLeaguePopupProps {
  isVisible: boolean;
  togglePopup: () => void;
}

export default function AddLeaguePopup({ isVisible, togglePopup }: AddLeaguePopupProps) {
  const { activeTab } = useActiveTab();

  const [leagueData, setLeagueData] = useState<League>({
    id: "",
    name: "",
    isPrivate: false,
    sharedLink: "",
    users: [],
    maxPlayers: 10,
  });

  const [isClosing, setIsClosing] = useState(false);
  const [displayCode, setDisplayCode] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      resetLeagueData();
      setIsClosing(false);
    }, 400);
  };

  const typeSelect = (isPrivate: boolean) => {
    setLeagueData((prev) => ({
      ...prev,
      isPrivate,
    }));
  };

  const changeLeagueData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeagueData((prev) => ({
      ...prev,
      [name]: name === "maxPlayers" ? parseInt(value) : value,
    }));
  };

  const resetLeagueData = () => {
    setLeagueData({
      id: "",
      name: "",
      isPrivate: false,
      sharedLink: "",
      users: [],
      maxPlayers: 10,
    });
  };

  const promptToCreateLeague = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (leagueData.name.trim() === "") {
      toast.error("Please enter a name for your league");
      return;
    }
    toast.success("League created successfully");
    console.log(leagueData);
    setDisplayCode(true);
    setInvitationLink(`https://p10fantasy.com/join/${leagueData.name}`);
  };

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

  useEffect(() => {
    setLeagueData((prev) => ({
      ...prev,
      isPrivate: activeTab === "private-leagues",
    }));
  }, [activeTab]);

  if (displayCode) {
    return (
      <div className="popup-fullscreen-bg">
        <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
          <RiCloseLargeLine
            onClick={() => closePopup()}
            className="absolute top-4 right-4 text-2xl"
          />
          <h1 className="text-4xl font-bold text-center mt-5">League created successfully</h1>
          <h2 className="text-center mt-10">Your invitation link is:</h2>
          <div className="grid grid-cols-6 gap-4 mt-4 items-center">
            <div className="col-span-5">
              <Input type="text" value={invitationLink} disabled={true} />
            </div>
            <div className="col-start-6 col-span-1">
              <Button onClick={() => copyToClipboard(invitationLink)} color="secondary">
                <div className="flex justify-center items-center">
                  <FaCopy className="text-lg" />
                </div>
              </Button>
            </div>
          </div>
          <div className="mt-10">
            <Button onClick={() => closePopup()}>Close</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    isVisible && (
      <div className="popup-fullscreen-bg">
        <div className={`popup-fullscreen ${isClosing ? "popup-slide-out" : "popup-slide-in"}`}>
          <RiCloseLargeLine
            onClick={() => closePopup()}
            className="absolute top-4 right-4 text-2xl"
          />
          <h1 className="text-4xl font-bold text-center mt-5">Create your league</h1>
          <form onSubmit={promptToCreateLeague} className="flex flex-col gap-4 mt-10">
            <h2>League type</h2>
            <div className="flex gap-4 mt-4 justify-center">
              <Chip
                label="Public"
                isSelected={!leagueData.isPrivate}
                onClick={() => typeSelect(false)}
              />
              <Chip
                label="Private"
                isSelected={leagueData.isPrivate}
                onClick={() => typeSelect(true)}
              />
            </div>
            <h2 className="-mt-2">Name</h2>
            <Input
              name="name"
              type="text"
              placeholder="League name"
              value={leagueData.name}
              onChange={changeLeagueData}
            />
            <h2 className="mt-2">Max players</h2>
            <Input
              name="maxPlayers"
              type="number"
              placeholder="10 by default"
              value={leagueData.maxPlayers !== null ? String(leagueData.maxPlayers) : ""}
              onChange={changeLeagueData}
            />
            <div className="mt-5">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}