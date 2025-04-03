import { Routes, Route, Navigate } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import NavBar from "./components/NavBar";

import { SessionAuth } from "supertokens-auth-react/recipe/session";
import VendorList from "./pages/Vendor/List/VendorList"

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
          path="/vendorlist"
          element={
            <SessionAuth>
              <VendorList />
            </SessionAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
