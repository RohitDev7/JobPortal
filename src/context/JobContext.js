// import { createContext, useState, useEffect } from "react";
// import { getJobs } from "../backup/services/jobService";

// export const JobContext = createContext();

// export const JobProvider = ({ children }) => {

//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         fetchJobs();
//     }, [])

//     const fetchJobs = async () => {
//         const data = await getJobs();
//         setJobs(data);
//     }

//     return (
//         <JobContext.Provider value={{ jobs, fetchJobs }}>
//             {children}
//         </JobContext.Provider>
//     )

// }