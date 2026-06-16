import { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-now");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Preflight headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { name, email, subject, message } = req.body;

  // Final server-side validation check
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All form fields (name, email, subject, message) are required." });
  }

  try {
    // If the API key is not configured, simulate success in dev or print warning
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY environment variable is not configured. Simulating successful send.");
      return res.status(200).json({
        success: true,
        message: "Message simulation successful (no API key configured)."
      });
    }

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "abhidinesh0215@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #3b82f6; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return res.status(200).json({ success: true, data: emailResponse.data });
  } catch (error: any) {
    console.error("Resend API Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process contact email request." });
  }
}
