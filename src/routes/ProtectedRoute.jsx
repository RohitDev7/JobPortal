// import { useContext } from "react"
// import { Navigate } from "react-router-dom"
// import { AuthContext } from "../context/AuthContext"

// export default function ProtectedRoute({ children, role }) {

//   const { user } = useContext(AuthContext)

//   if (!user) {
//     return <Navigate to="/login" />
//   }

//   if (role && user.role !== role) {
//     return <Navigate to="/dashboard" />
//   }

//   return children
// }


import { redirect } from "@tanstack/react-router"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,

  beforeLoad: ({ context }) => {
    const { user } = context.auth

    if (!user) {
      throw redirect({
        to: "/login",
      })
    }
  },
})