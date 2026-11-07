import React, { useState, useEffect } from 'react';
import { 
  Heart, Phone, MessageSquare, Moon, ShieldAlert, 
  Play, Pause, RotateCcw, Copy, Check, Layers, 
  Bookmark, CheckCircle2, AlertCircle, Sparkles, PhoneCall
} from 'lucide-react';
import { playChime } from '../../utils/audio';
import { CRISIS_HOTLINES } from '../../data/resourcesData';
import { AudienceTarget } from '../../types';

interface WellnessSectionProps {
  audience: AudienceTarget;
  onOpenWireframe: () => void;
  onToggleBookmark: (id: string, title: string, category: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const WellnessSection: React.FC<WellnessSectionProps> = ({
  onOpenWireframe,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'hotlines' | 'sleep' | 'burnout'>('breathing');

  // --- Somatic Breathing State ---
  const [breathTechnique, setBreathTechnique] = useState<'4-7-8' | 'box'>('4-7-8');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Empty'>('Inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Advance phase
          if (breathTechnique === '4-7-8') {
            if (breathPhase === 'Inhale') {
              setBreathPhase('Hold');
              playChime('breath');
              return 7;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Exhale');
              playChime('breath');
              return 8;
            } else {
              setBreathPhase('Inhale');
              setCyclesCompleted((c) => c + 1);
              playChime('breath');
              return 4;
            }
          } else {
            // Box Breathing: 4-4-4-4
            if (breathPhase === 'Inhale') {
              setBreathPhase('Hold');
              playChime('breath');
              return 4;
            } else if (breathPhase === 'Hold') {
              setBreathPhase('Exhale');
              playChime('breath');
              return 4;
            } else if (breathPhase === 'Exhale') {
              setBreathPhase('Hold Empty');
              playChime('breath');
              return 4;
            } else {
              setBreathPhase('Inhale');
              setCyclesCompleted((c) => c + 1);
              playChime('breath');
              return 4;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase, breathTechnique]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      playChime('breath');
      setBreathPhase('Inhale');
      setPhaseSecondsLeft(4);
    }
    setIsBreathingActive(!isBreathingActive);
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhale');
    setPhaseSecondsLeft(4);
    setCyclesCompleted(0);
  };

  // --- Sleep Hygiene Checklist State ---
  const SLEEP_ITEMS = [
    { id: 's1', text: 'Consistent Wake Time: Wake up at the same hour (±30 mins), even on weekends' },
    { id: 's2', text: 'Morning Sunlight: Get 10–15 minutes of direct sunlight within 1 hour of waking' },
    { id: 's3', text: 'Caffeine Curfew: No coffee, energy drinks, or pre-workout within 9–10 hours of bed' },
    { id: 's4', text: 'Screen Sunset: Shift phone/laptop to warm Night Shift mode 2 hours before sleeping' },
    { id: 's5', text: 'Cold & Dark Bedroom: Sleeping temperature set around 65°F–68°F (18°C–20°C)' },
    { id: 's6', text: 'No Study in Bed: Bed is reserved strictly for sleep; study at desk or library' },
    { id: 's7', text: 'Late Meal Window: Finish dinner at least 2.5–3 hours before lying down' },
    { id: 's8', text: 'Brain-Dump Journal: Write down tomorrow\'s 3 key tasks to prevent cognitive loop' },
    { id: 's9', text: 'Darkness Barrier: Blackout curtains, blinds, or comfortable eye mask' },
    { id: 's10', text: 'Physical Activity: At least 20 minutes of movement during the day (not within 2h of bed)' },
  ];

  const [checkedSleepItems, setCheckedSleepItems] = useState<string[]>(['s1', 's3', 's6']);
  const [hotlineCopied, setHotlineCopied] = useState<string | null>(null);

  const toggleSleepItem = (id: string) => {
    if (checkedSleepItems.includes(id)) {
      setCheckedSleepItems(checkedSleepItems.filter((i) => i !== id));
    } else {
      setCheckedSleepItems([...checkedSleepItems, id]);
    }
  };

  const sleepScore = checkedSleepItems.length;

  return (
    <section id="wellness" className="py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Urgent Crisis Bar */}
        <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                In Immediate Crisis or Feeling Overwhelmed?
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                Free, 24/7 confidential crisis counselors are ready right now. Call or text <strong>988</strong> (USA &amp; Canada) or text <strong>HOME to 741741</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:988"
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Call 988 Lifeline
            </a>
            <button
              onClick={() => setActiveTab('hotlines')}
              className="px-3 py-2 text-xs font-semibold text-rose-800 dark:text-rose-200 bg-white/80 dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
            >
              View All Hotlines
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <span>Section 03</span>
              <span aria-hidden="true">·</span>
              <span>Somatic Health &amp; Emotional Equilibrium</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Wellness &amp; Mental Health Corner
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Equip yourself with evidence-backed somatic down-regulation tools, 24/7 crisis contacts, sleep architecture audits, and boundary-setting strategies.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark('wellness-suite', 'Wellness & Mental Health Suite', 'Wellness')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isBookmarked('wellness-suite')
                  ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('wellness-suite') ? 'fill-rose-600 dark:fill-rose-400' : ''}`} />
              <span>{isBookmarked('wellness-suite') ? 'Saved in Toolkit' : 'Save Section'}</span>
            </button>

            <button
              onClick={onOpenWireframe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Section Blueprint &amp; UX Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 overflow-x-auto border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('breathing')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'breathing'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Somatic Breathing Visualizer
          </button>
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'hotlines'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            24/7 Verified Crisis &amp; Mental Health Hotlines
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'sleep'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sleep Hygiene 10-Point Self-Audit
          </button>
          <button
            onClick={() => setActiveTab('burnout')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'burnout'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Burnout Prevention &amp; Boundaries
          </button>
        </div>

        {/* Tab 1: Somatic Breathing Widget */}
        {activeTab === 'breathing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Animated Stage */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs text-center flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {breathTechnique === '4-7-8' ? 'Parasympathetic 4-7-8 Relaxation' : 'Box Breathing Focus (4-4-4-4)'}
                </span>
                <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                  <button
                    onClick={() => {
                      setBreathTechnique('4-7-8');
                      resetBreathing();
                    }}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      breathTechnique === '4-7-8' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    4-7-8 (Calm)
                  </button>
                  <button
                    onClick={() => {
                      setBreathTechnique('box');
                      resetBreathing();
                    }}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      breathTechnique === 'box' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Box (Focus)
                  </button>
                </div>
              </div>

              {/* The Breathing Circle Visualizer */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
                {/* Dynamic Expanding/Contracting Halo */}
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                    breathPhase === 'Inhale'
                      ? 'scale-100 bg-rose-100/80 dark:bg-rose-950/40 border-2 border-rose-400'
                      : breathPhase === 'Hold' || breathPhase === 'Hold Empty'
                      ? 'scale-95 bg-amber-100/70 dark:bg-amber-950/40 border-2 border-amber-400'
                      : 'scale-75 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700'
                  }`}
                />

                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    {isBreathingActive ? breathPhase : 'Ready'}
                  </span>
                  <div className="text-5xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {isBreathingActive ? phaseSecondsLeft : '4'}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2">
                    {isBreathingActive ? `Cycle ${cyclesCompleted + 1}` : 'Press start below'}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={toggleBreathing}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs ${
                    isBreathingActive
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathingActive ? 'Pause Exercise' : 'Begin Breathing Cycle'}</span>
                </button>

                <button
                  onClick={resetBreathing}
                  className="p-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Reset cycle"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Somatic Science Guide */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  How Extended Exhalation Resets the Vagus Nerve
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  When you inhale, your diaphragm moves down, momentarily increasing space in your chest cavity; your heart expands slightly and blood flow accelerates, causing your brain to signal a higher heart rate.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  When you <strong>exhale for 8 seconds</strong> (longer than your inhale), your diaphragm moves up, the thoracic cavity contracts, and your heart slows down via vagal acetylcholine release. This physically downshifts your nervous system from panic to calm within 90 seconds.
                </p>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-rose-600 dark:text-rose-400 block mb-0.5">When to Use:</span>
                  <span>10 minutes prior to walking into an exam, right after receiving a stressful email, or when lying in bed with a racing mind.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 24/7 Verified Hotlines Directory */}
        {activeTab === 'hotlines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CRISIS_HOTLINES.map((hotline, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                      {hotline.available}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${hotline.name}: ${hotline.number}`);
                        setHotlineCopied(hotline.name);
                        setTimeout(() => setHotlineCopied(null), 2000);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                    >
                      {hotlineCopied === hotline.name ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{hotlineCopied === hotline.name ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {hotline.name}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {hotline.description}
                  </p>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-sm font-bold text-slate-900 dark:text-white mb-4 text-center">
                    {hotline.number}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {hotline.number.startsWith('Text') || hotline.number.includes('741741') ? (
                    <a
                      href="sms:741741"
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Start Text Session</span>
                    </a>
                  ) : hotline.number === 'befrienders.org' ? (
                    <a
                      href="https://www.befrienders.org"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <span>Visit Global Directory</span>
                    </a>
                  ) : (
                    <a
                      href={`tel:${hotline.number.replace(/[^0-9]/g, '')}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Immediately</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Sleep Hygiene 10-Point Self-Audit */}
        {activeTab === 'sleep' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Sleep Architecture 10-Point Self-Audit
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Check the habits you consistently followed over the past 7 days.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    {sleepScore} / 10
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    {sleepScore >= 8 ? 'Optimal Recovery' : sleepScore >= 5 ? 'Moderate Deficit' : 'High Sleep Debt'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full transition-all duration-300 ${
                    sleepScore >= 8 ? 'bg-emerald-500' : sleepScore >= 5 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${(sleepScore / 10) * 100}%` }}
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-2.5">
                {SLEEP_ITEMS.map((item) => {
                  const isChecked = checkedSleepItems.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      onClick={() => toggleSleepItem(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/60 text-slate-900 dark:text-white'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-medium leading-relaxed">
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Right: Sleep Science & Diagnostic Feedback */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Memory Consolidation Reality
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Why Pulling All-Nighters Reduces Test Scores
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  During <strong>Slow-Wave Deep Sleep</strong> and <strong>REM sleep</strong>, your hippocampus replays neural firing patterns from the day and transfers declarative memories into the permanent neocortex.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cutting sleep from 8 hours to 4 hours reduces hippocampal learning capacity by up to <strong>40%</strong> the following morning. Studying for 3 hours with 8 hours of sleep yields vastly higher exam performance than studying for 7 hours on 2 hours of sleep.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Burnout Prevention */}
        {activeTab === 'burnout' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">
                Pillar 1
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Emotional Exhaustion
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Waking up tired even after 8 hours, chronic muscle tension in shoulders, dreading opening syllabus or group chat notifications.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                <strong>Countermeasure:</strong> Enforce one non-negotiable &quot;Rest Day Half-Window&quot; per week where schoolwork is strictly prohibited.
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Pillar 2
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Cynicism &amp; Detachment
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Feeling indifferent about your major, skipping lectures, adopting an &quot;I don&apos;t care anymore&quot; attitude toward deadlines and projects.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                <strong>Countermeasure:</strong> Reconnect with 1 peer or professor outside of evaluation mode; speak to campus counseling before dropping courses.
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                Pillar 3
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Diminished Academic Efficacy
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                Feeling like no matter how much you study, you are falling behind your peers; experiencing intense imposter syndrome.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                <strong>Countermeasure:</strong> Track &quot;Micro-Wins&quot; (e.g. 1 problem set solved, 1 paragraph written) rather than entire 10-page papers.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
