import React from "react";
import ReactDOM from "react-dom/client";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import EmailPassword, {
  signOut,
} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { PreBuiltRecipes } from "supertokens-auth-react/lib/build/ui/types";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recipeList: any[] = [
  EmailPassword.init({
    signInAndUpFeature: {
      signUpForm: {
        formFields: [
          {
            id: "name",
            label: "Name",
            placeholder: "First name and last name",
          },
          {
            id: "org_name",
            label: "Orgnization Name",
            placeholder: "Enter your orgnization/clinic name",
          },
        ],
      },
    },
    onHandleEvent: async (context) => {
      if (context.action === "SUCCESS") {
        window.location.href = "/dashboard";
        if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
          // Sign out the user and redirect to the auth page
          await signOut();
          window.location.href = "/auth";
        }
      }
    },
  }),
  Session.init({
    tokenTransferMethod: "header", // or "cookie"
  }),
];
const preBuiltUIList: PreBuiltRecipes = [EmailPasswordPreBuiltUI];
if (import.meta.env.VITE_ENABLE_EMAIL_VERIFICATION === "true") {
  recipeList.push(
    EmailVerification.init({
      mode: "REQUIRED", // or "OPTIONAL"
    })
  );
  preBuiltUIList.push(EmailVerificationPreBuiltUI);
}
SuperTokens.init({
  appInfo: {
    appName: "HMS",
    apiDomain: import.meta.env.VITE_BASE_URL,
    websiteDomain: window.location.origin,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList,
  style: `
    [data-supertokens~="superTokensBranding"] {
      display: none !important;
    }
  `,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SuperTokensWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperTokensWrapper>
  </React.StrictMode>
);
