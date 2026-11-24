import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Beer,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Coffee,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Heart,
  Languages,
  MapPin,
  MessageCircle,
  Music,
  Plane,
  Stethoscope,
  Train,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';

type PathwayStep = {
  phase: string;
  title: string;
  duration: string;
  body: string;
  points: string[];
  icon: typeof Globe2;
};

type AusbildungField = {
  title: string;
  salary: string;
  duration: string;
  icon: typeof Stethoscope;
  description: string;
};

const pathwaySteps: PathwayStep[] = [
  {
    phase: 'Phase 1',
    title: 'A1 · Foundations',
    duration: '6–8 weeks',
    body: 'Start from zero. Learn the alphabet, numbers, greetings, and everyday vocabulary. Build confidence with simple introductions and basic conversations.',
    points: ['German pronunciation and alphabet', 'Greetings and self-introduction', 'Numbers, days, and time', 'Basic sentence structure'],
    icon: BookOpen,
  },
  {
    phase: 'Phase 2',
    title: 'A2 · Everyday communication',
    duration: '8–10 weeks',
    body: 'Handle daily situations: shopping, ordering food, asking directions, and talking about family and work. Grammar becomes practical, not abstract.',
    points: ['Past and future tenses', 'Shopping and directions', 'Describing routines and plans', 'Simple writing: emails and messages'],
    icon: MessageCircle,
  },
  {
    phase: 'Phase 3',
    title: 'B1 · Independent communication',
    duration: '10–12 weeks',
    body: 'Express opinions, describe experiences, and handle travel situations. This is the level required for most visa applications and Ausbildung programs.',
    points: ['Goethe or telc B1 exam preparation', 'Opinions, arguments, and discussions', 'Travel and workplace scenarios', 'Writing letters and formal emails'],
    icon: Headphones,
  },
  {
    phase: 'Phase 4',
    title: 'B2 · Professional fluency',
    duration: '12–14 weeks',
    body: 'Communicate fluently in professional and academic settings. Understand complex texts and participate in detailed discussions about your field.',
    points: ['Advanced grammar and idioms', 'Professional and workplace German', 'Interview and application coaching', 'Exam preparation for telc B2'],
    icon: BriefcaseBusiness,
  },
  {
    phase: 'Phase 5',
    title: 'Ausbildung & visa support',
    duration: 'Ongoing',
    body: 'We guide you through finding an Ausbildung position, preparing documents, and navigating the visa interview at the German embassy in Rabat.',
    points: ['CV (Lebenslauf) and cover letter (Anschreiben)', 'Embassy interview preparation', 'Contract review and employer matching', 'Visa application guidance'],
    icon: Plane,
  },
];

const ausbildungFields: AusbildungField[] = [
  { title: 'Nursing & healthcare', salary: '€1,100–1,300 / month', duration: '3 years', icon: Stethoscope, description: 'The highest-demand Ausbildung in Germany. Moroccan nursing diplomas are recognized, making this a fast track to working in German hospitals and care facilities.' },
  { title: 'IT & software', salary: '€900–1,200 / month', duration: '3 years', icon: Globe2, description: 'Train as an IT specialist (Fachinformatiker) in application development or system integration. Strong job market and excellent career progression.' },
  { title: 'Electrical & mechanical', salary: '€800–1,100 / month', duration: '3–3.5 years', icon: Wrench, description: 'Mechatronics, electronics, and industrial mechanics. Germany’s manufacturing sector needs skilled technicians for Industry 4.0 and renewable energy.' },
  { title: 'Hospitality & tourism', salary: '€750–1,000 / month', duration: '3 years', icon: Building2, description: 'Hotel management, restaurant services, and tourism. A practical path for learners who enjoy customer-facing roles and international environments.' },
];

const examInfo = [
  { name: 'Goethe-Zertifikat', level: 'A1 — C2', body: 'The most recognized German language certificate worldwide. Accepted by all German embassies and authorities for visa and Ausbildung applications.', icon: Award },
  { name: 'telc Deutsch', level: 'A1 — C2', body: 'Equally recognized by German authorities. telc B1 is a popular alternative to Goethe for visa applications, with the option to retake individual modules.', icon: FileText },
];

