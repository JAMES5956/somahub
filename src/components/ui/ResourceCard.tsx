import Link from "next/link";

type ResourceCardProps = {
  title: string;
  subject: string;
  grade: string;
  type: string;
  price: number;
};

export default function ResourceCard({
  title,
  subject,
  grade,
  type,
  price,
}: ResourceCardProps) {
  const resourceId = title.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-sm font-semibold text-blue-600">
        {grade}
      </div>

      <h3 className="mt-2 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {subject}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {type}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span className="font-bold text-green-600">
          KSh {price}
        </span>

        <Link
          href={`/resources/${resourceId}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          View
        </Link>

      </div>

    </div>
  );
}