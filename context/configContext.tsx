"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

const defaultValue = {
  DURATION_IN_FRAMES: 300,
  VIDEO_WIDTH: 1280,
  VIDEO_HEIGHT: 720,
  VIDEO_FPS: 30,
};

interface ConfigContextProps {
  config: typeof defaultValue;
  setConfig: React.Dispatch<React.SetStateAction<typeof defaultValue>>;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState(defaultValue);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a configContext");
  }
  return context;
};
