import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, 
  Copy, Check, Download, Layers, BookOpen, Quote, 
  Sparkles, Bookmark, FileText, ChevronRight
} from 'lucide-react';
import { playChime } from '../../utils/audio';
import { CORNELL_NOTE_TEMPLATE } from '../../data/resourcesData';
import { AudienceTarget } from '../../types';

interface AcademicSectionProps {
  audience: AudienceTarget;
  onOpenWireframe: () => void;
  onToggleBookmark: (id: string, title: string, category: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({
  onOpenWireframe,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'cornell' | 'citation' | 'cheatsheets' | 'flashcards'>('pomodoro');

  // --- Pomodoro State ---
  const [mode, setMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [intervalType, setIntervalType] = useState<'25-5' | '50-10'>('25-5');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTask, setCurrentTask] = useState('Read Chapter 4 & Draft Cornell Notes');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (soundEnabled) {
        playChime(mode === 'study' ? 'break' : 'study');
      }
      if (mode === 'study') {
        const nextCount = completedSessions + 1;
        setCompletedSessions(nextCount);
        if (nextCount % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(intervalType === '25-5' ? 15 * 60 : 20 * 60);
        } else {
          setMode('shortBreak');
          setTimeLeft(intervalType === '25-5' ? 5 * 60 : 10 * 60);
        }
      } else {
        setMode('study');
        setTimeLeft(intervalType === '25-5' ? 25 * 60 : 50 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, intervalType, completedSessions, soundEnabled]);

  const switchInterval = (type: '25-5' | '50-10') => {
    setIntervalType(type);
    setIsRunning(false);
    if (mode === 'study') {
      setTimeLeft(type === '25-5' ? 25 * 60 : 50 * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(type === '25-5' ? 5 * 60 : 10 * 60);
    } else {
      setTimeLeft(type === '25-5' ? 15 * 60 : 20 * 60);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'study') {
      setTimeLeft(intervalType === '25-5' ? 25 * 60 : 50 * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(intervalType === '25-5' ? 5 * 60 : 10 * 60);
    } else {
      setTimeLeft(intervalType === '25-5' ? 15 * 60 : 20 * 60);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- Citation Generator State ---
  const [citationType, setCitationType] = useState<'book' | 'journal' | 'website'>('journal');
  const [citationStyle, setCitationStyle] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [authorLast, setAuthorLast] = useState('Bjork');
  const [authorFirst, setAuthorFirst] = useState('Elizabeth L.');
  const [title, setTitle] = useState('Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning');
  const [sourceName, setSourceName] = useState('Psychology and the Educational Process');
  const [year, setYear] = useState('2011');
  const [volume, setVolume] = useState('56');
  const [issue, setIssue] = useState('2');
  const [pages, setPages] = useState('56-64');
  const [url, setUrl] = useState('https://doi.org/10.1037/000000-000');
  const [citationCopied, setCitationCopied] = useState(false);

  const generateCitation = () => {
    if (citationStyle === 'APA') {
      if (citationType === 'journal') {
        return `${authorLast}, ${authorFirst.charAt(0)}. (${year}). ${title}. ${sourceName}, ${volume}(${issue}), ${pages}. ${url}`;
      } else if (citationType === 'book') {
        return `${authorLast}, ${authorFirst.charAt(0)}. (${year}). ${title}. ${sourceName}.`;
      } else {
        return `${authorLast}, ${authorFirst.charAt(0)}. (${year}). ${title}. ${sourceName}. Retrieved from ${url}`;
      }
    } else if (citationStyle === 'MLA') {
      if (citationType === 'journal') {
        return `${authorLast}, ${authorFirst}. "${title}." ${sourceName}, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.`;
      } else if (citationType === 'book') {
        return `${authorLast}, ${authorFirst}. ${title}. ${sourceName}, ${year}.`;
      } else {
        return `${authorLast}, ${authorFirst}. "${title}." ${sourceName}, ${year}, ${url}.`;
      }
    } else {
      // Chicago 17th
      if (citationType === 'journal') {
        return `${authorLast}, ${authorFirst}. "${title}." ${sourceName} ${volume}, no. ${issue} (${year}): ${pages}.`;
      } else {
        return `${authorLast}, ${authorFirst}. ${title}. ${sourceName}, ${year}.`;
      }
    }
  };

  // --- Flashcard Deck State ---
  const FLASHCARDS = [
    {
      q: 'What is the "Testing Effect" (Active Retrieval)?',
      a: 'The phenomenon where actively retrieving information from memory produces stronger and more durable retention than passive rereading or highlighting.',
      topic: 'Cognitive Science',
    },
    {
      q: 'How does the Leitner Box 5-Tier Spaced Repetition System work?',
      a: 'Flashcards correctly recalled move into a higher numbered box reviewed less frequently (e.g. Day 1 -> Day 3 -> Day 7 -> Day 14 -> Day 30). Mistakes instantly drop back to Box 1.',
      topic: 'Study Systems',
    },
    {
      q: 'What are the 3 sections of a Cornell Note sheet?',
      a: '1. Right Column (70%): General class notes & diagrams.\n2. Left Column (30%): Cue words, questions & exam prompts.\n3. Bottom Area (20%): 2-3 sentence synthesis summary in own words.',
      topic: 'Note-Taking',
    },
    {
      q: 'What is the Feynman Technique in 4 steps?',
      a: '1. Choose a concept.\n2. Teach it to a 10-year-old using simple words and analogies.\n3. Identify knowledge gaps when getting stuck.\n4. Review source material to refine and simplify.',
      topic: 'Comprehension',
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<number[]>([]);

  // --- Cornell Notes Copy ---
  const [cornellText, setCornellText] = useState(CORNELL_NOTE_TEMPLATE);
  const [cornellCopied, setCornellCopied] = useState(false);

  const handleCopyCornell = () => {
    navigator.clipboard.writeText(cornellText);
    setCornellCopied(true);
    setTimeout(() => setCornellCopied(false), 2000);
  };

  const handleDownloadCornell = () => {
    const blob = new Blob([cornellText], { type: 'text/markdown;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `cornell-notes-template.md`;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <section id="academic" className="py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <span>Section 01</span>
              <span aria-hidden="true">·</span>
              <span>Cognitive Learning Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Academic Support &amp; Study Tools
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Replace passive re-reading with active recall protocols, structured Cornell synthesis, multi-format citation builders, and focus timers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark('academic-suite', 'Academic Study & Citation Suite', 'Academic')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isBookmarked('academic-suite')
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('academic-suite') ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
              <span>{isBookmarked('academic-suite') ? 'Saved in Toolkit' : 'Save Section'}</span>
            </button>

            <button
              onClick={onOpenWireframe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Section Blueprint &amp; UX Specs</span>
            </button>
          </div>
        </div>

        {/* Segmented Subcategory Navigation */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 overflow-x-auto border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'pomodoro'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pomodoro Focus Station
          </button>
          <button
            onClick={() => setActiveTab('citation')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'citation'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Citation Generator (APA/MLA/Chicago)
          </button>
          <button
            onClick={() => setActiveTab('cornell')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cornell'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cornell Notes &amp; Mind Maps
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active Recall Sandbox
          </button>
          <button
            onClick={() => setActiveTab('cheatsheets')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cheatsheets'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Subject Formula Quick Cards
          </button>
        </div>

        {/* Tab 1: Pomodoro Focus Station */}
        {activeTab === 'pomodoro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Zone: Live Timer Sandbox */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {mode === 'study' ? 'Deep Study Interval' : mode === 'shortBreak' ? 'Short Recovery Break' : 'Extended Rest Period'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sound Toggle */}
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title={soundEnabled ? 'Mute audio chime' : 'Enable audio chime'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  {/* Interval Preset Switcher */}
                  <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px]">
                    <button
                      onClick={() => switchInterval('25-5')}
                      className={`px-2 py-1 rounded font-medium cursor-pointer ${intervalType === '25-5' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
                    >
                      25 / 5m
                    </button>
                    <button
                      onClick={() => switchInterval('50-10')}
                      className={`px-2 py-1 rounded font-medium cursor-pointer ${intervalType === '50-10' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
                    >
                      50 / 10m
                    </button>
                  </div>
                </div>
              </div>

              {/* Giant Digital Readout */}
              <div className="text-center py-6 sm:py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 mb-6">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Target Task: <span className="text-slate-800 dark:text-slate-200 font-medium">{currentTask}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      if (soundEnabled && !isRunning) playChime('click');
                      setIsRunning(!isRunning);
                    }}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-xs ${
                      isRunning
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isRunning ? 'Pause Focus' : 'Start Focus Session'}</span>
                  </button>

                  <button
                    onClick={resetTimer}
                    className="p-3 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                    title="Reset interval"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Completed Cycles:</span>
                    <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{completedSessions}</span>
                  </div>
                </div>
              </div>

              {/* Task Input */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  Current Session Intention (Single-Task Focus):
                </label>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="e.g. Finish Calculus Homework #3 Problems 1 to 5"
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Right Zone: Study Science & Curated App Recommendations */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  The Science of Time-Boxing
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  The Pomodoro technique harnesses <strong>Parkinson&apos;s Law</strong> (work expands to fill the time available) and reduces attentional residue. Regular short recovery breaks replenish acetylcholine and glycogen in the prefrontal cortex.
                </p>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">Rule 1:</span>
                    <span>No tab switching during study intervals. Put phone out of reach.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">Rule 2:</span>
                    <span>On breaks, step away from screens—hydrate, stretch, or look at distant horizon.</span>
                  </div>
                </div>
              </div>

              {/* Recommended Flashcard & Note Apps */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                  Top Recommended Open Flashcard &amp; Study Engines
                </h4>
                <div className="space-y-3">
                  <a
                    href="https://apps.ankiweb.net/"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">Anki (Open Source Spaced Repetition)</span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">100% Free Desktop</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Gold standard for pre-med, STEM formulas, and language learning with SM-2 algorithm.
                    </p>
                  </a>

                  <a
                    href="https://quizlet.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">Quizlet</span>
                      <span className="text-[11px] text-slate-500">Free Tier</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Collaborative decks, matching games, and high school vocabulary mastery.
                    </p>
                  </a>

                  <a
                    href="https://remnote.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">RemNote (Notes + Flashcards)</span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Free for Students</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Write lecture notes that automatically transform into active recall flashcards.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Citation Generator */}
        {activeTab === 'citation' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Quote className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Instant Academic Citation Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Generate verified bibliographic entries according to APA 7th, MLA 9th, and Chicago 17th standards.
                </p>
              </div>

              {/* Style Presets */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Style:</span>
                <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  {(['APA', 'MLA', 'Chicago'] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => setCitationStyle(style)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        citationStyle === style
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Source Type Selector */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Source Type:</span>
              <div className="flex gap-2">
                {(['journal', 'book', 'website'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCitationType(type)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize border transition-all cursor-pointer ${
                      citationType === type
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-700 dark:text-indigo-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {type === 'journal' ? 'Academic Journal' : type === 'book' ? 'Textbook / Book' : 'Online Website / Article'}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Author Last Name</label>
                <input
                  type="text"
                  value={authorLast}
                  onChange={(e) => setAuthorLast(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Author First Name / Initial</label>
                <input
                  type="text"
                  value={authorFirst}
                  onChange={(e) => setAuthorFirst(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Publication Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {citationType === 'journal' ? 'Journal Name' : citationType === 'book' ? 'Publisher' : 'Website Name'}
                </label>
                <input
                  type="text"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Title of Work</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {citationType === 'journal' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Volume &amp; Issue</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Vol 56"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="w-1/2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Issue 2"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="w-1/2 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Page Range</label>
                    <input
                      type="text"
                      placeholder="e.g. 56-64"
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">DOI or Direct URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Generated Citation Result Display */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Formatted {citationStyle} Reference
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateCitation());
                    setCitationCopied(true);
                    setTimeout(() => setCitationCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  {citationCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{citationCopied ? 'Copied to Clipboard' : 'Copy Citation'}</span>
                </button>
              </div>
              <p className="text-sm font-serif text-slate-900 dark:text-slate-100 italic bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200/60 dark:border-slate-800 select-all">
                {generateCitation()}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Cornell Notes & Mind Mapping */}
        {activeTab === 'cornell' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Cornell Note-Taking Architecture &amp; Editor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Structured split-page layout designed by Dr. Walter Pauk at Cornell University.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCornell}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {cornellCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{cornellCopied ? 'Copied' : 'Copy Template'}</span>
                  </button>
                  <button
                    onClick={handleDownloadCornell}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              {/* Editable Markdown Area */}
              <textarea
                value={cornellText}
                onChange={(e) => setCornellText(e.target.value)}
                rows={16}
                className="w-full font-mono text-xs sm:text-[13px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Right: Mind Map Structure Guide */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                  When to Use Mind Mapping vs. Cornell
                </h4>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Use Cornell Notes for:</span>
                    <span>Linear lectures, history chronologies, textbook chapter summaries, and exam question forecasting.</span>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Use Mind Maps for:</span>
                    <span>Complex interconnected systems, organic chemistry synthesis pathways, essay thesis brainstorming, and diagnosing literature themes.</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Recommended Mind Map Tools:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li><a href="https://miro.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Miro</a> (Free student tier)</li>
                    <li><a href="https://obsidian.md" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Obsidian Canvas</a> (Local Markdown)</li>
                    <li><a href="https://gitmind.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">GitMind</a> (Quick brainstorming)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Active Recall Sandbox */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Leitner Study Sandbox ({currentCardIndex + 1} of {FLASHCARDS.length})
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Mastered: <span className="font-semibold text-emerald-600">{masteredCards.length}</span>
              </span>
            </div>

            {/* Interactive Flashcard Card */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-8 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 dark:from-slate-800/40 dark:via-slate-900 dark:to-slate-800 flex flex-col justify-between cursor-pointer hover:border-indigo-400 transition-all select-none"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{FLASHCARDS[currentCardIndex].topic}</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to {isFlipped ? 'show question' : 'reveal answer'}</span>
              </div>

              <div className="text-center py-6">
                {!isFlipped ? (
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {FLASHCARDS[currentCardIndex].q}
                  </h4>
                ) : (
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed font-medium">
                    {FLASHCARDS[currentCardIndex].a}
                  </p>
                )}
              </div>

              <div className="text-center text-[11px] text-slate-400">
                {!isFlipped ? 'Tap card to flip' : 'Rate your memory confidence below:'}
              </div>
            </div>

            {/* Self-Rating Controls */}
            {isFlipped && (
              <div className="flex items-center gap-3 mt-6 animate-in fade-in duration-200">
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors cursor-pointer"
                >
                  Hard (Reset to Box 1)
                </button>
                <button
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition-colors cursor-pointer"
                >
                  Good (Review in 3 Days)
                </button>
                <button
                  onClick={() => {
                    if (!masteredCards.includes(currentCardIndex)) {
                      setMasteredCards([...masteredCards, currentCardIndex]);
                    }
                    setIsFlipped(false);
                    setCurrentCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                >
                  Easy (Mastered)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Subject Formula Quick Cards */}
        {activeTab === 'cheatsheets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Calculus &amp; STEM
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Essential Derivatives</h4>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <div>d/dx [x^n] = n·x^(n-1)</div>
                <div>d/dx [e^x] = e^x</div>
                <div>d/dx [ln(x)] = 1/x</div>
                <div>d/dx [uv] = u&apos;v + uv&apos; (Product)</div>
                <div>d/dx [u/v] = (u&apos;v - uv&apos;)/v^2 (Quotient)</div>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Chemistry
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Equilibrium &amp; Gas Laws</h4>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <div>PV = nRT (Ideal Gas)</div>
                <div>pH = -log[H+]</div>
                <div>pOH = -log[OH-]</div>
                <div>pH + pOH = 14.00 (at 25°C)</div>
                <div>ΔG = ΔH - TΔS (Gibbs Free)</div>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Biology
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Cellular Respiration ATP</h4>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <div><strong>Glycolysis:</strong> 2 ATP + 2 NADH (Cytosol)</div>
                <div><strong>Krebs Cycle:</strong> 2 ATP + 6 NADH + 2 FADH2</div>
                <div><strong>ETC &amp; Chemiosmosis:</strong> ~28-32 ATP</div>
                <div><strong>Total Net Yield:</strong> ~36-38 ATP per Glucose</div>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Humanities &amp; Writing
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Academic Thesis Formula</h4>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <p className="italic text-slate-600 dark:text-slate-400">
                  &quot;Although [Counterargument X], because [Evidence Y], therefore [Significant Claim Z].&quot;
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  Prevents weak factual statements; forces an arguable claim.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
