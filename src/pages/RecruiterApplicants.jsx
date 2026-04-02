import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function RecruiterApplicants() {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicants, setApplicants] = useState([]);

  // Load recruiter's jobs
  useEffect(() => {

    const loadJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadJobs();
  }, []);

  // Fetch applicants
  const fetchApplicants = async (jobId) => {
    try {
      const res = await api.get(`/recruiter/applicants/${jobId}`);
      setApplicants(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    const jobId = e.target.value;
    setSelectedJob(jobId);
    fetchApplicants(jobId);
  };

  return (
    <div className="container">

      <div className="dashboard-header">
        <h1>Applicant Tracking System</h1>
      </div>

      <div className="analysis-card" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>Filter by Job Posting</h3>
        {/* JOB SEARCH DROPDOWN */}
        <select
          value={selectedJob}
          onChange={handleChange}
          style={{ marginBottom: 0 }}
        >
          <option value="">All Jobs / Select a Job</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} - {job.company_name}
            </option>
          ))}
        </select>
      </div>

      {/* APPLICANTS TABLE */}
      <div className="tracker-table-wrapper">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate</th>
              <th>Job</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", opacity: 0.6 }}>
                  No applicants found for this job.
                </td>
              </tr>
            ) : (
              applicants.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: 500, color: "#fff" }}>{app.profiles?.full_name || "Unknown Candidate"}</td>
                  <td>{app.jobs?.title}</td>
                  <td>
                    <span className={`status-pill ${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}