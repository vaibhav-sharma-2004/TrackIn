"use client";

import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  toggleProductStatus
} from "@/services/product.service";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  function loadProducts() {
    setProducts(getProducts());
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleDelete(id) {
    if (confirm("Delete this product?")) {
      deleteProduct(id);
      loadProducts();
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Link href="/products/add">
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Add Product</button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Materials</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Quantity</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{p.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">₹{p.price}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.materials.join(", ")}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.quantity}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    className={`px-2 py-1 rounded text-sm font-medium ${p.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    onClick={() => {
                      toggleProductStatus(p.id);
                      loadProducts();
                    }}
                  >
                    {p.available ? "Available" : "Unavailable"}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <Link href={`/products/edit/${p.id}`}>
                    <button className="bg-black text-white px-2 py-1 rounded hover:bg-slate-600">Edit</button>
                  </Link>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




