import { useState } from "react";
import api from "../api/axios";
import "./UploadBox.css";

export default function UploadBox({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const uploadRes = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const resume_id = uploadRes.data.file_id;

      const analysisRes = await api.post(
        `/analyze-resume/${resume_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onResult(analysisRes.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-label">
        <input
          className="file-input"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="upload-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </span>
        <span className="upload-title">
          Click to browse or drag and drop
        </span>
        <span className="upload-subtitle">PDF files only (Max 5MB)</span>
      </label>
      
      {file && (
        <div className="file-name-display">
          Selected: {file.name}
        </div>
      )}

      <div className="analyze-row">
        <button 
          className="upload-btn analyze-btn" 
          onClick={uploadResume} 
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
}