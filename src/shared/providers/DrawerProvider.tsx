import { createContext, useCallback, useContext, useState } from "react";
import React from "react";

interface IDrawerProviderData {
  toggleDrawer?(): void;
  isOpen: boolean;
}
interface IDrawerProviderProps {
  children: React.ReactNode;
}

const DrawerContext = createContext<IDrawerProviderData>({ isOpen: false });

const DrawerProvider = ({ children }: IDrawerProviderProps) => {
  const initialProps = useContext(DrawerContext);
  const [isOpen, setIsOpen] = useState(initialProps.isOpen);

  const toggleDrawer = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <DrawerContext.Provider value={{ toggleDrawer, isOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawerContext = () => useContext(DrawerContext);

export { useDrawerContext, DrawerProvider };
