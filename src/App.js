import "./App.css";
import routes from "./Routes/routes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth } from "./context/Auth.Context";
import Layout from "./Layout/layout.component";
import ShopLayout from "./Layout/shoplayout.component";

// Import Google OAuth Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const { isAuthenticated, userType } = Auth();

  // Google Client ID from environment variables
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <div className="app">
      {/* Wrap the entire app with GoogleOAuthProvider */}
      <GoogleOAuthProvider clientId="add your client id here">
        <Router>
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              {routes.map(
                (featu) =>
                  featu.type === "public" && (
                    <Route
                      key={featu.path}
                      element={featu.element}
                      path={featu.path}
                      exact={featu.exact}
                    />
                  )
              )}
            </Route>

            <Route
              element={
                <ShopLayout>
                  <Outlet />
                </ShopLayout>
              }
            >
              {isAuthenticated &&
                routes.map(
                  (featu) =>
                    featu.type === "private" && (
                      <Route
                        key={featu.path}
                        element={featu.element}
                        path={featu.path}
                        exact={featu.exact}
                      />
                    )
                )}
            </Route>
          </Routes>

          <ToastContainer />
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
