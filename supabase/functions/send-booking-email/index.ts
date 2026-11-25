const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "info@lingo-in.com";
const FROM_EMAIL = "onboarding@resend.dev";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, language, packageName, currentLevel, classTime, message } = body;

    if (!name?.trim() || !phone?.trim() || !language) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const escapeHtml = (value: unknown) => String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeLanguage = escapeHtml(language);
    const safePackageName = escapeHtml(packageName || "Not selected");
    const safeCurrentLevel = escapeHtml(currentLevel);
    const safeClassTime = escapeHtml(classTime);
    const safeMessage = escapeHtml(message);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #0b2d5b; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">New Booking Request</h1>
          <p style="margin: 8px 0 0; color: #8ff4e8;">Lingo-In Language Center</p>
        </div>
        <div style="background: #f7fbfc; padding: 24px; border: 1px solid #dcebef; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b; width: 140px;">Name:</td><td style="padding: 8px 0; color: #374151;">${safeName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Phone:</td><td style="padding: 8px 0; color: #374151;">${safePhone}</td></tr>
            ${safeEmail ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Email:</td><td style="padding: 8px 0; color: #374151;">${safeEmail}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Language:</td><td style="padding: 8px 0; color: #374151;">${safeLanguage}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Package:</td><td style="padding: 8px 0; color: #374151;">${safePackageName}</td></tr>
            ${safeCurrentLevel ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Level:</td><td style="padding: 8px 0; color: #374151;">${safeCurrentLevel}</td></tr>` : ""}
            ${safeClassTime ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Preferred time:</td><td style="padding: 8px 0; color: #374151;">${safeClassTime}</td></tr>` : ""}
            ${safeMessage ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b; vertical-align: top;">Notes:</td><td style="padding: 8px 0; color: #374151;">${safeMessage}</td></tr>` : ""}
          </table>
        </div>
        <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">This booking was submitted from the Lingo-In website.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Lingo-In Booking <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        subject: `New booking request from ${name.trim()}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend rejected the email:", errText);
      return new Response(JSON.stringify({ error: "Failed to send email", details: errText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Booking email function error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
