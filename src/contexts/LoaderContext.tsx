"use client";

import { BackdropLoader } from "@/components/Common/Backdrop/BackdropLoader";
import React, { ReactNode, useContext, useState } from "react";

interface BackdropLoaderContextModel {
  loading?: boolean;
  show: () => void;
  hide: () => void;
}

const initialModel: BackdropLoaderContextModel = {
  loading: false,
  show: () => {},
  hide: () => {},
};

const BackdropLoaderContext =
  React.createContext<BackdropLoaderContextModel>(initialModel);

export const BackdropLoaderContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showHandler = () => {
    setLoading(true);
  };

  const hideHandler = () => {
    setLoading(false);
  };

  const contextValue: BackdropLoaderContextModel = {
    loading: loading,
    show: showHandler,
    hide: hideHandler,
  };

  return (
    <BackdropLoaderContext.Provider value={contextValue}>
      <BackdropLoader loading={loading} />
      {children}
    </BackdropLoaderContext.Provider>
  );
};

function useBackdropLoader() {
  return useContext(BackdropLoaderContext);
}

export default useBackdropLoader;
