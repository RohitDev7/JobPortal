import { useState } from "react"
import axios from "axios"

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await axios.get(
            `http://localhost:5002/users?email=${email}&password=${password}`
        )
        if (res.data.length > 0) {
            alert("Login Successful")
        } else {
            alert("Invalid Email or Password")
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}