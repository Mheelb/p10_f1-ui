"use client";

import { useActiveTab } from '@/context/ActiveTabProvider';
import { useEffect } from 'react';

export default function Races() {

  const { activeTab, setActiveTab } = useActiveTab();
    
  return (
    <div className='flex justify-center items-center h-screen'>
    </div>
  );
}
