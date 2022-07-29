import "./environment/yupMessages"; // Must execute the setLocale function before importing yup anywhere else
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider, SidebarProvider } from "./providers";
import { Sidebar } from "./components";

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
