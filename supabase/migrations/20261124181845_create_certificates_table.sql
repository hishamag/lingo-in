/*
# Create certificates table for public verification

1. New Tables
- `certificates`
  - `id` (uuid, primary key)
  - `certificate_id` (text, unique, not null) — human-readable ID like "LIN-2026-B1-00482"
  - `student_name` (text, not null) — full name of the student
  - `language` (text, not null) — e.g. "German", "English", "French"
  - `level` (text, not null) — CEFR level e.g. "A1", "A2", "B1", "B2", "C1"
  - `course_name` (text, not null) — e.g. "German B1 Completion"
  - `issue_date` (date, not null) — when the certificate was issued
  - `status` (text, not null, default 'valid') — "valid" or "revoked"
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `certificates`.
- Grant SELECT to `anon` + `authenticated` so the public verification page can look up certificates without signing in.
- Add a SELECT-only policy with `USING (true)` — certificate data is intentionally public for verification purposes.
- No INSERT/UPDATE/DELETE grants to anon or authenticated — only service_role can manage certificates (server-side / admin).

3. Seed Data
- Inserts 3 sample certificates for demonstration.
*/

CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id text UNIQUE NOT NULL,
  student_name text NOT NULL,
  language text NOT NULL,
  level text NOT NULL,
  course_name text NOT NULL,
  issue_date date NOT NULL,
  status text NOT NULL DEFAULT 'valid',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON certificates TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_certificates" ON certificates;
CREATE POLICY "public_read_certificates"
ON certificates FOR SELECT
TO anon, authenticated
USING (true);

INSERT INTO certificates (certificate_id, student_name, language, level, course_name, issue_date, status) VALUES
  ('LIN-2026-B1-00482', 'Agourame Hicham', 'German', 'B1', 'German B1 Completion', '2026-03-15', 'valid'),
  ('LIN-2026-A2-00317', 'Salma Benkirane', 'German', 'A2', 'German A2 Completion', '2026-01-20', 'valid'),
  ('LIN-2026-C1-00591', 'Anas Tahiri', 'English', 'C1', 'English C1 — IELTS Pro', '2026-02-28', 'valid')
ON CONFLICT (certificate_id) DO NOTHING;