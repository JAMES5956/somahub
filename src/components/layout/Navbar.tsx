import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SomaHub
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/">Home</Link>
          <Link href="/grades">Grades</Link>
          <Link href="/subjects">Subjects</Link>
          <Link href="/resources">Resources</Link>
        </nav>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
          Login
        </button>
      </div>
    </header>
  );
}