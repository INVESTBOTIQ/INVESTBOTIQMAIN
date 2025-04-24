# Investbotiq Insight Hub: Local Netlify Dev Setup

## 1. Prerequisites
- Node.js (v16+ recommended)
- Netlify CLI (`npm install -g netlify-cli`)

## 2. Environment Variables
Create a `.env` file in the root of your project (if not already present) and add:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-sender@example.com
```

**Note:**
- `SUPABASE_SERVICE_ROLE_KEY` must be kept secret (never exposed to frontend code).
- `SENDGRID_FROM_EMAIL` must be a verified sender in your SendGrid account.

## 3. Running Locally

```sh
netlify dev
```

- Your site will be available at `http://localhost:8888` by default.
- All Netlify Functions are accessible at `/.netlify/functions/<function-name>`.
- The account creation flow will use `/.netlify/functions/create-user` for secure user creation and welcome emails.

## 4. Troubleshooting
- If you see errors about missing modules (`@netlify/functions`, `@sendgrid/mail`), run:
  ```sh
  npm install @netlify/functions @sendgrid/mail
  ```
- Ensure your `.env` file is present and filled out.
- For email issues, check your SendGrid dashboard for error logs.

## 5. Deploying to Netlify
- Push your code to GitHub/GitLab/Bitbucket.
- Connect your repo to Netlify and set the same environment variables in the Netlify dashboard (under Site Settings > Environment Variables).
- Deploy!

---

## Customizing the Welcome Email
Edit `netlify/functions/create-user.ts` to change the HTML, subject, or add more logic (e.g., send different emails based on the user's role).

## Security Note
Never expose your service role key or SendGrid API key to frontend code. Always use serverless functions for sensitive operations.

---

For more help, see:
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Supabase Admin API](https://supabase.com/docs/reference/javascript/auth-admin-api-createuser)
- [SendGrid Node.js Docs](https://github.com/sendgrid/sendgrid-nodejs)
