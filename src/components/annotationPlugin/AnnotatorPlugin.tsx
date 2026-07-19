'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, MessageSquareOff, Settings2, Eye, EyeOff, ScanLine, X } from 'lucide-react';
import { Annotation, useAnnotatorStore } from './store';
import { getCssSelector, getScreenSize } from './utils';
import { Marker } from './Marker';

import { createCommentThunk } from '@/lib/store/comments/commentThunk';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

import GetAllCommments from './GetAllCommments';
import { usePathname } from 'next/navigation';
import { RootState } from '@/lib/store/store';
import { useAppDispatch } from '@/lib/store/hooks';
import { setPageComments } from '@/lib/store/comments/commentSlice';

export const AnnotatorPlugin: React.FC = () => {
  const {
    annotations,
    isCommentModeActive,
    toggleCommentMode,
    addAnnotation,
    setActiveAnnotationId,
    settings,
    setAnnotations,
    updateSettings,
  } = useAnnotatorStore();
  const [draft, setDraft] = useState<{
    x: number;
    y: number;
    selector: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const [draftContent, setDraftContent] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const commentsState = useSelector((state: RootState) => state.comments);
  const allComments = commentsState?.allComments || [];
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const slug = pathname?.split('/').filter(Boolean).pop() || 'home';

  useEffect(() => {
    if (slug && allComments) {
      const filterComments = allComments.filter((comment: Annotation) => comment.slug === slug);
      if (filterComments.length > 0) {
        dispatch(setPageComments(filterComments));
        setAnnotations(filterComments);
      }
    }
  }, [slug, allComments, dispatch, setAnnotations]);

  useEffect(() => {
    if (settings.calibrationMode && isCommentModeActive) {
      document.body.classList.add('annotator-calibration-mode');
    } else {
      document.body.classList.remove('annotator-calibration-mode');
    }

    return () => {
      document.body.classList.remove('annotator-calibration-mode');
    };
  }, [settings.calibrationMode, isCommentModeActive]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!isCommentModeActive) return;

    e.preventDefault();
    e.stopPropagation();

    const overlay = e.currentTarget as HTMLElement;
    overlay.style.display = 'none';

    const target = document.elementFromPoint(e.clientX, e.clientY);

    overlay.style.display = 'block';

    if (!target || target === document.body || target === document.documentElement) {
      if (!target) return;
    }

    if (target instanceof Element && target.closest('[data-annotator-ui="true"]')) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
    const offsetY = ((e.clientY - rect.top) / rect.height) * 100;

    const selector = getCssSelector(target);

    setDraft({
      x: e.clientX,
      y: e.clientY,
      selector,
      offsetX,
      offsetY,
    });
    setShowSettings(false);
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      if (!isCommentModeActive && !draft) {
        setActiveAnnotationId(null);
        setShowSettings(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isCommentModeActive, draft, setActiveAnnotationId]);

  const handleSaveDraft = async () => {
    if (!draft || !draftContent.trim()) return;
    const data: Omit<Annotation, 'id' | 'createdAt'> = {
      selector: draft.selector,
      offsetX: draft.offsetX,
      offsetY: draft.offsetY,
      content: draftContent.trim(),
      status: 'open',
      screenSize: getScreenSize(window.innerWidth),
      pageId: '',
      slug: slug,
    };
    addAnnotation(data);
    setDraft(null);
    setDraftContent('');

    const response = await dispatch(createCommentThunk(data)).unwrap();
    if (response.success) {
      toast.success('Comment added successfully');
    } else {
      toast.error('Failed to add comment');
    }
  };

  const handleCancelDraft = () => {
    setDraft(null);
    setDraftContent('');
  };

  return (
    <>
      <GetAllCommments />

      <style>{`
        body.annotator-calibration-mode [data-annotate-id] {
          outline: 2px dashed #6366f1 !important;
          outline-offset: 2px !important;
          position: relative;
        }
        body.annotator-calibration-mode [data-annotate-id]::after {
          content: attr(data-annotate-id);
          position: absolute;
          top: -24px;
          left: 0;
          background: #6366f1;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
          z-index: 10000;
          pointer-events: none;
          white-space: nowrap;
        }
      `}</style>

      {/* FAB + Toggle Button */}
      <button
        data-annotator-ui="true"
        onClick={(e) => {
          e.stopPropagation();
          toggleCommentMode();
          setShowSettings(false);
        }}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-200 ${
          isCommentModeActive
            ? 'bg-red-500 hover:bg-red-600 scale-110'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        title={isCommentModeActive ? 'Exit comment mode' : 'Toggle comment mode'}
      >
        {isCommentModeActive ? <MessageSquareOff size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Settings Button (visible when comment mode is active) */}
      {isCommentModeActive && (
        <button
          data-annotator-ui="true"
          onClick={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
          }}
          className="fixed bottom-6 right-24 z-[9999] w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-800 shadow-lg flex items-center justify-center text-white transition-colors"
          title="Settings"
        >
          <Settings2 size={18} />
        </button>
      )}

      {/* Settings Panel */}
      {showSettings && isCommentModeActive && (
        <div
          data-annotator-ui="true"
          className="fixed bottom-28 right-6 z-[9999] w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-700">Settings</span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-700 flex items-center gap-2">
                <Eye size={16} /> Show Resolved
              </span>
              <input
                type="checkbox"
                checked={settings.showResolved}
                onChange={() => updateSettings({ showResolved: !settings.showResolved })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-slate-700 flex items-center gap-2">
                <ScanLine size={16} /> Calibration Mode
              </span>
              <input
                type="checkbox"
                checked={settings.calibrationMode}
                onChange={() => updateSettings({ calibrationMode: !settings.calibrationMode })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>
      )}

      {isCommentModeActive && (
        <>
          {!draft && (
            <div
              data-annotator-ui="true"
              className="fixed inset-x-0 bottom-0 top-[44px] z-[9998] cursor-crosshair"
              onClickCapture={handleCanvasClick}
            >
              <div className="absolute inset-0 border-4 border-indigo-500/30 pointer-events-none" />
            </div>
          )}

          {annotations.map((annotation: Annotation) => (
            <Marker key={annotation._id ?? annotation.id} annotation={annotation} />
          ))}

          {draft && (
            <div
              data-annotator-ui="true"
              className="fixed z-[10000] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${draft.x}px`, top: `${draft.y}px` }}
            >
              <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg ring-4 ring-red-200 flex items-center justify-center text-white">
                <MessageSquare size={16} />
              </div>

              <div className="absolute top-6 left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="p-4">
                  <textarea
                    autoFocus
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    placeholder="Type your comment here..."
                    className="w-full h-24 text-sm text-slate-800 placeholder-slate-400 border-none focus:ring-0 resize-none outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSaveDraft();
                      }
                      if (e.key === 'Escape') {
                        handleCancelDraft();
                      }
                    }}
                  />
                </div>
                <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={handleCancelDraft}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    disabled={!draftContent.trim()}
                    className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
