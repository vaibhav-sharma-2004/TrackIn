"use client";

import { useState } from "react";
import { addReport } from "@/services/report.service";
import { useRouter } from "next/navigation";

export default function AddReportPage() {
  const router = useRouter();

  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addReport({
      issue,
      description,
      date: new Date().toISOString().split("T")[0]
    });

    router.push("/reports");
  }

  function handleCancel() {
    router.push("/reports");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Report an Issue</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={issue}
              onChange={e => setIssue(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="flex items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-3 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
