"use client";

import { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import Input from "../common/Input";
import Chip from "../common/Chip";
import { toast } from "react-toastify";
import Button from "../common/Button";
import { useActiveTab } from "@/context/ActiveTabProvider";
import { FaCopy } from "react-icons/fa";
import { League } from "@/types/League";
import leagueService from "@/services/leagueService";
import eventEmitter from "@/utils/eventEmitter";

interface AddLeaguePopupProps {
  isVisible: boolean;
  togglePopup: () => void;
}

export default function AddLeaguePopup({ isVisible, togglePopup }: AddLeaguePopupProps) {
  const { activeTab } = useActiveTab();

  const [leagueToSubmit, setLeagueToSubmit] = useState<League>({
    id: "",
    leagueName: "",
    isPrivate: false,
    sharedLink: "",
    users: [],
    maxParticipants: 10,
  });

  const [isClosing, setIsClosing] = useState(false);
  const [displayCode, setDisplayCode] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      togglePopup();
      resetLeagueToSubmit();
      setIsClosing(false);
    }, 400);
  };

  const typeSelect = (isPrivate: boolean) => {
    setLeagueToSubmit((prev) => ({
      ...prev,
      isPrivate,
      isPrivate,
    }));
  };

  const changeLeagueToSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeagueToSubmit((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value) || 0 : value,
    }));
  };

  const resetLeagueToSubmit = () => {
    setLeagueToSubmit({
      id: "",
      leagueName: "",
      isPrivate: false,
      sharedLink: "",
      users: [],
      maxParticipants: 10,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let league = leagueToSubmit;

    if (leagueToSubmit.leagueName.length < 3) {
      toast.error("League name must be at least 3 characters long");
      return;
    }
    if (leagueToSubmit.maxParticipants < 2) {
      toast.error("League must have at least 2 participants");
      return;
    }
    if (leagueToSubmit.maxParticipants > 100) {
      toast.error("League cannot have more than 100 participants");
      return;
    }

    league.leagueName = league.leagueName.trim();
    league.maxParticipants = league.maxParticipants ? league.maxParticipants : 10;

    promptToCreateLeague(league);
  };

  const promptToCreateLeague = (leagueToCreate: League) => {
    leagueService().createLeague(leagueToCreate.leagueName, leagueToCreate.isPrivate, leagueToCreate.maxParticipants)
      .then((response) => {
        if (response.status === 200) {
          const joinCode = response.data.joinCode;
          toast.success("League created successfully");
          setInvitationLink(`https://p10fantasy.com/join/${joinCode}`);
          setDisplayCode(true);
          eventEmitter.emit("create-league");
          eventEmitter.emit("refresh-league");
        } else {
          toast.error(response.error.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
    setLeagueToSubmit((prev) => ({
      ...prev,
      isPrivate: activeTab === "private-leagues",
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
          <form onSubmit={submitForm} className="flex flex-col gap-4 mt-10">
            <h2>League type</h2>
            <div className="flex gap-4 mt-4 justify-center">
              <Chip
                label="Public"
                isSelected={!leagueToSubmit.isPrivate}
                onClick={() => typeSelect(false)}
              />
              <Chip
                label="Private"
                isSelected={leagueToSubmit.isPrivate}
                onClick={() => typeSelect(true)}
              />
            </div>
            <h2 className="-mt-2">Name</h2>
            <Input
              name="leagueName"
              type="text"
              placeholder="League name"
              value={leagueToSubmit.leagueName}
              onChange={changeLeagueToSubmit}
            />
            <h2 className="mt-2">Max players</h2>
            <Input
              name="maxParticipants"
              type="number"
              placeholder="10 by default"
              value={leagueToSubmit.maxParticipants !== null ? String(leagueToSubmit.maxParticipants) : ""}
              onChange={changeLeagueToSubmit}
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