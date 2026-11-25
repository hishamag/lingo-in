import { useState, type FormEvent } from 'react';
import { ArrowRight, BookOpen, BriefcaseBusiness, Check, Globe2, GraduationCap, Menu, MessageCircle, Phone, Target, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { GermanPlacementTest } from '@/components/GermanPlacementTest';
import { GermanPathway } from '@/components/GermanPathway';

type Language = 'en' | 'fr' | 'de' | 'ar';

const copy = {
  en: { nav: ['Programs', 'About', 'Method', 'Packages', 'Contact'], start: 'Start learning', hero: 'Learn the language. Change your future.', accent: 'new space.', description: 'Practical language learning for study, careers, travel, and life in Germany.', programs: 'Explore programs', method: 'Our method', }
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showGermanTest, setShowGermanTest] = useState(() => window.location.pathname === '/test');
  const [showGermanPathway, setShowGermanPathway] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedPackage, setSelectedPackage] = useState('Essential');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const text = copy[language as 'en'];

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error');
      return;
    }

    setSubmitting(true);
    setStatus('idle');
    const { error } = await supabase.from('join_us_submissions').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      language,
      package_name: selectedPackage,
      message: form.message.trim(),
    });

    setSubmitting(false);
    setStatus(error ? 'error' : 'success');
    if (!error) setForm({ name: '', email: '', phone: '', message: '' });
  };

  if (showGermanTest) return <GermanPlacementTest onExit={() => setShowGermanTest(false)} />;
  if (showGermanPathway) return <GermanPathway onExit={() => setShowGermanPathway(false)} onJoin={() => { setShowGermanPathway(false); document.getElementById('join-us')?.scrollIntoView({ behavior: 'smooth' }); }} />;

  const labels: Record<Language, string> = { en: 'EN', fr: 'FR', de: 'DE', ar: 'عربي' };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen overflow-hidden bg-[#f7fbfc] text-[#0b2d5b]">
      <header className="relative z-20 border-b border-[#dcebef] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Lingo-In Language Center">
            <span className="logo-mark" aria-hidden="true"><span className="logo-l" /></span>
            <span className="text-xl font-extrabold">Lingo<span className="text-[#14b8a6]">-In</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[#374151] lg:flex">
            {text.nav.map((item) => <a key={item} href={item === 'About' ? '#about' : item === 'Method' ? '#method' : item === 'Packages' ? '#packages' : item === 'Contact' ? '#join-us' : '#programs'} className="nav-link">{item}</a>)}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <div className="language-switcher">
              {(Object.keys(labels) as Language[]).map((item) => (
                <button key={item} type="button" onClick={() => setLanguage(item)} className={`language-option ${language === item ? 'active' : ''}`}>{labels[item]}</button>
              ))}
            </div>
            <a href="#join-us" className="rounded-xl bg-[#14b8a6] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#14b8a6]/20">{text.start}</a>
          </div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 lg:hidden" aria-label="Menu">
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#dcebef] bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold">
              {text.nav.map((item) => <a key={item} href="#programs" onClick={() => setMenuOpen(false)}>{item}</a>)}
              <button type="button" onClick={() => setShowGermanTest(true)} className="text-left text-[#14b8a6]">German placement test</button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-grid relative overflow-hidden pb-24 pt-14 text-white lg:pb-32 lg:pt-20">
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-[#5eead4]/25 bg-white/10 px-4 py-2 text-xs font-extrabold text-[#a7f3d0]">Learn. Speak. Move forward.</span>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
                {text.hero} <span className="text-[#5eead4]">{text.accent}</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-[#dce7f2]">{text.description}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#programs" className="flex items-center gap-2 rounded-xl bg-[#14b8a6] px-6 py-4 font-extrabold text-white shadow-xl shadow-[#14b8a6]/20">{text.programs} <ArrowRight size={18} /></a>
                <button type="button" onClick={() => setShowGermanPathway(true)} className="rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-extrabold">Explore German pathway</button>
              </div>
            </div>
            <div className="hero-card-live relative mx-auto max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <div className="rounded-2xl bg-white p-5 text-[#0b2d5b] shadow-2xl">
                <div className="flex items-center justify-between"><span className="text-sm font-bold">Free consultation</span><span className="live-pulse" /></div>
                <div className="mt-5 space-y-3">
                  {['Certified teachers', 'Flexible schedules', 'Practical classes'].map((item) => <div key={item} className="flex items-center gap-3 rounded-xl bg-[#f0f8f8] p-3 text-sm font-bold"><span className="check-dot"><Check size={14} /></span>{item}</div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <span className="section-kicker">Choose your path</span>
          <h2 className="mt-4 text-4xl font-extrabold">Programs designed for <span className="text-[#14b8a6]">your goals</span></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Globe2, title: 'English', text: 'Build confident communication for work and everyday life.' },
              { icon: GraduationCap, title: 'German', text: 'Prepare for study, jobs, exams, and life in Germany.' },
              { icon: BriefcaseBusiness, title: 'Professional', text: 'Develop practical communication for your career goals.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-[#dcebef] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <span className="icon-box teal"><Icon size={27} /></span>
                <h3 className="mt-6 text-2xl font-extrabold">{title}</h3>
                <p className="mt-3 leading-7 text-[#64748b]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="bg-white py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <span className="section-kicker">About Lingo-In</span>
              <h2 className="mt-4 text-4xl font-extrabold">Built around <span class="text-[#14b8a6]">your opportunity</span></h2>
              <p className="mt-6 text-lg leading-8 text-[#64748b]">Lingo-In makes language learning practical, personal, and connected to the future you want.</p>
            </div>
            <div className="method-art">
              <div className="method-circle circle-back" /><div className="method-circle circle-front"><BookOpen size={70} /></div>
              <div className="floating-note note-one"><Target size={18} />Clear goals</div>
              <div className="floating-note note-two"><MessageCircle size={18} />Real practice</div>
            </div>
          </div>
        </section>

        <section id="method" className="py-20 lg:py-28">
          <div class="mx-auto max-w-5xl px-5 text-center">
            <span className="section-kicker">Why Lingo-In?</span>
            <h2 className="mt-4 text-4xl font-extrabold">A practical method for <span className="text-[#14b8a6]">real life</span></h2>
          </div>
        </section>

        <section id="packages" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center"><span className="section-kicker">Pricing & packages</span><h2 className="mt-4 text-4xl font-extrabold">Choose what fits you</h2></div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[{ name: 'Essential', price: '300 DH' }, { name: 'Small Group', price: '499 DH' }, { name: 'Intensive', price: '699 DH' }].map((item) => (
                <article key={item.name} className="rounded-3xl border border-[#dcebef] bg-white p-7 text-center">
                  <h3 className="text-xl font-extrabold">{item.name}</h3><p className="mt-4 text-4xl font-extrabold text-[#14b8a6]">{item.price}</p>
                  <button type="button" onClick={() => { setSelectedPackage(item.name); document.getElementById('join-us')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 w-full rounded-xl bg-[#0b2d5b] py-3 font-extrabold text-white">Choose package</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="join-us" className="px-5 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#dcebef] bg-white p-6 shadow-xl sm:p-10">
            <div className="text-center"><span className="section-kicker">Join Lingo-In</span><h2 className="mt-4 text-4xl font-extrabold">Book your free consultation</h2><p className="mt-3 text-[#64748b]">Selected package: <strong>{selectedPackage}</strong></p></div>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Full name" className="rounded-xl border border-[#dcebef] px-4 py-3" required />
              <input value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="Phone number" className="rounded-xl border border-[#dcebef] px-4 py-3" required />
              <input type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="Email address" className="rounded-xl border border-[#dcebef] px-4 py-3 sm:col-span-2" />
              <textarea value={form.message} onChange={(event) => updateForm('message', event.target.value)} placeholder="How can we help?" className="min-h-28 rounded-xl border border-[#dcebef] px-4 py-3 sm:col-span-2" />
              <button type="submit" disabled={submitting} className="flex items-center justify-center gap-2 rounded-xl bg-[#14b8a6] px-6 py-4 font-extrabold text-white sm:col-span-2"><Phone size={18} />{submitting ? 'Submitting...' : 'Book consultation'}</button>
              {status === 'success' && <p className="text-center font-bold text-[#0d9488] sm:col-span-2">Thank you! We will contact you soon.</p>}
              {status === 'error' && <p className="text-center font-bold text-red-600 sm:col-span-2">Please complete the required fields and try again.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dcebef] bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><strong>Lingo-In</strong><span className="text-sm text-[#64748b]">© 2026 Lingo-In. All rights reserved.</span></div></footer>
    </div>
  );
}

export default App;
