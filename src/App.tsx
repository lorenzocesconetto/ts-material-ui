import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider, DrawerProvider } from "./shared/providers";
import { Sidebar } from "./shared/components";

const App = () => {
  return (
    <ThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </DrawerProvider>
    </ThemeProvider>
  );
};

export { App };
