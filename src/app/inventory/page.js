"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getInventory } from "@/services/inventory.service";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);

  function loadInventory() {
    setInventory(getInventory());
  }

  useEffect(() => {
    loadInventory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Inventory</h1>

        <Link href="/inventory/add">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Add Material</button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Material</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Stock %</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Last Restock</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {inventory.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{item.material}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.quantity}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.stockPercent}%</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${item.status === 'Unavailable' ? 'bg-red-100 text-red-800' : item.status === 'Low' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{item.lastRestock}</td>
                <td className="px-4 py-3 text-sm">
                  <Link href={`/inventory/edit/${item.id}`}>
                    <button className="bg-black text-white px-2 py-1 rounded hover:bg-slate-600">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
