"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDealers } from "@/services/dealer.service";

export default function DealersPage() {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    setDealers(getDealers());
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Dealers</h1>

        <Link href="/dealers/add">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Add Dealer</button>
        </Link>
      </div>

      {dealers.length === 0 ? (
        <p className="text-gray-600">No dealers added</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Dealer Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Company</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Inventory Materials</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {dealers.map(dealer => (
                <tr key={dealer.id}>
                  <td className="px-4 py-3 text-sm text-gray-700">{dealer.dealerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{dealer.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{dealer.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{dealer.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{dealer.materials.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
