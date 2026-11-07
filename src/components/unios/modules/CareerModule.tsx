import React, { useState } from 'react';
import { 
  Briefcase, Users, Calendar, QrCode, FileText, 
  Check, Clock, ExternalLink, ArrowRight, MessageSquare, Coffee
} from 'lucide-react';
import { CAMPUS_JOBS_DATA } from '../../../data/uniosData';
import { StudentProfile } from '../../../types/unios';

interface CareerModuleProps {
  student: StudentProfile;
  onOpenSpecs: () => void;
}

export const CareerModule: React.FC<CareerModuleProps> = ({
  student,
  onOpenSpecs,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'jobs' | 'interviews' | 'alumni' | 'badge'>('jobs');
  const [jobsList, setJobsList] = useState(CAMPUS_JOBS_DATA);
  const [showAppliedToast, setShowAppliedToast] = useState<string | null>(null);

  const handleApply = (id: string) => {
    setJobsList(jobsList.map(j => j.id === id ? { ...j, applied: true } : j));
    setShowAppliedToast(id);
    setTimeout(() => setShowAppliedToast(null), 3000);
  };

  // Alumni Coffee Chat State
  const [bookedAlum, setBookedAlum] = useState<string | null>(null);

  const ALUMNI_MENTORS = [
    {
      id: 'alum_1',
      name: 'Jessica Vance, B.S. \'22',
      role: 'Software Engineer @ Figma',
      pastCampusOrg: 'CS Peer Tutor & WiCS Lead',
      availableSlot: 'Tuesday at 4:30 PM (15 min)',
    },
    {
      id: 'alum_2',
      name: 'David K. O\'Connor, B.S. \'20',
      role: 'Product Manager @ Datadog',
      pastCampusOrg: 'Student Gov VP & Hackathon Organizer',
      availableSlot: 'Thursday at 12:00 PM (15 min)',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Module Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Module 03 · Recruiting &amp; Alumni Network
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Career Center &amp; Mentorship
          </h2>
        </div>
        <button
          onClick={onOpenSpecs}
          className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-200 dark:border-purple-800 transition-colors cursor-pointer"
        >
          API Specs
        </button>
      </div>

      {/* SubTab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'jobs'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          On-Campus Jobs
        </button>
        <button
          onClick={() => setActiveSubTab('interviews')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'interviews'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Resume &amp; Advisor
        </button>
        <button
          onClick={() => setActiveSubTab('alumni')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'alumni'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Alumni Coffee Chats
        </button>
        <button
          onClick={() => setActiveSubTab('badge')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'badge'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Fair FastPass QR
        </button>
      </div>

      {/* SubTab 1: Campus Job Board */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-xs flex items-center justify-between">
            <span className="text-purple-900 dark:text-purple-200 font-medium">
              Work-Study Status: <strong className="text-emerald-600 font-bold">Eligible ($3,000 Award)</strong>
            </span>
            <span className="text-[11px] text-purple-700 dark:text-purple-400 font-mono">
              Fall 2026 Openings
            </span>
          </div>

          <div className="space-y-2.5">
            {jobsList.map((job) => (
              <div
                key={job.id}
                className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 block">
                      {job.type} · {job.department}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {job.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-600 shrink-0">
                    {job.wage}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <span>{job.hoursPerWeek} · Deadline: {job.deadline}</span>
                  {job.applied ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      1-Tap Apply
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Resume Review Queue & Advisor Scheduler */}
      {activeSubTab === 'interviews' && (
        <div className="space-y-4 text-xs">
          {/* Active Review Status */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-500" />
                Resume Review Queue
              </span>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                In Review (Queue #3)
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Submitted: <strong>Maya_Lin_SWE_Resume_Fall26.pdf</strong>. Career Advisor Dr. David Chen is reviewing line items against tech recruiter rubrics.
            </p>
            <div className="text-[11px] text-slate-400">
              Expected turnaround: <strong>Tomorrow by 3:00 PM</strong> (Notification will trigger).
            </div>
          </div>

          {/* Book Mock Interview */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Book On-Campus Mock Behavioral or Technical Interview
            </span>
            <p className="text-slate-500 mb-3">
              1-on-1 45-minute simulation with industry coaches in Student Union Suite 312.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 text-left cursor-pointer hover:bg-purple-100">
                <span className="font-bold text-slate-900 dark:text-white block">SWE Technical Mock</span>
                <span className="text-[11px] text-purple-600 dark:text-purple-400">Next Slot: Friday 2 PM</span>
              </button>
              <button className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-left cursor-pointer hover:bg-slate-50">
                <span className="font-bold text-slate-900 dark:text-white block">Behavioral / STAR Mock</span>
                <span className="text-[11px] text-slate-500">Next Slot: Monday 10 AM</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SubTab 3: Alumni Mentorship Coffee Chats */}
      {activeSubTab === 'alumni' && (
        <div className="space-y-3 text-xs">
          <p className="text-slate-500 text-[11px]">
            Verified university alumni offering 15-minute 1-on-1 informational interviews.
          </p>
          {ALUMNI_MENTORS.map((alum) => (
            <div
              key={alum.id}
              className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {alum.name}
                  </h4>
                  <div className="text-purple-600 dark:text-purple-400 font-semibold text-xs">
                    {alum.role}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Campus background: {alum.pastCampusOrg}
                  </div>
                </div>
                <Coffee className="w-5 h-5 text-amber-500 shrink-0" />
              </div>

              <div className="flex items-center justify-between text-[11px] mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                <span className="text-slate-500">Slot: <strong>{alum.availableSlot}</strong></span>
                {bookedAlum === alum.id ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Calendar Invite Sent
                  </span>
                ) : (
                  <button
                    onClick={() => setBookedAlum(alum.id)}
                    className="px-3 py-1 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 font-semibold cursor-pointer"
                  >
                    Book Chat
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 4: Digital Career Fair FastPass QR */}
      {activeSubTab === 'badge' && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
            STEM &amp; Fall Career Expo FastPass
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {student.name}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {student.major} · GPA {student.gpa.toFixed(2)} · Graduating 2027
          </p>

          {/* Simulated Cryptographic QR Badge */}
          <div className="w-44 h-44 mx-auto p-3 bg-white border-2 border-dashed border-purple-400 rounded-2xl flex flex-col items-center justify-center shadow-xs">
            <QrCode className="w-32 h-32 text-slate-900" />
            <span className="text-[9px] font-mono text-slate-400 mt-1">ID: U8294-0192-AUTH</span>
          </div>

          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            Hold this screen to recruiter badge scanners at the University Arena. Instantly delivers your verified transcript, portfolio URL, and resume without paper printouts.
          </p>
        </div>
      )}
    </div>
  );
};
