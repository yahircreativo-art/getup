import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { Resend } from "resend";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var resend = new Resend(void 0);
var POST = async ({ request }) => {
	try {
		const formData = await request.formData();
		const name = formData.get("name");
		const phone = formData.get("phone");
		const email = formData.get("email");
		const description = formData.get("description");
		if (!name || !phone || !email || !description) return new Response(JSON.stringify({ error: "All fields are required" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (formData.get("_honey")) return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await resend.emails.send({
			from: "GetUp Contact Form <onboarding@resend.dev>",
			to: ["fernando.ygh@gmail.com"],
			subject: `New Contact Form Submission from ${name}`,
			html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #633cc8 0%, #4a2da0 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">From GetUp Website</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e9ecef; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 140px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #212529;"><a href="mailto:${email}" style="color: #633cc8;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: 600; color: #495057; vertical-align: top;">Description</td>
                <td style="padding: 12px 0; color: #212529;">${description}</td>
              </tr>
            </table>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #6c757d; font-size: 14px;">
            <p style="margin: 0;">This email was sent from your website contact form.</p>
          </div>
        </body>
        </html>
      `,
			replyTo: email
		});
		if (error) {
			console.error("Resend error:", error);
			return new Response(JSON.stringify({ error: "Failed to send email" }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({
			success: true,
			id: data?.id
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("API error:", err);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
