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

  // Inventory stats
  const lowStock = inventory.filter(i => i.status === "Low").length;
  const unavailableStock = inventory.filter(i => i.status === "Unavailable").length;

  // Product stats
  const availableProducts = products.filter(p => p.available).length;
  const unavailableProducts = products.filter(p => !p.available).length;

  // Report stats
  const openReports = reports.filter(r => r.status === "Open").length;
  const inProgressReports = reports.filter(r => r.status === "In Progress").length;
  const closedReports = reports.filter(r => r.status === "Closed").length;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* INVENTORY */}
      <section>
        <h2>Inventory Overview</h2>
        <ul>
          <li>Total Materials: {inventory.length}</li>
          <li>Low Stock: {lowStock}</li>
          <li>Unavailable: {unavailableStock}</li>
        </ul>
      </section>

      <hr />

      {/* PRODUCTS */}
      <section>
        <h2>Products Overview</h2>
        <ul>
          <li>Total Products: {products.length}</li>
          <li>Available: {availableProducts}</li>
          <li>Unavailable: {unavailableProducts}</li>
        </ul>
      </section>

      <hr />

      {/* DEALERS */}
      <section>
        <h2>Dealers Overview</h2>
        <ul>
          <li>Total Dealers: {dealers.length}</li>
          <li>
            Materials Covered:{" "}
            {
              new Set(
                dealers.flatMap(d => d.materials)
              ).size
            }
          </li>
        </ul>
      </section>

      <hr />

      {/* REPORTS */}
      <section>
        <h2>Reports Overview</h2>
        <ul>
          <li>Total Reports: {reports.length}</li>
          <li>Open: {openReports}</li>
          <li>In Progress: {inProgressReports}</li>
          <li>Closed: {closedReports}</li>
        </ul>
      </section>
    </div>
  );
}
