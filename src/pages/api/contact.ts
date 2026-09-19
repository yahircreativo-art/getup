import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const description = formData.get('description') as string;

    // Validate required fields
    if (!name || !phone || !email || !description) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Honeypot check
    const honey = formData.get('_honey');
    if (honey) {
      // Silently accept but don't send (spam bot)
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'GetUp Contact Form <noreply@ugetup.com>',
      to: ['info@ugetup.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f7;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                  <!-- Logo -->
                  <tr>
                    <td align="center" style="padding: 8px 0 24px;">
                      <a href="https://ugetup.com" target="_blank" style="text-decoration: none;">
                        <img src="https://ugetup.com/email-logo.png" alt="GetUp" width="180" style="display: block; width: 180px; height: auto; border: 0;">
                      </a>
                    </td>
                  </tr>

                  <!-- Header card -->
                  <tr>
                    <td>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #633cc8 0%, #4a2da0 100%); border-radius: 16px 16px 0 0;">
                        <tr>
                          <td align="center" style="padding: 32px 40px;">
                            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">NEW LEAD 🔥</h1>
                            <p style="margin: 8px 0 0; font-size: 14px; color: rgba(255,255,255,0.85);">Someone wants to work with you</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Body card -->
                  <tr>
                    <td>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 16px 16px;">

                        <!-- Contact info rows -->
                        <tr>
                          <td style="padding: 32px 40px 8px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; width: 110px;">Name</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 15px; font-weight: 600; color: #111827;">${name}</td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af;">Phone</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 15px; color: #111827;"><a href="tel:${phone}" style="color: #111827; text-decoration: none;">${phone}</a></td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af;">Email</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f2; font-size: 15px; color: #111827;"><a href="mailto:${email}" style="color: #633cc8; font-weight: 600; text-decoration: none;">${email}</a></td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Description -->
                        <tr>
                          <td style="padding: 16px 40px 32px;">
                            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af;">Business Description</p>
                            <div style="background-color: #f8f7ff; border-left: 3px solid #633cc8; border-radius: 0 8px 8px 0; padding: 14px 18px; font-size: 15px; line-height: 1.6; color: #374151;">${description}</div>
                          </td>
                        </tr>

                        <!-- CTA -->
                        <tr>
                          <td align="center" style="padding: 0 40px 36px;">
                            <a href="mailto:${email}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #633cc8 0%, #4a2da0 100%); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 36px; border-radius: 999px;">Reply to ${name.split(' ')[0] ?? 'them'}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 24px 12px 8px;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">Sent from the contact form at <a href="https://ugetup.com" style="color: #633cc8; text-decoration: none;">ugetup.com</a></p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('API error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
