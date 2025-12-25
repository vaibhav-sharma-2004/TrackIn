"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ label, path }) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path} className={`sidebar-item ${isActive ? "active" : ""}`}>
      {label}
    </Link>
  );
}
