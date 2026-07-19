import { resources } from "@/data/resources";
import Link from "next/link";


export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;


  const resource = resources.find(
    (item) => item.id === id
  );


  if (!resource) {
    return (
      <div className="p-10">
        Resource not found
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          {resource.title}
        </h1>


        <div className="mt-4 space-y-2 text-slate-600">

          <p>
            Grade: {resource.grade}
          </p>

          <p>
            Subject: {resource.subject}
          </p>

          <p>
            Type: {resource.type}
          </p>

        </div>


        <p className="mt-6">
          {resource.description}
        </p>


        <div className="mt-8 flex items-center justify-between">

          <span className="text-2xl font-bold text-green-600">
            KSh {resource.price}
          </span>


          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white">
            Buy Now
          </button>

        </div>


        <Link
          href="/"
          className="mt-6 block text-blue-600"
        >
          ← Back Home
        </Link>


      </div>

    </main>
  );
}