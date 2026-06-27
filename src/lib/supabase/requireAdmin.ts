import { createClient } from "./server";

// Verifies the caller has an authenticated Supabase session. Uses getUser()
// (not getSession()) since it's a network call to the Auth server and is
// therefore safe to use for authorization decisions.
export async function requireAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  return data.user;
}
