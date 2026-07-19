export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mt-3 text-slate-600">
        Welcome back to SomaHub Admin.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-500">Resources</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-500">Orders</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-500">Students</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-slate-500">Revenue</p>
          <h2 className="mt-2 text-3xl font-bold">KSh 0</h2>
        </div>

      </div>
    </>
  );
}