import { supabase } from "@/lib/supabase";

export async function getCurrentUserRole() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return {
    user,
    role: profile.role,
  };
}