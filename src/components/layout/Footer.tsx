"use client";

import { FC } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GiCheckeredFlag } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";
import { MdOutlineHowToVote } from "react-icons/md";
import { GiCharacter } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";

interface FooterProps {}

const Footer: FC<FooterProps> = () =>{
    const router = useRouter();
    const curentPath = usePathname();

    const isActive = (path: string) => {
        return curentPath === path ? 'text-red-500 hover:cursor-pointer' : 'text-black hover:cursor-pointer';
    }

    return (
    <footer className="fixed bottom-0 right-0 left-0 w-full border-t border-red-200">
        <div className="flex items-center justify-between w-full h-16 bg-white px-4 ">
            <IoHomeOutline
                className={isActive('/')}
                size={20}
                onClick={() => router.push('/')}
            />
            <GoTrophy
                className={isActive('/leagues')}
                size={20}
                onClick={() => router.push('/leagues')}
            />
            <GiCheckeredFlag 
                className={isActive('/races')}
                size={25}
                onClick={() => router.push('/races')}
            />
            <MdOutlineHowToVote 
                className={isActive('/vote')}
                size={20}
                onClick={() => router.push('/vote')}
            />
            <GiCharacter 
                className={isActive('/account')}
                size={20}
                onClick={() => router.push('/account')}
            />
        </div>
    </footer>
  )
};

export default Footer;