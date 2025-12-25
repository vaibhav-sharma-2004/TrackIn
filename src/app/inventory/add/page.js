"use client";

import { useState } from "react";
import { addInventory } from "@/services/inventory.service";
import { useRouter } from "next/navigation";

export default function AddInventoryPage() {
  const router = useRouter();

  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addInventory({
      material,
      quantity: Number(quantity),
      maxQuantity: Number(maxQuantity),
      lastRestock: new Date().toISOString().split("T")[0]
    });

    router.push("/inventory");
  }

  function handleCancel() {
    router.push("/inventory");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Inventory</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Material Name</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={material}
              onChange={e => setMaterial(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
            <input
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              type="number"
              value={maxQuantity}
              onChange={e => setMaxQuantity(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
            <button type="button" onClick={handleCancel} className="ml-3 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
