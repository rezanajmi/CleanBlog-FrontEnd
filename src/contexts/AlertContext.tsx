"use client";

import React, { ReactNode, useContext, useState } from "react";
import { AppModal } from "../components/Common/Modal/AppModal";
import { Button } from "../components/Common/Button/Button";

interface AlertContextModel {
  showAlert: (
    title: string,
    content: string,
    isConfirmed: (result: boolean) => void
  ) => void;
}

interface AlertModel {
  title?: string;
  content?: string;
  isConfirmed: (result: boolean) => void;
}

const initialModel: AlertModel = {
  title: undefined,
  content: undefined,
  isConfirmed: (result: boolean) => {},
};

const AlertContext = React.createContext<AlertContextModel>({
  showAlert: (
    title: string,
    content: string,
    isConfirmed: (result: boolean) => void
  ) => {},
});

export const AlertContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertModel, setAlertModel] = useState<AlertModel>(initialModel);

  const showAlert = (
    title: string,
    content: string,
    isConfirmed: (result: boolean) => void
  ) => {
    setAlertModel({ title, content, isConfirmed });
    setIsOpen(true);
  };

  const cancelHandler = () => {
    setIsOpen(false);
    alertModel.isConfirmed(false);
  };

  const confirmHandler = () => {
    setIsOpen(false);
    alertModel.isConfirmed(true);
  };

  const contextValue: AlertContextModel = {
    showAlert: showAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      <AppModal
        closeModal={cancelHandler}
        title={alertModel.title}
        isOpen={isOpen!}
        hasDefaultCloseButton={false}
      >
        <p>{alertModel.content}</p>
        <div className="text-center mt-3">
          <Button color="gray" label="Yes" onClick={confirmHandler} />
          <Button color="white" label="No" onClick={cancelHandler} />
        </div>
      </AppModal>
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
