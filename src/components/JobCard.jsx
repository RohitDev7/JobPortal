
import { Link } from "react-router-dom"
export default function JobCard({ job }) {
    return (
        <div className="jobCard">
            <h3>{job.title}</h3>
            <p>{job.companyName}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
        </div>

    )

}