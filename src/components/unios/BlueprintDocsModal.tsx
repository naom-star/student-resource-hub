import React, { useState } from 'react';
import { 
  X, Layers, Server, Bell, Smartphone, ShieldCheck, 
  CheckCircle2, Download, Copy, Check, ArrowRight, Sparkles 
} from 'lucide-react';
import { ENTERPRISE_SPECS } from '../../data/uniosData';
import { UniModuleId } from '../../types/unios';

interface BlueprintDocsModalProps {
  initialModule?: UniModuleId;
  onClose: () => void;
}

export const BlueprintDocsModal: React.FC<BlueprintDocsModalProps> = ({
  initialModule = 'academic',
  onClose,
}) => {
  const [selectedModule, setSelectedModule] = useState<UniModuleId>(initialModule);
  const [copied, setCopied] = useState(false);

  const spec = ENTERPRISE_SPECS[selectedModule];

  const MODULE_BLUEPRINTS: Record<UniModuleId, {
    screens: string[];
    quickActions: string[];
    edgeCases: string[];
    designNotes: string;
  }> = {
    academic: {
      screens: [
        'Screen 1: Degree Progress Dashboard & Visual Audit Radial Meter',
        'Screen 2: Category Breakdown (Core, Cognate, Gen-Ed, Electives) with Unmet Requirements Drilldown',
        'Screen 3: Instant Prerequisite DAG Checker & Course Dependency Graph',
        'Screen 4: 1-Tap Registration Cart Execution with Waitlist Priority Queue Position',
        'Screen 5: Official Transcript Instant Request & Clearinghouse Verification',
      ],
      quickActions: [
        '1-Tap Registration Execution during open enrollment window',
        'Check course prerequisite eligibility before advising meeting',
        'One-tap National Student Clearinghouse official e-transcript order',
      ],
      edgeCases: [
        'Concurrent registration lock: Atomic database lock during 8:00 AM registration surge to prevent race conditions.',
        'Prerequisite waiver: Support signed dean overrides reflected via SIS flags in real time.',
      ],
      designNotes: 'Optimized for high-stress registration day: Pre-caches student cart, shows millisecond server clock countdown, and supports offline read-only cached degree audit.',
    },
    campus: {
      screens: [
        'Screen 1: Digital Student ID & NFC Apple/Google Wallet Contactless Access Card',
        'Screen 2: Campus Dining Hall Live Hours, Crowd Occupancy & Meal Plan Balance Tracker',
        'Screen 3: Live Campus Shuttle GTFS-RT Telematics Map with Stop ETA Countdowns',
        'Screen 4: Dorm Maintenance Work-Order Submission with Photo Upload & Status Tracking',
        'Screen 5: Networked Smart Laundry Machine Availability & Cycle Finished Alarms',
      ],
      quickActions: [
        'Hold near dorm room lock for instant NFC unlock strike',
        'Set vibration reminder when laundry washer or dryer finishes',
        'Submit emergency plumbing/heating work order in under 30 seconds',
      ],
      edgeCases: [
        'Offline NFC fallback: Digital key operates via local secure element even when Wi-Fi/cellular drops in basement dorms.',
        'Shuttle breakdown: WebSocket telematics detects stopped vehicles and automatically flags "Service Delayed".',
      ],
      designNotes: 'High-contrast outdoor daylight legibility. Minimal tap depth for frequent recurring tasks (dorm entry, dining swipes).',
    },
    career: {
      screens: [
        'Screen 1: Verified On-Campus Job Board (Federal Work-Study & TA/RA Openings)',
        'Screen 2: On-Campus Recruiting & Mock Interview Scheduling Hub',
        'Screen 3: Alumni Mentorship Network & 15-Minute Coffee Chat Calendar Integration',
        'Screen 4: Career Advisor Resume Review Status Queue with Inline Annotation Viewer',
        'Screen 5: Career Fair FastPass Cryptographic Dynamic QR Badge Check-In',
      ],
      quickActions: [
        '1-Tap apply to on-campus Work-Study openings using stored student profile',
        'Instant calendar booking for alumni coffee chats and advisor reviews',
        'Display Career Fair QR badge for rapid recruiter check-in without paper resumes',
      ],
      edgeCases: [
        'Work-Study allocation limit: Prevents application to FWS jobs if student aid package lacks work-study eligibility.',
        'No-show prevention: SMS and push reminders 2 hours and 15 minutes before on-campus recruiter interviews.',
      ],
      designNotes: 'Professional, empowering tone designed to eliminate imposter syndrome for first-generation and underrepresented students.',
    },
    safety: {
      screens: [
        'Screen 1: 1-Tap Campus Police Emergency 911 Direct Dispatch with Live GPS Coordinates',
        'Screen 2: Blue-Light Virtual Escort Timer with Auto-Alert Security Dispatch',
        'Screen 3: Confidential University Counseling Appointment Booking (12 Free Sessions/Year)',
        'Screen 4: Student Health Center Pharmacy Prescription Refill Readiness Tracker',
        'Screen 5: Anonymous Campus Hazard & Safety Incident Reporting Intake',
      ],
      quickActions: [
        'Start 1-tap Blue-Light Virtual Escort timer before walking across campus at night',
        'Immediate direct dial to 24/7 Campus Security Dispatch with GPS beacon',
        '1-Tap confidential mental health appointment confirmation with zero billing copay',
      ],
      edgeCases: [
        'Failed escort check-in: If timer expires without student entering PIN or biometric confirmation, Campus Police dispatcher console is alerted with last known GPS coordinate and dorm destination.',
        'Discreet panic button: Silent triple-press on power/volume triggers silent campus alert.',
      ],
      designNotes: 'Calm, comforting visual language without alarming red flashers during routine use. WCAG AA high-contrast emergency affordances.',
    },
    finance: {
      screens: [
        'Screen 1: Tuition Statement & Bursar Balance with TouchNet/Nelnet 1-Tap Payment',
        'Screen 2: Automated Federal Work-Study Timesheet Logger & Gross Pay Estimator',
        'Screen 3: Emergency Student Micro-Grant Application Wizard ($500-$1,500 in 48 Hours)',
        'Screen 4: Annual FAFSA & Institutional Grant Renewal Status Milestones',
      ],
      quickActions: [
        '1-Tap pay remaining tuition balance via saved ACH bank transfer',
        'Log lab/library work-study shift and submit directly to supervisor',
        'Apply for emergency micro-grant for food, housing, or medical hardships',
      ],
      edgeCases: [
        'Registration holds: Clear, plain-language notification if unpaid balance exceeds threshold with automated payment plan enrollment option to remove hold instantly.',
        'Timesheet deadline: Push reminders 24 hours before payroll cutoff to prevent delayed student paychecks.',
      ],
      designNotes: 'Empathetic financial transparency. Shows net cost after financial aid rather than alarming gross tuition figures.',
    },
  };

  const blueprint = MODULE_BLUEPRINTS[selectedModule];

  const handleCopySpec = () => {
    const text = `# UniOS Enterprise Blueprint - ${spec.module}
System: ${spec.systemName} (${spec.enterpriseVendor})
Protocol: ${spec.protocol}

## Screen-by-Screen Breakdown
${blueprint.screens.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Technical API Endpoints
${spec.endpoints.map(e => `- [${e.method}] ${e.path} : ${e.description}`).join('\n')}

## Push Notification Triggers
${spec.pushNotificationTriggers.map(p => `- [${p.priority}] ${p.event}: "${p.copyPreview}"`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Higher Ed Enterprise Mobile Architecture
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              UniOS Blueprint &amp; System Integration Specs
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Module Selector Bar */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
          {(['academic', 'campus', 'career', 'safety', 'finance'] as const).map((modId) => (
            <button
              key={modId}
              onClick={() => setSelectedModule(modId)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                selectedModule === modId
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {modId === 'academic' ? '01. Registrar & Audit' :
               modId === 'campus' ? '02. Campus & Facilities' :
               modId === 'career' ? '03. Career & Mentorship' :
               modId === 'safety' ? '04. Health & Safety' : '05. Bursar & Grants'}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          {/* Module Banner */}
          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {spec.module}
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                  {spec.enterpriseVendor}
                </span>
                <span className="text-slate-400">·</span>
                <span className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                  {spec.protocol}
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              {blueprint.designNotes}
            </p>
          </div>

          {/* Screen Breakdown & Quick Actions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                Screen-by-Screen Navigation Breakdown
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {blueprint.screens.map((scr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold shrink-0">0{idx + 1}.</span>
                    <span>{scr}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Quick-Action Widgets &amp; Edge Cases
              </h4>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Primary Quick Actions:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    {blueprint.quickActions.map((qa, i) => (
                      <li key={i}>{qa}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Resilience &amp; Edge Cases:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    {blueprint.edgeCases.map((ec, i) => (
                      <li key={i}>{ec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Technical System Endpoints Matrix */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-500" />
              University System Integration Endpoints ({spec.systemName})
            </h4>
            <div className="space-y-2 font-mono text-xs">
              {spec.endpoints.map((ep, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      ep.method === 'GET' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                      ep.method === 'POST' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white text-[11px] break-all">
                      {ep.path}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 sm:text-right">
                    {ep.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Push Notification Triggers */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              Push Notification Triggers &amp; Taxonomy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {spec.pushNotificationTriggers.map((trig, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {trig.event}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        trig.priority.includes('P0') ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        trig.priority.includes('P1') ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {trig.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 italic mt-1 leading-snug">
                      &quot;{trig.copyPreview}&quot;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            Enterprise Architecture Spec v2.4 · WCAG 2.1 AA Compliant
          </div>
          <button
            onClick={handleCopySpec}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Specification' : 'Copy API Spec'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
