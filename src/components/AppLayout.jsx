import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="layout">

      {/* Left Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>

    </div>
  );
}