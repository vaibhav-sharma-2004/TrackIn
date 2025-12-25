"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  updateProduct
} from "@/services/product.service";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const existing = getProducts().find(
      (p) => p.id === Number(id)
    );
    setProduct(existing);
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    updateProduct(product);
    router.push("/products");
  }

  // 🔹 NEW: Cancel logic
  function handleCancel() {
    router.push("/products");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            value={product.price}
            onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            type="number"
            value={product.quantity}
            onChange={e => setProduct({ ...product, quantity: Number(e.target.value) })}
          />

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={product.materials.join(", ")}
            onChange={e =>
              setProduct({
                ...product,
                materials: e.target.value.split(",").map(m => m.trim())
              })
            }
          />

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

