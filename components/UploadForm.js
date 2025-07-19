"use client";
import React, { useState } from "react";

export const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      await onUpload(file);
    } catch (err) {
      setError("Failed to upload and analyze the resume.");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <label className="block text-sm font-medium text-gray-700">
        Upload your Resume (PDF)
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />

      {fileName && (
        <p className="text-sm text-green-600">Selected: {fileName}</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-blue-600">Analyzing...</p>}

      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Upload Resume
      </button>
    </form>
  );
};
