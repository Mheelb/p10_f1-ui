"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import AuthPopup from "@/components/AuthPopup";
import userService from "@/services/userService";

export default function Account() {

    const { isAuthenticated, email } = useAuth();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const togglePopup = () => {
      setIsPopupVisible((prev) => !prev);
    };

    const getUserData = async () => {
        if (email) {
            userService().getAll()
                .then((response) => {
                    if (response.status === 200) {
                        const user = response.data.find((user: { email: string }) => user.email === email);
                        if (user) {
                            setUserData({
                                username: user.username,
                                email: user.email,
                            });
                        } else {
                            console.error("User not found");
                        }
                    } else {
                        console.error("Error fetching user data");
                    }
                }
                ).catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getUserData();
        } else {
            setIsPopupVisible(true);
        }
    }, [isAuthenticated]);

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

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Account Information</h1>
            {isAuthenticated ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup}/>
            )}
        </div>
    )
}
