import React, { useState } from 'react';
import { 
  Briefcase, FileText, Send, MessageSquare, ExternalLink, 
  Copy, Check, Download, Layers, Bookmark, CheckCircle2, 
  ChevronRight, Sparkles, Filter, Building2
} from 'lucide-react';
import { LINKEDIN_TEMPLATES } from '../../data/resourcesData';
import { AudienceTarget } from '../../types';

interface CareerSectionProps {
  audience: AudienceTarget;
  onOpenWireframe: () => void;
  onToggleBookmark: (id: string, title: string, category: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const CareerSection: React.FC<CareerSectionProps> = ({
  onOpenWireframe,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'resume-cover' | 'job-boards' | 'star-interview' | 'linkedin-scripts'>('resume-cover');

  // --- Dynamic Cover Letter Builder State ---
  const [applicantName, setApplicantName] = useState('Alex Morgan');
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState('Software Engineering Intern');
  const [keySkills, setKeySkills] = useState('distributed systems and TypeScript');
  const [specificProject, setSpecificProject] = useState('building an open-source high-throughput API gateway that reduced response latency by 32%');
  const [coverLetterCopied, setCoverLetterCopied] = useState(false);

  const generateCoverLetterText = () => {
    return `Dear Hiring Team at ${targetCompany || '[Company]'},

I am writing to express my enthusiastic interest in the ${targetRole || '[Role]'} position. As a dedicated student with practical project experience in ${keySkills || '[Key Skills]'}, I have long admired ${targetCompany}'s commitment to developer ergonomics and reliable infrastructure.

During my recent academic coursework and independent engineering, I focused on ${specificProject || '[Key Achievement]'}. This experience reinforced my ability to quickly dissect complex problem spaces, translate ambiguity into clean modular architectures, and collaborate closely with cross-functional peers under tight shipping timelines.

I am eager to bring my curiosity, technical foundation, and relentless work ethic to the internship cohort at ${targetCompany}. Thank you for your time and consideration—I welcome the opportunity to discuss how my skill set can support your team's upcoming initiatives.

Warm regards,

${applicantName || '[Your Name]'}
[Email Address] · [Phone] · [LinkedIn Profile] · [Portfolio/GitHub]`;
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(generateCoverLetterText());
    setCoverLetterCopied(true);
    setTimeout(() => setCoverLetterCopied(false), 2000);
  };

  // --- Job Boards Directory Filter ---
  const [boardFilter, setBoardFilter] = useState<'all' | 'high_school' | 'college' | 'stem' | 'remote'>('all');

  const JOB_BOARDS = [
    {
      name: 'Handshake',
      tier: 'college',
      tag: 'Campus Network',
      url: 'https://joinhandshake.com',
      description: 'The premier college career portal. Employers partner directly with your university to hire students for on-campus jobs, summer internships, and entry-level roles.',
      audienceLabel: 'University Students',
    },
    {
      name: 'WayUp',
      tier: 'college',
      tag: 'Early Career',
      url: 'https://www.wayup.com',
      description: 'Curated internship and new-grad job portal with transparent pay ranges and direct recruiter pipelines for top Fortune 500 and high-growth startups.',
      audienceLabel: 'College Undergrads',
    },
    {
      name: 'StandOut Connect',
      tier: 'high_school',
      tag: 'High School',
      url: 'https://www.standoutconnect.com',
      description: 'Connects driven high school students directly with paid and unpaid startup internships across research, business, and software development.',
      audienceLabel: 'High School Students',
    },
    {
      name: 'NSF REU (Research Experiences for Undergraduates)',
      tier: 'stem',
      tag: 'STEM Research',
      url: 'https://www.nsf.gov/crssprgm/reu/',
      description: 'Fully funded summer research internships at universities nationwide funded by the National Science Foundation with $6,000+ stipends and free housing.',
      audienceLabel: 'STEM Undergrads',
    },
    {
      name: 'USAJOBS Pathways Program',
      tier: 'college',
      tag: 'Federal Government',
      url: 'https://www.usajobs.gov/studentsandgrads',
      description: 'Paid federal internships with clear tracks to permanent government careers in NASA, EPA, State Department, and federal research labs.',
      audienceLabel: 'High School & College',
    },
    {
      name: 'Idealist.org',
      tier: 'all',
      tag: 'Non-Profit & Civic',
      url: 'https://www.idealist.org',
      description: 'Global database of internships and entry-level jobs with non-profit organizations, social impact ventures, and international NGOs.',
      audienceLabel: 'All Students',
    },
    {
      name: 'Wellfound (Formerly AngelList)',
      tier: 'remote',
      tag: 'Startups & Tech',
      url: 'https://wellfound.com',
      description: 'Direct contact with startup founders and early engineering teams without recruiters. High proportion of remote and hybrid internship roles.',
      audienceLabel: 'College & Self-Taught',
    },
  ];

  const filteredBoards = JOB_BOARDS.filter((board) => {
    if (boardFilter === 'all') return true;
    return board.tier === boardFilter;
  });

  // --- STAR Interview Prep State ---
  const [selectedStarCard, setSelectedStarCard] = useState<number>(0);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const STAR_QUESTIONS = [
    {
      q: 'Tell me about a time you faced a difficult conflict in a group project.',
      s: 'During our final semester Systems Design project, two team members disagreed vehemently over database architecture (Postgres vs. Mongo), stalling progress.',
      t: 'As the project lead, I needed to break the deadlock and keep the project on track for our prototype deadline without demoralizing the team.',
      a: 'I scheduled a 30-minute structured trade-off matrix session where each member presented latency benchmarks and schema migration requirements against our project rubric.',
      r: 'We objectively agreed on Postgres, met our prototype deadline 3 days early, and scored an A on our submission with zero team friction.',
    },
    {
      q: 'Describe a situation where an assignment didn\'t go as planned. How did you adapt?',
      s: 'Our machine learning model for predicting student retention suffered from severe overfitting 48 hours before the final symposium.',
      t: 'I had to diagnose whether the issue was data leakage, excessive model capacity, or hyperparameter choices within 2 days.',
      a: 'I implemented K-fold cross-validation, stripped out high-collinearity features, and applied L2 regularization rather than rewriting the whole pipeline.',
      r: 'The validation accuracy stabilized at 89%, and the symposium judges awarded us the "Best Methodological Rigor" prize in our cohort.',
    },
    {
      q: 'Give an example of how you balance multiple competing academic and extracurricular deadlines.',
      s: 'During midterms week, I had two exam dates, a varsity athletic meet, and an executive board budget review due on the same Friday.',
      t: 'I needed to preserve my GPA, honor my team commitments, and balance my budget without pulling all-nighters.',
      a: 'I reverse-engineered the week using a time-blocking system, front-loading study blocks during early morning hours and delegating board budget verification tasks.',
      r: 'Achieved an A and B+ on the exams, placed 2nd at the meet, and submitted the balanced budget on time with full mental clarity.',
    },
  ];

  return (
    <section id="career" className="py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <span>Section 02</span>
              <span aria-hidden="true">·</span>
              <span>Professional Trajectory &amp; Hiring Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Career &amp; Internship Directory
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              ATS-tested resume formulas, customizable cover letters, verified student job boards, STAR interview prep cards, and alumni outreach scripts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark('career-suite', 'Career & Internship Directory Suite', 'Career')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isBookmarked('career-suite')
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('career-suite') ? 'fill-emerald-600 dark:fill-emerald-400' : ''}`} />
              <span>{isBookmarked('career-suite') ? 'Saved in Toolkit' : 'Save Section'}</span>
            </button>

            <button
              onClick={onOpenWireframe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Section Blueprint &amp; UX Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 overflow-x-auto border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('resume-cover')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'resume-cover'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Resume ATS Rules &amp; Cover Letter Builder
          </button>
          <button
            onClick={() => setActiveTab('job-boards')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'job-boards'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curated Job &amp; Internship Boards
          </button>
          <button
            onClick={() => setActiveTab('star-interview')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'star-interview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            STAR Behavioral Interview Simulator
          </button>
          <button
            onClick={() => setActiveTab('linkedin-scripts')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'linkedin-scripts'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            LinkedIn &amp; Cold Email Scripts
          </button>
        </div>

        {/* Tab 1: Resume ATS & Cover Letter Builder */}
        {activeTab === 'resume-cover' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Cover Letter Customizer */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  Interactive 3-Paragraph Cover Letter Generator
                </h3>
                <button
                  onClick={handleCopyCoverLetter}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {coverLetterCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{coverLetterCopied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5 text-xs">
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Target Company / Organization</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Target Position / Internship</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Key Relevant Skills</label>
                  <input
                    type="text"
                    value={keySkills}
                    onChange={(e) => setKeySkills(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-600 dark:text-slate-400 mb-1">Key Project or Quantifiable Achievement</label>
                  <input
                    type="text"
                    value={specificProject}
                    onChange={(e) => setSpecificProject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Live Preview Textarea */}
              <div className="relative">
                <textarea
                  readOnly
                  value={generateCoverLetterText()}
                  rows={12}
                  className="w-full p-4 font-serif text-xs sm:text-[13px] bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 leading-relaxed select-all"
                />
              </div>
            </div>

            {/* Right: The Google XYZ Resume Bullet Formula */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  Proven Hiring Architecture
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  The Google &quot;XYZ&quot; Resume Bullet Formula
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Applicant Tracking Systems (ATS) and recruiters scan for impact over duty. Transform passive responsibilities into high-leverage statements:
                </p>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-3">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white block mb-1">
                    &quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;
                  </span>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mt-2">
                    <div className="p-2 bg-rose-50/60 dark:bg-rose-950/20 rounded border border-rose-100 dark:border-rose-900/40">
                      <span className="font-semibold text-rose-700 dark:text-rose-400 block text-[11px]">Weak / Passive:</span>
                      <span>&quot;Helped organize the high school robotics tournament and handled tickets.&quot;</span>
                    </div>
                    <div className="p-2 bg-emerald-50/60 dark:bg-emerald-950/20 rounded border border-emerald-100 dark:border-emerald-900/40">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 block text-[11px]">Strong / XYZ Formula:</span>
                      <span>&quot;Coordinated logistical operations for 28 competing robotics teams across 4 districts, boosting registration by 45% and raising $3,200 in sponsor funding.&quot;</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-500">
                  <div>· Action Verbs: Engineered, Spearheaded, Diagnosed, Synthesized.</div>
                  <div>· Keep total length to 1 single clean page (high school &amp; undergrad).</div>
                  <div>· Zero multi-column tables (which confuse ATS parsers).</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Curated Job & Internship Boards */}
        {activeTab === 'job-boards' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="text-xs text-slate-500">
                Showing vetted recruitment platforms with genuine early-career pipelines.
              </span>

              {/* Filter Tabs */}
              <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                {(['all', 'high_school', 'college', 'stem', 'remote'] as const).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setBoardFilter(filterKey)}
                    className={`px-3 py-1.5 rounded-md font-medium capitalize transition-all cursor-pointer ${
                      boardFilter === filterKey
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {filterKey === 'all' ? 'All Boards' : filterKey.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBoards.map((board, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-emerald-300 dark:hover:border-emerald-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {board.tag}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {board.audienceLabel}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {board.name}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {board.description}
                    </p>
                  </div>

                  <a
                    href={board.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors"
                  >
                    <span>Visit Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: STAR Behavioral Interview Simulator */}
        {activeTab === 'star-interview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Questions selector */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Common Behavioral Scenarios
              </span>
              {STAR_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedStarCard(idx)}
                  className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedStarCard === idx
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    Question 0{idx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold line-clamp-2">
                    {item.q}
                  </h4>
                </button>
              ))}

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 mt-4">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  The STAR Time Breakdown:
                </span>
                <p>Situation (15%) · Task (10%) · Action (60%) · Result (15%). Always spend the majority of your answer explaining <em>your specific contributions and trade-offs</em>.</p>
              </div>
            </div>

            {/* Right: Detailed STAR Breakdown */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  Interview Prompt
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  &quot;{STAR_QUESTIONS[selectedStarCard].q}&quot;
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      S — Situation (Set Context)
                    </span>
                    <span className="text-[11px] text-slate-400">~20 seconds</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {STAR_QUESTIONS[selectedStarCard].s}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      T — Task (Your Objective)
                    </span>
                    <span className="text-[11px] text-slate-400">~15 seconds</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {STAR_QUESTIONS[selectedStarCard].t}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                      A — Action (Your Specific Steps &amp; Rationale)
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Core Focal Weight (60%)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {STAR_QUESTIONS[selectedStarCard].a}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      R — Result (Measurable Outcome &amp; Takeaway)
                    </span>
                    <span className="text-[11px] text-slate-400">~25 seconds</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {STAR_QUESTIONS[selectedStarCard].r}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: LinkedIn & Cold Email Templates */}
        {activeTab === 'linkedin-scripts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LINKEDIN_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {tmpl.target}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(tmpl.content);
                        setCopiedTemplateId(tmpl.id);
                        setTimeout(() => setCopiedTemplateId(null), 2000);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedTemplateId === tmpl.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTemplateId === tmpl.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {tmpl.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 italic">
                    {tmpl.context}
                  </p>

                  <pre className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans border border-slate-200/60 dark:border-slate-700/60 select-all leading-relaxed">
                    {tmpl.content}
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  Tip: Customize bracketed items like <code>[Alum Name]</code> before hitting send. Keep follow-ups to 1 gentle nudge after 7 days.
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
