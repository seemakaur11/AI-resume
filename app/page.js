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
      // setFile(file);
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
    // <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
    //   {/* Hero Section */}
    //   <section className="text-center py-10">
    //     <h1 className="text-4xl font-bold text-blue-700 mb-4">
    //       AI-Powered Resume Enhancer
    //     </h1>
    //     <p className="text-lg text-gray-700 max-w-xl mx-auto">
    //       Upload your resume and get instant AI-driven suggestions to make it
    //       job-ready.
    //     </p>
    //   </section>
    //   {/* Upload Form */}
    //   <section className="max-w-xl mx-auto mt-8">
    //     <UploadForm onUpload={handleUpload} />
    //   </section>
    //   {/* Suggestions */}
    //   {resumeText && (
    //     <section className="max-w-3xl mx-auto mt-10">
    //       <Suggestions text={resumeText} />
    //     </section>
    //   )}

    //   {/* Show PDF preview */}
    //   {/* {file && <PdfPreview file={file} />} */}
    //   {/* How it Works */}
    //   <section className="mt-20 text-center">
    //     <h2 className="text-2xl font-semibold text-blue-800 mb-6">
    //       How It Works
    //     </h2>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
    //       <div className="bg-white shadow p-5 rounded-lg">
    //         <h3 className="text-lg font-bold text-blue-600 mb-2">1. Upload</h3>
    //         <p className="text-sm text-gray-600">
    //           Choose your resume in PDF format.
    //         </p>
    //       </div>
    //       <div className="bg-white shadow p-5 rounded-lg">
    //         <h3 className="text-lg font-bold text-blue-600 mb-2">2. Analyze</h3>
    //         <p className="text-sm text-gray-600">
    //           AI reads and understands your resume content.
    //         </p>
    //       </div>
    //       <div className="bg-white shadow p-5 rounded-lg">
    //         <h3 className="text-lg font-bold text-blue-600 mb-2">3. Improve</h3>
    //         <p className="text-sm text-gray-600">
    //           Get real-time feedback and improvement suggestions.
    //         </p>
    //       </div>
    //     </div>
    //   </section>
    //   {/* Footer */}
    //   <footer className="mt-16 text-center text-gray-600 text-sm">
    //     Made with 💡 using Next.js & OpenRouter | © 2025 Seema
    //   </footer>
    // </main>
     
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-6 font-sans">
      {/* Hero Section */}
      <section className="text-center py-14 bg-indigo-100 rounded-xl shadow-md">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          AI Resume Enhancer
        </h1>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          Upload your resume and get instant, AI-powered suggestions to improve
          your job chances.
        </p>
      </section>

      {/* Upload Section */}
      <section className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
          Upload Your Resume (PDF)
        </h2>
        <UploadForm onUpload={handleUpload} />
      </section>

      {/* AI Suggestions Section */}
      {resumeText && (
        <section className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
        
          <Suggestions text={resumeText} />
        </section>
      )}

      {/* How It Works */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-purple-800">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[
            {
              title: "1. Upload",
              desc: "Choose your resume in PDF format.",
            },
            {
              title: "2. Analyze",
              desc: "AI reads and understands your resume.",
            },
            {
              title: "3. Improve",
              desc: "Get improvement tips to stand out.",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        Made with 💙 using Next.js & OpenRouter | © 2025 Seema
      </footer>
    </main>


  );
}
