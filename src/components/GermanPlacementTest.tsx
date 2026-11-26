import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Check, CheckCircle2, Clock3, Copy, GraduationCap, Headphones, MessageCircle, Pause, Play, RotateCcw, Share2, Target } from 'lucide-react';

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  listeningText?: string;
};

type GermanPlacementTestProps = {
  onExit: () => void;
};

const questions: Question[] = [
  { prompt: 'Wie heißt du?', options: ['Ich heiße Sara.', 'Ich bin heißen Sara.', 'Ich heißt Sara.'], answer: 0 },
  { prompt: 'Woher ___ du?', options: ['kommst', 'kommen', 'kommt'], answer: 0 },
  { prompt: 'Ich wohne ___ Bielefeld.', options: ['auf', 'in', 'an'], answer: 1 },
  { prompt: 'Was machst du am Wochenende?', options: ['Ich treffe meine Freunde.', 'Ich treffen meine Freunde.', 'Ich trifft meine Freunde.'], answer: 0 },
  { prompt: 'Wenn ich Zeit habe, ___ ich Deutsch.', options: ['lerne', 'lernen', 'gelernt'], answer: 0 },
  { prompt: 'Könnten Sie mir bitte sagen, ___ der Bahnhof ist?', options: ['wann', 'wo', 'wer'], answer: 1 },
  { prompt: 'Obwohl es regnet, ___ wir spazieren.', options: ['gehen', 'gingen', 'gegangen'], answer: 0 },
  { prompt: 'Ich interessiere mich ___ eine Ausbildung in Deutschland.', options: ['für', 'an', 'mit'], answer: 0 },
  { prompt: 'Nachdem sie die Prüfung bestanden hatte, ___ sie sofort einen Kurs.', options: ['beginnt', 'begann', 'beginnen'], answer: 1 },
  { prompt: 'Die Bewerbung muss bis Freitag ___ werden.', options: ['eingereicht', 'einreichen', 'einreicht'], answer: 0 },
  { prompt: 'Was möchte die Person kaufen?', listeningText: 'Guten Tag. Ich hätte gern ein Ticket nach Berlin für morgen früh.', options: ['Ein Ticket nach Berlin.', 'Ein Hotelzimmer in Berlin.', 'Eine Fahrkarte nach Bremen.'], answer: 0 },
  { prompt: 'Wann beginnt der Kurs?', listeningText: 'Der Deutschkurs findet immer dienstags und donnerstags um halb sieben am Abend statt.', options: ['Dienstags und donnerstags um 17:30 Uhr.', 'Dienstags und donnerstags um 18:30 Uhr.', 'Montags und mittwochs um 18:30 Uhr.'], answer: 1 },
  { prompt: 'Warum kann er heute nicht kommen?', listeningText: 'Leider kann ich heute nicht zum Treffen kommen, weil ich länger im Büro bleiben muss.', options: ['Er ist krank.', 'Er hat einen Termin beim Arzt.', 'Er muss länger arbeiten.'], answer: 2 },
  { prompt: 'Was soll die Teilnehmerin mitbringen?', listeningText: 'Bitte bringen Sie zum Vorstellungsgespräch Ihren Lebenslauf, Ihre Zeugnisse und einen Kugelschreiber mit.', options: ['Nur ihren Lebenslauf.', 'Ihren Lebenslauf und ihre Zeugnisse.', 'Ihren Lebenslauf, Ihre Zeugnisse und einen Kugelschreiber.'], answer: 2 },
];

const questionHasAudio = (question: Question): boolean => Boolean(question.listeningText);

const getLevel = (score: number): { level: string; description: string; next: string } => {
  if (score <= 2) return { level: 'A1', description: 'Du baust gerade deine ersten Grundlagen auf.', next: 'Unser A1-Einstieg hilft dir, sicher zu starten.' };
  if (score <= 5) return { level: 'A2', description: 'Du kannst dich bereits in vielen Alltagssituationen verständigen.', next: 'Mit A2 festigst du Grammatik und gewinnst mehr Sicherheit.' };
  if (score <= 8) return { level: 'B1', description: 'Du kannst dich selbstständig ausdrücken und Gespräche führen.', next: 'B1 bringt dich näher zu Studium, Beruf und Ausbildung.' };
  return { level: 'B2', description: 'Du verfügst über eine starke Grundlage für anspruchsvolle Situationen.', next: 'B2 schärft deine berufliche Kommunikation und Ausdrucksfähigkeit.' };
};

