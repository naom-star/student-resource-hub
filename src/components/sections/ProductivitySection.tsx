import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckSquare, Calendar, FolderTree, Users, 
  Plus, Trash2, Copy, Check, Download, Layers, 
  Bookmark, CheckCircle2, ChevronRight, AlertCircle
} from 'lucide-react';
import { NOTION_DRIVE_HIERARCHY } from '../../data/resourcesData';
import { TaskItem, AudienceTarget } from '../../types';

interface ProductivitySectionProps {
  audience: AudienceTarget;
  onOpenWireframe: () => void;
  onToggleBookmark: (id: string, title: string, category: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const ProductivitySection: React.FC<ProductivitySectionProps> = ({
  onOpenWireframe,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'milestones' | 'notion-drive' | 'group-charter'>('tasks');

  // --- Task Tracker State (Saved to LocalStorage) ---
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('academiahub_tasks');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 't1',
        title: 'Review Chapter 5 Practice Problems for Midterm',
        course: 'MATH 240',
        dueDate: '2026-11-12',
        priority: 'high',
        completed: false,
        category: 'Exam',
      },
      {
        id: 't2',
        title: 'Submit 2nd Draft of Literature Review',
        course: 'WRIT 150',
        dueDate: '2026-11-15',
        priority: 'medium',
        completed: true,
        category: 'Assignment',
      },
      {
        id: 't3',
        title: 'Set up Git repo & schedule sprint planning call',
        course: 'CS 201',
        dueDate: '2026-11-10',
        priority: 'high',
        completed: false,
        category: 'Project',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('academiahub_tasks', JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCourse, setNewTaskCourse] = useState('CS 201');
  const [newTaskDue, setNewTaskDue] = useState('2026-11-20');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      course: newTaskCourse.trim() || 'General',
      dueDate: newTaskDue,
      priority: newTaskPriority,
      completed: false,
      category: 'Assignment',
    };
    setTasks([item, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'pending') return !t.completed;
    if (taskFilter === 'completed') return t.completed;
    return true;
  });

  // --- Reverse Syllabus Milestone Planner State ---
  const [projectName, setProjectName] = useState('Final Capstone Research Paper');
  const [finalDeadline, setFinalDeadline] = useState('2026-12-15');

  const calculateMilestones = (deadlineStr: string) => {
    const finalDate = new Date(deadlineStr);
    const msPerDay = 24 * 60 * 60 * 1000;

    return [
      {
        phase: 'Milestone 1: Topic Approval & Thesis Formulation',
        targetDate: new Date(finalDate.getTime() - 28 * msPerDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        desc: 'Meet with TA or professor during office hours; finalize primary question and search terms.',
      },
      {
        phase: 'Milestone 2: Literature Review & Annotated Bibliography',
        targetDate: new Date(finalDate.getTime() - 21 * msPerDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        desc: 'Gather 8-10 peer-reviewed sources; log DOI citations into Cornell matrix.',
      },
      {
        phase: 'Milestone 3: Rough Zero-Draft Completion',
        targetDate: new Date(finalDate.getTime() - 12 * msPerDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        desc: 'Dump all core arguments onto page without editing grammar; reach 80% target word count.',
      },
      {
        phase: 'Milestone 4: Peer Review & Writing Center Consultation',
        targetDate: new Date(finalDate.getTime() - 5 * msPerDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        desc: 'Exchange paper with study buddy or university writing tutor to identify logic gaps.',
      },
      {
        phase: 'Milestone 5: Final Proofreading & Formatted Submission',
        targetDate: new Date(finalDate.getTime() - 1 * msPerDay).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        desc: 'Verify formatting (APA/MLA), export PDF, and submit 24 hours prior to hard deadline to prevent LMS outage panics.',
      },
    ];
  };

  const milestones = calculateMilestones(finalDeadline);

  // --- Digital Organization Copy ---
  const [notionCopied, setNotionCopied] = useState(false);
  const handleCopyNotion = () => {
    navigator.clipboard.writeText(NOTION_DRIVE_HIERARCHY);
    setNotionCopied(true);
    setTimeout(() => setNotionCopied(false), 2000);
  };

  // --- Group Charter Template State ---
  const [charterCourse, setCharterCourse] = useState('CS 310');
  const [charterTeam, setCharterTeam] = useState('Maya, Daniel, Jordan, Alex');
  const [charterTool, setCharterTool] = useState('Slack & Notion Workspace');
  const [charterCopied, setCharterCopied] = useState(false);

  const generateCharterText = () => {
    return `GROUP PROJECT TEAM CHARTER & ACCOUNTABILITY CONTRACT
Course: ${charterCourse} | Semester: Fall 2026
Team Members: ${charterTeam}
Primary Communication Hub: ${charterTool}

1. COMMUNICATION AGREEMENT:
- All team members must respond to direct messages and thread pings within 24 hours (or 12 hours on submission week).
- We will hold a 15-minute weekly standing meeting on [Day/Time, e.g. Tuesdays at 7pm via Zoom/Library].

2. ROLE & WORK DECOMPOSITION:
- No team member will be left with an ambiguous task. Every milestone will have a single designated "Owner" and a secondary "Reviewer".
- The Owner is responsible for submitting work to our shared drive 48 hours before the professor's deadline.

3. CONFLICT & FREE-RIDER ESCALATION PROTOCOL:
- Level 1: If a teammate misses a soft deadline by 24 hours without prior notice, the team lead calls an emergency 10-minute check-in.
- Level 2: If work remains incomplete 48 hours before submission, the team redistributes the workload and documents the missing contribution.
- Level 3: If non-communication persists, the team will respectfully notify the instructor with timestamped logs as permitted in the syllabus rubric.

Team Signatures & Commitments:
${charterTeam.split(',').map((name) => `[X] Signed: ${name.trim()}`).join('\n')}`;
  };

  return (
    <section id="productivity" className="py-12 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
              <span>Section 05</span>
              <span aria-hidden="true">·</span>
              <span>Semester Systems &amp; Executive Function</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Productivity &amp; Time Management
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Decompress your syllabus, reverse-plan major research milestones, organize your Google Drive/Notion folders, and enforce group project accountability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onToggleBookmark('productivity-suite', 'Productivity & Planning Suite', 'Productivity')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                isBookmarked('productivity-suite')
                  ? 'bg-sky-50 border-sky-300 text-sky-700 dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-300'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked('productivity-suite') ? 'fill-sky-600 dark:fill-sky-400' : ''}`} />
              <span>{isBookmarked('productivity-suite') ? 'Saved in Toolkit' : 'Save Section'}</span>
            </button>

            <button
              onClick={onOpenWireframe}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Section Blueprint &amp; UX Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-8 overflow-x-auto border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Course Deadline &amp; Task Tracker
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'milestones'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reverse Syllabus Milestone Calculator
          </button>
          <button
            onClick={() => setActiveTab('notion-drive')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'notion-drive'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Notion &amp; Google Drive Folder Schemes
          </button>
          <button
            onClick={() => setActiveTab('group-charter')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'group-charter'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Group Project Team Charter &amp; Contract
          </button>
        </div>

        {/* Tab 1: Live Course Deadline Tracker */}
        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Task Operations */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Interactive Course Task Command Center
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Persistent client-side tracker. Data automatically saves across browser sessions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                    {(['all', 'pending', 'completed'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTaskFilter(filter)}
                        className={`px-2.5 py-1 rounded-md capitalize cursor-pointer ${
                          taskFilter === filter ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Add Form */}
              <form onSubmit={handleAddTask} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      placeholder="Add an assignment, reading, or study goal..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Course (e.g. CS 201)"
                      value={newTaskCourse}
                      onChange={(e) => setNewTaskCourse(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className="w-full px-2 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full h-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Task</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Task Items List */}
              <div className="space-y-2.5">
                {filteredTasks.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No tasks found matching current filter. Add one above!
                  </div>
                ) : (
                  filteredTasks.map((t) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        t.completed
                          ? 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 opacity-60'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleTask(t.id)}
                          className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <p className={`text-xs font-medium text-slate-900 dark:text-white truncate ${t.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                            {t.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            <span className="font-semibold text-sky-600 dark:text-sky-400">{t.course}</span>
                            <span aria-hidden="true">·</span>
                            <span>Due {t.dueDate}</span>
                            <span aria-hidden="true">·</span>
                            <span className={t.priority === 'high' ? 'text-rose-500 font-semibold' : 'text-slate-400'}>
                              {t.priority}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteTask(t.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right: Progress & Pacing Metrics */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
                  Pacing Overview
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Task Completion Ratio
                </h4>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                    {completionPercentage}%
                  </span>
                  <span className="text-xs text-slate-500">
                    {completedCount} of {tasks.length} tasks closed
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-sky-500 transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Pro-tip: Clear 1 high-priority task before 11:00 AM every morning. Winning the first 2 hours of the day builds executive momentum that eliminates end-of-day guilt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reverse Syllabus Milestone Calculator */}
        {activeTab === 'milestones' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Reverse Syllabus Milestone Generator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Input a major assignment or project deadline. The tool calculates backward checkpoints to eliminate cramming.
                </p>
              </div>

              {/* Inputs */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Project Name"
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
                <input
                  type="date"
                  value={finalDeadline}
                  onChange={(e) => setFinalDeadline(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Generated Staggered Milestones */}
            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {m.phase}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 font-mono">
                      Target: {m.targetDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Notion & Google Drive Folder Schemes */}
        {activeTab === 'notion-drive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FolderTree className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Digital Organization Operating System
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Standardized folder structure for Google Drive, OneDrive, and Notion.
                  </p>
                </div>

                <button
                  onClick={handleCopyNotion}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-100 transition-colors cursor-pointer"
                >
                  {notionCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{notionCopied ? 'Copied' : 'Copy Schema'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200/60 dark:border-slate-700/60 leading-relaxed select-all">
                {NOTION_DRIVE_HIERARCHY}
              </pre>
            </div>

            {/* Right: Golden Rules of File Management */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
                  Naming Convention Rules
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Never Name a File &quot;Final_v2.docx&quot;
                </h4>
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700">
                    <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Recommended Formula:</span>
                    <code className="text-sky-600 font-mono text-[11px]">[Course]_[Assignment]_[YourLastName]_[YYYY-MM-DD].pdf</code>
                  </div>
                  <p>
                    Why? Professors grade hundreds of papers. An anonymous file named <code>essay.pdf</code> gets misplaced. Including your last name and course code guarantees instant identification and prevents late submission penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Group Project Team Charter */}
        {activeTab === 'group-charter' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Group Project Team Charter &amp; Accountability Contract
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Sign this agreement in Week 1 to prevent free-riding, clarify response times, and establish conflict procedures.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateCharterText());
                    setCharterCopied(true);
                    setTimeout(() => setCharterCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  {charterCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{charterCopied ? 'Copied' : 'Copy Charter'}</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Course Code</label>
                <input
                  type="text"
                  value={charterCourse}
                  onChange={(e) => setCharterCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Team Member Names</label>
                <input
                  type="text"
                  value={charterTeam}
                  onChange={(e) => setCharterTeam(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Primary Comm Channel</label>
                <input
                  type="text"
                  value={charterTool}
                  onChange={(e) => setCharterTool(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Charter Preview */}
            <pre className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap border border-slate-200/60 dark:border-slate-700/60 leading-relaxed select-all">
              {generateCharterText()}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
