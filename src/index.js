import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom"
import AuthProvider from "./context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(

  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>

)