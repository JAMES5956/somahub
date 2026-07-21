"use client";

import Link from "next/link";
import { Menu, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Soma<span className="text-blue-600">Hub</span>
            </h1>

            <p className="text-xs text-gray-500">
              CBC Learning Platform
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 lg:flex">

          <a
            href="#about"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            About
          </a>

          <a
            href="#features"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            How It Works
          </a>

          <a
            href="#faq"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            FAQ
          </a>

          <a
            href="#contact"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contact
          </a>

        </nav>

        {/* Right Buttons */}

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            href="/login"
            className="rounded-xl border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Create Account
          </Link>

        </div>

        {/* Mobile */}

        <button className="rounded-lg p-2 lg:hidden">
          <Menu className="h-7 w-7 text-gray-700" />
        </button>

      </div>
    </header>
  );
}