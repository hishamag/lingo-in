import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'English learner',
    course: 'English program',
    quote: 'Add an approved student quote here about their experience learning English at Lingo-In.',
    initials: 'EN',
    tone: 'teal',
  },
  {
    name: 'German learner',
    course: 'German program',
    quote: 'Add an approved student quote here about their progress and experience with the German program.',
    initials: 'DE',
    tone: 'navy',
  },
  {
    name: 'Professional learner',
    course: 'Professional program',
    quote: 'Add an approved student quote here about how practical language learning supports their goals.',
    initials: 'PR',
    tone: 'amber',
  },
];

function TestimonialsContent() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#14b8a6]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Learner stories</span>
          <h2 id="testimonials-title" className="mt-4 text-3xl font-extrabold sm:text-4xl">A little progress can change <span className="text-[#14b8a6]">everything</span></h2>
          <p className="mt-4 leading-7 text-[#64748b]">Real feedback helps future learners choose the right path. Replace these clearly marked examples with approved client testimonials before publishing.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.course} className="testimonial-card flex h-full flex-col rounded-3xl border border-[#dcebef] bg-[#f7fbfc] p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className={`testimonial-avatar ${testimonial.tone}`} aria-hidden="true">{testimonial.initials}</span>
                <span className="flex gap-1 text-[#f59e0b]" aria-label="Example rating, replace with verified rating">
                  {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />)}
                </span>
              </div>
              <Quote className="mt-6 text-[#14b8a6]" size={27} aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-base leading-7 text-[#334155]">“{testimonial.quote}”</blockquote>
              <footer className="mt-6 border-t border-[#dcebef] pt-4">
                <p className="font-extrabold text-[#0b2d5b]">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[#64748b]">{testimonial.course} · sample content</p>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-9 text-center">
          <a href="#join-us" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#14b8a6] px-6 py-3 font-extrabold text-white shadow-lg shadow-[#14b8a6]/20 transition hover:-translate-y-0.5 hover:bg-[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b2d5b]">
            Start your learning journey
          </a>
        </div>
      </div>
    </section>
  );
}

/** Mount the section before the consultation form while leaving App's existing layout intact. */
export function ClientTestimonials() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const joinSection = document.getElementById('join-us');
    const main = joinSection?.parentElement;
    if (!joinSection || !main) return;

    const mount = document.createElement('div');
    main.insertBefore(mount, joinSection);
    setTarget(mount);

    return () => mount.remove();
  }, []);

  return target ? createPortal(<TestimonialsContent />, target) : null;
}
