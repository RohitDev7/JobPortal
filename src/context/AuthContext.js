import { createContext, useState, useEffect } from "react"
import API from "../config/apiConfig"
export const AuthContext = createContext()
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])
    const login = async (email, password) => {
        const res = await API.get(`/users?email=${email}&password=${password}`)
        if (res.data.length > 0) {
            setUser(res.data[0])
            localStorage.setItem("user", JSON.stringify(res.data[0]))
            return true

        }
        return false
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")

    }
    return (

        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>

    )

}