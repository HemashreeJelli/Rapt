import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function ApplicationTrackerTable() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await api.get("/my-applications");
        setApplications(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadApplications();
  }, []);

  return (
    <div className="tracker-table-wrapper">

      <table className="tracker-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, index) => (

            <tr key={app.id}>
              <td>{index + 1}</td>

              <td>{app.jobs?.title}</td>

              <td>{app.jobs?.companies?.name}</td>

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