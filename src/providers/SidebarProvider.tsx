import { createContext, useCallback, useContext, useState } from "react";
import React from "react";
import { IPageRouteProps } from "../dataDefinitions";

interface ISidebarProviderData {
  toggleSidebar(): void;
  isOpen: boolean;
  closeSidebar(): void;
  sidebarOptions: IPageRouteProps[];
  setSidebarOptions(_: IPageRouteProps[]): void;
}
interface ISidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext({} as ISidebarProviderData);

const SidebarProvider = ({ children }: ISidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOptions, setSidebarOptions] = useState<IPageRouteProps[]>([]);

  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleSetSidebarOptions = useCallback(
    (newSidebarOptions: IPageRouteProps[]) => {
      setSidebarOptions(newSidebarOptions);
    },
    []
  );

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        isOpen,
        sidebarOptions: sidebarOptions,
        setSidebarOptions: handleSetSidebarOptions,
        closeSidebar() {
          setIsOpen(false);
        },
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebarContext = () => useContext(SidebarContext);

export { useSidebarContext, SidebarProvider };
