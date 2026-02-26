import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";

export default function Upload() {

  const [result, setResult] = useState(null);

  return (
    <div className="container">

      <h1>RAPT Resume Analyzer</h1>

      <UploadBox onResult={setResult} />

      {/* ⭐ SHOW RESULT ONLY WHEN AVAILABLE */}
      {result && (
        <ResultCard
          result={result}
          resumeId={result.resume_id}
        />
      )}

    </div>
  );
}