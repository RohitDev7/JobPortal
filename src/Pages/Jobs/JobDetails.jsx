import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Col, Container, Row, Badge, ListGroup, div } from "react-bootstrap";

function JobDetails() {

  const fetchJobDetails = async () => {
    const res = await axios.get("http://localhost:5002/jobDetails");
    console.log("job details api:", res);
    return res.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["jobDetails"],
    queryFn: fetchJobDetails,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (isError) return <h2 className="text-center mt-5">Error loading data</h2>;

  return (
    <div className="job-details-page py-5">
      <Container>

        {data.map((job) => (
          <Row key={job.id} className="mb-5">

            {/* LEFT SIDE */}
            <Col lg={8}>
              <div className="job-details-page-card">

                <h3>{job.title}</h3>

                {/* <div className="d-flex align-items-center gap-3 mb-3">
                  <div>
                    <h5 className="mb-0">{job.company.name}</h5>
                    <small>{job.location.city}, {job.location.state}</small>
                  </div>
                </div> */}

                                <div className="compnay-header">
                <p>
                  <strong>Company:</strong> {job.company.name}
                </p>

                <p>
                  <strong>Location:</strong> {job.location.city}, {job.location.state},{" "}
                  {job.location.country}
                </p>

                 <p>
                  <strong>Work Mode:</strong> {job.workMode}
                </p>

                <p>
                  <strong>Job Type:</strong> {job.jobType}
                </p>


                <p>
                  <strong>Salary:</strong> {job.salary.currency}{" "}
                  {job.salary.min.toLocaleString()} -{" "}
                  {job.salary.max.toLocaleString()} / {job.salary.period}
                </p>
</div>

              

<div className="compnay-calss">
                <h5 className="mt-2">Skills</h5>
                <div className="company-badge">
                {job.skills.map((skill, i) => (
                  <span className="badges" key={i}>
                    {skill}
                  </span>
                ))}
                </div>
                </div>


<div className="compnay-calss">
                <h5 className="mt-2">Education</h5>
                  <div className="company-badge">
                {job.education.map((edu, i) => (
                  <span className="badges" key={i}>
                    {edu}
                  </span>
                ))}
                </div>
                </div>


<div className="compnay-calss">
                <h5 className="mt-2">Job Highlights</h5>
                <ul>
                  {job.jobHighlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                </div>


<div className="compnay-calss">
                <h5>Description</h5>
                <p>{job.description}</p>
                </div>


<div className="compnay-calss">
                <h5>Responsibilities</h5>
                <ul>
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                </div>

<div className="compnay-calss">
                <h5>Requirements</h5>
                <ul>
                  {job.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                </div>


<div className="compnay-calss">
                <h5>Benefits</h5>
                <ul>
                  {job.benefits.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                </div>

<div className="compnay-calss">
                <h5>Perks</h5>
                <ul>
                  {job.perks.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                </div>


               

                <div className="compnay-calss">
                <h5 className="mt-2">Tags</h5>
                  <div className="company-badge">
                {job.tags.map((tag, i) => (
                  <span className="badges" key={i}>
                    {tag}
                  </span>
                ))}
                </div>
                </div>

              </div>
            </Col>


            <Col lg={4}>

              <div className="p-4 mb-4 shadow-sm text-center">

                <img src={job.company.logo} width="80" className="mx-auto" alt="" />

                <h5 className="mt-3">{job.company.name}</h5>

                <p>{job.company.about}</p>

                <ul className="list-unstyled">
                  <li>
                    <strong>Industry:</strong> {job.company.industry}
                  </li>

                  <li>
                    <strong>Company Size:</strong> {job.company.companySize}
                  </li>

                  <li>
                    <strong>Founded:</strong> {job.company.founded}
                  </li>

                  <li>
                    <strong>Head Office:</strong> {job.company.headOffice}
                  </li>
                </ul>

              </div>

              <div className="p-4 mb-4 shadow-sm">
                <h5>Recruiter</h5>

                <p><strong>{job.recruiter.name}</strong></p>
                <p>{job.recruiter.designation}</p>

                <p>Email: {job.recruiter.email}</p>
                <p>Phone: {job.recruiter.phone}</p>
              </div>


              <div className="p-4 mb-4 shadow-sm">
                <h5>Apply</h5>

                <p>
                  <strong>Method:</strong> {job.application.method}
                </p>

                <p>
                  <strong>Deadline:</strong> {job.application.deadline}
                </p>

                <button variant="primary" className="w-100">
                  Apply Now
                </button>
              </div>

              {/* STATS */}
              <div className="p-4 shadow-sm">
                <h5>Job Stats</h5>

                <p>Views: {job.stats.views}</p>
                <p>Applications: {job.stats.applications}</p>
                <p>Shortlisted: {job.stats.shortlisted}</p>

                <small>
                  Posted: {job.createdAt} | Updated: {job.updatedAt}
                </small>

              </div>

            </Col>

          </Row>
        ))}

      </Container>
    </div>
  );
}

export default JobDetails;