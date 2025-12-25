"use client";

import { SIDEBAR_ROUTES } from "@/constants/sidebarRoutes";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">TrackIn</h2>

      <nav>
        {SIDEBAR_ROUTES.map((route) => (
          <SidebarItem
            key={route.path}
            label={route.label}
            path={route.path}
          />
        ))}
      </nav>
    </aside>
  );
}
