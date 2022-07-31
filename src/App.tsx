import "./environment/yupMessages"; // Must execute the setLocale function before importing yup anywhere else
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider, SidebarProvider, AuthProvider } from "./providers";
import { PrivateRoute, Sidebar } from "./components";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PrivateRoute>
          <SidebarProvider>
            <BrowserRouter>
              <Sidebar>
                <AppRoutes />
              </Sidebar>
            </BrowserRouter>
          </SidebarProvider>
        </PrivateRoute>
      </ThemeProvider>
    </AuthProvider>
  );
};

export { App };
