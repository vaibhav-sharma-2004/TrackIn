"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getReports,
  updateReportStatus
} from "@/services/report.service";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  function loadReports() {
    setReports(getReports());
  }

  useEffect(() => {
    loadReports();
  }, []);

  function handleStatusChange(id, status) {
    updateReportStatus(id, status);
    loadReports();
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Reports</h1>

        <Link href="/reports/add">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Report Issue</button>
        </Link>
      </div>

      {reports.length === 0 ? (
        <p className="text-gray-600">No issues reported</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Issue</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Description</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {reports.map(report => (
                <tr key={report.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.issue}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{report.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
                      value={report.status}
                      onChange={e =>
                        handleStatusChange(report.id, e.target.value)
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
