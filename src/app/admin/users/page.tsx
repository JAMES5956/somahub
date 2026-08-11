"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setUsers((data as Profile[]) || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading users...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Users
      </h1>

      <p className="mt-2 text-slate-600">
        Manage registered students.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Joined</th>
            </tr>
          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-500"
                >
                  No users found.
                </td>
              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {user.full_name || "No Name"}
                  </td>

                  <td className="px-6 py-4">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                      {user.role || "student"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}