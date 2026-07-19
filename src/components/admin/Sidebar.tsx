"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Resources", href: "/admin/resources", icon: "📚" },
  { name: "Orders", href: "/admin/orders", icon: "📦" },
  { name: "Students", href: "/admin/students", icon: "👨‍🎓" },
  { name: "Analytics", href: "/admin/analytics", icon: "📈" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white">

      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold text-blue-400">
          SomaHub
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="mt-6">

        {menu.map((item) => {

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`mx-3 mb-2 flex items-center rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <span className="mr-3 text-xl">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}

      </nav>
    </aside>
  );
}