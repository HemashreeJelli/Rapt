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
        <span className="upload-icon">📄</span>
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
          {loading ? "🚀 AI is Analyzing..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
}