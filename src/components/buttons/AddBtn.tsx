"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface AddLeagueBtnProps {
    handleClick: () => void;
}

export default function AddLeagueBtn({ handleClick }: AddLeagueBtnProps) {
    return (
        <button onClick={handleClick} className="button button-rounded primary flex justify-center items-center">
            <FaPlus size={24} />
        </button>
    );
}