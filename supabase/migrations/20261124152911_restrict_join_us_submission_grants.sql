/*
# Restrict join-us submission permissions

1. Modified Tables
- `join_us_submissions`: keep browser INSERT access for the public join form.
- Remove browser SELECT, UPDATE, and DELETE privileges from anonymous and authenticated roles.

2. Security
- Submitted contact details remain write-only from the public website.
- Existing row-level security policies remain in place.
- No data is deleted or changed by this permission update.

3. Important notes
- The website only needs INSERT to save a new inquiry.
- Administrative access can be provided separately through a protected server-side role when needed.
*/

REVOKE SELECT, UPDATE, DELETE ON public.join_us_submissions FROM anon, authenticated;
GRANT INSERT ON public.join_us_submissions TO anon, authenticated;
