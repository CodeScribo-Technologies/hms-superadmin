import { Routes, Route, Navigate } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import NavBar from "./components/NavBar";

import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        {/* Redirect root path to /auth */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* SuperTokens Auth Routes */}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          EmailPasswordPreBuiltUI,
        ])}

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <SessionAuth>
              <Dashboard />
            </SessionAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
