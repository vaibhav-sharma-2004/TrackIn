"use client";

import { useState } from "react";
import { addProduct } from "@/services/product.service";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [materials, setMaterials] = useState("");
  const [quantity, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addProduct({
      name,
      price: Number(price),
      quantity: Number(quantity),
      materials: materials.split(",").map(m => m.trim())
    });

    router.push("/products");
  }


  function handleCancel() {
    router.push("/products");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            placeholder="Inventory Quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Materials (comma separated)"
            value={materials}
            onChange={e => setMaterials(e.target.value)}
            required
          />

          <div className="flex items-center">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
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



