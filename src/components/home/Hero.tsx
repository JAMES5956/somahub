import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">

        {/* Left Side */}
        <div className="flex-1">

          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🇰🇪 Kenya's Trusted CBC Learning Platform
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            Learn Smarter.
            <br />
            <span className="text-blue-600">Achieve More.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-700">
            Access quality CBC notes, exams, CATs, holiday assignments,
            revision papers and marking schemes for Grades 1–12.
          </p>

          <p className="mt-4 text-gray-600">
            Create a free account to browse, purchase and instantly download
            learning resources.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border-2 border-blue-600 px-8 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Login
            </Link>
          </div>

          {/* Trust Cards */}

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="text-3xl">🎓</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Grades 1–12
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Complete CBC Coverage
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="text-3xl">📚</div>

              <h3 className="mt-3 font-bold text-gray-900">
                CBC Resources
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Notes, Exams & CATs
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="text-3xl">⚡</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Instant Access
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Download Immediately
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="text-3xl">🔒</div>

              <h3 className="mt-3 font-bold text-gray-900">
                Secure Payments
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                M-Pesa Supported
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex flex-1 justify-center">

          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-gray-900">
              Why Choose SomaHub?
            </h2>

            <div className="mt-8 space-y-4">

              <div className="rounded-xl bg-gray-100 p-4">
                📖 Notes & Revision Papers
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                📝 Exams & CATs
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                📂 Holiday Assignments
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                ✔ Marking Schemes
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                🎯 Senior School Pathways
              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-blue-600 p-6 text-white">

              <h3 className="text-xl font-bold">
                Start Learning Today
              </h3>

              <p className="mt-3 text-blue-100">
                Register for free and unlock thousands of CBC learning resources.
              </p>

              <Link
                href="/register"
                className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}