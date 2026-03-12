import { useQuery } from "@tanstack/react-query";
import  API  from "../../config/apiConfig"
import { Link } from "react-router-dom";
export default function JobList() {
    const { data, isLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: async () => {
            const res = await API.get("/jobs")
            return res.data
        }
    })
    if (isLoading) return <h2>Loading...</h2>

    return (
        <div>
            <h1>All Jobs</h1>
            {data.map(job => (
                <div key={job.id}>
                    <h3>{job.title}</h3>
                    <p>{job.companyName}</p>
                    <p>{job.salary}</p>
                    <p>{job.location}</p>
                    <Link to={`/jobs/${job.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}