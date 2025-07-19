"use client";
import React, { useEffect, useState } from "react";

const Suggestions = ({ text }) => {
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        const data = await res.json();

        if (res.ok) {
          setSuggestion(data.suggestion);
        } else {
          setError(data.error || "No suggestions generated.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch AI suggestions.");
      } finally {
        setLoading(false);
      }
    };

    if (text) fetchSuggestions();
  }, [text]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">AI Suggestions</h2>

      {loading && <p className="text-gray-600">Generating suggestions...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-gray-800">
          {suggestion}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
