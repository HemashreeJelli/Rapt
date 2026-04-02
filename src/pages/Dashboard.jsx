import { useNavigate } from "react-router-dom";
import ApplicationTracker from "../components/ApplicationTracker.jsx";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="container">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      {/* Application Tracker Section */}
      <div className="applications-section">
  <h2>My Applications</h2>
  <ApplicationTracker />
</div>

    </div>
  );
}