import { Routes, Route } from "react-router-dom";
import JobDetails from "./Pages/Jobs/JobDetails";
import ApplyJob from "./Pages/Jobs/ApplyJob";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./components/Navbar";
// import NotFound from "./Pages/NotFound";
import Homepage from "./Pages/Homepage";
import JobList from "./Pages/Jobs/JobList";
export default function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Homepage/>} />
        <Route path="/jobs" element={<JobList/>} />        
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<ApplyJob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  )

}