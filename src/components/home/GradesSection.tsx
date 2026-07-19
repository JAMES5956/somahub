import Link from "next/link";

const grades = [
  { name: "Grade 1", type: "junior" },
  { name: "Grade 2", type: "junior" },
  { name: "Grade 3", type: "junior" },
  { name: "Grade 4", type: "junior" },
  { name: "Grade 5", type: "junior" },
  { name: "Grade 6", type: "junior" },
  { name: "Grade 7", type: "junior" },
  { name: "Grade 8", type: "junior" },
  { name: "Grade 9", type: "junior" },

  { name: "Grade 10", type: "senior" },
  { name: "Grade 11", type: "senior" },
  { name: "Grade 12", type: "senior" },
];


export default function GradesSection() {
  return (
    <section className="bg-white py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Browse By Grade
          </h2>

          <p className="mt-3 text-slate-600">
            Find CBC learning materials by grade level.
          </p>
        </div>


        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {grades.map((grade) => (

            <Link
              key={grade.name}
              href={
                grade.type === "junior"
                  ? `/grades/${grade.name.toLowerCase().replace(" ", "-")}`
                  : "/senior-school"
              }
              className="rounded-xl border bg-slate-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <h3 className="text-xl font-bold text-blue-600">
                {grade.name}
              </h3>


              <p className="mt-2 text-sm text-slate-600">

                {grade.type === "junior"
                  ? "Notes & Exams"
                  : "Choose Pathway"}

              </p>


            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}