const stats = [
  { value: '6 months', label: 'Zero to B1 with daily practice' },
  { value: '€1,100+', label: 'Monthly salary during Ausbildung' },
  { value: '3 years', label: 'Dual vocational training program' },
  { value: 'Goethe & telc', label: 'Official exam preparation' },
];

const cultureCards = [
  { title: 'Feste & Feiertage', subtitle: 'Festivals & holidays', body: 'Oktoberfest, Karneval, Christmas markets (Weihnachtsmärkte), and Easter egg hunts. Germany loves a good celebration, and every region has its own traditions.', icon: Beer, accent: '#f59e0b' },
  { title: 'Kaffee & Kuchen', subtitle: 'Coffee & cake culture', body: 'A beloved Sunday afternoon ritual. Friends and family gather for coffee and a slice of cake — Germany has over 3,000 types of cake to discover.', icon: Coffee, accent: '#14b8a6' },
  { title: 'Brotkultur', subtitle: 'Bread culture', body: 'Germany has more than 3,000 varieties of bread and is UNESCO-recognized for its bread culture. Bakeries (Bäckereien) are on nearly every corner.', icon: BookOpen, accent: '#06b6d4' },
  { title: 'Essen & Trinken', subtitle: 'Food & drink', body: 'Bratwurst, pretzels (Brezeln), sauerkraut, and döner kebab — yes, the döner was invented in Berlin! Regional cuisines like Bavarian and Swabian are distinctive.', icon: UtensilsCrossed, accent: '#f59e0b' },
  { title: 'Musik & Kunst', subtitle: 'Music & art', body: 'From Bach and Beethoven to modern electronic music in Berlin clubs, Germany is a global music hub. World-class museums and galleries in every major city.', icon: Music, accent: '#14b8a6' },
  { title: 'Direktheit & Pünktlichkeit', subtitle: 'Directness & punctuality', body: 'Germans value honesty and being on time. It is not rude — it is respect. Understanding this helps you fit in at work and in daily life.', icon: Clock3, accent: '#06b6d4' },
];

const cultureTips = [
  { flag: 'Sie vs. du', title: 'Formal and informal', body: 'Germans distinguish between the formal "Sie" and the informal "du". Using the wrong one can cause awkward moments — we teach you when to switch.' },
  { flag: 'Recycling', title: 'Pfand system', body: 'Bottles and cans have a deposit (Pfand) of 25 cents. You return them to any supermarket for a refund. Recycling is taken seriously in Germany.' },
  { flag: 'Sunday', title: 'Ruhetag — quiet day', body: 'Sundays are rest days. Shops are closed, and noise should be kept to a minimum. It is a day for family, walks, and relaxation.' },
  { flag: 'Health', title: 'Krankenversicherung', body: 'Health insurance is mandatory. As an Azubi, you are covered by statutory health insurance. We explain how the German system works.' },
];

type GermanPathwayProps = {
  onExit: () => void;
  onJoin: () => void;
};

