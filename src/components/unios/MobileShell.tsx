import React, { useState } from 'react';
import { 
  GraduationCap, Building2, Briefcase, ShieldAlert, DollarSign, 
  Wifi, Battery, Signal, Bell, Key, Shield, Layers, X, Sparkles
} from 'lucide-react';
import { UniModuleId, StudentProfile } from '../../types/unios';
import { ENTERPRISE_SPECS } from '../../data/uniosData';
import { AcademicRegistrarModule } from './modules/AcademicRegistrarModule';
import { CampusLifeModule } from './modules/CampusLifeModule';
import { CareerModule } from './modules/CareerModule';
import { SafetyHealthModule } from './modules/SafetyHealthModule';
import { BursarFinanceModule } from './modules/BursarFinanceModule';

interface MobileShellProps {
  student: StudentProfile;
  activeModule: UniModuleId;
  onSelectModule: (mod: UniModuleId) => void;
  onOpenBlueprintModal: (mod?: UniModuleId) => void;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  student,
  activeModule,
  onSelectModule,
  onOpenBlueprintModal,
}) => {
  // Push Notification simulation
  const [activePushNotification, setActivePushNotification] = useState<{
    title: string;
    body: string;
    priority: string;
  } | null>(null);

  const triggerPushPreview = (mod: UniModuleId) => {
    const spec = ENTERPRISE_SPECS[mod];
    const trigger = spec.pushNotificationTriggers[0];
    setActivePushNotification({
      title: trigger.event,
      body: trigger.copyPreview,
      priority: trigger.priority,
    });
    setTimeout(() => setActivePushNotification(null), 5500);
  };

  return (
    <div className="relative mx-auto max-w-[430px] w-full min-h-[840px] bg-white dark:bg-slate-900 border-8 border-slate-900 dark:border-slate-800 rounded-[44px] shadow-2xl overflow-hidden flex flex-col font-sans select-none ring-1 ring-slate-900/10">
      {/* Dynamic Island / Hardware Notch */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
        <div className="w-3 h-3 rounded-full bg-indigo-950/80 border border-indigo-700/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>
      </div>

      {/* iOS Top Status Bar */}
      <div className="h-11 px-7 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 z-40 pt-1">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Push Notification Banner Overlay */}
      {activePushNotification && (
        <div 
          onClick={() => setActivePushNotification(null)}
          className="mx-3.5 mb-2 p-3 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-slate-700/60 z-50 animate-in slide-in-from-top-4 duration-300 cursor-pointer"
        >
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
            <span className="flex items-center gap-1 font-bold text-indigo-400">
              <Bell className="w-3 h-3" /> UniOS Notification · {activePushNotification.priority}
            </span>
            <span>Now</span>
          </div>
          <div className="text-xs font-bold">{activePushNotification.title}</div>
          <div className="text-[11px] text-slate-300 leading-snug mt-0.5">
            {activePushNotification.body}
          </div>
        </div>
      )}

      {/* App Header Bar (Compact Mobile Pattern) */}
      <div className="px-5 py-2.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            U
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                UniOS
              </h1>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                · {student.name.split(' ')[0]}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {student.classYear} · {student.major}
            </div>
          </div>
        </div>

        {/* Quick Triggers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => triggerPushPreview(activeModule)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Simulate push notification for this module"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenBlueprintModal(activeModule)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="View Enterprise Technical Architecture"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Mobile Body Content (Natural Thumb Zone) */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {activeModule === 'academic' && (
          <AcademicRegistrarModule
            student={student}
            onOpenSpecs={() => onOpenBlueprintModal('academic')}
          />
        )}
        {activeModule === 'campus' && (
          <CampusLifeModule
            student={student}
            onOpenSpecs={() => onOpenBlueprintModal('campus')}
          />
        )}
        {activeModule === 'career' && (
          <CareerModule
            student={student}
            onOpenSpecs={() => onOpenBlueprintModal('career')}
          />
        )}
        {activeModule === 'safety' && (
          <SafetyHealthModule
            student={student}
            onOpenSpecs={() => onOpenBlueprintModal('safety')}
          />
        )}
        {activeModule === 'finance' && (
          <BursarFinanceModule
            student={student}
            onOpenSpecs={() => onOpenBlueprintModal('finance')}
          />
        )}
      </div>

      {/* Fixed Bottom Tab Bar (Pattern 1 from Mobile Guidelines) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 items-center px-1 z-40">
        <button
          onClick={() => onSelectModule('academic')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeModule === 'academic'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <GraduationCap className={`w-5 h-5 ${activeModule === 'academic' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Registrar
          </span>
        </button>

        <button
          onClick={() => onSelectModule('campus')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeModule === 'campus'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Building2 className={`w-5 h-5 ${activeModule === 'campus' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Campus
          </span>
        </button>

        <button
          onClick={() => onSelectModule('career')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeModule === 'career'
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <Briefcase className={`w-5 h-5 ${activeModule === 'career' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Career
          </span>
        </button>

        <button
          onClick={() => onSelectModule('safety')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeModule === 'safety'
              ? 'text-rose-600 dark:text-rose-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <ShieldAlert className={`w-5 h-5 ${activeModule === 'safety' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Safety
          </span>
        </button>

        <button
          onClick={() => onSelectModule('finance')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeModule === 'finance'
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
          }`}
        >
          <DollarSign className={`w-5 h-5 ${activeModule === 'finance' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] font-medium tracking-tight mt-1 whitespace-nowrap">
            Bursar
          </span>
        </button>
      </div>

      {/* iOS Home Indicator Bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full z-50 pointer-events-none" />
    </div>
  );
};
