"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleBack = () => {
        if (isClient) {
            window.history.back();
        }
    };


    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <header className={pathname !== "/" ? "h-35" : "h-25"}>
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
                                : pathname === "/racing"
                                ? "racing"
                                : "404"}
                        </h1>
                    )}
                </div>
                {pathname !== "/" && <div className="w-8"></div>}
            </div>
            <div>
                {pathname === "/racing" ? (
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
                ) : (
                    <div className="h-16"></div>
                )}
            </div>
        </header>
    );
};

export default Header;