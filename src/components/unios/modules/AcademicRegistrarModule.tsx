import React, { useState } from 'react';
import { 
  GraduationCap, CheckCircle2, Clock, AlertCircle, 
  Search, ArrowRight, FileCheck, Layers, Sparkles, 
  Plus, Check, ChevronDown, ChevronRight, Zap
} from 'lucide-react';
import { DEGREE_AUDIT_DATA, UPCOMING_COURSES } from '../../../data/uniosData';
import { StudentProfile } from '../../../types/unios';

interface AcademicRegistrarModuleProps {
  student: StudentProfile;
  onOpenSpecs: () => void;
}

export const AcademicRegistrarModule: React.FC<AcademicRegistrarModuleProps> = ({
  student,
  onOpenSpecs,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'audit' | 'prereqs' | 'registration'>('audit');
  const [expandedCategory, setExpandedCategory] = useState<string>('cs_core');

  // Prerequisite Checker State
  const [searchPrereqCode, setSearchPrereqCode] = useState('CS 410');
  const [prereqResult, setPrereqResult] = useState<{
    code: string;
    title: string;
    satisfied: boolean;
    missingPrereqs: string[];
    satisfiedPrereqs: string[];
  }>({
    code: 'CS 410',
    title: 'Software Engineering Capstone I',
    satisfied: true,
    missingPrereqs: [],
    satisfiedPrereqs: ['CS 310 (Algorithms - Grade A)', 'CS 330 (Operating Systems - In Progress)'],
  });

  const checkCoursePrereqs = (code: string) => {
    setSearchPrereqCode(code);
    const upper = code.trim().toUpperCase();
    if (upper === 'CS 410') {
      setPrereqResult({
        code: 'CS 410',
        title: 'Software Engineering Capstone I',
        satisfied: true,
        missingPrereqs: [],
        satisfiedPrereqs: ['CS 310 (Algorithms - Grade A)', 'CS 330 (Operating Systems - In Progress)'],
      });
    } else if (upper === 'CS 420') {
      setPrereqResult({
        code: 'CS 420',
        title: 'Distributed Systems & Cloud Computing',
        satisfied: true,
        missingPrereqs: [],
        satisfiedPrereqs: ['CS 330 (Operating Systems - In Progress)'],
      });
    } else if (upper === 'CS 580') {
      setPrereqResult({
        code: 'CS 580',
        title: 'Advanced Deep Reinforcement Learning',
        satisfied: false,
        missingPrereqs: ['CS 480 (Machine Learning)', 'MATH 310 (Multivariable Calculus)'],
        satisfiedPrereqs: ['MATH 240 (Linear Algebra - Grade A-)'],
      });
    } else {
      setPrereqResult({
        code: upper,
        title: 'Elective Course Inquiry',
        satisfied: true,
        missingPrereqs: [],
        satisfiedPrereqs: ['General Sophomore Standing (Satisfied)'],
      });
    }
  };

  // 1-Tap Registration Cart State
  const [coursesInCart, setCoursesInCart] = useState(UPCOMING_COURSES);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [transcriptRequested, setTranscriptRequested] = useState(false);

  const handleExecute1TapRegistration = () => {
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setRegistrationSuccess(true);
      setCoursesInCart(coursesInCart.map(c => c.status === 'open' ? { ...c, enrolled: true } : c));
    }, 1200);
  };

  const progressPercent = Math.round((student.creditsEarned / student.creditsRequired) * 100);

  return (
    <div className="space-y-4">
      {/* Module Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Module 01 · SIS &amp; Degree Audit
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Academic Registrar Engine
          </h2>
        </div>
        <button
          onClick={onOpenSpecs}
          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
        >
          API Specs
        </button>
      </div>

      {/* Credit Progress Hero Card */}
      <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] text-indigo-200 font-medium">B.S. Computer Science Degree Progress</span>
            <div className="text-2xl font-bold font-mono tracking-tight mt-0.5">
              {student.creditsEarned} <span className="text-sm font-normal text-indigo-200">/ {student.creditsRequired} Credits</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-indigo-200 font-medium">Cumulative GPA</span>
            <div className="text-2xl font-bold font-mono text-emerald-300">
              {student.gpa.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-indigo-950/40 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-indigo-100 font-medium">
          <span>{progressPercent}% Complete</span>
          <span>32 Credits Remaining (Expected Spring 2027)</span>
        </div>
      </div>

      {/* Drop/Add Deadline Alert Widget */}
      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span className="text-amber-900 dark:text-amber-200 font-medium">
            Fall Drop/Add Deadline in <strong>4 Days</strong> (No &quot;W&quot; on transcript)
          </span>
        </div>
        <button
          onClick={() => {
            setTranscriptRequested(true);
            setTimeout(() => setTranscriptRequested(false), 3000);
          }}
          className="text-[11px] text-amber-800 dark:text-amber-300 underline font-semibold cursor-pointer shrink-0"
        >
          {transcriptRequested ? 'Transcript Sent!' : 'Order Official Transcript'}
        </button>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('audit')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'audit'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Degree Audit Tree
        </button>
        <button
          onClick={() => setActiveSubTab('prereqs')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'prereqs'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Prereq Checker
        </button>
        <button
          onClick={() => setActiveSubTab('registration')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'registration'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          1-Tap Registration
        </button>
      </div>

      {/* SubTab 1: Degree Audit Tree */}
      {activeSubTab === 'audit' && (
        <div className="space-y-3">
          {DEGREE_AUDIT_DATA.map((cat) => {
            const isExpanded = expandedCategory === cat.id;
            const catPercent = Math.round((cat.creditsCompleted / cat.creditsTotal) * 100);
            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setExpandedCategory(isExpanded ? '' : cat.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {cat.creditsCompleted}/{cat.creditsTotal} cr
                      </span>
                    </div>
                    {/* Micro bar */}
                    <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full ${catPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                        style={{ width: `${catPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 font-mono">
                      {catPercent}%
                    </span>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-slate-100 dark:border-slate-700/60 divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                    {cat.courses.map((course, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {course.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : course.status === 'in_progress' ? (
                            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white truncate">
                              {course.code} · {course.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {course.status === 'completed'
                                ? `${course.term} · Grade: ${course.grade}`
                                : course.status === 'in_progress'
                                ? 'Enrolled Current Term'
                                : `Prereqs: ${course.prereqs?.join(', ') || 'None'}`}
                            </div>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          {course.credits} cr
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SubTab 2: Prerequisite Checker */}
      {activeSubTab === 'prereqs' && (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Instant Course Prerequisite DAG Resolver:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchPrereqCode}
              onChange={(e) => setSearchPrereqCode(e.target.value)}
              placeholder="e.g. CS 410, CS 420, CS 580"
              className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
            <button
              onClick={() => checkCoursePrereqs(searchPrereqCode)}
              className="px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              Check
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Quick tests:</span>
            <button onClick={() => checkCoursePrereqs('CS 410')} className="text-indigo-600 dark:text-indigo-400 underline cursor-pointer">CS 410 (Eligible)</button>
            <span>·</span>
            <button onClick={() => checkCoursePrereqs('CS 580')} className="text-indigo-600 dark:text-indigo-400 underline cursor-pointer">CS 580 (Missing)</button>
          </div>

          {/* Result Card */}
          <div className={`p-3.5 rounded-xl border mt-3 ${
            prereqResult.satisfied 
              ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800' 
              : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-slate-900 dark:text-white">
                {prereqResult.code} · {prereqResult.title}
              </span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                prereqResult.satisfied 
                  ? 'bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
              }`}>
                {prereqResult.satisfied ? 'Eligible to Register' : 'Prerequisites Unmet'}
              </span>
            </div>

            <div className="text-xs space-y-1 mt-2">
              {prereqResult.satisfiedPrereqs.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-[11px]">
                  <Check className="w-3.5 h-3.5" />
                  <span>{p}</span>
                </div>
              ))}
              {prereqResult.missingPrereqs.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-[11px]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Missing: {p} (Must complete prior to enrollment)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: 1-Tap Course Registration */}
      {activeSubTab === 'registration' && (
        <div className="space-y-3">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Saved Primary Registration Cart
              </span>
              <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                Window: ACTIVE NOW
              </span>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
              One tap securely locks in all open seats and enters you into waitlists instantly via Banner SIS queue.
            </p>
          </div>

          <div className="space-y-2">
            {coursesInCart.map((c) => (
              <div
                key={c.id}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{c.code}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{c.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {c.schedule} · {c.location}
                  </div>
                </div>

                <div className="text-right">
                  {c.enrolled ? (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Registered
                    </span>
                  ) : c.status === 'open' ? (
                    <span className="text-[11px] font-semibold text-emerald-600 font-mono">
                      {c.seatsOpen} seats open
                    </span>
                  ) : c.status === 'waitlist' ? (
                    <span className="text-[11px] font-semibold text-amber-600 font-mono">
                      Waitlist ({c.waitlistLength})
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-rose-500 font-mono">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleExecute1TapRegistration}
            disabled={isRegistering || registrationSuccess}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              registrationSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isRegistering ? (
              <span>Executing SIS Batch Enrollment...</span>
            ) : registrationSuccess ? (
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Enrolled in 8 Credits + Waitlist #4</span>
            ) : (
              <span>Execute 1-Tap Registration (3 Courses)</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
