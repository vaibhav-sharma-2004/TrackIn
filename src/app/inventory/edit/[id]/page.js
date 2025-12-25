"use client";

import { useEffect, useState } from "react";
import {
  getInventory,
  updateInventory
} from "@/services/inventory.service";
import { useParams, useRouter } from "next/navigation";

export default function EditInventoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const inventoryId = Number(id);

  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");

  useEffect(() => {
    const item = getInventory().find(i => i.id === inventoryId);
    if (!item) return;

    setMaterial(item.material);
    setQuantity(item.quantity);       // ✅ load current quantity
    setMaxQuantity(item.maxQuantity);
  }, [inventoryId]);

  function handleUpdate(e) {
  e.preventDefault();

  if (Number(quantity) > Number(maxQuantity)) {
    alert("Current quantity cannot be greater than max capacity");
    return;
  }

  try {
    updateInventory(inventoryId, {
      material,
      quantity: Number(quantity),
      maxQuantity: Number(maxQuantity)
    });

    router.push("/inventory");
  } catch (err) {
    alert(err.message);
  }
}


  function handleCancel() {
    router.push("/inventory");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Inventory</h1>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-sm">
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
            <label className="block text-sm font-medium text-gray-700">Current Quantity</label>
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
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

