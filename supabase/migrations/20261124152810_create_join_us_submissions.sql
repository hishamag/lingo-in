/*
# Create join-us submissions

1. New Tables
- `join_us_submissions`
- `id` (uuid, primary key): Unique identifier for each inquiry.
- `name` (text): Visitor's name.
- `email` (text): Visitor's email address.
- `phone` (text): Visitor's phone or WhatsApp number.
- `language` (text): Language the visitor wants to learn.
- `message` (text): Optional question or learning goal.
- `created_at` (timestamptz): Time the inquiry was submitted.

2. Security
- Row level security is enabled.
- Anonymous and authenticated visitors may insert inquiries from the public form.
- No public read, update, or delete access is granted because inquiries contain contact details.
- Separate CRUD policies are defined for the table; only INSERT is granted to the browser roles.

3. Important notes
- This is a single-tenant public landing page and does not require sign-in.
- The table intentionally supports lead capture without exposing submitted contact information back to the browser.
*/

CREATE TABLE IF NOT EXISTS public.join_us_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(trim(email)) BETWEEN 5 AND 254),
  phone text NOT NULL CHECK (char_length(trim(phone)) BETWEEN 5 AND 40),
  language text NOT NULL CHECK (language IN ('en', 'fr', 'de', 'ar')),
  message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.join_us_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.join_us_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "Public visitors can submit join requests" ON public.join_us_submissions;
CREATE POLICY "Public visitors can submit join requests"
ON public.join_us_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "No public access to join requests" ON public.join_us_submissions;
CREATE POLICY "No public access to join requests"
ON public.join_us_submissions FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "No public updates to join requests" ON public.join_us_submissions;
CREATE POLICY "No public updates to join requests"
ON public.join_us_submissions FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No public deletion of join requests" ON public.join_us_submissions;
CREATE POLICY "No public deletion of join requests"
ON public.join_us_submissions FOR DELETE
TO anon, authenticated
USING (false);
