
import { useState } from "react";
import { useParams } from "react-router-dom";
import  API  from "../../config/apiConfig"

export default function ApplyJob() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const applyJob = async (e) => {
        e.preventDefault()
        await API.post("/applications", {
            jobId: id,
            name,
            email,
            status: "pending"
        })
        alert("Application Submitted")
    }

    return (

        <form onSubmit={applyJob}>
            <h2>Apply Job</h2>
            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button>Apply</button>
        </form>

    )

}