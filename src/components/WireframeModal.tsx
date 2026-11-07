import React from 'react';
import { X, Layers, Sparkles, CheckCircle2, Download, Copy, Check } from 'lucide-react';
import { SECTION_WIREFRAMES } from '../data/resourcesData';
import { SectionId } from '../types';

interface WireframeModalProps {
  sectionId: SectionId | null;
  onClose: () => void;
}

export const WireframeModal: React.FC<WireframeModalProps> = ({ sectionId, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!sectionId) return null;
  const wireframe = SECTION_WIREFRAMES[sectionId];
  if (!wireframe) return null;

  const handleCopyMarkdown = () => {
    const text = `# ${wireframe.sectionTitle} - UX Wireframe & Architecture Blueprint
    
## Pedagogical Rationale
${wireframe.pedagogicalRationale}

## 3-Zone Layout Breakdown
${wireframe.uxLayoutArchitecture.map(z => `### ${z.zone}\n- Description: ${z.description}\n- Visual Weight: ${z.visualPriority}`).join('\n\n')}

## Recommended Actionable Resources
${wireframe.keyActionableResources.map(r => `- ${r}`).join('\n')}

## Interactive Components & Sandboxes
${wireframe.suggestedInteractiveComponents.map(c => `- ${c}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSpec = () => {
    const text = `# ${wireframe.sectionTitle} - UX Wireframe & Architecture Blueprint\n\n## Pedagogical Rationale\n${wireframe.pedagogicalRationale}\n\n## 3-Zone Layout Breakdown\n${wireframe.uxLayoutArchitecture.map(z => `### ${z.zone}\n${z.description}\n(Priority: ${z.visualPriority})`).join('\n\n')}\n\n## Key Resources\n${wireframe.keyActionableResources.join('\n')}\n\n## Interactive Components\n${wireframe.suggestedInteractiveComponents.join('\n')}`;
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sectionId}-ux-blueprint.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[85vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Educational Technologist &amp; UX Breakdown
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {wireframe.sectionTitle} Blueprint
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {/* Pedagogical Rationale */}
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
            <h3 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Pedagogical Rationale &amp; Learning Science
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              {wireframe.pedagogicalRationale}
            </p>
          </div>

          {/* 3-Zone Layout Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Spatial Wireframe &amp; Layout Architecture
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {wireframe.uxLayoutArchitecture.map((zone, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-indigo-600 dark:text-indigo-400">
                      {zone.zone}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {zone.visualPriority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                    {zone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Resources & Interactive Components Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
                Actionable Resources &amp; Templates
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {wireframe.keyActionableResources.map((res, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
                Suggested Interactive Components
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {wireframe.suggestedInteractiveComponents.map((comp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Export blueprint for curriculum or syllabus integration
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Spec'}</span>
            </button>
            <button
              onClick={handleDownloadSpec}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
