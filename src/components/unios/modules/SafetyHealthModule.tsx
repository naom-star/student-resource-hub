import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, PhoneCall, HeartHandshake, Pill, AlertOctagon, 
  Play, Pause, RotateCcw, Check, Clock, MapPin, Send, Shield
} from 'lucide-react';
import { playChime } from '../../../utils/audio';
import { StudentProfile } from '../../../types/unios';

interface SafetyHealthModuleProps {
  student: StudentProfile;
  onOpenSpecs: () => void;
}

export const SafetyHealthModule: React.FC<SafetyHealthModuleProps> = ({
  student,
  onOpenSpecs,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'escort' | 'counseling' | 'health-rx' | 'incident'>('escort');

  // --- Virtual Escort Timer State ---
  const [escortActive, setEscortActive] = useState(false);
  const [escortSeconds, setEscortSeconds] = useState(12 * 60); // 12 minutes walk
  const [escortSafe, setEscortSafe] = useState(false);
  const [policeDispatched, setPoliceDispatched] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (escortActive && escortSeconds > 0) {
      interval = setInterval(() => {
        setEscortSeconds((prev) => prev - 1);
      }, 1000);
    } else if (escortActive && escortSeconds === 0) {
      setPoliceDispatched(true);
      playChime('break');
      setEscortActive(false);
    }
    return () => clearInterval(interval);
  }, [escortActive, escortSeconds]);

  const startEscort = () => {
    setEscortActive(true);
    setEscortSafe(false);
    setPoliceDispatched(false);
    playChime('click');
  };

  const markSafe = () => {
    setEscortActive(false);
    setEscortSafe(true);
    playChime('study');
    setTimeout(() => setEscortSafe(false), 3000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- Counseling State ---
  const [counselingBooked, setCounselingBooked] = useState(false);
  const [counselingType, setCounselingType] = useState('Academic Stress & Burnout');

  // --- Incident Report State ---
  const [incidentCategory, setIncidentCategory] = useState('Broken Lighting / Dark Pathway');
  const [incidentLocation, setIncidentLocation] = useState('North Quad Walkway behind Chemistry Hall');
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      {/* Module Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Module 04 · Campus Safety &amp; Health
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Health, Counseling &amp; Safety
          </h2>
        </div>
        <button
          onClick={onOpenSpecs}
          className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
        >
          API Specs
        </button>
      </div>

      {/* SubTab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('escort')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'escort'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Blue-Light Escort
        </button>
        <button
          onClick={() => setActiveSubTab('counseling')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'counseling'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Counseling
        </button>
        <button
          onClick={() => setActiveSubTab('health-rx')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'health-rx'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Health &amp; Rx Refills
        </button>
        <button
          onClick={() => setActiveSubTab('incident')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'incident'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Report Hazard
        </button>
      </div>

      {/* SubTab 1: Blue-Light Virtual Escort & Emergency Dispatch */}
      {activeSubTab === 'escort' && (
        <div className="space-y-3">
          {/* Emergency 1-Tap Campus Police Hotline */}
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                🚨
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  Campus Police Direct Dispatch
                </h4>
                <p className="text-[11px] text-rose-700 dark:text-rose-300">
                  Transmits GPS coordinates instantly to Campus 911 dispatch.
                </p>
              </div>
            </div>
            <a
              href="tel:911"
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              1-Tap Dispatch
            </a>
          </div>

          {/* Interactive Blue-Light Virtual Escort Timer */}
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs text-center">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Virtual Guardian Walk-With-Me
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${escortActive ? 'bg-indigo-100 text-indigo-800 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                {escortActive ? 'Live Telemetry Active' : 'Standby'}
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl mb-4">
              <div className="text-[11px] text-slate-500 mb-1">Estimated Journey Time to Dorm:</div>
              <div className="text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {formatTime(escortSeconds)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" />
                <span>Science Library → West Quad Hall B</span>
              </div>
            </div>

            {policeDispatched && (
              <div className="p-3 bg-rose-100 text-rose-900 rounded-lg text-xs font-bold mb-3">
                ⚠️ Timer expired without confirmation. Campus Police unit alerted to your last known GPS coordinate.
              </div>
            )}

            {escortSafe && (
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold mb-3 flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" /> Marked safe! Escort closed successfully.
              </div>
            )}

            {!escortActive ? (
              <button
                onClick={startEscort}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Start 12-Minute Virtual Escort
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={markSafe}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  I Have Arrived Safely
                </button>
                <button
                  onClick={() => setPoliceDispatched(true)}
                  className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Panic Alert
                </button>
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-2">
              If timer reaches 0:00 without checking in, Rave Guardian automatically alerts on-duty campus security.
            </p>
          </div>
        </div>
      )}

      {/* SubTab 2: Confidential Counseling Scheduler */}
      {activeSubTab === 'counseling' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                Confidential University Counseling Booking
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                HIPAA Encrypted
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Every enrolled student receives up to 12 free individual therapy and wellness coaching sessions per academic year. Zero insurance copays.
            </p>

            <div>
              <label className="block text-slate-500 mb-1">Focus Area:</label>
              <select
                value={counselingType}
                onChange={(e) => setCounselingType(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option>Academic Stress &amp; Burnout</option>
                <option>Anxiety &amp; Panic Symptoms</option>
                <option>Depression &amp; Low Mood</option>
                <option>Relationship &amp; Roommate Conflict</option>
                <option>Grief &amp; Life Transitions</option>
              </select>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">Next Available Appointments:</span>
              <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                <div>• Tomorrow, Nov 08 at 2:00 PM (Dr. Maria Ramos, Wellness Ctr 304)</div>
                <div>• Monday, Nov 11 at 10:30 AM (Telehealth Video Option)</div>
              </div>
            </div>

            <button
              onClick={() => {
                setCounselingBooked(true);
                setTimeout(() => setCounselingBooked(false), 3000);
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg cursor-pointer"
            >
              {counselingBooked ? '✓ Appointment Confirmed (Encrypted Calendar Added)' : 'Confirm Confidential Session'}
            </button>
          </div>
        </div>
      )}

      {/* SubTab 3: Student Health Center Prescription Refills */}
      {activeSubTab === 'health-rx' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-emerald-500" />
                Active Campus Pharmacy Prescriptions
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Ready for Pickup
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl mb-3">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>Albuterol Inhaler (90mcg)</span>
                <span className="font-mono text-emerald-600">Rx #98214</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Refills Remaining: 2 · Prescribed by: Dr. Henderson
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-2">
                Location: Student Health Center Pharmacy Counter 2 (Bring Student ID)
              </div>
            </div>

            <button className="w-full py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 cursor-pointer">
              Request Automatic 30-Day Refill
            </button>
          </div>
        </div>
      )}

      {/* SubTab 4: Anonymous Campus Incident & Hazard Report */}
      {activeSubTab === 'incident' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIncidentSubmitted(true);
            setTimeout(() => setIncidentSubmitted(false), 3000);
          }}
          className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs text-xs space-y-3"
        >
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <AlertOctagon className="w-4 h-4 text-amber-500" />
            Anonymous Safety &amp; Hazard Incident Intake
          </span>
          <p className="text-slate-500 text-[11px]">
            Reports bypass student identity logs and route directly to Campus Environmental Health &amp; Security teams.
          </p>

          <div>
            <label className="block text-slate-500 mb-1">Hazard Category:</label>
            <select
              value={incidentCategory}
              onChange={(e) => setIncidentCategory(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option>Broken Lighting / Dark Pathway</option>
              <option>Faulty Blue-Light Emergency Tower</option>
              <option>Icy Walkway / Slip Hazard</option>
              <option>Suspicious Activity / Loitering</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Campus Location Details:</label>
            <input
              type="text"
              value={incidentLocation}
              onChange={(e) => setIncidentLocation(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            {incidentSubmitted ? (
              <span>✓ Anonymous Hazard Logged #INC-4491</span>
            ) : (
              <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Submit Anonymous Report</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
