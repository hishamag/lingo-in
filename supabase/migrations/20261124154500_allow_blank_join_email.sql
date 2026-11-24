ALTER TABLE public.join_us_submissions
  DROP CONSTRAINT IF EXISTS join_us_submissions_email_check;

ALTER TABLE public.join_us_submissions
  ADD CONSTRAINT join_us_submissions_email_check
  CHECK (
    email IS NULL
    OR trim(email) = ''
    OR char_length(trim(email)) BETWEEN 5 AND 254
  );
