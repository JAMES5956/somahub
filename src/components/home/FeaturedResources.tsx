import ResourceCard from "@/components/ui/ResourceCard";


const resources = [
  {
    title: "Grade 8 Mathematics Term 1 Exams",
    subject: "Mathematics",
    grade: "Grade 8",
    type: "Exam Paper",
    price: 50,
  },

  {
    title: "Grade 7 Integrated Science Notes",
    subject: "Integrated Science",
    grade: "Grade 7",
    type: "Notes",
    price: 80,
  },

  {
    title: "Grade 10 Biology Revision Pack",
    subject: "Biology",
    grade: "Grade 10",
    type: "Revision Material",
    price: 100,
  },
];


export default function FeaturedResources() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-3xl font-bold">
          Featured Resources
        </h2>


        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {resources.map((resource) => (
            <ResourceCard
              key={resource.title}
              {...resource}
            />
          ))}

        </div>

      </div>

    </section>
  );
}