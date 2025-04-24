import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Only use service key server-side!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, voornaam, achternaam, rol } = req.body;

  if (!email || !voornaam || !achternaam || !rol) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Optionally: generate a temporary password or let Supabase send an invite
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: false,
    user_metadata: {
      voornaam,
      achternaam,
      rol,
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // Optionally: Insert into a 'profiles' table or send a custom email here

  return res.status(200).json({ user: data.user });
}
