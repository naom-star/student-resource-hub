import React from 'react';
import { SectionId } from '../types';

interface FooterProps {
  onNavigateToSection: (sectionId: SectionId) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenSearch }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-5">
            <a
              href="#top"
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
            >
              AcademiaHub
            </a>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-sm">
              An open educational technology toolkit designed to lower cognitive overhead, eliminate academic stress, and provide free actionable systems for secondary and university students.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white block mb-2.5">
                Core Sections
              </span>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <button onClick={() => onNavigateToSection('academic')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Academic Support
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('career')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Career &amp; Internships
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('wellness')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Wellness Corner
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('finance')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Financial Literacy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('productivity')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Productivity &amp; Time
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-slate-900 dark:text-white block mb-2.5">
                Key Interactive Tools
              </span>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <button onClick={() => onNavigateToSection('academic')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Pomodoro Study Clock
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('academic')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Citation Generator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('finance')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Monthly Budget Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('wellness')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    4-7-8 Breathing Circle
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateToSection('productivity')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                    Reverse Syllabus Planner
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-slate-900 dark:text-white block mb-2.5">
                Emergency &amp; Rights
              </span>
              <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                <li>
                  <a href="tel:988" className="hover:text-rose-600 font-medium">
                    Call 988 Lifeline
                  </a>
                </li>
                <li>
                  <a href="sms:741741" className="hover:text-rose-600 font-medium">
                    Text 741741 Crisis
                  </a>
                </li>
                <li>
                  <span className="text-slate-400">FERPA Protected Data</span>
                </li>
                <li>
                  <span className="text-slate-400">100% Free &amp; Open Access</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiet copyright & metadata text (no pills, no status tickers) */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div>
            Built with evidence-based learning design principles for student empowerment.
          </div>
          <div>
            © 2026 AcademiaHub. Open educational resource.
          </div>
        </div>
      </div>
    </footer>
  );
};
