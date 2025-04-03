// import { signOut } from "supertokens-auth-react/recipe/emailpassword";
// import { useSessionContext } from "supertokens-auth-react/recipe/session";

// export default function NavBar() {
//   const session = useSessionContext();

//   async function handleLogout() {
//     await signOut();
//     window.location.href = "/";
//   }

//   return (
//     <nav
//       style={{
//         padding: "1rem",
//         background: "#f0f0f0",
//         display: "flex",
//         justifyContent: "flex-end",
//         gap: "1rem",
//       }}
//     >
//       {session.loading ? (
//         <div>Loading...</div>
//       ) : session.doesSessionExist ? (
//         <>
//           <span>Welcome!</span>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <a href="/auth">Login</a>
//       )}
//     </nav>
//   );
// }
