import { useState } from "react";
import { useParams } from "react-router-dom";
import  API  from "../../config/apiConfig"

export default function BookService() {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [travelDate, setTravelDate] = useState("")
    const [passengers, setPassengers] = useState("1")
    
    const bookService = async (e) => {
        e.preventDefault()
        await API.post("/bookings", {
            serviceId: id,
            customerName: name,
            customerEmail: email,
            travelDate: travelDate,
            passengers: passengers,
            status: "confirmed"
        })
        alert("Booking Confirmed! Check your email for details.")
    }

    return (

        <form onSubmit={bookService}>
            <h2>Book Travel Service</h2>
            <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                placeholder="Travel Date"
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                required
            />
            <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                required
            >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5+ Passengers</option>
            </select>
            <button>Confirm Booking</button>
        </form>

    )

}