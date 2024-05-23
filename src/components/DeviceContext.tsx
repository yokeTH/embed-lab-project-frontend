"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface DeviceContextType {
  deviceId: string | null;
  setDeviceId: (id: string | null) => void;
}

export const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined
);

export default function DeviceProvider({ children }: { children: ReactNode }) {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  return (
    <DeviceContext.Provider value={{ deviceId, setDeviceId }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = (): DeviceContextType => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
