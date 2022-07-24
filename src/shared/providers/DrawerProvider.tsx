import { createContext, useCallback, useContext, useState } from "react";
import React from "react";
import { IPageRouteProps } from "../../dataDefinitions";

interface IDrawerProviderData {
  toggleDrawer(): void;
  isOpen: boolean;
  closeDrawer(): void;
  drawerOptions: IPageRouteProps[];
  setDrawerOptions(_: IPageRouteProps[]): void;
}
interface IDrawerProviderProps {
  children: React.ReactNode;
}

const DrawerContext = createContext<IDrawerProviderData>({
  isOpen: false,
  drawerOptions: [] as IPageRouteProps[],
} as IDrawerProviderData);

const DrawerProvider = ({ children }: IDrawerProviderProps) => {
  const initialProps = useContext(DrawerContext);
  const [isOpen, setIsOpen] = useState(initialProps.isOpen);
  const [drawerOptions, setDrawerOptions] = useState<IPageRouteProps[]>(
    initialProps.drawerOptions
  );

  const toggleDrawer = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IPageRouteProps[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    []
  );

  return (
    <DrawerContext.Provider
      value={{
        toggleDrawer,
        isOpen,
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
        closeDrawer() {
          setIsOpen(false);
        },
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawerContext = () => useContext(DrawerContext);

export { useDrawerContext, DrawerProvider };
