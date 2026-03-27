import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Activity, Zap } from 'lucide-react';
import { ANIMATION_CATEGORIES } from './MotionPresets';

const AnimationSidebarSection = ({ selectedId, projectData, handleUpdateSection }) => {
  if (!selectedId) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-slate-400 text-sm text-center">
        <Activity size={32} className="mb-4 text-slate-300" />
        <p>Select a block on the canvas to configure animations</p>
      </div>
    );
  }

  // Find currently selected section
  let currentAnimation = { type: 'none', duration: 0.8, delay: 0 };
  let selectedSection = null;

  for (const page of projectData.pages) {
    const sec = page.sections.find(s => s.id === selectedId);
    if (sec) {
      selectedSection = sec;
      if (sec.animation) {
        currentAnimation = { ...currentAnimation, ...sec.animation };
      } else if (sec.styles?.animation) {
        currentAnimation.type = sec.styles.animation;
      }
      break;
    }
  }

  if (!selectedSection) return null;

  const updateAnimation = (key, value) => {
    const newAnimation = { ...currentAnimation, [key]: value };
    // Pass undefined for newSettings and newStyles, and pass newAnimation as 4th arg
    handleUpdateSection(selectedId, selectedSection.settings, selectedSection.styles, newAnimation);
  };

  return (
    <div className="flex-1 overflow-y-auto w-full pb-10">
      <div className="p-5 border-b border-slate-100 bg-white sticky top-0 z-10">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Zap size={14} className="text-amber-500" /> Animation Settings
        </h3>

        {/* TIME CONTROLS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Clock size={12} /> Duration (s)
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="10"
              value={currentAnimation.duration}
              onChange={(e) => updateAnimation('duration', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Clock size={12} /> Delay (s)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={currentAnimation.delay}
              onChange={(e) => updateAnimation('delay', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <button
          onClick={() => updateAnimation('type', 'none')}
          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between group ${
            currentAnimation.type === 'none'
              ? 'border-sky-500 bg-sky-50 text-sky-700'
              : 'border-transparent bg-slate-100/50 hover:bg-slate-100 text-slate-600'
          }`}
        >
          <span className="text-xs font-bold font-mono">None</span>
          {currentAnimation.type === 'none' && <div className="w-2 h-2 rounded-full bg-sky-500" />}
        </button>

        {ANIMATION_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">
              {cat.category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {cat.animations.map((anim) => {
                const isActive = currentAnimation.type === anim.id;
                return (
                  <button
                    key={anim.id}
                    onClick={() => updateAnimation('type', anim.id)}
                    className={`relative text-left px-3 py-2.5 rounded-xl border-2 transition-all flex flex-col gap-1 group overflow-hidden ${
                      isActive
                        ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-sm'
                        : 'border-transparent bg-slate-50 hover:bg-slate-100 text-slate-600 hover:shadow-sm'
                    }`}
                  >
                    <span className="text-[11px] font-bold z-10 block truncate pr-4">{anim.label}</span>
                    <span className="text-[9px] font-mono text-slate-400 z-10 opacity-70 block truncate">{anim.id}</span>
                    
                    {/* Visual Hint Icon */}
                    <div className={`absolute right-2 top-2 z-10 opacity-0 transition-opacity ${isActive ? 'opacity-100 text-sky-500' : 'group-hover:opacity-100 text-slate-300'}`}>
                      <Play size={12} className="fill-current" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimationSidebarSection;
