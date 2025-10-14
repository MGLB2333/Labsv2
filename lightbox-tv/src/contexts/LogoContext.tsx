import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LogoContextType {
  selectedLogo: string;
  setSelectedLogo: (logo: string) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};

interface LogoProviderProps {
  children: ReactNode;
}

export const LogoProvider: React.FC<LogoProviderProps> = ({ children }) => {
  const [selectedLogo, setSelectedLogo] = useState<string>('default');

  return (
    <LogoContext.Provider value={{ selectedLogo, setSelectedLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
