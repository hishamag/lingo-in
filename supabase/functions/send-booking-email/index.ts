const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "agouramhicham@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      language,
      packageName,
      currentLevel,
      classTime,
      message,
    } = body;

    if (!name || !phone || !language) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
        <div style="background: #0b2d5b; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="margin: 0; font-size: 22px;">New Booking Request</h1>
          <p style="margin: 8px 0 0; color: #8ff4e8;">Lingo-In Language Center</p>
        </div>
        <div style="background: #f7fbfc; padding: 24px; border: 1px solid #dcebef; border-radius: 0 0 12px 12px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b; width: 140px;">Name:</td><td style="padding: 8px 0; color: #374151;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Phone:</td><td style="padding: 8px 0; color: #374151;">${phone}</td></tr>
            ${email ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Email:</td><td style="padding: 8px 0; color: #374151;">${email}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Language:</td><td style="padding: 8px 0; color: #374151;">${language}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Package:</td><td style="padding: 8px 0; color: #374151;">${packageName || "Not selected"}</td></tr>
            ${currentLevel ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Level:</td><td style="padding: 8px 0; color: #374151;">${currentLevel}</td></tr>` : ""}
            ${classTime ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b;">Preferred time:</td><td style="padding: 8px 0; color: #374151;">${classTime}</td></tr>` : ""}
            ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #0b2d5b; vertical-align: top;">Notes:</td><td style="padding: 8px 0; color: #374151;">${message}</td></tr>` : ""}
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
        subject: `New booking request from ${name}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
