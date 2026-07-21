import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>
            <h2 className="text-3xl font-bold">
              Soma<span className="text-blue-400">Hub</span>
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Kenya's modern CBC learning platform providing quality notes,
              exams, CATs, revision papers and assignments for Grades 1–12.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li><a href="#">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Account */}

          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Account
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register">
                  Create Account
                </Link>
              </li>

              <li>
                <Link href="/admin/login">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Contact
            </h3>

            <p className="text-gray-400">
              support@somahub.co.ke
            </p>

            <p className="mt-2 text-gray-400">
              Nairobi, Kenya
            </p>

            <p className="mt-2 text-gray-400">
              Mon - Fri: 8:00 AM - 5:00 PM
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} SomaHub. All rights reserved.
        </div>

      </div>
    </footer>
  );
}