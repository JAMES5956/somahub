export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Sign up for a free SomaHub account to access the platform.",
      icon: "👤",
    },
    {
      number: "02",
      title: "Browse Resources",
      description:
        "Explore notes, exams, CATs, assignments and revision papers by grade or subject.",
      icon: "📚",
    },
    {
      number: "03",
      title: "Purchase Securely",
      description:
        "Pay safely using M-Pesa and unlock your selected learning resources.",
      icon: "💳",
    },
    {
      number: "04",
      title: "Download Instantly",
      description:
        "Access your purchased files immediately from your account.",
      icon: "⬇️",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Get Started in Four Simple Steps
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Buying quality CBC learning resources has never been easier.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
  {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                {step.icon}
              </div>

              <span className="text-sm font-bold tracking-wider text-blue-600">
                STEP {step.number}
              </span>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}