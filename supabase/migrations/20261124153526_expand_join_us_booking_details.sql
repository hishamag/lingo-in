/*
# Expand join-us booking details

1. Modified Tables
- `join_us_submissions`: add booking information used by the reference-style enrollment form.
- `package_name` (text): selected group package.
- `current_level` (text): visitor's current language level, when provided.
- `class_time` (text): preferred class time, when provided.

2. Data safety
- Existing submissions are preserved.
- `package_name` receives `essential` for older rows so the new field is always usable.
- Optional fields remain nullable for earlier and future submissions.

3. Security
- Existing row-level security and insert-only browser permissions remain unchanged.
- The public form can submit these fields, but cannot read, edit, or delete submissions.
*/

ALTER TABLE public.join_us_submissions
  ADD COLUMN IF NOT EXISTS package_name text NOT NULL DEFAULT 'essential',
  ADD COLUMN IF NOT EXISTS current_level text,
  ADD COLUMN IF NOT EXISTS class_time text;
