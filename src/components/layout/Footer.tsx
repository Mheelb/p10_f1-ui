"use client";

import { FC } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiCheckeredFlag } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { MdOutlineHowToVote } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";


interface FooterProps {}

const Footer: FC<FooterProps> = () =>{
  
  
    return (
    <footer className="fixed bottom-0 right-0 left-0 w-full">
        <div className="flex items-center justify-between w-full h-16 bg-red-500 text-white px-4">
            <IoHomeOutline
                className="hover:cursor-pointer"
                size={20}
                onClick={() => {
                    window.location.href = "/";
                }}
            />
            <GoTrophy
                className="hover:cursor-pointer"
                size={20}
                onClick={() => {
                    window.location.href = "/leagues";
                }}
            />
            <GiCheckeredFlag 
                className="hover:cursor-pointer"
                size={25}
                onClick={() => {
                    window.location.href = "/races";
                }}
            />
            <MdOutlineHowToVote 
                className="hover:cursor-pointer"
                size={20}
                onClick={() => {
                    window.location.href = "/vote";
                }}
            />
            <GiCharacter 
                className="hover:cursor-pointer"
                size={20}
                onClick={() => {
                    window.location.href = "/account";
                }}
            />
        </div>
    </footer>
  )
};

export default Footer;