export function GermanPathway({ onExit, onJoin }: GermanPathwayProps) {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div className="min-h-screen bg-[#f7fbfc] text-[#0b2d5b]">
      <header className="sticky top-0 z-30 border-b border-[#dcebef] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <button type="button" onClick={onExit} className="flex items-center gap-3 text-start">
            <span className="logo-mark" aria-hidden="true"><span className="logo-l" /></span>
            <span className="leading-none"><strong className="block font-sans text-[22px] font-extrabold tracking-tight">Lingo-In</strong><small className="text-[10px] font-medium tracking-[.22em] text-[#14b8a6]">LANGUAGE CENTER</small></span>
          </button>
          <button type="button" onClick={onExit} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#0b2d5b]"><ArrowLeft size={16} /> Back to website</button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-grid relative bg-[#0b2d5b] py-16 text-white lg:py-24">
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold text-amber-200">
                <Globe2 size={14} /> German Pathway · Marokko → Deutschland
              </div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-[4rem]">
                From zero German to your <span className="text-[#14b8a6]">Ausbildung</span> in Germany.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                A complete path: learn German from A1 to B2, prepare for Goethe and telc exams, and get full support finding an Ausbildung contract and navigating the visa process — all guided by a BAMF-certified DaF/DaZ lecturer based in Germany.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={onJoin} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#f59e0b] px-7 py-4 font-bold text-[#0b2d5b] shadow-xl shadow-[#f59e0b]/20 transition hover:-translate-y-1 hover:bg-[#ffb41d]">
                  Start your pathway <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
                <a href="#pathway" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-4 font-bold text-white transition hover:bg-white/10">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15"><BookOpen size={14} /></span> See the full plan
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[440px] lg:mx-0">
              <div className="rounded-[2rem] bg-white p-6 text-[#0b2d5b] shadow-2xl shadow-[#061b38]/40">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0b2d5b] text-[#14b8a6]"><Plane size={24} /></span>
                  <div><p className="font-extrabold">Your journey to Germany</p><p className="text-xs text-slate-500">Step-by-step guidance</p></div>
                </div>
                <div className="mt-6 space-y-3">
                  {['Learn German A1 → B2', 'Pass Goethe or telc B1', 'Find your Ausbildung', 'Visa interview & departure'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl bg-[#f1f8fa] p-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#14b8a6] text-sm font-extrabold text-white">{i + 1}</span>
                      <span className="text-sm font-bold">{step}</span>
                      <Check size={16} className="ml-auto text-[#14b8a6]" strokeWidth={3} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#dcebef] bg-white py-10">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <strong className="block text-2xl font-extrabold text-[#0b2d5b] sm:text-3xl">{stat.value}</strong>
                <span className="mt-1 block text-xs font-semibold text-slate-500 sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pathway steps */}
        <section id="pathway" className="bg-[#f7fbfc] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="section-kicker">The complete pathway</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2d5b] sm:text-4xl">Five phases from <span className="text-[#14b8a6]">A1 to Germany</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">Each phase builds on the last. You move at your own pace, but the structure keeps you on track toward your goal.</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
              {/* Phase tabs */}
              <div className="flex flex-col gap-3">
                {pathwaySteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activePhase === index;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActivePhase(index)}
                      className={`flex items-start gap-4 rounded-2xl border p-4 text-start transition ${isActive ? 'border-[#14b8a6] bg-[#0b2d5b] text-white shadow-lg shadow-[#0b2d5b]/15' : 'border-[#dcebef] bg-white text-[#0b2d5b] hover:border-[#14b8a6]'}`}
                    >
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${isActive ? 'bg-[#14b8a6] text-white' : 'bg-[#edf8f8] text-[#14b8a6]'}`}>
                        <Icon size={21} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[10px] font-extrabold uppercase tracking-wider ${isActive ? 'text-[#8ff4e8]' : 'text-slate-400'}`}>{step.phase} · {step.duration}</p>
                        <p className="mt-1 font-extrabold">{step.title}</p>
                      </div>
                      {isActive && <ArrowRight size={18} className="mt-2 shrink-0 text-[#8ff4e8]" />}
                    </button>
                  );
                })}
              </div>

              {/* Active phase detail */}
              <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-[#0b2d5b]/8 sm:p-8">
                {pathwaySteps.map((step, index) => {
                  if (index !== activePhase) return null;
                  const Icon = step.icon;
                  return (
                    <div key={step.title}>
                      <div className="flex items-center gap-4">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0b2d5b] text-[#14b8a6]"><Icon size={28} /></span>
                        <div>
                          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">{step.phase} · {step.duration}</p>
                          <h3 className="text-2xl font-extrabold text-[#0b2d5b]">{step.title}</h3>
                        </div>
                      </div>
                      <p className="mt-6 text-sm leading-8 text-slate-600">{step.body}</p>
                      <h4 className="mt-7 text-sm font-extrabold text-[#0b2d5b]">What you will learn</h4>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {step.points.map((point) => (
                          <div key={point} className="flex items-start gap-3 rounded-xl bg-[#f1f8fa] p-3">
                            <span className="check-dot"><Check size={14} /></span>
                            <span className="text-sm font-semibold text-slate-700">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Exam preparation */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="section-kicker">Official certifications</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2d5b] sm:text-4xl">Exam preparation that <span className="text-[#14b8a6]">opens doors</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">We prepare you for the two most recognized German language certificates required for Ausbildung and visa applications.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {examInfo.map((exam) => {
                const Icon = exam.icon;
                return (
                  <div key={exam.name} className="rounded-[2rem] border border-[#dcebef] bg-[#f7fbfc] p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b2d5b] text-[#14b8a6]"><Icon size={24} /></span>
                      <span className="rounded-full bg-[#e8faf8] px-4 py-1.5 text-xs font-extrabold text-[#0d8e83]">{exam.level}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-extrabold text-[#0b2d5b]">{exam.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{exam.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-[2rem] bg-[#eaf6f7] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#14b8a6] text-white"><CheckCircle2 size={24} /></span>
                <div>
                  <h3 className="font-extrabold text-[#0b2d5b]">Goethe vs. telc — which should you choose?</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">Both are equally recognized by German authorities. Goethe is the more traditional choice with testing centers in Rabat and Casablanca. telc allows you to retake individual modules (reading, listening, speaking, writing) separately if you fail one, which can save time and money. We help you choose based on your timeline and strengths.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ausbildung fields */}
        <section className="bg-[#0b2d5b] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-[.08em] text-[#14b8a6]">Ausbildung opportunities</span>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Top fields for <span className="text-[#14b8a6]">Moroccan learners</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100">Ausbildung (dual vocational training) lets you earn while you learn. You split your time between a company and a vocational school, gaining a recognized German qualification in 3 years.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {ausbildungFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#14b8a6] text-white"><Icon size={24} /></span>
                      <div className="text-end">
                        <p className="text-sm font-extrabold text-[#8ff4e8]">{field.salary}</p>
                        <p className="text-xs text-blue-200">{field.duration}</p>
                      </div>
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold">{field.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-blue-100">{field.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 rounded-[2rem] bg-[#f59e0b]/10 p-6 text-center">
              <p className="text-sm leading-7 text-amber-100">
                <strong className="text-amber-200">Good to know:</strong> During Ausbildung, you earn a monthly training salary (Ausbildungsvergütung) from your employer. After completing the program, most trainees receive a permanent job offer from the same company.
              </p>
            </div>
          </div>
        </section>

        {/* German culture section */}
        <section className="bg-[#f7fbfc] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="section-kicker">More than the language</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2d5b] sm:text-4xl">Discover <span className="text-[#14b8a6]">German culture</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">Language is only half the journey. Understanding how Germans live, work, and celebrate helps you feel at home — and it makes passing the embassy interview and settling in much easier.</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cultureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-[#dcebef] bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0b2d5b]/8">
                    <div className="culture-wave" style={{ background: `linear-gradient(135deg, ${card.accent}22, ${card.accent}08)` }} />
                    <div className="relative">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ backgroundColor: card.accent }}><Icon size={26} /></span>
                      <h3 className="mt-5 text-lg font-extrabold text-[#0b2d5b]">{card.title}</h3>
                      <p className="mt-0.5 text-xs font-bold uppercase tracking-wider" style={{ color: card.accent }}>{card.subtitle}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#0b2d5b] p-6 text-white sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#14b8a6] text-white"><Heart size={24} /></span>
                <div>
                  <h3 className="text-xl font-extrabold">Cultural tips for everyday life</h3>
                  <p className="mt-1 text-sm text-blue-200">Practical things every newcomer should know</p>
                </div>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {cultureTips.map((tip) => (
                  <div key={tip.flag} className="flex gap-4 rounded-2xl bg-white/5 p-4 backdrop-blur transition hover:bg-white/10">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#14b8a6]/20 text-[#8ff4e8] text-[11px] font-extrabold leading-tight text-center">{tip.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-white">{tip.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-blue-100">{tip.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col items-center gap-4 rounded-2xl bg-[#f59e0b]/10 p-5 text-center sm:flex-row sm:text-start">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f59e0b] text-[#0b2d5b]"><Globe2 size={24} /></span>
                <p className="text-sm leading-7 text-amber-100"><strong className="text-amber-200">In every course:</strong> We weave cultural insights into language lessons — how to greet, how to behave at a German workplace, and how to feel at home from day one in Germany.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visa & documents support */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <span className="section-kicker">Visa & documents</span>
                <h2 className="mt-3 text-3xl font-extrabold text-[#0b2d5b] sm:text-4xl">Full support for your <span className="text-[#14b8a6]">embassy interview</span></h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">Getting the visa is often the hardest part. We prepare you for every document and every question so you walk into the German embassy in Rabat with confidence.</p>
                <div className="mt-8 space-y-4">
                  {[
                    { icon: FileText, title: 'CV (Lebenslauf) in DIN 5008 format', body: 'A properly formatted German CV that meets employer expectations.' },
                    { icon: FileText, title: 'Cover letter (Anschreiben)', body: 'A persuasive motivation letter tailored to each employer.' },
                    { icon: MessageCircle, title: 'Embassy interview coaching', body: 'Practice the most common German questions asked at the Rabat embassy.' },
                    { icon: CheckCircle2, title: 'Contract review', body: 'We review your Ausbildung contract before you sign.' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf6f7] text-[#14b8a6]"><Icon size={20} /></span>
                        <div><h3 className="font-extrabold text-[#0b2d5b]">{item.title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{item.body}</p></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rounded-[2rem] bg-[#eaf6f7] p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0b2d5b] text-[#14b8a6]"><MapPin size={24} /></span>
                  <div><h3 className="font-extrabold text-[#0b2d5b]">German embassy in Rabat</h3><p className="text-xs text-slate-500">Visa interview location for Morocco</p></div>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    'Language certificate (Goethe B1 or telc B1)',
                    'Ausbildung contract signed by employer',
                    'Valid passport and biometric photos',
                    'Proof of financial means or blocked account',
                    'Health insurance confirmation',
                    'CV and motivation letter in German',
                  ].map((doc, i) => (
                    <div key={doc} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#14b8a6] text-sm font-extrabold text-white">{i + 1}</span>
                      <span className="text-sm font-semibold text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs text-slate-500"><Clock3 size={15} className="text-[#14b8a6]" /> Typical processing time: 6–12 weeks after interview</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why our pathway works */}
        <section className="bg-[#eaf6f7] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <span className="section-kicker">Why our pathway works</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0b2d5b] sm:text-4xl">Led by someone <span className="text-[#14b8a6]">in Germany</span></h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                { icon: GraduationCap, title: 'BAMF-certified teacher', body: 'Our lead instructor is a certified DaF/DaZ lecturer living in Bielefeld, Germany. He knows the system from the inside.' },
                { icon: Languages, title: 'German-first teaching', body: 'Classes emphasize speaking and listening from day one — exactly the skills the embassy interview and workplace demand.' },
                { icon: Train, title: 'End-to-end guidance', body: 'From your first German word to your visa interview, one team supports you through every step of the journey.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[2rem] bg-white p-6 shadow-sm">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0b2d5b] text-[#14b8a6]"><Icon size={26} /></span>
                    <h3 className="mt-6 text-lg font-extrabold text-[#0b2d5b]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0b2d5b] py-20 text-center text-white lg:py-28">
          <div className="mx-auto max-w-3xl px-5">
            <div className="cta-orb" style={{ right: '50%', top: '-180px', transform: 'translateX(50%)' }} />
            <span className="relative text-xs font-bold tracking-widest text-cyan-200">Ready to start?</span>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Your future in Germany <span className="text-[#14b8a6]">starts here</span></h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100">Book a free consultation. We will assess your level, answer your questions, and build a personalized plan for your pathway to Germany.</p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={onJoin} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#f59e0b] px-8 font-bold text-[#0b2d5b] transition hover:-translate-y-0.5 hover:bg-[#ffb41d]">Book your free consultation</button>
              <button type="button" onClick={onExit} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/30 px-8 font-bold text-white transition hover:bg-white/10"><ArrowLeft size={17} /> Back to website</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dcebef] bg-white py-8 text-center text-xs text-slate-400">
        © 2026 Lingo-In Language Center. All rights reserved.
      </footer>
    </div>
  );
}
