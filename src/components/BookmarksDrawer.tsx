import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

interface BookmarkEntry {
  id: string;
  title: string;
  category: string;
}

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkEntry[];
  onRemoveBookmark: (id: string) => void;
  onNavigateToSection: (sectionId: SectionId) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onNavigateToSection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Saved Student Toolkit ({bookmarks.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {bookmarks.length === 0 ? (
              <div className="py-12 text-center">
                <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You haven&apos;t saved any tools or sections yet. Click the &quot;Save Section&quot; button in any module to keep it pinned here for quick reference!
                </p>
              </div>
            ) : (
              bookmarks.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                      {b.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {b.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        const sec = b.category.toLowerCase().includes('academic')
                          ? 'academic'
                          : b.category.toLowerCase().includes('career')
                          ? 'career'
                          : b.category.toLowerCase().includes('wellness')
                          ? 'wellness'
                          : b.category.toLowerCase().includes('finance')
                          ? 'finance'
                          : 'productivity';
                        onNavigateToSection(sec as SectionId);
                        onClose();
                      }}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-md transition-colors cursor-pointer"
                      title="Jump to section"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(b.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center">
            Saved items persist locally in your browser storage.
          </div>
        </div>
      </div>
    </div>
  );
};
