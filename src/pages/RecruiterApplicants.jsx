import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function RecruiterApplicants() {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicants, setApplicants] = useState([]);

  // 🔹 load recruiter's jobs
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

  // 🔹 fetch applicants
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

      <h1>Applicants</h1>

      {/* JOB SEARCH DROPDOWN */}
      <select
        value={selectedJob}
        onChange={handleChange}
        className="job-select"
      >
        <option value="">Select Job</option>

        {jobs.map(job => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}

      </select>

      {/* APPLICANTS TABLE */}
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
          {applicants.map((app, index) => (

            <tr key={app.id}>
              <td>{index + 1}</td>

              <td>{app.profiles?.full_name || "Candidate"}</td>

              <td>{app.jobs?.title}</td>

              <td>
                <span className={`status-pill ${app.status}`}>
                  {app.status}
                </span>
              </td>
            </tr>

          ))}
        </tbody>

      </table>

    </div>
  );
}