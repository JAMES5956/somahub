"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  BookOpen,
  ShoppingCart,
  BarChart3,
  Users,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Resources",
    href: "/admin/resources",
    icon: BookOpen,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Sales",
    href: "/admin/sales",
    icon: BarChart3,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-blue-400">
          SomaHub
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-slate-800 p-4 text-sm text-slate-500">
        © {new Date().getFullYear()} SomaHub
      </div>

    </aside>
  );
}