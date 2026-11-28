import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowUpLeft,
  Award,
  BookOpen,
  Clock3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Globe2,
  GraduationCap,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Search,
  Sparkles,
  Star,
  Target,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { GermanPlacementTest } from '@/components/GermanPlacementTest';
import { GermanPathway } from '@/components/GermanPathway';
import { CheckCircle2 } from 'lucide-react';

type Language = 'en' | 'fr' | 'de' | 'ar';
type IconType = typeof Globe2;

type Course = {
  level: string;
  title: string;
  description: string;
  icon: IconType;
  accent: string;
  tag: string;
};

type Article = {
  category: string;
  title: string;
  read: string;
  color: string;
};

type BookingCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  selected: string;
  priceLabel: string;
  packages: { name: string; price: string; duration: string; badge?: string }[];
  cohort: string;
  fullName: string;
  phone: string;
  language: string;
  level: string;
  time: string;
  email: string;
  notes: string;
  notePlaceholder: string;
  submit: string;
  or: string;
  whatsapp: string;
  success: string;
  error: string;
  missing: string;
  levels: string[];
  times: string[];
};

type AboutCopy = {
  kicker: string;
  titleBefore: string;
  titleAccent: string;
  body: string;
  missionTitle: string;
  missionBody: string;
  directorTitle: string;
  directorBody: string;
  badges: string[];
  address: string;
  phone: string;
  hours: string;
};

type ProofCopy = {
  kicker: string;
  titleBefore: string;
  titleAccent: string;
  body: string;
  benefits: { title: string; body: string }[];
  pathwaysTitle: string;
  pathwaysAccent: string;
  pathways: { title: string; body: string; icon: IconType }[];
  teacherTitle: string;
  teacherBody: string;
  teacherBadges: string[];
};

type Copy = {
  direction: 'ltr' | 'rtl';
  nav: { programs: string; about: string; method: string; packages: string; guides: string; contact: string; start: string; menu: string; tagline: string };
  hero: { eyebrow: string; titleBefore: string; titleAccent: string; titleAfter: string; description: string; programs: string; method: string; years: string; learners: string; rating: string; journey: string; month: string; confidence: string; practice: string; progress: string; speaking: string; active: string; vocabulary: string; words: string; fluency: string; level: string; community: string; everyDay: string; cardLive: string; cardOnline: string; oneOnOne: string; groupClass: string; liveSession: string; nextClass: string; sessionTopic: string; studentsJoined: string; joinNow: string; cardFormat: string };
  programs: { kicker: string; title: string; accent: string; all: string; explore: string; courses: Course[] };
  method: { kicker: string; titleBefore: string; titleAccent: string; titleAfter: string; description: string; items: { title: string; body: string }[]; practical: string; confidence: string };
  articles: { kicker: string; titleBefore: string; titleAccent: string; all: string; read: string; items: Article[] };
  certificate: { kicker: string; titleBefore: string; titleAccent: string; body: string; certTitle: string; certSubtitle: string; certPresented: string; certStudent: string; certLevel: string; certDate: string; certSign: string; certSignTitle: string; certId: string; features: { title: string; body: string }[]; noteTitle: string; noteBody: string; cta: string };
  verify: { kicker: string; title: string; subtitle: string; placeholder: string; button: string; searching: string; validTitle: string; validBadge: string; revokedTitle: string; revokedBody: string; notFoundTitle: string; notFoundBody: string; studentLabel: string; languageLabel: string; levelLabel: string; courseLabel: string; dateLabel: string; idLabel: string; tryAnother: string; hint: string };
  about: AboutCopy;
  booking: BookingCopy;
  proof: ProofCopy;
  packages: { kicker: string; title: string; accent: string; subtitle: string; perStudent: string; popular: string; cta: string; items: { name: string; price: string; duration: string; badge?: string; features: string[] }[] };
  contact: { kicker: string; titleBefore: string; titleAccent: string; description: string; name: string; email: string; phone: string; language: string; message: string; languageOptions: Record<Language, string>; placeholder: string; button: string; join: string; whatsapp: string; success: string; error: string; required: string };
  footer: { description: string; quick: string; programs: string; contact: string; nav: string[]; courseNames: string[]; email: string; locations: string[]; copyright: string };
};

const languageLabels: Record<Language, string> = { en: 'EN', fr: 'FR', de: 'DE', ar: 'عربي' };
const languageNames: Record<Language, string> = { en: 'English', fr: 'Français', de: 'Deutsch', ar: 'العربية' };
const packageKeys = ['essential', 'small_group', 'intensive', 'ielts'] as const;

export default function App() {
  return <div />;
}
