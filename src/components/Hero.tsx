import React from 'react';
import { AudienceTarget, SectionId } from '../types';
import { Search, BookOpen, Briefcase, Heart, DollarSign, Clock, ArrowRight } from 'lucide-react';

interface HeroProps {
  selectedAudience: AudienceTarget;
  onSelectAudience: (aud: AudienceTarget) => void;
  onNavigateToSection: (sectionId: SectionId) => void;
  onOpenSearch: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedAudience,
  onSelectAudience,
  onNavigateToSection,
  onOpenSearch,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <section id="top" className="relative pt-6 pb-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main 2-column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          {/* Left Column: Mission, Search & Audience Switcher */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Clean text kicker (unboxed, no pill) */}
              <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 mb-3">
                Educational Technologist &amp; UX Blueprint
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 [text-wrap:balance]">
                The Comprehensive Student Resource Hub
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-2xl">
                A unified, research-backed digital workspace built to guide high school and university students through academic rigor, early career positioning, somatic wellness, financial clarity, and executive time management.
              </p>

              {/* Fast Inline Search Bar */}
              <div className="relative mb-6 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={onOpenSearch}
                  placeholder="Search 50+ templates, citation generators, scholarships, checklists..."
                  className="w-full pl-10 pr-24 py-3 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                >
                  Explore
                </button>
              </div>

              {/* Target Audience Segmented Control */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Tailor View For:
                </span>
                <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => onSelectAudience('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      selectedAudience === 'all'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Students
                  </button>
                  <button
                    onClick={() => onSelectAudience('high_school')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      selectedAudience === 'high_school'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    High School
                  </button>
                  <button
                    onClick={() => onSelectAudience('university')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      selectedAudience === 'university'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    College &amp; University
                  </button>
                </div>
              </div>
            </div>

            {/* Micro proof / stats row (unboxed clean typography) */}
            <div className="flex flex-wrap items-center gap-6 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums text-sm">5 Core Modules</span>
                <span className="ml-1 text-slate-400">· Academic to Career</span>
              </div>
              <div className="hidden sm:block text-slate-300 dark:text-slate-700">|</div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums text-sm">12+ Interactive Tools</span>
                <span className="ml-1 text-slate-400">· Calculators, Timers &amp; Builders</span>
              </div>
              <div className="hidden sm:block text-slate-300 dark:text-slate-700">|</div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">Open &amp; Private</span>
                <span className="ml-1 text-slate-400">· Zero Sign-Up Required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photo */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm min-h-[320px] bg-slate-100 dark:bg-slate-800">
            <img
              src="/src/assets/images/hero_student_campus_1794039605541.jpg"
              alt="Sunlit architectural university study atrium with students collaborating"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider mb-1">
                Student-Centered UX Architecture
              </span>
              <p className="text-white text-sm font-medium leading-snug">
                Designed for high cognitive clarity, low fatigue, and immediate actionable toolkits.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Fast-Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <button
            onClick={() => onNavigateToSection('academic')}
            className="group flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-800 rounded-xl text-left transition-all cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Academic &amp; Study
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Pomodoro, Cornell notes, flashcards &amp; citation generator.
              </p>
            </div>
            <div className="flex items-center text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span>Open Study Suite</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateToSection('career')}
            className="group flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-800 rounded-xl text-left transition-all cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Career &amp; Internships
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                ATS resume rules, cover letter builder, STAR interview prep.
              </p>
            </div>
            <div className="flex items-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span>Explore Pathways</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateToSection('wellness')}
            className="group flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-800 rounded-xl text-left transition-all cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Wellness &amp; Mental Health
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                24/7 hotlines, 4-7-8 breathing circle, sleep hygiene audit.
              </p>
            </div>
            <div className="flex items-center text-[11px] font-medium text-rose-600 dark:text-rose-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span>Breathe &amp; Reset</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateToSection('finance')}
            className="group flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-800 rounded-xl text-left transition-all cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Financial Literacy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Monthly student budget calculator, verified scholarships &amp; discounts.
              </p>
            </div>
            <div className="flex items-center text-[11px] font-medium text-amber-600 dark:text-amber-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span>Calculate Aid</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onNavigateToSection('productivity')}
            className="group flex flex-col justify-between p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 border border-slate-200/80 dark:border-slate-800 rounded-xl text-left transition-all cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Productivity &amp; Time
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Deadline tracker, reverse syllabus milestones &amp; team charters.
              </p>
            </div>
            <div className="flex items-center text-[11px] font-medium text-sky-600 dark:text-sky-400 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span>Track Deadlines</span>
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
