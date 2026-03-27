import React from 'react';
import { X, Palette, Type, Check, LayoutPanelLeft } from 'lucide-react';
import { COLOR_PALETTES, FONT_PAIRS } from './ThemeConstants';

const ThemeInspector = ({ theme, onUpdate, onClose }) => {
  const { colors, typography } = theme;

  const handleUpdate = (path, value) => {
    // path could be 'colors.primary'
    const keys = path.split('.');
    const updatedTheme = { ...theme };
    let current = updatedTheme;
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(updatedTheme);
  };

  return (
    <aside className="w-85 h-full border-l border-slate-200 bg-white flex flex-col z-30 shadow-2xl overflow-y-auto">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Palette className="text-sky-500" size={20} />
            Design System
          </h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Global Styles
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Color Palettes Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <LayoutPanelLeft size={16} className="text-slate-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Color Palettes</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.name}
                onClick={() => handleUpdate('colors', { 
                  primary: palette.primary, 
                  secondary: palette.secondary, 
                  background: palette.background, 
                  text: palette.text 
                })}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center justify-between group
                  ${colors.primary === palette.primary ? 'border-sky-500 bg-sky-50/30' : 'border-slate-100 hover:border-slate-200'}
                `}
              >
                <span className="text-xs font-bold text-slate-700">{palette.name}</span>
                <div className="flex -space-x-1.5">
                  {[palette.primary, palette.secondary, palette.background].map((color, i) => (
                    <div 
                      key={i} 
                      className="w-5 h-5 rounded-full border border-white shadow-sm" 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Global Colors Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Palette size={16} className="text-slate-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Custom Colors</h3>
          </div>
          <div className="space-y-4">
            <ColorField label="Primary Color" value={colors.primary} onChange={(v) => handleUpdate('colors.primary', v)} />
            <ColorField label="Text Color" value={colors.text} onChange={(v) => handleUpdate('colors.text', v)} />
            <ColorField label="Background" value={colors.background} onChange={(v) => handleUpdate('colors.background', v)} />
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Type size={16} className="text-slate-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Typography</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {FONT_PAIRS.map((font) => (
              <button
                key={font.name}
                onClick={() => handleUpdate('typography.fontFamily', font.main)}
                className={`p-4 rounded-xl border-2 text-left transition-all
                  ${typography.fontFamily === font.main ? 'border-sky-500 bg-sky-50/30' : 'border-slate-100 hover:border-slate-200'}
                `}
                style={{ fontFamily: font.main }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold truncate">{font.name}</span>
                  {typography.fontFamily === font.main && <Check size={14} className="text-sky-500" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Hello, World!</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          These settings apply globally to all components. Changes update in real-time across the entire canvas.
        </p>
      </div>
    </aside>
  );
};

const ColorField = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
    <span className="text-xs font-bold text-slate-500">{label}</span>
    <div className="flex items-center gap-2">
       <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{value}</span>
       <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-6 border-none bg-transparent cursor-pointer rounded overflow-hidden p-0"
       />
    </div>
  </div>
);

export default ThemeInspector;
