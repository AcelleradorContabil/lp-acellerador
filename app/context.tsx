"use client";
import React, { useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

export type GlobalContextType = {
  isSidebarOpen: boolean;
  loading: boolean;
  modal: unknown;
  isBigScreen: boolean;
  isTabletOrMobile: boolean;
  isMobile: boolean;
  isDragging: boolean;
  setModal: React.Dispatch<React.SetStateAction<unknown>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  closeSidebar: () => void;
  openSidebar: () => void;
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
};

const Context = React.createContext<GlobalContextType | null>(null);

const GlobalContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const setLoadingTrue = () => {
    setLoading(true);
  };
  const setLoadingFalse = () => {
    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        isSidebarOpen,
        loading,
        modal,
        isBigScreen,
        isTabletOrMobile,
        isMobile,
        isDragging,
        setModal,
        setLoadingTrue,
        setLoadingFalse,
        openSidebar,
        closeSidebar,
        setIsDragging,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export { Context, GlobalContextProvider };
