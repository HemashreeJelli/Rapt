import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load resume + jobs
  useEffect(() => {

    const init = async () => {
      try {

        // Get latest resume
        const resumeRes = await api.get("/my-resumes");

        if(resumeRes.data.length){
          setResumeId(resumeRes.data[0].id);
        }

        // Get jobs
        const jobRes = await api.get("/jobs");
        setJobs(jobRes.data);

      } catch(e){
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();

  },[]);

  console.log("RESUME ID:", resumeId);

  // Apply function
  const apply = async (jobId) => {
    try {

      await api.post(`/apply/${jobId}`, {
        resume_id: resumeId
      });

      alert("Applied successfully");

    } catch (e) {

      console.log("FULL ERROR:", e.response);

      const msg =
        e.response?.data?.detail ||
        "Something went wrong";

      alert(msg);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Job Listings</h1>

      <div className="jobs-grid">

        {jobs.map(job => (
          <div key={job.id} className="job-card">

            <h3>{job.title}</h3>

            <p className="company">
              {job.companies?.name || "Company"}
            </p>

            <button
              className="apply-btn"
              disabled={!resumeId}
              onClick={() => apply(job.id)}
            >
              {resumeId ? "Apply" : "Loading..."}
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}