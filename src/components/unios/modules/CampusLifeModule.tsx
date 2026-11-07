import React, { useState } from 'react';
import { 
  Building2, Key, Bus, Utensils, Wrench, Sparkles, 
  Check, Wifi, Clock, AlertCircle, ChevronRight, Waves, Send
} from 'lucide-react';
import { playChime } from '../../../utils/audio';
import { SHUTTLE_ROUTES, DINING_HALLS } from '../../../data/uniosData';
import { StudentProfile } from '../../../types/unios';

interface CampusLifeModuleProps {
  student: StudentProfile;
  onOpenSpecs: () => void;
}

export const CampusLifeModule: React.FC<CampusLifeModuleProps> = ({
  student,
  onOpenSpecs,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'id-access' | 'dining' | 'transit' | 'facilities'>('id-access');

  // NFC Unlock Door State
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [doorUnlocked, setDoorUnlocked] = useState(false);

  const handleNfcTapUnlock = () => {
    setIsUnlocking(true);
    playChime('click');
    setTimeout(() => {
      setIsUnlocking(false);
      setDoorUnlocked(true);
      playChime('study');
      setTimeout(() => setDoorUnlocked(false), 3500);
    }, 800);
  };

  // Work-Order Submission State
  const [workOrderCategory, setWorkOrderCategory] = useState('Heating & Radiator');
  const [workOrderDesc, setWorkOrderDesc] = useState('Radiator valve is hissing and room temperature is locked at 78°F.');
  const [workOrderSubmitted, setWorkOrderSubmitted] = useState(false);

  const handleSubmitWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkOrderSubmitted(true);
    setTimeout(() => {
      setWorkOrderSubmitted(false);
      setWorkOrderDesc('');
    }, 3000);
  };

  // Laundry State
  const [laundryAlertSet, setLaundryAlertSet] = useState(false);

  return (
    <div className="space-y-4">
      {/* Module Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Module 02 · Access, Dining &amp; Facilities
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Campus Life &amp; Facilities Navigator
          </h2>
        </div>
        <button
          onClick={onOpenSpecs}
          className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
        >
          API Specs
        </button>
      </div>

      {/* SubTab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('id-access')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'id-access'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Digital ID &amp; NFC
        </button>
        <button
          onClick={() => setActiveSubTab('dining')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'dining'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Dining &amp; Menus
        </button>
        <button
          onClick={() => setActiveSubTab('transit')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'transit'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Live Shuttles
        </button>
        <button
          onClick={() => setActiveSubTab('facilities')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'facilities'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Dorm &amp; Laundry
        </button>
      </div>

      {/* SubTab 1: Digital ID & NFC Room Access */}
      {activeSubTab === 'id-access' && (
        <div className="space-y-3">
          {/* Digital Mobile Credential Card */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl shadow-md border border-slate-700 relative overflow-hidden">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-indigo-300 font-bold block">
                  Official Mobile Credential
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {student.name}
                </h3>
                <span className="text-xs text-slate-300 font-mono">
                  ID: {student.studentIdNumber}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-indigo-400 overflow-hidden bg-slate-700">
                <img src={student.avatarUrl} alt="Student avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-xs mb-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-300 block font-sans">Dining Dollars</span>
                <span className="font-bold text-emerald-300 text-sm">${student.diningDollars.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-300 block font-sans">Meal Swipes</span>
                <span className="font-bold text-amber-300 text-sm">{student.mealSwipesLeft} Left</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Wifi className="w-3.5 h-3.5" /> NFC Beacon Active
              </span>
              <span>{student.dormBuilding} · {student.dormRoom}</span>
            </div>
          </div>

          {/* Interactive NFC Tap Door Strike Simulator */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Dormitory Smart Lock Access
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Target: <strong>{student.dormRoom} ({student.dormBuilding})</strong>
            </div>

            <button
              onClick={handleNfcTapUnlock}
              disabled={isUnlocking}
              className={`w-full py-4 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                doorUnlocked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700'
              }`}
            >
              <Key className={`w-5 h-5 ${isUnlocking ? 'animate-spin' : ''}`} />
              <span>
                {isUnlocking ? 'Verifying NFC Cryptographic Token...' : doorUnlocked ? '✓ Door Unlocked (Lock Strike Open)' : 'Hold Near Door Lock to Unlock Room'}
              </span>
            </button>
            <span className="text-[10px] text-slate-400 mt-2 block">
              Simulates Apple Wallet / Google Wallet CBORD contactless NFC door access.
            </span>
          </div>
        </div>
      )}

      {/* SubTab 2: Dining Hall Balance & Live Menus */}
      {activeSubTab === 'dining' && (
        <div className="space-y-3">
          {DINING_HALLS.map((dining) => (
            <div
              key={dining.id}
              className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {dining.name}
                  </h4>
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  {dining.status} · {dining.hours}
                </span>
              </div>

              {/* Occupancy meter */}
              <div className="flex items-center gap-2 mb-2 text-[11px] text-slate-500">
                <span>Crowd Level:</span>
                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${dining.occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${dining.occupancy}%` }}
                  />
                </div>
                <span className="font-mono">{dining.occupancy}% full</span>
              </div>

              {/* Featured items */}
              <div className="p-2 bg-slate-50 dark:bg-slate-900/60 rounded-lg text-[11px] text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Today&apos;s Entrees:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {dining.featuredMenu.map((item, i) => (
                    <li key={i} className="truncate">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 3: Live Campus Shuttles */}
      {activeSubTab === 'transit' && (
        <div className="space-y-3">
          {SHUTTLE_ROUTES.map((route) => (
            <div
              key={route.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs text-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4" style={{ color: route.color }} />
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {route.name}
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 font-mono">
                  {route.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] text-slate-400">Current Nearest Stop:</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{route.currentStop}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    {route.currentEtaMinutes} <span className="text-xs font-normal">min</span>
                  </div>
                </div>
              </div>

              {/* Stop Timeline */}
              <div className="space-y-1.5 pl-2 border-l-2 border-slate-200 dark:border-slate-700 text-[11px]">
                {route.nextStops.map((stop, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">{stop.stopName}</span>
                    <span className="font-mono text-slate-400 font-medium">in {stop.etaMins}m</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 4: Dorm Maintenance & Laundry Machine Tracker */}
      {activeSubTab === 'facilities' && (
        <div className="space-y-4">
          {/* Laundry Machine Status */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-sky-500" />
                West Quad Laundry Room Live Status
              </span>
              <button
                onClick={() => setLaundryAlertSet(!laundryAlertSet)}
                className={`text-[10px] font-semibold px-2 py-1 rounded cursor-pointer ${
                  laundryAlertSet ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {laundryAlertSet ? '✓ Alert Set' : 'Notify when Washer Free'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="p-2.5 bg-sky-50 dark:bg-sky-950/30 rounded-lg">
                <span className="text-[10px] text-sky-700 dark:text-sky-300 font-semibold block">Washers Available</span>
                <span className="text-lg font-bold font-mono text-sky-900 dark:text-white">4 / 6 Free</span>
              </div>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold block">Dryers Available</span>
                <span className="text-lg font-bold font-mono text-amber-900 dark:text-white">2 / 6 Free</span>
              </div>
            </div>
          </div>

          {/* Rapid Dorm Maintenance Work-Order Submission */}
          <form onSubmit={handleSubmitWorkOrder} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs space-y-3">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-500" />
              Submit Maintenance Work-Order
            </span>

            <div>
              <label className="block text-slate-500 mb-1">Issue Category:</label>
              <select
                value={workOrderCategory}
                onChange={(e) => setWorkOrderCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option>Heating &amp; Radiator</option>
                <option>Plumbing / Sink Leak</option>
                <option>Keycard Lock / Battery</option>
                <option>Electrical / Lighting</option>
                <option>Window / Screen Damage</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Description &amp; Urgency:</label>
              <textarea
                rows={2}
                value={workOrderDesc}
                onChange={(e) => setWorkOrderDesc(e.target.value)}
                placeholder="Describe issue..."
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={workOrderSubmitted}
              className={`w-full py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                workOrderSubmitted ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {workOrderSubmitted ? (
                <span>✓ Work-Order #WO-8912 Logged &amp; Dispatched</span>
              ) : (
                <span className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Dispatch Work Order to Facilities</span>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
