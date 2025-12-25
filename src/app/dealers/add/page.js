"use client";

import { useState } from "react";
import { addDealer } from "@/services/dealer.service";
import { useRouter } from "next/navigation";

export default function AddDealerPage() {
  const router = useRouter();

  const [dealerName, setDealerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [materials, setMaterials] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addDealer({
      dealerName,
      companyName,
      phone,
      email,
      materials: materials.split(",").map(m => m.trim())
    });

    router.push("/dealers");
  }

  function handleCancel() {
    router.push("/dealers");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Dealer</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Dealer Name</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={dealerName}
              onChange={e => setDealerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inventory Materials (comma separated)</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Steel, Plastic, Rubber"
              value={materials}
              onChange={e => setMaterials(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Dealer</button>
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
