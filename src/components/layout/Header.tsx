"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useActiveTab } from '@/context/ActiveTabProvider';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const { activeTab, setActiveTab } = useActiveTab();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (pathname === "/races") {
            setActiveTab("upcoming");
        } else if (pathname === "/leagues") {
            setActiveTab("my-leagues");
        }
    }, [pathname]);

    const handleBack = () => {
        if (isClient) {
            window.history.back();
        }
    };

    return (
        <header className={pathname === "/" || pathname === "/account" ? "h-25" : "h-35"}>
            <div className="flex items-center justify-between w-full">
                {pathname !== "/" && (
                    <IoIosArrowBack
                        className="text-2xl text-white mt-12 ml-2"
                        onClick={handleBack}
                    />
                )}
                <div className="flex-grow flex justify-center mt-12">
                    {pathname === "/" ? (
                        <Image
                            src="/logo.webp"
                            alt="Logo"
                            width={190}
                            height={60}
                            priority
                        />
                    ) : (
                        <h1 className="text-white">
                            {pathname === "/account"
                                ? "account"
                                : pathname === "/races"
                                ? "races"
                                : pathname === "/leagues" 
                                ? "leagues"
                                : "404"}
                        </h1>
                    )}
                </div>
                {pathname !== "/" && <div className="w-8"></div>}
            </div>
            <div>
                {pathname === "/races" ? (
                    <div className="grid grid-cols-2">
                        <h3 className={activeTab === "upcoming" ? "text-center mt-5 pb-3 active" : "text-center mt-5 pb-3"}
                             onClick={() => setActiveTab("upcoming")}>
                                Upcoming
                        </h3>
                        <h3 className={activeTab === "past" ? "text-center mt-5 pb-3 active" : "text-center mt-5 pb-3"}
                             onClick={() => setActiveTab("past")}>
                                Past
                        </h3>
                    </div>
                ) : pathname === "/leagues" ? (
                    <div className="grid grid-cols-3">
                        <h3 className={activeTab === "my-leagues" ? "text-center mt-5 pb-3 active" : "text-center mt-5 pb-3"}
                             onClick={() => setActiveTab("my-leagues")}>
                                My leagues
                        </h3>
                        <h3 className={activeTab === "public-leagues" ? "text-center mt-5 pb-3 active" : "text-center mt-5 pb-3"}
                             onClick={() => setActiveTab("public-leagues")}>
                                public
                        </h3>
                        <h3 className={activeTab === "private-leagues" ? "text-center mt-5 pb-3 active" : "text-center mt-5 pb-3"}
                             onClick={() => setActiveTab("private-leagues")}>
                                private
                        </h3>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </header>
    );
};

export default Header;