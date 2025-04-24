import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { email, voornaam, achternaam, rol } = JSON.parse(event.body || '{}');
    if (!email || !voornaam || !achternaam || !rol) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // Create the user in Supabase
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
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message })
      };
    }

    // Send a custom welcome email using SendGrid
    try {
      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL!, // Verified sender
        subject: "Welkom bij Investbotiq! Je account is aangemaakt.",
        html: `
          <h2>Welkom, ${voornaam} ${achternaam}!</h2>
          <p>Je account met de rol <b>${rol}</b> is succesvol aangemaakt.</p>
          <p>Gebruik het e-mailadres <b>${email}</b> om in te loggen. Je ontvangt apart nog instructies om je wachtwoord in te stellen.</p>
          <br />
          <p>Met vriendelijke groet,<br>Het Investbotiq Team</p>
        `
      };
      await sgMail.send(msg);
    } catch (mailErr: any) {
      // Optionally: log mail error but still return success for user creation
      return {
        statusCode: 200,
        body: JSON.stringify({
          user: data.user,
          warning: "User created, but failed to send welcome email.",
          mailError: mailErr.message
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ user: data.user })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" })
    };
  }
};

export { handler };
