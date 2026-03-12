import { useState } from "react"
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleRegister = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5002/users", {
            name,
            email,
            password

        })
        alert("Registration Successful")

    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}