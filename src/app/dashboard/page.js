"use client";

import { useEffect, useState } from "react";
import { getInventory } from "@/services/inventory.service";
import { getProducts } from "@/services/product.service";
import { getDealers } from "@/services/dealer.service";
import { getReports } from "@/services/report.service";

export default function DashboardPage() {
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setInventory(getInventory());
    setProducts(getProducts());
    setDealers(getDealers());
    setReports(getReports());
  }, []);


  const lowStock = inventory.filter(i => i.status === "Low").length;
  const unavailableStock = inventory.filter(i => i.status === "Unavailable").length;

  const availableProducts = products.filter(p => p.available).length;
  const unavailableProducts = products.filter(p => !p.available).length;


  const openReports = reports.filter(r => r.status === "Open").length;
  const inProgressReports = reports.filter(r => r.status === "In Progress").length;
  const closedReports = reports.filter(r => r.status === "Closed").length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg mb-2 font-black text-black">Inventory Overview</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Total Materials: <span className="font-semibold">{inventory.length}</span></li>
            <li>Low Stock: <span className="text-yellow-600 font-medium">{lowStock}</span></li>
            <li>Unavailable: <span className="text-red-600 font-medium">{unavailableStock}</span></li>
          </ul>
        </section>

       
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg mb-2 font-bold text-black">Products Overview</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Total Products: <span className="font-semibold">{products.length}</span></li>
            <li>Available: <span className="text-green-600 font-medium">{availableProducts}</span></li>
            <li>Unavailable: <span className="text-red-600 font-medium">{unavailableProducts}</span></li>
          </ul>
        </section>

       
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg mb-2 font-bold text-black">Dealers Overview</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Total Dealers: <span className="font-semibold">{dealers.length}</span></li>
            <li>
              Materials Covered: <span className="font-semibold">{
                new Set(
                  dealers.flatMap(d => d.materials)
                ).size
              }</span>
            </li>
          </ul>
        </section>

       
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg mb-2 font-bold text-black">Reports Overview</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>Total Reports: <span className="font-semibold">{reports.length}</span></li>
            <li>Open: <span className="text-yellow-700 font-medium">{openReports}</span></li>
            <li>In Progress: <span className="text-blue-600 font-medium">{inProgressReports}</span></li>
            <li>Closed: <span className="text-green-600 font-medium">{closedReports}</span></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
