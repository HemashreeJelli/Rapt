import { useState } from "react";
import api from "../api/axios";

export default function UploadBox({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      // ⭐ GET TOKEN FROM LOGIN (stored in localStorage)
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token); // optional debug

      // STEP 1 — Upload file
      const uploadRes = await api.post("/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ⭐ IMPORTANT FIX
        },
      });

      const resume_id = uploadRes.data.file_id;

      // STEP 2 — Call analysis endpoint
      const analysisRes = await api.post(
        `/analyze-resume/${resume_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ⭐ ALSO REQUIRED HERE
          },
        }
      );

      // STEP 3 — Send result to ResultCard
      onResult(analysisRes.data);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadResume}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}