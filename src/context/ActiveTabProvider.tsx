"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveTabContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(undefined);

export const useActiveTab = () => {
  const context = useContext(ActiveTabContext);
  if (!context) {
    throw new Error('useActiveTab must be used within an ActiveTabProvider');
  }
  return context;
};

export const ActiveTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('');
  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};