import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }) {
  const location = useLocation();
  const isSetup = location.pathname === "/setup-profile";

  return (
    <div className="layout">

      {/* Left Navigation */}
      {!isSetup && <Navbar />}

      {/* Main Content */}
      <div 
        className="main-content"
        style={isSetup ? { 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          minHeight: "100vh"
        } : {}}
      >
        {children}
      </div>

    </div>
  );
}