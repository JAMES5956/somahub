import Link from "next/link";

export default function ResourcesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Resources</h1>

          <p className="mt-2 text-slate-600">
            Manage all CBC learning materials.
          </p>
        </div>

        <Link
          href="/admin/resources/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          + Upload Resource
        </Link>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Title</th>
              <th className="px-6 py-4 text-left font-semibold">Grade</th>
              <th className="px-6 py-4 text-left font-semibold">Subject</th>
              <th className="px-6 py-4 text-left font-semibold">Category</th>
              <th className="px-6 py-4 text-left font-semibold">Price</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">
                Grade 8 Mathematics Term 1 Exam
              </td>

              <td className="px-6 py-4">Grade 8</td>

              <td className="px-6 py-4">Mathematics</td>

              <td className="px-6 py-4">Exams</td>

              <td className="px-6 py-4">KSh 50</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Published
                </span>
              </td>

              <td className="space-x-2 px-6 py-4">
                <button className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600">
                  Edit
                </button>

                <button className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">
                Grade 7 English Revision Notes
              </td>

              <td className="px-6 py-4">Grade 7</td>

              <td className="px-6 py-4">English</td>

              <td className="px-6 py-4">Notes</td>

              <td className="px-6 py-4">KSh 80</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  Draft
                </span>
              </td>

              <td className="space-x-2 px-6 py-4">
                <button className="rounded-lg bg-amber-500 px-3 py-2 text-white hover:bg-amber-600">
                  Edit
                </button>

                <button className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}