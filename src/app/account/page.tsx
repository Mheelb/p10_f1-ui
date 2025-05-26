"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import AuthPopup from "@/components/popups/AuthPopup";
import userService from "@/services/userService";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import Input from "@/components/common/Input";
import { User } from "@/types/User";

export default function Account() {
  const { isAuthenticated, email, logout } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const logoutHandler = () => {
    logout();
    setIsPopupVisible(false);
    toast.success("Logged out successfully");
  };

  const getUserData = async () => {
    if (email) {
      userService()
        .getAll()
        .then((response) => {
          if (response.status === 200) {
            const user = response.data.find((user: User) => user.email === email);
            if (user) {
              setUserData(user);
            }
          } else {
            console.error("Error fetching user data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

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
    <div className="flex items-center justify-center h-200">
      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-10 text-center">Account Information</h1>
          <div className="mb-4">
            <h2>Username</h2>
            <Input value={userData?.username || ""} disabled={true}></Input>
          </div>
          <div className="mb-10">
            <h2>Email</h2>
            <Input value={userData?.email || ""} disabled={true}></Input>
          </div>
          <Button onClick={logoutHandler} color="secondary" width="40">
            Logout
          </Button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-10 text-center">Account Information</h1>
          <p className="text-center text-gray-600 mb-10">
            Please log in to view your account information.
          </p>
          <Button onClick={togglePopup} color="primary" width="40">
            Log In
          </Button>
          <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup} />
        </div>
      )}
    </div>
  );
}