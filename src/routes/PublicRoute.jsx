import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

// export default function PublicRoute({ children }) {

//   const { user } = useContext(AuthContext)

//   if (user) {
//     return <Navigate to="/dashboard" />
//   }

//   return children
// }


export default function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    } else if (user.role === "agency") {
      return <Navigate to="/agency-dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
}