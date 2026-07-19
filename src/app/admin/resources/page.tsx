export default function ResourcesPage() {
  return (
    <>
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Resources
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all CBC learning materials.
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          + Upload Resource
        </button>

      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">

        <input
          type="text"
          placeholder="Search resources..."
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Grade
              </th>

              <th className="px-6 py-4 text-left">
                Subject
              </th>

              <th className="px-6 py-4 text-left">
                Price
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="px-6 py-4">
                Grade 8 Mathematics Term 1 Exam
              </td>

              <td className="px-6 py-4">
                Grade 8
              </td>

              <td className="px-6 py-4">
                Mathematics
              </td>

              <td className="px-6 py-4">
                KSh 50
              </td>

              <td className="px-6 py-4">
                <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                  Active
                </span>
              </td>

              <td className="px-6 py-4 space-x-2">

                <button className="rounded bg-yellow-500 px-3 py-1 text-white">
                  Edit
                </button>

                <button className="rounded bg-red-600 px-3 py-1 text-white">
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