const getGermanVoice = (): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((v) => v.lang.toLowerCase().startsWith('de')) ?? null;
};

export function GermanPlacementTest({ onExit }: GermanPlacementTestProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const question = questions[currentQuestion];
  const isListeningQuestion = questionHasAudio(question);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const handleVoicesChanged = () => setVoiceReady(true);
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    if (window.speechSynthesis.getVoices().length > 0) setVoiceReady(true);
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (!isListeningQuestion || !question.listeningText) return;

    if (isPlaying) {
      stopAudio();
      return;
    }

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setAudioError(true);
      setShowTranscript(true);
      return;
    }

    setAudioError(false);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(question.listeningText);
    utterance.lang = 'de-DE';
    utterance.rate = 0.85;
    const germanVoice = getGermanVoice();
    if (germanVoice) utterance.voice = germanVoice;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => { setIsPlaying(false); utteranceRef.current = null; };
    utterance.onerror = () => {
      setIsPlaying(false);
      setAudioError(true);
      setShowTranscript(true);
      utteranceRef.current = null;
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/test` : '/test';
  const shareText = 'Mach den kostenlosen Deutsch-Einstufungstest von Lingo-In.';

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const copyTestLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      setLinkCopied(false);
    }
  };

  const restart = () => {
    stopAudio();
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setAudioError(false);
    setShowTranscript(false);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    stopAudio();
    setAudioError(false);
    setShowTranscript(false);
    const nextScore = score + (selectedAnswer === questions[currentQuestion].answer ? 1 : 0);
    setScore(nextScore);
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentQuestion((q) => q + 1);
    setSelectedAnswer(null);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-[#f7fbfc] text-[#0b2d5b]">
        <header className="border-b border-[#dcebef] bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <button type="button" onClick={onExit} className="flex items-center gap-3 text-start">
              <span className="logo-mark" aria-hidden="true"><span className="logo-l" /></span>
              <span className="leading-none"><strong className="block font-sans text-[22px] font-extrabold tracking-tight">Lingo-In</strong><small className="text-[10px] font-medium tracking-[.22em] text-[#14b8a6]">LANGUAGE CENTER</small></span>
            </button>
            <button type="button" onClick={onExit} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#0b2d5b]"><ArrowLeft size={16} /> Back to website</button>
          </div>
        </header>
        <main className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <span className="section-kicker">Deutsch · Einstufungstest</span>
            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Finde dein <span className="text-[#14b8a6]">Deutsch-Niveau.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Mach unseren kurzen Einstufungstest mit Grammatik- und Hörverstehen-Aufgaben und erhalte eine erste Empfehlung von A1 bis B2. Ohne Anmeldung und in ungefähr sieben Minuten.</p>
            <button type="button" onClick={() => setStarted(true)} className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#f59e0b] px-7 py-4 font-extrabold text-[#0b2d5b] shadow-xl shadow-[#f59e0b]/20 transition hover:-translate-y-1 hover:bg-[#ffb41d]">Test starten <ArrowRight size={18} /></button>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={shareOnWhatsApp} className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#25d366]/15 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"><MessageCircle size={15} /> Auf WhatsApp teilen</button>
              <button type="button" onClick={copyTestLink} className="inline-flex items-center gap-2 rounded-full border border-[#dcebef] bg-white px-4 py-2.5 text-xs font-extrabold text-[#0b2d5b] transition hover:-translate-y-0.5 hover:border-[#14b8a6]">{linkCopied ? <Check size={15} className="text-[#14b8a6]" /> : <Copy size={15} />} {linkCopied ? 'Link kopiert' : 'Link kopieren'}</button>
            </div>
            <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold text-slate-500"><span className="inline-flex items-center gap-2"><Clock3 size={17} className="text-[#14b8a6]" /> 7 Minuten</span><span className="inline-flex items-center gap-2"><Target size={17} className="text-[#14b8a6]" /> A1 bis B2</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-[#14b8a6]" /> Sofortiges Ergebnis</span></div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0b2d5b] p-6 text-white shadow-2xl shadow-[#0b2d5b]/15 sm:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-cyan-200/20" />
            <div className="relative">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#14b8a6] text-white"><GraduationCap size={28} /></div>
              <p className="mt-10 text-xs font-extrabold uppercase tracking-[.16em] text-cyan-200">Was dich erwartet</p>
              <h2 className="mt-3 text-2xl font-extrabold">Ein klarer Start für deinen Lernweg.</h2>
              <div className="mt-8 space-y-4">
                {['Alltagsgrammatik und Wortschatz', 'Hörverstehen mit echten Audioaufnahmen', 'Fragen auf mehreren Niveaustufen', 'Eine klare Empfehlung für deinen nächsten Schritt'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"><CheckCircle2 size={19} className="mt-0.5 shrink-0 text-[#8ff4e8]" /><span className="text-sm leading-6 text-blue-50">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (finished) {
    const result = getLevel(score);
    return (
      <div className="min-h-screen bg-[#f7fbfc] text-[#0b2d5b]">
        <header className="border-b border-[#dcebef] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><span className="font-sans text-xl font-extrabold">Lingo-In</span><button type="button" onClick={onExit} className="text-sm font-bold text-slate-500 transition hover:text-[#0b2d5b]">Back to website</button></div></header>
        <main className="mx-auto max-w-3xl px-5 py-14 text-center lg:py-24">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-[#d9f8f4] text-[#14b8a6]"><Award size={40} /></div>
          <span className="section-kicker mt-8 block">Dein Ergebnis</span>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Du bist ungefähr auf <span className="text-[#14b8a6]">{result.level}.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600">{result.description} {result.next}</p>
          <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-[#0b2d5b]/10">
            <div className="flex items-center justify-between text-sm font-bold"><span>Dein Ergebnis</span><span className="text-[#14b8a6]">{score} / {questions.length}</span></div>
            <div className="mt-4 h-3 rounded-full bg-[#e4eef1]"><div className="h-3 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#0b2d5b]" style={{ width: `${Math.max((score / questions.length) * 100, 8)}%` }} /></div>
            <p className="mt-4 text-xs leading-6 text-slate-500">Der Test ist eine erste Orientierung. Im persönlichen Gespräch bestimmen wir dein Niveau noch genauer.</p>
          </div>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dcebef] bg-white px-6 py-3 font-bold text-[#0b2d5b] transition hover:border-[#14b8a6]"><RotateCcw size={17} /> Noch einmal</button>
            <button type="button" onClick={onExit} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f59e0b] px-6 py-3 font-bold text-[#0b2d5b] transition hover:bg-[#ffb41d]">Beratung starten <ArrowRight size={17} /></button>
          </div>
        </main>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  return (
    <div className="min-h-screen bg-[#f7fbfc] text-[#0b2d5b]">
      <header className="border-b border-[#dcebef] bg-white"><div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 lg:px-8"><span className="font-sans text-xl font-extrabold">Lingo-In <span className="font-normal text-slate-400">/ Deutsch-Test</span></span><button type="button" onClick={onExit} className="text-sm font-bold text-slate-500 transition hover:text-[#0b2d5b]">Beenden</button></div></header>
      <main className="mx-auto max-w-3xl px-5 py-10 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <span className="section-kicker">Frage {currentQuestion + 1} von {questions.length}</span>
            <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Wähle die richtige Antwort.</h1>
          </div>
          <span className="text-sm font-extrabold text-[#14b8a6]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#dcebef]"><div className="h-2 rounded-full bg-[#14b8a6] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-xl shadow-[#0b2d5b]/8 sm:p-10">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <Headphones size={17} className={isListeningQuestion ? 'text-[#14b8a6]' : 'text-slate-400'} />
            {isListeningQuestion ? 'Hörverstehen' : 'Deutsch'}
          </div>
          <h2 className="mt-4 text-2xl font-extrabold leading-relaxed sm:text-3xl">{question.prompt}</h2>

          {isListeningQuestion && (
            <div className="listening-card mt-7 overflow-hidden rounded-[1.75rem] border border-[#1d3c68] bg-[#0b2d5b] text-white shadow-xl shadow-[#0b2d5b]/15">
              <div className="relative overflow-hidden p-5 sm:p-6">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-[#14b8a6]/20" />
                <div className="relative flex items-start justify-between gap-4">
                  <div><span className="inline-flex items-center gap-2 rounded-full border border-[#14b8a6]/35 bg-[#14b8a6]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-[#8ff4e8]"><Headphones size={13} /> Hörverstehen</span><p className="mt-4 text-lg font-extrabold">Höre den Satz aufmerksam an.</p><p className="mt-1 text-xs leading-5 text-blue-100/70">Du kannst die Wiedergabe mehrmals starten.</p></div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold text-blue-100">DE · AUDIO</span>
                </div>
                <div className="relative mt-7 rounded-2xl border border-white/10 bg-[#071d3d] px-4 py-5">
                  <div className="flex h-12 items-center justify-center gap-1.5" aria-hidden="true">{Array.from({ length: 26 }, (_, index) => <span key={index} className={`w-1 rounded-full bg-gradient-to-t from-[#14b8a6] to-[#8ff4e8] transition-opacity ${isPlaying ? 'animate-pulse opacity-100' : 'opacity-55'}`} style={{ height: `${18 + ((index * 17) % 28)}px`, animationDelay: `${index * 35}ms` }} />)}</div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-blue-100/60"><span>{isPlaying ? 'Wiedergabe läuft' : 'Bereit zum Anhören'}</span><span>Deutsch · 0:00</span></div>
                </div>
                <div className="relative mt-5 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={toggleAudio} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14b8a6] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#14b8a6]/20 transition hover:-translate-y-0.5 hover:bg-[#0da599]">{isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />} {isPlaying ? 'Pause' : 'Audio abspielen'}</button>
                  <button type="button" onClick={() => setShowTranscript((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-blue-50 transition hover:bg-white/15">{showTranscript ? 'Text verbergen' : 'Text einblenden'}</button>
                </div>
                {audioError && <p className="relative mt-3 text-xs font-semibold text-amber-200">Die Sprachausgabe ist auf diesem Gerät nicht verfügbar. Du kannst den Text stattdessen lesen.</p>}
                {!audioError && !voiceReady && <p className="relative mt-3 text-xs font-semibold text-blue-100/60">Stimme wird geladen …</p>}
              </div>
              {showTranscript && <div className="border-t border-white/10 bg-white/5 p-5 text-sm italic leading-7 text-blue-50">„{question.listeningText}"</div>}
            </div>
          )}

          <div className="mt-8 space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedAnswer(index)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-start text-sm font-bold transition ${selectedAnswer === index ? 'border-[#14b8a6] bg-[#e8faf8] text-[#0b2d5b] shadow-sm' : 'border-[#dcebef] bg-white text-slate-600 hover:border-[#14b8a6] hover:bg-[#f7fbfc]'}`}
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${selectedAnswer === index ? 'bg-[#14b8a6] text-white' : 'bg-[#edf5f6] text-slate-500'}`}>{String.fromCharCode(65 + index)}</span>
                {option}
              </button>
            ))}
          </div>

          <div className="mt-9 flex items-center justify-between border-t border-slate-100 pt-6">
            <button type="button" onClick={onExit} className="text-sm font-bold text-slate-400 transition hover:text-[#0b2d5b]">Später fortsetzen</button>
            <button type="button" disabled={selectedAnswer === null} onClick={handleNext} className="inline-flex items-center gap-2 rounded-full bg-[#0b2d5b] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#08254b] disabled:cursor-not-allowed disabled:opacity-40">
              {currentQuestion === questions.length - 1 ? 'Ergebnis sehen' : 'Nächste Frage'} <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
