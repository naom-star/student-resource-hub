import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, Clock, Plus, Check, 
  HelpCircle, AlertCircle, FileCheck, Send, ShieldCheck
} from 'lucide-react';
import { INITIAL_TIMESHEET } from '../../../data/uniosData';
import { TimesheetEntry, StudentProfile } from '../../../types/unios';

interface BursarFinanceModuleProps {
  student: StudentProfile;
  onOpenSpecs: () => void;
}

export const BursarFinanceModule: React.FC<BursarFinanceModuleProps> = ({
  student,
  onOpenSpecs,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bursar' | 'timesheet' | 'microgrants' | 'fafsa'>('bursar');

  // Bursar Payment State
  const [tuitionBalance, setTuitionBalance] = useState(1420.00);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayBalance = () => {
    setPaymentSuccess(true);
    setTuitionBalance(0);
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  // Work-Study Timesheet State
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(INITIAL_TIMESHEET);
  const [newHours, setNewHours] = useState('3.5');
  const [newDate, setNewDate] = useState('Today, Nov 07');
  const [newNotes, setNewNotes] = useState('Supervised 3D printer queue and assisted student projects.');
  const [timesheetSubmitted, setTimesheetSubmitted] = useState(false);

  const handleAddTimesheetEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: TimesheetEntry = {
      id: `ts_${Date.now()}`,
      date: newDate,
      jobTitle: 'Digital Media Lab Assistant',
      hoursWorked: parseFloat(newHours) || 0,
      hourlyRate: 17.0,
      notes: newNotes,
      status: 'Submitted',
    };
    setTimesheets([entry, ...timesheets]);
    setTimesheetSubmitted(true);
    setTimeout(() => setTimesheetSubmitted(false), 3000);
  };

  const totalPeriodHours = timesheets.reduce((acc, curr) => acc + curr.hoursWorked, 0);
  const grossPayable = totalPeriodHours * 17.00;

  // Emergency Micro-Grant State
  const [grantCategory, setGrantCategory] = useState('Emergency Housing / Food Insecurity');
  const [grantAmount, setGrantAmount] = useState('$750.00');
  const [grantReason, setGrantReason] = useState('Unexpected medical bill and textbook access code costs for CS 330.');
  const [grantSubmitted, setGrantSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      {/* Module Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Module 05 · Bursar &amp; Financial Aid
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Bursar, Aid &amp; Micro-Grants
          </h2>
        </div>
        <button
          onClick={onOpenSpecs}
          className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
        >
          API Specs
        </button>
      </div>

      {/* SubTab Switcher */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
        <button
          onClick={() => setActiveSubTab('bursar')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'bursar'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Tuition &amp; Bill
        </button>
        <button
          onClick={() => setActiveSubTab('timesheet')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'timesheet'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Work-Study Pay
        </button>
        <button
          onClick={() => setActiveSubTab('microgrants')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'microgrants'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Micro-Grants
        </button>
        <button
          onClick={() => setActiveSubTab('fafsa')}
          className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
            activeSubTab === 'fafsa'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Aid Checklist
        </button>
      </div>

      {/* SubTab 1: Tuition Balance & TouchNet Payment Manager */}
      {activeSubTab === 'bursar' && (
        <div className="space-y-3">
          <div className="p-5 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white rounded-2xl shadow-sm">
            <span className="text-[10px] text-amber-200 uppercase tracking-wider font-bold block">
              Fall 2026 Term Balance Due
            </span>
            <div className="text-3xl font-bold font-mono tracking-tight mt-1 mb-2">
              ${tuitionBalance.toFixed(2)}
            </div>

            <div className="text-xs text-amber-100 flex items-center justify-between pt-2 border-t border-amber-500/40">
              <span>Due Date: Nov 15, 2026</span>
              <span>Account Status: {tuitionBalance === 0 ? '✓ In Good Standing' : 'Active Balance'}</span>
            </div>
          </div>

          {/* Statement Breakdown */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              Bursar Itemized Statement
            </h4>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Undergraduate Tuition (16 Credits)</span>
              <span className="font-mono">$18,450.00</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Campus Housing &amp; Dining Plan</span>
              <span className="font-mono">$6,800.00</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>University Merit Scholarship</span>
              <span className="font-mono">-$12,500.00</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Federal Direct Subsidized Loan</span>
              <span className="font-mono">-$2,750.00</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Monthly Payment Plan Credit</span>
              <span className="font-mono">-$8,580.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
              <span>Remaining Balance:</span>
              <span className="font-mono">${tuitionBalance.toFixed(2)}</span>
            </div>
          </div>

          {tuitionBalance > 0 ? (
            <button
              onClick={handlePayBalance}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <CreditCard className="w-4 h-4" />
              <span>1-Tap Pay via Saved Bank ACH (${tuitionBalance.toFixed(2)})</span>
            </button>
          ) : (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center">
              ✓ Term balance fully settled. Zero holds on account.
            </div>
          )}
        </div>
      )}

      {/* SubTab 2: Federal Work-Study Automated Timesheet */}
      {activeSubTab === 'timesheet' && (
        <div className="space-y-3 text-xs">
          {/* Earnings summary */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Current Pay Period (Nov 01 - Nov 14)
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {totalPeriodHours.toFixed(1)} hrs logged
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Gross Pay ($17/hr)
              </span>
              <div className="text-xl font-bold font-mono text-emerald-600">
                ${grossPayable.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Quick Log Form */}
          <form onSubmit={handleAddTimesheetEntry} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <span className="font-bold text-slate-900 dark:text-white block">
              Log Lab Shift to Supervisor
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Date</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Hours Worked</label>
                <input
                  type="number"
                  step="0.5"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Work Summary / Shift Log</label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer"
            >
              {timesheetSubmitted ? '✓ Hours Submitted to Supervisor' : 'Submit Hours for Approval'}
            </button>
          </form>

          {/* Past entries */}
          <div className="space-y-1.5">
            {timesheets.map((ts) => (
              <div
                key={ts.id}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{ts.date}</div>
                  <div className="text-[11px] text-slate-400">{ts.notes}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold">{ts.hoursWorked} hrs</div>
                  <span className={`text-[10px] ${ts.status === 'Approved' ? 'text-emerald-600 font-semibold' : 'text-amber-500'}`}>
                    {ts.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Emergency Student Micro-Grants */}
      {activeSubTab === 'microgrants' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGrantSubmitted(true);
            setTimeout(() => setGrantSubmitted(false), 3000);
          }}
          className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs text-xs space-y-3"
        >
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            University Emergency Student Micro-Grant Application
          </span>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            One-time non-repayable grants from the Dean of Students Fund for emergency financial hardships ($500–$1,500). Decided within 48 hours.
          </p>

          <div>
            <label className="block text-slate-500 mb-1">Hardship Category:</label>
            <select
              value={grantCategory}
              onChange={(e) => setGrantCategory(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            >
              <option>Emergency Housing / Food Insecurity</option>
              <option>Medical or Dental Unforeseen Bill</option>
              <option>Essential Laptop / Hardware Replacement</option>
              <option>Emergency Family Travel / Bereavement</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Requested Amount ($500 - $1,500):</label>
            <input
              type="text"
              value={grantAmount}
              onChange={(e) => setGrantAmount(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Brief Justification:</label>
            <textarea
              rows={2}
              value={grantReason}
              onChange={(e) => setGrantReason(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            {grantSubmitted ? (
              <span>✓ Micro-Grant #MG-2041 Submitted (Direct Deposit in 48h)</span>
            ) : (
              <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Submit to Dean of Students Committee</span>
            )}
          </button>
        </form>
      )}

      {/* SubTab 4: FAFSA & Institutional Grant Checklist */}
      {activeSubTab === 'fafsa' && (
        <div className="space-y-3 text-xs">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Annual Financial Aid Renewal Milestones
            </h4>

            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg flex items-center justify-between text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4 text-emerald-500" />
                2026-2027 FAFSA Form Processed
              </span>
              <span className="font-mono text-[11px]">SAI: $0</span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Institutional Need Grant Verification
              </span>
              <span className="font-semibold text-emerald-600 font-mono">Approved</span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Satisfactory Academic Progress (SAP)
              </span>
              <span className="font-semibold text-emerald-600 font-mono">Meets Standard (3.84 GPA)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
