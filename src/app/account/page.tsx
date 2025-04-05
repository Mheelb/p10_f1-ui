"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import AuthPopup from "@/components/AuthPopup";
import userService from "@/services/userService";
import Button from "@/components/common/Button";
import { toast } from 'react-toastify';

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

    const { logout } = useAuth();

    const logoutHandler = () => {
        logout();
        setIsPopupVisible(false);
        toast.success("Logged out successfully");
    }


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
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Account Information</h1>
            {isAuthenticated ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-2"><strong>Username:</strong> JohnDoe</p>
                    <p className="mb-4"><strong>Email:</strong> johndoe@example.com</p>
                    <Button onClick={logoutHandler} color="secondary" width="40">
                        Logout
                    </Button>
                </div>
            ) : (
                <>
                    <p className="text-center text-gray-600 mb-4">Please log in to view your account information.</p>
                    <Button onClick={togglePopup} color="primary" width="40">
                        Log In
                    </Button>
                    <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup} />
                </>
            )}
        </div>
    )
}
