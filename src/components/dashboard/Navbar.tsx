"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import CartCount from "@/components/CartCount";

export default function DashboardNavbar() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* TOP BAR */}
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />

            <div>
              <h1 className="text-xl font-bold">
                Soma<span className="text-blue-600">Hub</span>
              </h1>

              <p className="text-xs text-gray-500">
                CBE Learning Platform
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href="/resources"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <BookOpen size={18} />
              Resources
            </Link>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-blue-600"
            >
              <ShoppingCart size={18} />
              Cart
              <CartCount />
            </Link>

            <Link
              href="/notifications"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <Bell size={18} />
              Notifications
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <User size={18} />
              Profile
            </Link>

          </nav>

          {/* DESKTOP LOGOUT */}
          <button
            onClick={handleLogout}
            className="hidden items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 lg:flex"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        <nav className="grid grid-cols-3 border-t py-2 lg:hidden">

          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 text-xs hover:text-blue-600"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/resources"
            className="flex flex-col items-center gap-1 text-xs hover:text-blue-600"
          >
            <BookOpen size={20} />
            Resources
          </Link>

          <Link
            href="/cart"
            className="relative flex flex-col items-center gap-1 text-xs hover:text-blue-600"
          >
            <ShoppingCart size={20} />
            Cart
            <CartCount />
          </Link>

          <Link
            href="/notifications"
            className="flex flex-col items-center gap-1 text-xs hover:text-blue-600"
          >
            <Bell size={20} />
            Notifications
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-xs hover:text-blue-600"
          >
            <User size={20} />
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-xs text-red-600 hover:text-red-700"
          >
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </div>
    </header>
  );
}
