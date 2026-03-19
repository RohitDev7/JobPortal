import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet
} from "@tanstack/react-router"

import Homepage from "./Pages/Homepage"
import ServiceList from "./Pages/Services/ServiceList"
import ServiceDetails from "./Pages/Services/ServiceDetails"
import BookService from "./Pages/Services/BookService"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import Navbar from "./components/Navbar"
import DashboardPage from "./Pages/Dashboard/DashboardPage"

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
       <div>
        <Outlet />
      </div>
    </>
  )
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
})

const serviceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/service",
  component: ServiceList,
})

const serviceDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/service-details/$id",
  component: ServiceDetails,
})

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/$id",
  component: BookService,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
})

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
})



const routeTree = rootRoute.addChildren([
  indexRoute,
  serviceRoute,
  serviceDetailsRoute,
  bookRoute,
  loginRoute,
  registerRoute,
  dashboardRoute
])

export const router = createRouter({
  routeTree,
})