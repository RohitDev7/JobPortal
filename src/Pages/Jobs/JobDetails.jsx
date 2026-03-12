import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../config/apiConfig";
export default function JobDetails() {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ["job", id],
        queryFn: async () => {
            const res = await API.get(`/jobs/${id}`)
            return res.data
        }
    })
    if (isLoading) return <h2>Loading...</h2>

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.companyName}</p>
            <p>{data.location}</p>
            <p>{data.salary}</p>
            <p>{data.description}</p>
        </div>

    )

}