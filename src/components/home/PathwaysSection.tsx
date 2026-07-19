const pathways = [
  {
    name: "STEM Pathway",
    icon: "🔬",
    description:
      "Science, Technology, Engineering and Mathematics subjects.",
    areas: [
      "Pure Sciences",
      "Applied Sciences",
      "Technical Studies",
    ],
  },

  {
    name: "Social Sciences Pathway",
    icon: "🌍",
    description:
      "Humanities, languages, business and social studies.",
    areas: [
      "Languages & Literature",
      "Humanities",
      "Business Studies",
    ],
  },

  {
    name: "Arts & Sports Science Pathway",
    icon: "🎨",
    description:
      "Creative arts, performing arts and sports disciplines.",
    areas: [
      "Arts",
      "Sports",
      "Performing Arts",
    ],
  },
];


export default function PathwaysSection() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Senior School Pathways (Grade 10–12)
          </h2>

          <p className="mt-3 text-slate-600">
            Choose your pathway and access learning materials
            designed for Senior Secondary students.
          </p>
        </div>


        <div className="mt-10 grid gap-8 md:grid-cols-3">

          {pathways.map((pathway) => (

            <div
              key={pathway.name}
              className="rounded-xl border bg-slate-50 p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="text-5xl">
                {pathway.icon}
              </div>

              <h3 className="mt-4 text-xl font-bold text-blue-600">
                {pathway.name}
              </h3>

              <p className="mt-3 text-slate-600">
                {pathway.description}
              </p>


              <ul className="mt-4 space-y-2">

                {pathway.areas.map((area) => (
                  <li
                    key={area}
                    className="text-sm text-slate-700"
                  >
                    ✓ {area}
                  </li>
                ))}

              </ul>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}