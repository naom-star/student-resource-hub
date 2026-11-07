/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smartphone, Layers, BookOpen, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Server, Bell, Key
} from 'lucide-react';
import { MobileShell } from './components/unios/MobileShell';
import { BlueprintDocsModal } from './components/unios/BlueprintDocsModal';
import { INITIAL_STUDENT_PROFILE, ENTERPRISE_SPECS } from './data/uniosData';
import { UniModuleId, StudentProfile } from './types/unios';

// Import study suite components
import { AcademicSection } from './components/sections/AcademicSection';
import { CareerSection } from './components/sections/CareerSection';
import { WellnessSection } from './components/sections/WellnessSection';
import { FinanceSection } from './components/sections/FinanceSection';
import { ProductivitySection } from './components/sections/ProductivitySection';
import { WireframeModal } from './components/WireframeModal';
import { SectionId } from './types';

export default function App() {
  const [appMode, setAppMode] = useState<'mobile' | 'blueprint' | 'study_suite'>('mobile');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [activeModule, setActiveModule] = useState<UniModuleId>('academic');
  const [blueprintModalModule, setBlueprintModalModule] = useState<UniModuleId | null>(null);

  // Study suite modal state
  const [wireframeSection, setWireframeSection] = useState<SectionId | null>(null);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {/* Top Enterprise Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3">
          {/* Brand Wordmark (Single text element adhering to Top Bar contract) */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              UniOS
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-500 border-l border-slate-200 dark:border-slate-800 pl-3">
              The Unified University Student Service Platform
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <nav className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setAppMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Native Mobile App</span>
            </button>
            <button
              onClick={() => setAppMode('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'blueprint'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Enterprise Blueprint &amp; APIs</span>
            </button>
            <button
              onClick={() => setAppMode('study_suite')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                appMode === 'study_suite'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Student Resource Hub</span>
            </button>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={() => setBlueprintModalModule(activeModule)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Server className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">System API Specs</span>
            <span className="sm:hidden">APIs</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* VIEW 1: Native Mobile App Simulation */}
        {appMode === 'mobile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Context & Module Navigator */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1 block">
                  Unified Campus Single Sign-On (SSO) Mobile Experience
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
                  UniOS Mobile Core
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Replaces fragmented portals (Banner, Canvas, CBORD, TransLoc, Rave Safety, and TouchNet) with a single high-efficiency native mobile experience.
                </p>
              </div>

              {/* 5 Module Switcher Cards */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Select Active Service Module:
                </span>

                <button
                  onClick={() => setActiveModule('academic')}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    activeModule === 'academic'
                      ? 'bg-white dark:bg-slate-800 border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                      Module 01 · Registrar
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Degree Audit &amp; Prerequisite Engine
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Credits progress, DAG prereq checker, 1-tap registration &amp; waitlist.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                <button
                  onClick={() => setActiveModule('campus')}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    activeModule === 'campus'
                      ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                      Module 02 · Facilities
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Campus Life, Housing &amp; Shuttles
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      NFC dorm tap unlock, dining menus, live shuttle GPS &amp; laundry status.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                <button
                  onClick={() => setActiveModule('career')}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    activeModule === 'career'
                      ? 'bg-white dark:bg-slate-800 border-purple-500 shadow-md ring-1 ring-purple-500/20'
                      : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block mb-0.5">
                      Module 03 · Career
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Career Center &amp; Alumni Network
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Federal Work-Study jobs, alumni coffee-chats, resume review queue.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                <button
                  onClick={() => setActiveModule('safety')}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    activeModule === 'safety'
                      ? 'bg-white dark:bg-slate-800 border-rose-500 shadow-md ring-1 ring-rose-500/20'
                      : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                      Module 04 · Safety
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Health, Counseling &amp; Campus Safety
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Blue-Light Virtual Escort, 911 police dispatch, confidential counseling.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>

                <button
                  onClick={() => setActiveModule('finance')}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    activeModule === 'finance'
                      ? 'bg-white dark:bg-slate-800 border-amber-500 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-white/80 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-white'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                      Module 05 · Bursar
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Bursar, Aid &amp; Micro-Grants Hub
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tuition payment plan, Work-Study timesheet logger, emergency aid.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              </div>

              {/* Student SSO Identity Card Badge */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  Active Single Sign-On Context:
                </span>
                <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                  <div>• Student: <strong>{student.name}</strong> ({student.studentIdNumber})</div>
                  <div>• Program: <strong>{student.major}</strong> (Minor: {student.minor})</div>
                  <div>• Standing: <strong>Junior (3.84 GPA, 88 Credits)</strong></div>
                  <div>• Dorm: <strong>{student.dormBuilding} ({student.dormRoom})</strong></div>
                </div>
              </div>
            </div>

            {/* Right Column: Native Mobile Smartphone Simulator */}
            <div className="lg:col-span-7 flex justify-center py-2">
              <MobileShell
                student={student}
                activeModule={activeModule}
                onSelectModule={setActiveModule}
                onOpenBlueprintModal={(mod) => setBlueprintModalModule(mod || activeModule)}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: Full Enterprise Architecture & System Integration Blueprint */}
        {appMode === 'blueprint' && (
          <div className="space-y-8">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                Senior UX Architect &amp; Product Lead Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                UniOS Enterprise Integration Architecture
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Enterprise higher-education software architecture connecting existing university backend infrastructure into a single low-friction, single-sign-on (SSO) mobile ecosystem.
              </p>
            </div>

            {/* Architecture Grid of all 5 Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Object.keys(ENTERPRISE_SPECS) as UniModuleId[]).map((modKey) => {
                const s = ENTERPRISE_SPECS[modKey];
                return (
                  <div
                    key={modKey}
                    className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                          {s.protocol}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          WCAG 2.1 AA
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                        {s.module}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mb-3">
                        Vendor: {s.enterpriseVendor}
                      </div>

                      {/* Key Endpoints */}
                      <div className="space-y-1.5 font-mono text-[11px] mb-4">
                        {s.endpoints.slice(0, 2).map((ep, i) => (
                          <div key={i} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/80">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">{ep.method}</span> {ep.path}
                          </div>
                        ))}
                      </div>

                      {/* Push Notification preview */}
                      <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/40 text-xs">
                        <span className="font-bold text-amber-900 dark:text-amber-200 block text-[10px] uppercase">
                          Push Trigger: {s.pushNotificationTriggers[0].event}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 italic text-[11px] mt-0.5">
                          &quot;{s.pushNotificationTriggers[0].copyPreview}&quot;
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setBlueprintModalModule(modKey)}
                      className="mt-4 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Full Technical Blueprint</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: Embedded Student Resource Hub */}
        {appMode === 'study_suite' && (
          <div className="space-y-12">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                  Integrated Academic Learning Systems
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Student Study Tools &amp; Productivity Suite
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Access Pomodoro study timers, Cornell note templates, citation generators, and budgeting tools.
                </p>
              </div>
              <button
                onClick={() => setAppMode('mobile')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Return to UniOS Mobile
              </button>
            </div>

            <AcademicSection
              audience="university"
              onOpenWireframe={() => setWireframeSection('academic')}
              onToggleBookmark={() => {}}
              isBookmarked={() => false}
            />
            <CareerSection
              audience="university"
              onOpenWireframe={() => setWireframeSection('career')}
              onToggleBookmark={() => {}}
              isBookmarked={() => false}
            />
            <WellnessSection
              audience="university"
              onOpenWireframe={() => setWireframeSection('wellness')}
              onToggleBookmark={() => {}}
              isBookmarked={() => false}
            />
            <FinanceSection
              audience="university"
              onOpenWireframe={() => setWireframeSection('finance')}
              onToggleBookmark={() => {}}
              isBookmarked={() => false}
            />
            <ProductivitySection
              audience="university"
              onOpenWireframe={() => setWireframeSection('productivity')}
              onToggleBookmark={() => {}}
              isBookmarked={() => false}
            />
          </div>
        )}
      </main>

      {/* Enterprise Blueprint Technical Modal */}
      {blueprintModalModule && (
        <BlueprintDocsModal
          initialModule={blueprintModalModule}
          onClose={() => setBlueprintModalModule(null)}
        />
      )}

      {/* Study Suite Wireframe Modal */}
      <WireframeModal
        sectionId={wireframeSection}
        onClose={() => setWireframeSection(null)}
      />

      {/* Enterprise Footer */}
      <footer className="mt-auto py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            UniOS Mobile Platform · Higher Education Enterprise UX Blueprint
          </div>
          <div>
            Ellucian Banner · Workday Student · Canvas LTI 1.3 · CBORD NFC Mobile Credential
          </div>
        </div>
      </footer>
    </div>
  );
}
