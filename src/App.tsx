  const handleJoinSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.language) {
      setSubmitMessage('error');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage(null);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const { error } = await supabase.from('join_us_submissions').insert({
      name: form.name.trim(),
      email: form.emailAddress.trim(),
      phone: form.phone.trim(),
      language: form.language,
      package_name: selectedPackage,
      current_level: form.currentLevel || null,
      class_time: form.classTime || null,
      message: form.message.trim(),
    });

    if (error) {
      setIsSubmitting(false);
      setSubmitMessage('error');
      return;
    }

    try {
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${supabaseAnonKey}` },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.emailAddress.trim(),
          phone: form.phone.trim(),
          language: form.language,
          packageName: selectedPackage,
          currentLevel: form.currentLevel || null,
          classTime: form.classTime || null,
          message: form.message.trim(),
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Email notification failed');
      }

      setForm({ name: '', email: '', phone: '', language, currentLevel: '', classTime: '', emailAddress: '', message: '' });
      setSubmitMessage('success');
    } catch {
      setSubmitMessage('error');
    } finally {
      setIsSubmitting(false);
    }
  };
