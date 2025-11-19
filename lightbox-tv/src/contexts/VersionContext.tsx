import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Version = 'v1' | 'v2';

interface VersionContextType {
  version: Version;
  setVersion: (version: Version) => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

export const VersionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [version, setVersion] = useState<Version>('v1');

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = () => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};


