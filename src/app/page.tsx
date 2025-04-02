"use client";

import AuthPopup from '@/components/AuthPopup';
import BetCard from '@/components/BetCard';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';

export default function Home() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

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
    <div className="flex flex-col justify-center items-center h-screen bg-image">
      <BetCard />
      <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup}/>
      <Button onClick={togglePopup} width="40">Open Auth Popup</Button>
    </div>
  );
}