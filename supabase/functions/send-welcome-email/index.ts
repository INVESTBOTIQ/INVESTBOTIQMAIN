
import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@2.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { WelcomeEmail } from './_templates/welcome.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { firstName, email, role } = await req.json()

    // Render the email template
    const html = await renderAsync(
      React.createElement(WelcomeEmail, { 
        firstName, 
        role 
      })
    )

    // Send the email
    const { error } = await resend.emails.send({
      from: 'InvestBotIQ <onboarding@investbotiq.com>',
      to: [email],
      subject: 'Welkom bij InvestBotIQ',
      html
    })

    if (error) {
      console.error('Email send error:', error)
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        }
      })
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json', 
        ...corsHeaders 
      }
    })
  } catch (error) {
    console.error('Function error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json', 
        ...corsHeaders 
      }
    })
  }
})
