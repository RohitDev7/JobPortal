import { Routes, Route } from "react-router-dom";
import ServiceDetails from "./Pages/Services/ServiceDetails";
import BookService from "./Pages/Services/BookService";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./components/Navbar";
// import NotFound from "./Pages/NotFound";
import Homepage from "./Pages/Homepage";
import ServiceList from "./Pages/Services/ServiceList";

export default function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Homepage/>} />
        <Route path="/services" element={<ServiceList/>} />        
        <Route path="/service-details/:id" element={<ServiceDetails />} />
        <Route path="/book/:id" element={<BookService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  )

}