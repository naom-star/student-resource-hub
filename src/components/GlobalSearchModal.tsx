import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Briefcase, Heart, DollarSign, Clock } from 'lucide-react';
import { SectionId } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (sectionId: SectionId) => void;
  initialQuery?: string;
}

interface SearchEntry {
  title: string;
  section: SectionId;
  sectionName: string;
  category: string;
  description: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  {
    title: 'Pomodoro Focus Timer (25/5 & 50/10)',
    section: 'academic',
    sectionName: 'Academic Support',
    category: 'Study Technique',
    description: 'Time-boxed study intervals with session counter and gentle audio synthesis chimes.',
  },
  {
    title: 'Academic Citation Generator (APA, MLA, Chicago)',
    section: 'academic',
    sectionName: 'Academic Support',
    category: 'Reference Tool',
    description: 'Format journal, textbook, and web citations instantly with one-click copy.',
  },
  {
    title: 'Cornell Note-Taking Architecture & Template',
    section: 'academic',
    sectionName: 'Academic Support',
    category: 'Note-Taking',
    description: 'Cues, detailed class notes, and bottom synthesis summary markdown sheet.',
  },
  {
    title: 'Active Recall & Leitner Flashcard Sandbox',
    section: 'academic',
    sectionName: 'Academic Support',
    category: 'Spaced Repetition',
    description: '5-Box Leitner spaced repetition study simulator with self-grading feedback.',
  },
  {
    title: 'Subject Formula Cards (Calculus, Chem, Bio, Writing)',
    section: 'academic',
    sectionName: 'Academic Support',
    category: 'Reference Guides',
    description: 'Derivatives, ideal gas equilibrium, cellular respiration ATP, and thesis formula.',
  },
  {
    title: 'Google XYZ Resume Bullet Point Formula',
    section: 'career',
    sectionName: 'Career & Internships',
    category: 'Resume & CV',
    description: 'Accomplished [X] as measured by [Y], by doing [Z] ATS-friendly formula.',
  },
  {
    title: 'Interactive 3-Paragraph Cover Letter Builder',
    section: 'career',
    sectionName: 'Career & Internships',
    category: 'Application Tool',
    description: 'Fill in your target role and project to generate customized, ready-to-send letters.',
  },
  {
    title: 'Curated Job & Internship Boards (Handshake, WayUp, NSF REU)',
    section: 'career',
    sectionName: 'Career & Internships',
    category: 'Job Directory',
    description: 'Vetted student hiring portals with direct recruiter pipelines and high school options.',
  },
  {
    title: 'STAR Method Behavioral Interview Simulator',
    section: 'career',
    sectionName: 'Career & Internships',
    category: 'Interview Prep',
    description: 'Situation, Task, Action, and Result structured answers to common interview questions.',
  },
  {
    title: 'LinkedIn & Cold Email Networking Templates',
    section: 'career',
    sectionName: 'Career & Internships',
    category: 'Networking',
    description: 'Alumni coffee chats, post-career fair follow-ups, and professor lab inquiry emails.',
  },
  {
    title: '4-7-8 & Box Breathing Somatic Visualizer',
    section: 'wellness',
    sectionName: 'Wellness Corner',
    category: 'Stress Management',
    description: 'Guided animated expanding circle to stimulate the vagus nerve and slow heart rate.',
  },
  {
    title: '24/7 Verified Crisis & Mental Health Hotlines',
    section: 'wellness',
    sectionName: 'Wellness Corner',
    category: 'Crisis Support',
    description: 'Direct dial and SMS for 988 Lifeline, Crisis Text Line 741741, Trevor Project, and Steve Fund.',
  },
  {
    title: 'Sleep Hygiene 10-Point Self-Audit Checklist',
    section: 'wellness',
    sectionName: 'Wellness Corner',
    category: 'Sleep & Health',
    description: 'Interactive audit calculating your 7-day sleep recovery score and memory retention tips.',
  },
  {
    title: 'Student Burnout Prevention & Boundaries Guide',
    section: 'wellness',
    sectionName: 'Wellness Corner',
    category: 'Mental Health',
    description: 'Identify emotional exhaustion, cynicism, and diminished efficacy with concrete boundaries.',
  },
  {
    title: 'Interactive Student Monthly Budget Calculator',
    section: 'finance',
    sectionName: 'Financial Literacy',
    category: 'Budgeting Tool',
    description: 'Calculate net cash flow, surplus/deficit, and 50/30/20 needs vs wants allocation.',
  },
  {
    title: 'Vetted Scholarships Search Database',
    section: 'finance',
    sectionName: 'Financial Literacy',
    category: 'Scholarships',
    description: 'High-value scholarships with deadlines, amounts, and zero-fee legitimate links.',
  },
  {
    title: 'Student Discounts Vault ($1,200+ Annual Savings)',
    section: 'finance',
    sectionName: 'Financial Literacy',
    category: 'Discounts',
    description: 'GitHub Student Pack, Spotify, Notion Plus, Adobe 60% off, and Apple Education pricing.',
  },
  {
    title: 'Federal Student Loans & FAFSA Navigation Roadmap',
    section: 'finance',
    sectionName: 'Financial Literacy',
    category: 'Loan Guide',
    description: 'Subsidized vs unsubsidized breakdown, annual FAFSA calendar, and IDR/PSLF debt relief.',
  },
  {
    title: 'Live Course Deadline & Task Tracker',
    section: 'productivity',
    sectionName: 'Productivity & Time',
    category: 'Task Management',
    description: 'Persistent assignment checklist with priority tags, course codes, and completion gauge.',
  },
  {
    title: 'Reverse Syllabus Milestone Calculator',
    section: 'productivity',
    sectionName: 'Productivity & Time',
    category: 'Planning Tool',
    description: 'Automatically backward-plans 5 staggered project checkpoints from your final deadline.',
  },
  {
    title: 'Notion & Google Drive Organization Architecture',
    section: 'productivity',
    sectionName: 'Productivity & Time',
    category: 'Digital Organization',
    description: 'Standardized folder taxonomy and course database setup ready to copy.',
  },
  {
    title: 'Group Project Team Charter & Contract',
    section: 'productivity',
    sectionName: 'Productivity & Time',
    category: 'Collaboration',
    description: 'Establish 24h response rules, role allocation, and conflict escalation in Week 1.',
  },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  if (!isOpen) return null;

  const results = SEARCH_INDEX.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.sectionName.toLowerCase().includes(q)
    );
  });

  const getSectionIcon = (section: SectionId) => {
    switch (section) {
      case 'academic': return <BookOpen className="w-3.5 h-3.5 text-indigo-500" />;
      case 'career': return <Briefcase className="w-3.5 h-3.5 text-emerald-500" />;
      case 'wellness': return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'finance': return <DollarSign className="w-3.5 h-3.5 text-amber-500" />;
      case 'productivity': return <Clock className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, Pomodoro, citations, scholarships, hotlines, tasks..."
            className="w-full text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No matching tools or guides found for &quot;{query}&quot;. Try searching &quot;Pomodoro&quot;, &quot;Resume&quot;, &quot;Scholarship&quot;, or &quot;Sleep&quot;.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectResult(item.section);
                  onClose();
                }}
                className="w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-left transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getSectionIcon(item.section)}
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {item.sectionName}
                    </span>
                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Bottom helper */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Click any item to jump directly to its interactive section</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded font-mono">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
