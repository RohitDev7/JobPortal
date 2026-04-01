// import { useContext } from "react"
// import { Navigate } from "react-router-dom"
// import { AuthContext } from "../context/AuthContext"

// export default function PublicRoute({ children }) {

//   const { user } = useContext(AuthContext)

//   if (user) {
//     return <Navigate to="/dashboard" />
//   }

//   return children
// }


// export default function PublicRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (user) {
//     if (user.role === "admin") {
//       return <Navigate to="/admin-dashboard" />;
//     } else if (user.role === "agency") {
//       return <Navigate to="/agency-dashboard" />;
//     } else {
//       return <Navigate to="/agency-dashboard" />;
//     }
//   }

//   return children;
// }


// export default function PublicRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (user) {
//     if (user.role === "admin") {
//       return <Navigate to="/admin-dashboard" />;
//     }
//     if (user.role === "agency") {
//       return <Navigate to="/agency-dashboard" />;
//     }
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {

  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={
      user.role === "admin" ? "/admin-dashboard" :
      user.role === "agency" ? "/agency-dashboard" :
      "/user-dashboard"
    } />;
  }

  return children;
}