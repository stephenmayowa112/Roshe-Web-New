'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Play,
  FileText,
  Users,
  PenTool,
  Palette,
  Download,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// ─── Types ────────────────────────────────────────────────────────────────────
interface License {
  id: string;
  type: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  amount: number;
  currency: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  description: string | null;
  createdAt: string;
}

interface StatsData {
  school: { name: string; type: string; studentCount: number; memberSince: string };
  licenses: { active: number; details: License[] };
  payments: { totalSpent: number; recent: Payment[] };
  users: { count: number };
}

// ─── Static resource definitions (unlocked when license is active) ─────────────
const RESOURCES = [
  { id: 'film',      label: 'Film License',       icon: Play,     kind: 'film'     },
  { id: 'assembly',  label: 'Assembly script',     icon: FileText, kind: 'download' },
  { id: 'teachers',  label: 'Teachers guide',      icon: Users,    kind: 'download' },
  { id: 'worksheet', label: 'Student worksheet',   icon: PenTool,  kind: 'download' },
  { id: 'craft',     label: 'Craft Activity',      icon: Palette,  kind: 'download' },
];

// ─── Film guide content ────────────────────────────────────────────────────────
const FILM_GUIDE = {
  title: 'REMEMBER ME — Film Guide for Primary Schools',
  summary: 'A short animated film about remembrance, family and the stories behind history.',
  age: '7–11 | KS2, adaptable for KS1',
  themes: 'Remembrance, History, Family, Memory & Reflection',
  about: `Remember Me follows a granddaughter visiting the grave of a soldier who died during the
    Second World War. As she touches his gravestone, she experiences glimpses of his life,
    helping pupils understand the people and stories behind Remembrance Day.`,
  objectives: [
    'Understand why we commemorate Remembrance Day.',
    'Explore how war affected individuals and families.',
    'Develop vocabulary, empathy and communication skills.',
    'Respond through writing, art, discussion and storytelling.',
  ],
  before: [
    'What does it mean to remember someone?',
    'Why do we wear poppies?',
    'What can a memorial tell us?',
  ],
  vocabulary: 'Remembrance, War, Soldier, Memorial, Poppy, Sacrifice, Courage, Peace, Memory.',
  during: [
    'Characters — Who are they and how are they connected?',
    'Setting — Where does the story take place?',
    'Emotions — How do the characters feel?',
  ],
  after: [
    'What happened in the film?',
    'Who was the soldier?',
    'Why was his gravestone important?',
    'How did the granddaughter feel?',
    'Why is remembering important?',
    'What message does the film communicate?',
  ],
};

// ─── Recently-used placeholder rows (shown when no payment history yet) ────────
const PLACEHOLDER_RECENT = [
  { id: '1', title: 'Remembrance Day Assembly Script',   date: null },
  { id: '2', title: 'Remembrance Day Teachers Guide',    date: null },
  { id: '3', title: 'Remembrance Day Teachers Guide',    date: null },
  { id: '4', title: 'Remembrance Day Craft Activity',    date: null },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats]         = useState<StatsData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStats(data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setStats(data);
      } catch (err: any) {
        setError(err.message ?? 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, []);

  const hasLicense = (stats?.licenses?.active ?? 0) > 0;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f5bf05] mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center max-w-sm">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <p className="font-semibold text-gray-800 mb-1">Could not load dashboard</p>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="inline-flex items-center gap-2 bg-[#f5bf05] text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#e6b100] transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      </div>
    );
  }

  // ── Recent rows: real payments if available, otherwise placeholders ─────────
  const recentRows =
    (stats?.payments?.recent?.length ?? 0) > 0
      ? stats!.payments.recent.map((p) => ({
          id: p.id,
          title: p.description ?? 'Resource Download',
          date: p.createdAt,
        }))
      : PLACEHOLDER_RECENT;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-full">

      {/* ── Top section: hero image + resource cards + recent list ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6 mb-0">

        {/* Left column */}
        <div>
          {/* Hero banner */}
          <section className="relative rounded-xl overflow-hidden mb-6 bg-black" style={{ height: 200 }}>
            <Image
              src="/images/home-banner-remember-me.png"
              alt="Remember Me — Powerful story. Meaningful learning."
              fill
              className="object-cover object-top opacity-90"
              priority
              onError={(e) => {
                // fallback image if this one doesn't exist
                (e.target as HTMLImageElement).src = '/images/licensing-poster.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8">
              <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                Powerful story.<br />Meaningful learning
              </h2>
              <p className="text-white/80 text-sm mb-4 max-w-xs">
                Bring Remembrance Day to life with our animated film and curriculum-aligned resources.
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  <Play className="h-4 w-4 fill-white" />
                  Watch the Film
                </button>
                <button
                  onClick={() => setShowGuide(true)}
                  className="text-sm font-semibold text-white border border-white/60 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  Film Guide
                </button>
              </div>
            </div>
          </section>

          {/* Resource cards grid — 5 cards matching the design */}
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {RESOURCES.map((res) => {
              const Icon = res.icon;
              const isFilm = res.kind === 'film';
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="w-12 h-12 bg-[#f5bf05] rounded-full flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-black" strokeWidth={1.8} />
                  </div>

                  {/* License count badge (film only) */}
                  {isFilm && (
                    <span className="text-2xl font-extrabold text-gray-900 leading-none mb-1">
                      {stats?.licenses?.active ?? 0}
                    </span>
                  )}

                  <p className="text-xs font-semibold text-gray-800 leading-tight mb-1">{res.label}</p>

                  {/* Status / action */}
                  {isFilm ? (
                    <span className={`text-[11px] font-medium flex items-center gap-1 ${hasLicense ? 'text-green-600' : 'text-gray-400'}`}>
                      {hasLicense && <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />}
                      {hasLicense ? 'Active' : 'No licence'}
                    </span>
                  ) : (
                    <button
                      disabled={!hasLicense}
                      className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        hasLicense
                          ? 'text-[#f5bf05] hover:text-[#e6b100]'
                          : 'text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Download
                      <Download className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </section>
        </div>

        {/* Right column — Recently Used Resources */}
        <aside className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-fit">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Recently Used Resources</h3>
          <ul className="space-y-3">
            {recentRows.map((row, i) => (
              <li key={row.id} className="flex items-start gap-3">
                {/* PDF icon */}
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 leading-tight">{row.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {row.date
                      ? `Downloaded ${formatDistanceToNow(new Date(row.date), { addSuffix: true })}`
                      : 'Downloaded\n2 days ago'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ── Film Guide Modal ─────────────────────────────────────────────────── */}
      {showGuide && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-base font-bold text-gray-900">{FILM_GUIDE.title}</h2>
              <button
                onClick={() => setShowGuide(false)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none font-bold"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-sm text-gray-700">
              <p className="text-gray-600">{FILM_GUIDE.summary}</p>
              <p><strong>Age:</strong> {FILM_GUIDE.age}<br /><strong>Themes:</strong> {FILM_GUIDE.themes}</p>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">About the Film</h3>
                <p>{FILM_GUIDE.about}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">Learning Objectives</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {FILM_GUIDE.objectives.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">Before Watching</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {FILM_GUIDE.before.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <p className="mt-2"><strong>Key vocabulary:</strong> {FILM_GUIDE.vocabulary}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">While Watching</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {FILM_GUIDE.during.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1">After Watching</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {FILM_GUIDE.after.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
