import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider, SidebarProvider } from "./shared/providers";
import { Sidebar } from "./shared/components";

const App = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export { App };
