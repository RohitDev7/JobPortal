// import { createContext, useState } from "react";
// import { applyJob } from "../services/applicationService";

// export const ApplicationContext = createContext();

// export const ApplicationProvider = ({ children }) => {

//     const [applications, setApplications] = useState([]);

//     const submitApplication = async (data) => {
//         const res = await applyJob(data);
//         setApplications([...applications, res]);
//     }

//     return (
//         <ApplicationContext.Provider value={{ applications, submitApplication }}>
//             {children}
//         </ApplicationContext.Provider>
//     )

// }