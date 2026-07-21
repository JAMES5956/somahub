export default function Features() {
  const features = [
    {
      emoji: '📚',
      title: 'Quality CBC Resources',
      description:
        'Access curriculum-aligned notes, revision papers, CATs and examinations for every grade.',
    },
    {
      emoji: '🗂️',
      title: 'Well Organized',
      description:
        'Browse by grade, subject, category and CBC pathway with ease.',
    },
    {
      emoji: '🔍',
      title: 'Powerful Search',
      description:
        'Find learning materials within seconds using smart search and filters.',
    },
    {
      emoji: '💳',
      title: 'Secure Payments',
      description:
        'Purchase learning resources safely using M-Pesa and other secure payment methods.',
    },
    {
      emoji: '⚡',
      title: 'Instant Downloads',
      description:
        'Download purchased resources immediately after successful payment.',
    },
    {
      emoji: '🇰🇪',
      title: 'Built for CBC',
      description:
        'Designed specifically for the Kenyan CBC curriculum for students, teachers and parents.',
    },
  ];

  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Everything You Need In One Platform
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            SomaHub brings together quality learning resources,
            secure payments and instant downloads into one
            easy-to-use platform.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{feature.emoji}</div>

              <h3 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}