const subjects = [
  {
    name: "Mathematics",
    icon: "🔢",
  },
  {
    name: "English",
    icon: "📘",
  },
  {
    name: "Kiswahili",
    icon: "📖",
  },
  {
    name: "Integrated Science",
    icon: "🔬",
  },
  {
    name: "Social Studies",
    icon: "🌍",
  },
  {
    name: "Christian Religious Education",
    icon: "✝️",
  },
  {
    name: "Agriculture",
    icon: "🌱",
  },
  {
    name: "Computer Science",
    icon: "💻",
  },
  {
    name: "Creative Arts",
    icon: "🎨",
  },
  {
    name: "Biology",
    icon: "🧬",
  },
  {
    name: "Chemistry",
    icon: "⚗️",
  },
  {
    name: "Physics",
    icon: "⚡",
  },
  {
    name: "Geography",
    icon: "🗺️",
  },
  {
    name: "History",
    icon: "📜",
  },
  {
    name: "Business Studies",
    icon: "💼",
  },
];


export default function SubjectsSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Browse By Subject
          </h2>

          <p className="mt-3 text-slate-600">
            Access notes, exams and revision materials for every subject.
          </p>
        </div>


        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="text-4xl">
                {subject.icon}
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                {subject.name}
              </h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}