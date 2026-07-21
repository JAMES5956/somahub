export default function Testimonials() {
  const testimonials = [
    {
      name: "Grade 8 Student",
      role: "Nairobi",
      message:
        "SomaHub has made revision much easier. I can quickly find past papers and notes whenever I need them.",
    },
    {
      name: "Parent",
      role: "Kisumu",
      message:
        "Finding quality CBC learning materials used to be difficult. SomaHub has everything organized in one place.",
    },
    {
      name: "Teacher",
      role: "Mombasa",
      message:
        "The platform saves me a lot of time preparing exams and revision materials for my learners.",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Trusted by students, parents and teachers across Kenya.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-yellow-500 text-2xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="leading-8 text-gray-600">
                "{testimonial.message}"
              </p>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}