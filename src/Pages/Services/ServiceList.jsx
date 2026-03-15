import { useQuery } from "@tanstack/react-query";
import  API  from "../../config/apiConfig"
import { Link } from "react-router-dom";

export default function ServiceList() {
    const { data, isLoading } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await API.get("/services")
            return res.data
        }
    })
    
    if (isLoading) return <h2>Loading...</h2>

    return (
        <div>
            <h1>All Travel Services</h1>
            {data.map(service => (
                <div key={service.id}>
                    <h3>{service.title}</h3>
                    <p><strong>Provider:</strong> {service.providerName}</p>
                    <p><strong>Price:</strong> {service.price}</p>
                    <p><strong>Route:</strong> {service.location}</p>
                    <p><strong>Type:</strong> {service.type}</p>
                    <p><strong>Duration:</strong> {service.duration}</p>
                    <Link to={`/service-details/${service.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}