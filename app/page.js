"use client";
import { useState } from "react";
import { UploadForm } from "@/components/UploadForm";
import { extractTextFromPDF } from "@/utils/parseResume";
import Suggestions from "@/components/Suggestions";
// import { PdfPreview } from "@/components/PdfPreview";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (file) => {
    if (file.type === "application/pdf") {
      setFile(file);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractTextFromPDF(arrayBuffer);
        setResumeText(text);
      } catch (err) {
        console.error("PDF parsing error:", err);
        alert("Failed to extract text from PDF.");
      }
    } else {
      alert("Only PDF parsing supported right now.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      {/* Hero Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          AI-Powered Resume Enhancer
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Upload your resume and get instant AI-driven suggestions to make it
          job-ready.
        </p>
      </section>
      {/* Upload Form */}
      <section className="max-w-xl mx-auto mt-8">
        <UploadForm onUpload={handleUpload} />
      </section>
      {/* Suggestions */}
      {resumeText && (
        <section className="max-w-3xl mx-auto mt-10">
          <Suggestions text={resumeText} />
        </section>
      )}

      {/* Show PDF preview */}
      {/* {file && <PdfPreview file={file} />} */}
      {/* How it Works */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold text-blue-600 mb-2">1. Upload</h3>
            <p className="text-sm text-gray-600">
              Choose your resume in PDF format.
            </p>
          </div>
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold text-blue-600 mb-2">2. Analyze</h3>
            <p className="text-sm text-gray-600">
              AI reads and understands your resume content.
            </p>
          </div>
          <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="text-lg font-bold text-blue-600 mb-2">3. Improve</h3>
            <p className="text-sm text-gray-600">
              Get real-time feedback and improvement suggestions.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600 text-sm">
        Made with 💡 using Next.js & OpenRouter | © 2025 Seema
      </footer>
    </main>
  );
}
