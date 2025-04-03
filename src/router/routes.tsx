// import SuperTokens from "supertokens-auth-react";

// import EmailPassword, {
//   signOut,
// } from "supertokens-auth-react/recipe/emailpassword";
// import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
// import { PreBuiltRecipes } from "supertokens-auth-react/lib/build/ui/types";
// import EmailVerification from "supertokens-auth-react/recipe/emailverification";
// import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
// import Dashboard from "../components/Dashboard";
// import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
// import { createBrowserRouter } from "react-router-dom";
// import * as reactRouterDom from "react-router-dom";
// import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
// import type { RouteObject } from "react-router-dom";

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const recipeList: any[] = [
//   EmailPassword.init({
//     signInAndUpFeature: {
//       signUpForm: {
//         formFields: [
//           {
//             id: "name",
//             label: "Name",
//             placeholder: "First name and last name",
//           },
//           {
//             id: "org_name",
//             label: "Orgnization Name",
//             placeholder: "Enter your orgnization/clinic name",
//           },
//         ],
//       },
//     },
//     onHandleEvent: async (context) => {
//       if (context.action === "SUCCESS") {
//         if (context.isNewRecipeUser && context.user.loginMethods.length === 1) {
//           // Sign out the user and redirect to the auth page
//           await signOut();
//           window.location.href = "/auth";
//         }
//       }
//     },
//   }),
//   Session.init({
//     tokenTransferMethod: "header", // or "cookie"
//   }),
// ];
// const preBuiltUIList: PreBuiltRecipes = [EmailPasswordPreBuiltUI];
// if (import.meta.env.VITE_ENABLE_EMAIL_VERIFICATION === "true") {
//   recipeList.push(
//     EmailVerification.init({
//       mode: "REQUIRED", // or "OPTIONAL"
//     })
//   );
//   preBuiltUIList.push(EmailVerificationPreBuiltUI);
// }
// SuperTokens.init({
//   appInfo: {
//     appName: "HMS",
//     apiDomain: import.meta.env.VITE_BASE_URL,
//     websiteDomain: window.location.origin,
//     apiBasePath: "/auth",
//     websiteBasePath: "/auth",
//   },
//   recipeList,
//   style: `
//     [data-supertokens~="superTokensBranding"] {
//       display: none !important;
//     }
//   `,
// });
// const router = createBrowserRouter([
//   /**
//    * getSuperTokensRoutesForReactRouterDom - superTokens have a function for return the route and element
//    * r.props object - props object have element and route. Element have reactComponent as object not as jsx for instance React.createElement like the way. route have respective routes
//    * finnaly it will return element and routes as array(eg.. /auth, /auth/resetPasword)
//    */
//   ...getSuperTokensRoutesForReactRouterDom(reactRouterDom, preBuiltUIList).map(
//     (r) => r.props as RouteObject
//   ),
//   {
//     path: "/",
//     element: (
//       <SessionAuth>
//         <Dashboard />
//       </SessionAuth>
//     ),
//     children: [
//       {
//         path: "/",
//         element: <Dashboard />,
//       },
//     ],
//   },
// ]);
// export default router;
