import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  Type, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Palette,
  Layout,
  MousePointer2,
  Sparkles,
  Trash2,
  Plus,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Layers,
  Code,
  Terminal,
  Copy,
  Check,
  Mail,
  Upload,
  Video,
  Play,
  RotateCcw,
  Maximize
} from 'lucide-react';
import { MOTION_OPTIONS } from './MotionPresets';
import { nanoid } from 'nanoid';

const Settings2 = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

// Simple debounce helper
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const InspectorField = ({ label, children }) => (
  <div className="mb-6 last:mb-0">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">
      {label}
    </label>
    {children}
  </div>
);

const InspectorInput = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
  />
);

const ImageUploadField = ({ value, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <div className="relative group aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button 
              onClick={() => onChange('')}
              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg font-bold text-xs hover:bg-rose-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      
      {!value && (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all hover:border-sky-500/50 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5 text-sky-500" />
            </div>
            <p className="text-xs text-slate-500 font-bold">Upload Local File</p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-medium">JPG, PNG, WEBP</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LinkIcon size={12} className="text-slate-400" />
        </div>
        <input
          type="text"
          value={value?.startsWith('data:') ? 'Local file uploaded' : (value || '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-[11px] font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
        />
      </div>
    </div>
  );
};

const ActionSelector = ({ action, onChange, pages = [] }) => {
  const type = action?.type || 'link';
  const payload = action?.payload || '';

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
        {[
          { id: 'link', label: 'URL', icon: LinkIcon },
          { id: 'page', label: 'Page', icon: Layout },
          { id: 'scroll', label: 'Scroll', icon: ChevronRight },
          { id: 'mailto', label: 'Mail', icon: Mail }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange({ ...action, type: opt.id })}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              type === opt.id ? 'bg-white shadow-xl text-sky-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <opt.icon size={14} />
            {opt.label}
          </button>
        ))}
      </div>

      {type === 'page' ? (
        <select
          value={payload}
          onChange={(e) => onChange({ ...action, payload: e.target.value })}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
        >
          <option value="">Select a page...</option>
          {(pages?.length ? pages : (window.__BUILDER_PAGES__ || [])).map((p) => (
            <option key={p.id} value={p.name.toLowerCase()}>
              {p.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={payload}
            onChange={(e) => onChange({ ...action, payload: e.target.value })}
            placeholder={
              type === 'link' ? 'https://example.com' :
              type === 'scroll' ? 'Enter Element ID (e.g. features)' :
              'email@example.com'
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
          />
        </div>
      )}
    </div>
  );
};

const MediaUpload = ({ value, onChange, accept = "image/*" }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result); // Data URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <InspectorInput 
          value={typeof value === 'string' && value.startsWith('data:') ? 'Local file uploaded' : (value || '')} 
          disabled={typeof value === 'string' && value.startsWith('data:')}
          onChange={onChange}
          placeholder="https://..."
        />
        <button 
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          type="button"
          className="p-2.5 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-all border border-sky-100 shrink-0"
          title="Upload Local File"
        >
          <Upload size={18} />
        </button>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept={accept} 
        onChange={handleFileChange} 
      />
    </div>
  );
};

const StylePanel = ({ styles = {}, onChange }) => {
  const s = styles;
  const set = (key, val) => onChange({ ...s, [key]: val });

  // Font Family Options
  const FONT_OPTIONS = [
    { label: 'Sans (Default)', value: "'Plus Jakarta Sans', sans-serif" },
    { label: 'Roboto', value: "'Roboto', sans-serif" },
    { label: 'Inter', value: "'Inter', sans-serif" },
    { label: 'Outfit', value: "'Outfit', sans-serif" },
    { label: 'Playfair (Serif)', value: "'Playfair Display', serif" },
    { label: 'Sora', value: "'Sora', sans-serif" },
  ];

  // Heading size presets
  const HEADING_PRESETS = [
    { label: 'XS', value: '2rem' },
    { label: 'S',  value: '3rem' },
    { label: 'M',  value: '4rem' },
    { label: 'L',  value: '5rem' },
    { label: 'XL', value: '6rem' },
    { label: '2XL',value: '8rem' },
  ];

  return (
    <div className="space-y-8">

      {/* ── Font Family ──────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Type size={10} /> Font Family
        </label>
        <select
          value={s.fontFamily || "'Plus Jakarta Sans', sans-serif"}
          onChange={(e) => set('fontFamily', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all outline-none"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>


      {/* ── Heading Size ──────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Type size={10} /> Heading Size
        </label>
        {/* Quick preset pills */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {HEADING_PRESETS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => set('headingSize', value)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-all ${
                (s.headingSize || '5rem') === value
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-100'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Fine-tune slider */}
        <div className="flex items-center gap-3">
          <input
            type="range" min={12} max={128} step={1}
            value={parseInt(s.headingSize) || 80}
            onChange={(e) => set('headingSize', `${e.target.value}px`)}
            className="flex-1 accent-sky-500"
          />
          <span className="text-xs font-black text-slate-700 w-12 text-right">
            {parseInt(s.headingSize) || 80}px
          </span>
        </div>
      </div>

      {/* ── Text Style ────────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Text Style
        </label>
        <div className="flex gap-2">
          {[
            { key: 'fontBold',      Icon: Bold,       label: 'Bold' },
            { key: 'fontItalic',    Icon: Italic,     label: 'Italic' },
            { key: 'fontUnderline', Icon: Underline,  label: 'Underline' },
          ].map(({ key, Icon, label }) => (
            <button
              key={key}
              title={label}
              onClick={() => set(key, !s[key])}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center transition-all ${
                s[key]
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>

        {/* Text Alignment */}
        <div className="flex gap-2 mt-2">
          {[
            { key: 'left',   Icon: AlignLeft },
            { key: 'center', Icon: AlignCenter },
            { key: 'right',  Icon: AlignRight },
          ].map(({ key, Icon }) => (
            <button
              key={key}
              title={`Align ${key}`}
              onClick={() => set('align', key)}
              className={`flex-1 py-2 rounded-xl flex items-center justify-center transition-all ${
                (s.align || 'left') === key
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Text Color ────────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Palette size={10} /> Text Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={s.textColor || '#000000'}
            onChange={(e) => set('textColor', e.target.value)}
            className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
          />
          <input
            type="text"
            value={s.textColor || ''}
            onChange={(e) => set('textColor', e.target.value)}
            placeholder="Inherit"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
      </div>

      {/* ── Background ────────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Palette size={10} /> Background
        </label>

        {/* Mode toggle */}
        <div className="flex gap-1.5 mb-3">
          {['Solid', 'Gradient'].map((mode) => (
            <button
              key={mode}
              onClick={() => set('bgMode', mode.toLowerCase())}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                (s.bgMode || 'solid') === mode.toLowerCase()
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {(s.bgMode || 'solid') === 'solid' ? (
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={s.backgroundColor || '#ffffff'}
              onChange={(e) => set('backgroundColor', e.target.value)}
              className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
            />
            <input
              type="text"
              value={s.backgroundColor || '#ffffff'}
              onChange={(e) => set('backgroundColor', e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold w-8">From</span>
              <input type="color"
                value={s.gradientFrom || '#6366f1'}
                onChange={(e) => set('gradientFrom', e.target.value)}
                className="w-10 h-9 rounded-lg border-0 overflow-hidden cursor-pointer"
              />
              <input type="text"
                value={s.gradientFrom || '#6366f1'}
                onChange={(e) => set('gradientFrom', e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold w-8">To</span>
              <input type="color"
                value={s.gradientTo || '#ec4899'}
                onChange={(e) => set('gradientTo', e.target.value)}
                className="w-10 h-9 rounded-lg border-0 overflow-hidden cursor-pointer"
              />
              <input type="text"
                value={s.gradientTo || '#ec4899'}
                onChange={(e) => set('gradientTo', e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            {/* Live gradient preview */}
            <div
              className="w-full h-8 rounded-xl mt-1"
              style={{ background: `linear-gradient(to right, ${s.gradientFrom || '#6366f1'}, ${s.gradientTo || '#ec4899'})` }}
            />
          </div>
        )}
      </div>

      {/* ── Padding ───────────────────────────────────────── */}
      <div>
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Padding (px)</label>
        {/* Visual padding diagram */}
        <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-4">
          {/* Top */}
          <div className="flex justify-center mb-1">
            <input
              type="number"
              value={parseInt(s.paddingTop) || 80}
              onChange={(e) => set('paddingTop', `${e.target.value}px`)}
              className="w-16 text-center bg-white border border-slate-300 rounded-lg py-1 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          {/* Middle row */}
          <div className="flex items-center gap-2 justify-between">
            <input
              type="number"
              value={parseInt(s.paddingLeft) || 32}
              onChange={(e) => set('paddingLeft', `${e.target.value}px`)}
              className="w-16 text-center bg-white border border-slate-300 rounded-lg py-1 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <div className="flex-1 h-12 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Content</span>
            </div>
            <input
              type="number"
              value={parseInt(s.paddingRight) || 32}
              onChange={(e) => set('paddingRight', `${e.target.value}px`)}
              className="w-16 text-center bg-white border border-slate-300 rounded-lg py-1 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          {/* Bottom */}
          <div className="flex justify-center mt-1">
            <input
              type="number"
              value={parseInt(s.paddingBottom) || 80}
              onChange={(e) => set('paddingBottom', `${e.target.value}px`)}
              className="w-16 text-center bg-white border border-slate-300 rounded-lg py-1 text-xs font-black text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] text-slate-400 font-bold">LEFT</span>
            <span className="text-[9px] text-slate-400 font-bold">TOP / BOTTOM</span>
            <span className="text-[9px] text-slate-400 font-bold">RIGHT</span>
          </div>
        </div>
      </div>

    </div>
  );
};

// ─── Generic Sub-Items Editor ─────────────────────────────────────────────────────────
// Reusable list editor. Works on any array of objects that share a stable `id`.
// Props:
//   items       – the current array from localState.settings[arrayKey]
//   fields      – [{ key, label, placeholder, type? }] describing which props to render
//   addLabel    – label on the "+ Add" button
//   defaultItem – plain object (WITHOUT id) used as template for new items
//   onAdd       – () => void
//   onDelete    – (id) => void
//   onUpdate    – (id, propKey, value) => void
const SubItemsEditor = ({ items = [], fields = [], addLabel = 'Add Item', defaultItem = {}, onAdd, onDelete, onUpdate }) => {
  // Ensure every existing item has an id (migration safety for old data)
  const safeItems = items.map((item, idx) =>
    item.id ? item : { ...item, id: `legacy-${idx}` }
  );

  return (
    <div className="space-y-3">
      {safeItems.map((item) => (
        <div
          key={item.id}
          className="relative p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2.5 group/item"
        >
          {/* Delete button */}
          <button
            onClick={() => onDelete(item.id)}
            className="absolute top-3 right-3 p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-all"
            title="Remove"
          >
            <Trash2 size={13} />
          </button>

          {/* Field inputs */}
          {fields.map(({ key, label, placeholder, type = 'text', options, dependsOn }) => {
            // Conditional rendering logic
            if (dependsOn && item[dependsOn.field] !== dependsOn.value) return null;

            return (
              <div key={key}>
                {label && (
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {label}
                  </label>
                )}
                {type === 'select' && options ? (
                  <select
                    value={item[key] || ''}
                    onChange={(e) => onUpdate(item.id, key, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-shadow appearance-none cursor-pointer"
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : type === 'checkbox' ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!item[key]}
                      onChange={(e) => onUpdate(item.id, key, e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500/20"
                    />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{placeholder}</span>
                  </label>
                ) : type === 'color' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={item[key] || '#000000'}
                      onChange={(e) => onUpdate(item.id, key, e.target.value)}
                      className="w-8 h-8 rounded-lg border-0 overflow-hidden cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={item[key] || ''}
                      onChange={(e) => onUpdate(item.id, key, e.target.value)}
                      placeholder="Inherit"
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-mono font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
                    />
                  </div>
                ) : type === 'action' ? (
                  <ActionSelector 
                    action={item[key]} 
                    onChange={(val) => onUpdate(item.id, key, val)}
                    pages={window.__BUILDER_PAGES__ || []}
                  />
                ) : (
                  <input
                    type={type}
                    value={item[key] ?? ''}
                    onChange={(e) => onUpdate(item.id, key, type === 'number' ? Number(e.target.value) : e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-300 transition-all focus:border-sky-300 shadow-sm"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Add button */}
      <button
        onClick={onAdd}
        className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:border-sky-400 hover:text-sky-500 hover:bg-sky-50 transition-all flex items-center justify-center gap-1.5"
      >
        <Plus size={13} /> {addLabel}
      </button>
    </div>
  );
};

const generateSnippet = (type, settings, styles, format = 'jsx') => {
  if (format === 'html') {
    let content = '';
    const bg = styles.backgroundColor || '#ffffff';
    const color = styles.textColor || '#0f172a';
    const pt = styles.paddingTop || '80px';
    const pb = styles.paddingBottom || '80px';

    if (type === 'Hero') {
      const items = settings.items || [
        { type: 'heading', text: settings.headline || 'Your Headline' },
        { type: 'subheading', text: settings.subheadline || 'Subheadline here' },
        { type: 'button', text: settings.ctaText || 'Get Started' }
      ];
      
      content = `
  <section class="relative overflow-hidden" style="background: ${bg}; padding: ${pt} 2rem ${pb} 2rem; color: ${color};">
    <div class="max-w-6xl mx-auto ${styles.align === 'center' ? 'text-center' : 'grid md:grid-cols-2 gap-12 items-center'}">
      <div class="${styles.align === 'center' ? 'mx-auto max-w-3xl' : ''}">
        ${items.map(item => {
          if (item.type === 'heading') return `<h1 class="text-5xl font-black mb-6 leading-tight" style="color: ${item.color || 'inherit'};">${item.text}</h1>`;
          if (item.type === 'subheading') return `<p class="text-xl opacity-80 mb-10 leading-relaxed" style="color: ${item.color || 'inherit'};">${item.text}</p>`;
          if (item.type === 'button') return `<a href="#" class="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl hover:bg-blue-700 transition-all" style="background-color: ${item.color || 'var(--builder-primary)'}">${item.text}</a>`;
          return '';
        }).join('\n        ')}
      </div>
      ${settings.image && styles.align !== 'center' ? `      <div class="relative"><img src="${settings.image}" class="rounded-[2rem] shadow-2xl" /></div>` : ''}
    </div>
  </section>`;
    } else if (type === 'Navbar') {
      const links = settings.links || [];
      content = `
  <nav class="sticky top-0 z-50 px-8 py-4 flex items-center justify-between border-b" style="background: ${bg}; color: ${color}; border-color: rgba(0,0,0,0.05);">
    <div class="text-2xl font-black tracking-tighter">${settings.logoText || 'CREATOR'}</div>
    <div class="hidden md:flex items-center gap-8">
      ${links.map(link => `
      <a href="${link.href || '#'}" class="${link.isButton ? 'px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm' : 'font-bold text-sm opacity-60 hover:opacity-100'}">${link.label}</a>`).join('')}
    </div>
  </nav>`;
    } else if (type === 'Features') {
      const items = settings.items || [];
      content = `
  <section class="py-24 px-8" style="background: ${bg}; color: ${color};">
    <div class="max-w-6xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-20">
        <h2 class="text-4xl font-black mb-6 leading-tight">${settings.title || 'Features'}</h2>
        <p class="text-lg opacity-60">${settings.subtitle || ''}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        ${items.map(it => `
        <div class="p-8 rounded-3xl border border-slate-100 shadow-sm" style="border-color: rgba(0,0,0,0.05);">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6" style="background-color: ${it.color || 'rgba(59,130,246,0.1)'}">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">${it.title}</h3>
          <p class="opacity-60 leading-relaxed">${it.description}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    } else if (type === 'Pricing') {
      const plans = settings.plans || [];
      content = `
  <section class="py-24 px-8" style="background: ${bg}; color: ${color};">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-4xl font-black mb-16">${settings.title || 'Simple Pricing'}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        ${plans.map(p => `
        <div class="p-8 rounded-[2.5rem] border-2 bg-white shadow-xl" style="border-color: ${p.color || '#f1f5f9'};">
          <h3 class="text-xl font-bold mb-2">${p.name}</h3>
          <div class="text-4xl font-black mb-8">${p.price}</div>
          <button class="w-full py-4 rounded-2xl font-bold text-white mb-8" style="background-color: ${p.color || '#3b82f6'};">Select Plan</button>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    } else {
      content = `  <section class="p-20 text-center" style="background: ${bg}; color: ${color};">
    <h2 class="text-3xl font-bold mb-4">${settings.title || type}</h2>
    <p class="opacity-60">HTML Preview for ${type} block is coming soon. Use JSX for full details.</p>
  </section>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Component</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
      body { font-family: 'Plus Jakarta Sans', sans-serif; }
      :root { --builder-primary: #3b82f6; }
    </style>
</head>
<body>
${content}
</body>
</html>`;
  }

  // JSX Format (Original)
  const settingsProps = Object.entries(settings)
    .filter(([key, val]) => val && typeof val !== 'object')
    .map(([key, val]) => `${key}="${val}"`)
    .join('\n  ');

  const styleProps = Object.entries(styles)
    .filter(([key, val]) => val !== undefined && val !== '')
    .map(([key, val]) => `  ${key}: "${val}"`)
    .join(',\n');

  return `<${type}\n  ${settingsProps}\n  style={{\n${styleProps}\n  }}\n/>`;
};

const InspectorSidebar = ({ selectedSection, onUpdate, onSubItemUpdate, onSubItemDelete, onSubItemAdd, onClose, pages = [], width = 340 }) => {
  // Expose pages to global for components like ActionSelector to pick up without deep drilling
  if (typeof window !== 'undefined') {
    window.__BUILDER_PAGES__ = pages;
  }
  
  if (!selectedSection) return null;

  const [activeTab, setActiveTab] = useState('content');
  const [codeFormat, setCodeFormat] = useState('jsx');

  // Unified local state for both settings and styles
  const [localState, setLocalState] = useState({
    settings: selectedSection.settings,
    styles: selectedSection.styles
  });

  // Sync with selected section when it changes (new ID or external update)
  useEffect(() => {
    setLocalState({
      settings: selectedSection.settings,
      styles: selectedSection.styles
    });
    setActiveTab('content'); // reset tab on section change
  }, [selectedSection.id]);

  // Debounced update to the parent state
  const debouncedState = useDebounce(localState, 400);

  useEffect(() => {
    // Only update if there's an actual change to prevent cycles
    if (
      debouncedState.settings !== selectedSection.settings || 
      debouncedState.styles !== selectedSection.styles
    ) {
      onUpdate(selectedSection.id, debouncedState.settings, debouncedState.styles);
    }
  }, [debouncedState, selectedSection.id, onUpdate]);

  const handleSettingChange = (key, value) => {
    setLocalState(prev => ({ 
      ...prev, 
      settings: { ...prev.settings, [key]: value } 
    }));
  };

  const handleStyleChange = (key, value) => {
    const newStyles = { ...localState.styles, [key]: value };
    setLocalState(prev => ({ ...prev, styles: newStyles }));
    // Immediate save for styles (like animations) to provide instant feedback
    onUpdate(selectedSection.id, localState.settings, newStyles);
  };

  const renderSectionSpecificFields = () => {
    switch (selectedSection.type) {
      case 'Hero':
        return (
          <>
            <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Layers size={14} className="text-sky-500" /> Content Blocks
                </label>
              </div>
              
              <SubItemsEditor
                items={localState.settings.items || [
                  { id: 'h-1', type: 'heading', text: localState.settings.headline || 'Your Headline' },
                  { id: 's-1', type: 'subheading', text: localState.settings.subheadline || 'Your subheadline text goes here.' },
                  { id: 'b-1', type: 'button', text: localState.settings.ctaText || 'Get Started', style: 'primary', href: '#' }
                ]}
                fields={[
                  { key: 'type', label: 'Item Type', type: 'select', options: [
                    { value: 'heading', label: 'Heading' },
                    { value: 'subheading', label: 'Subheading' },
                    { value: 'button', label: 'Button' },
                  ]},
                  { key: 'text', label: 'Text Content', placeholder: 'Enter text here...' },
                  { key: 'color', label: 'Text Color', type: 'color' },
                  { 
                    key: 'style', label: 'Button Style', type: 'select', 
                    options: [
                      { value: 'primary', label: 'Primary' },
                      { value: 'outline', label: 'Outline' },
                      { value: 'ghost', label: 'Ghost' },
                    ],
                    dependsOn: { field: 'type', value: 'button' }
                  },
                  { 
                    key: 'action', label: 'Button Action', type: 'action', 
                    dependsOn: { field: 'type', value: 'button' } 
                  },
                ]}
                addLabel="Add Block"
                defaultItem={{ type: 'heading', text: 'New Content' }}
                onAdd={() => {
                  const items = localState.settings.items || [
                    { id: 'h-1', type: 'heading', text: localState.settings.headline || 'Your Headline' },
                    { id: 's-1', type: 'subheading', text: localState.settings.subheadline || 'Your subheadline text goes here.' },
                    { id: 'b-1', type: 'button', text: localState.settings.ctaText || 'Get Started', style: 'primary', href: '#' }
                  ];
                  handleSettingChange('items', [...items, { id: nanoid(), type: 'heading', text: 'New Heading' }]);
                }}
                onDelete={(id) => {
                  const items = localState.settings.items || [
                    { id: 'h-1', type: 'heading', text: localState.settings.headline || 'Your Headline' },
                    { id: 's-1', type: 'subheading', text: localState.settings.subheadline || 'Your subheadline text goes here.' },
                    { id: 'b-1', type: 'button', text: localState.settings.ctaText || 'Get Started', style: 'primary', href: '#' }
                  ];
                  handleSettingChange('items', items.filter(it => it.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const items = localState.settings.items || [
                    { id: 'h-1', type: 'heading', text: localState.settings.headline || 'Your Headline' },
                    { id: 's-1', type: 'subheading', text: localState.settings.subheadline || 'Your subheadline text goes here.' },
                    { id: 'b-1', type: 'button', text: localState.settings.ctaText || 'Get Started', style: 'primary', href: '#' }
                  ];
                  handleSettingChange('items', items.map(it => it.id === id ? { ...it, [key]: value } : it));
                }}
              />
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <InspectorField label="Hero Image">
                <ImageUploadField 
                  value={localState.settings.image} 
                  onChange={(val) => handleSettingChange('image', val)}
                />
              </InspectorField>
            </div>
          </>
        );
      
      case 'Navbar':
        return (
          <div className="space-y-6">
            <InspectorField label="Logo Text">
              <InspectorInput 
                value={localState.settings.logoText} 
                onChange={(val) => handleSettingChange('logoText', val)}
                placeholder="Brand Name"
              />
            </InspectorField>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Nav Links</label>
              <SubItemsEditor
                items={(localState.settings.links || []).map((l, i) => l.id ? l : { ...l, id: `link-${i}` })}
                fields={[
                  { key: 'label',    label: 'Label',      placeholder: 'Home' },
                  { 
                    key: 'action',   label: 'Action',     type: 'action'
                  },
                  { key: 'color',    label: 'Link/Button Color', type: 'color' },
                  { key: 'isButton', label: 'As Button',  type: 'checkbox', placeholder: 'Display as Button' },
                ]}
                addLabel="Add Link"
                defaultItem={{ label: 'New Link', href: '#', type: 'url', isButton: false }}
                onAdd={() => {
                  const items = (localState.settings.links || []).map((l, i) => l.id ? l : { ...l, id: `link-${i}` });
                  handleSettingChange('links', [...items, { id: nanoid(), label: 'New Link', href: '#', type: 'url', isButton: false }]);
                }}
                onDelete={(id) => {
                  const items = (localState.settings.links || []).map((l, i) => l.id ? l : { ...l, id: `link-${i}` });
                  handleSettingChange('links', items.filter(l => l.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const items = (localState.settings.links || []).map((l, i) => l.id ? l : { ...l, id: `link-${i}` });
                  handleSettingChange('links', items.map(l => l.id === id ? { ...l, [key]: value } : l));
                }}
              />
            </div>
          </div>
        );

      case 'Features':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="Section Title"
              />
            </InspectorField>
            <InspectorField label="Subtitle">
              <textarea
                value={localState.settings.subtitle}
                onChange={(e) => handleSettingChange('subtitle', e.target.value)}
                placeholder="Section Subtitle..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px] resize-none"
              />
            </InspectorField>
            <InspectorField label="Layout Style">
              <select
                value={localState.settings.layout || 'grid'}
                onChange={(e) => handleSettingChange('layout', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer"
              >
                <option value="grid">Standard Grid</option>
                <option value="bento">Bento Layout</option>
              </select>
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Feature Items</label>
              <SubItemsEditor
                items={(localState.settings.items || []).map((it, i) => it.id ? it : { ...it, id: `fi-${i}` })}
                fields={[
                  { key: 'title',       label: 'Title',       placeholder: 'Feature name' },
                  { key: 'description', label: 'Description', placeholder: 'What does it do?' },
                  { key: 'color',       label: 'Custom Color', type: 'color' },
                  { 
                    key: 'span', label: 'Column Span', type: 'select', 
                    options: [
                      { value: '1', label: '1 Column' },
                      { value: '2', label: '2 Columns' },
                      { value: '3', label: '3 Columns' },
                    ],
                    dependsOn: { field: 'placeholder_never', value: 'hidden' } // Not really hidden, but I'll add logic to SubItemsEditor if needed, or just let it show
                  },
                  { key: 'action',      label: 'Click Action', type: 'action' },
                ]}
                addLabel="Add Feature"
                defaultItem={{ title: 'New Feature', description: 'Describe this feature.' }}
                onAdd={() => {
                  const cur = (localState.settings.items || []).map((it, i) => it.id ? it : { ...it, id: `fi-${i}` });
                  handleSettingChange('items', [...cur, { id: nanoid(), title: 'New Feature', description: '' }]);
                }}
                onDelete={(id) => {
                  const cur = (localState.settings.items || []).map((it, i) => it.id ? it : { ...it, id: `fi-${i}` });
                  handleSettingChange('items', cur.filter(it => it.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const cur = (localState.settings.items || []).map((it, i) => it.id ? it : { ...it, id: `fi-${i}` });
                  handleSettingChange('items', cur.map(it => it.id === id ? { ...it, [key]: value } : it));
                }}
              />
            </div>
          </div>
        );

      case 'Timeline':
        return (
          <div className="space-y-6">
            <InspectorField label="Timeline Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="My Journey"
              />
            </InspectorField>
            <InspectorField label="Subtitle">
              <textarea
                value={localState.settings.subtitle}
                onChange={(e) => handleSettingChange('subtitle', e.target.value)}
                placeholder="A brief intro to your path..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px] resize-none"
              />
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Milestones</label>
              <SubItemsEditor
                items={(localState.settings.milestones || []).map((m, i) => m.id ? m : { ...m, id: `milestone-${i}` })}
                fields={[
                  { key: 'title',       label: 'Job Title / Milestone', placeholder: 'e.g. Senior Designer' },
                  { key: 'date',        label: 'Date Range',           placeholder: 'e.g. 2022 - Present' },
                  { key: 'description', label: 'Description',          placeholder: 'What did you achieve?', type: 'textarea' },
                ]}
                addLabel="Add Milestone"
                defaultItem={{ title: 'New Role', date: 'Date Range', description: 'Describe your impact.' }}
                onAdd={() => {
                  const items = (localState.settings.milestones || []).map((m, i) => m.id ? m : { ...m, id: `milestone-${i}` });
                  handleSettingChange('milestones', [...items, { id: nanoid(), title: 'New Role', date: '2024', description: '' }]);
                }}
                onDelete={(id) => {
                  const items = (localState.settings.milestones || []).map((m, i) => m.id ? m : { ...m, id: `milestone-${i}` });
                  handleSettingChange('milestones', items.filter(it => it.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const items = (localState.settings.milestones || []).map((m, i) => m.id ? m : { ...m, id: `milestone-${i}` });
                  handleSettingChange('milestones', items.map(it => it.id === id ? { ...it, [key]: value } : it));
                }}
              />
            </div>
          </div>
        );

      case 'FAQ':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="Section Title"
              />
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Questions</label>
              <SubItemsEditor
                items={(localState.settings.faqs || []).map((f, i) => f.id ? f : { ...f, id: `fq-${i}` })}
                fields={[
                  { key: 'question', label: 'Question', placeholder: 'What do users ask?' },
                  { key: 'answer',   label: 'Answer',   placeholder: 'Your answer here...' },
                  { key: 'color',    label: 'Custom Color', type: 'color' },
                ]}
                addLabel="Add Question"
                defaultItem={{ question: 'New Question', answer: '' }}
                onAdd={() => {
                  const cur = (localState.settings.faqs || []).map((f, i) => f.id ? f : { ...f, id: `fq-${i}` });
                  handleSettingChange('faqs', [...cur, { id: nanoid(), question: 'New Question', answer: '' }]);
                }}
                onDelete={(id) => {
                  const cur = (localState.settings.faqs || []).map((f, i) => f.id ? f : { ...f, id: `fq-${i}` });
                  handleSettingChange('faqs', cur.filter(f => f.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const cur = (localState.settings.faqs || []).map((f, i) => f.id ? f : { ...f, id: `fq-${i}` });
                  handleSettingChange('faqs', cur.map(f => f.id === id ? { ...f, [key]: value } : f));
                }}
              />
            </div>
          </div>
        );

      case 'Testimonials':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="Section Title"
              />
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Testimonials</label>
              <SubItemsEditor
                items={(localState.settings.testimonials || []).map((t, i) => t.id ? t : { ...t, id: `tm-${i}` })}
                fields={[
                  { key: 'content', label: 'Quote',  placeholder: 'What they said...' },
                  { key: 'author',  label: 'Author', placeholder: 'Jane Doe' },
                  { key: 'role',    label: 'Role',   placeholder: 'CEO at Acme' },
                  { key: 'color',   label: 'Custom Color', type: 'color' },
                  { key: 'avatar',  label: 'Avatar URL', placeholder: 'https://...' },
                ]}
                addLabel="Add Testimonial"
                defaultItem={{ content: '', author: 'New Person', role: 'Title', avatar: '' }}
                onAdd={() => {
                  const cur = (localState.settings.testimonials || []).map((t, i) => t.id ? t : { ...t, id: `tm-${i}` });
                  handleSettingChange('testimonials', [...cur, { id: nanoid(), content: '', author: 'New Person', role: '', avatar: '' }]);
                }}
                onDelete={(id) => {
                  const cur = (localState.settings.testimonials || []).map((t, i) => t.id ? t : { ...t, id: `tm-${i}` });
                  handleSettingChange('testimonials', cur.filter(t => t.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const cur = (localState.settings.testimonials || []).map((t, i) => t.id ? t : { ...t, id: `tm-${i}` });
                  handleSettingChange('testimonials', cur.map(t => t.id === id ? { ...t, [key]: value } : t));
                }}
              />
            </div>
          </div>
        );

      case 'Chips':
        return (
          <div className="space-y-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Chips Editor</label>
            {localState.settings.chips?.map((chip, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <InspectorInput 
                  value={chip.label}
                  onChange={(val) => {
                    const newChips = [...localState.settings.chips];
                    newChips[idx] = { ...chip, label: val };
                    handleSettingChange('chips', newChips);
                  }}
                  placeholder="Chip Label"
                />
                <button 
                  onClick={() => {
                    const newChips = [...localState.settings.chips];
                    newChips[idx] = { ...chip, isActive: !chip.isActive };
                    handleSettingChange('chips', newChips);
                  }}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${chip.isActive ? 'bg-sky-500 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
                >
                  Active
                </button>
              </div>
            ))}
          </div>
        );

      case 'Pricing':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="e.g. Simple Pricing"
              />
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Plans</label>
              <SubItemsEditor
                items={(localState.settings.plans || []).map((p, i) => p.id ? p : { ...p, id: `plan-${i}` })}
                fields={[
                  { key: 'name',  label: 'Plan Name', placeholder: 'Pro' },
                  { key: 'price', label: 'Price',     placeholder: '$29' },
                  { key: 'color', label: 'Card Theme', type: 'color' },
                  { key: 'action', label: 'Button Action', type: 'action' },
                ]}
                addLabel="Add Plan"
                defaultItem={{ name: 'New Plan', price: '$0', features: [] }}
                onAdd={() => {
                  const cur = (localState.settings.plans || []).map((p, i) => p.id ? p : { ...p, id: `plan-${i}` });
                  handleSettingChange('plans', [...cur, { id: nanoid(), name: 'New Plan', price: '$0', features: [] }]);
                }}
                onDelete={(id) => {
                  const cur = (localState.settings.plans || []).map((p, i) => p.id ? p : { ...p, id: `plan-${i}` });
                  handleSettingChange('plans', cur.filter(p => p.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const cur = (localState.settings.plans || []).map((p, i) => p.id ? p : { ...p, id: `plan-${i}` });
                  handleSettingChange('plans', cur.map(p => p.id === id ? { ...p, [key]: value } : p));
                }}
              />
            </div>
          </div>
        );

      case 'Icon':
        return (
          <div className="space-y-6">
            <InspectorField label="Icon Name">
              <InspectorInput 
                value={localState.settings.iconName} 
                onChange={(val) => handleSettingChange('iconName', val)}
                placeholder="e.g. Star, Heart, ArrowRight"
              />
            </InspectorField>

            <div className="grid grid-cols-2 gap-4">
              <InspectorField label="Size (px)">
                <InspectorInput 
                  type="number"
                  value={localState.styles.size || 48}
                  onChange={(val) => handleStyleChange('size', parseInt(val))}
                />
              </InspectorField>
              <InspectorField label="Rotate (deg)">
                <InspectorInput 
                  type="number"
                  value={localState.styles.rotate || 0}
                  onChange={(val) => handleStyleChange('rotate', parseInt(val))}
                />
              </InspectorField>
            </div>

            <InspectorField label="Icon Color">
              <div className="flex items-center gap-3">
                <input 
                  type="color"
                  value={localState.styles.color || '#3b82f6'}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  className="w-10 h-10 rounded-xl border-0 overflow-hidden cursor-pointer"
                />
                <InspectorInput 
                  value={localState.styles.color || '#3b82f6'}
                  onChange={(val) => handleStyleChange('color', val)}
                />
              </div>
            </InspectorField>

            {/* ── Click Action ──────────────────────────────────────── */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                <MousePointer2 size={10} /> Click Action
              </label>

              <ActionSelector
                action={localState.settings.action || { type: 'link', payload: '' }}
                onChange={(val) => handleSettingChange('action', val)}
                pages={pages || window.__BUILDER_PAGES__ || []}
              />
              <p className="text-[10px] text-slate-400 mt-1.5 px-1">
                Configures what happens when this element is clicked in Preview.
              </p>
            </div>

            {/* ── Advanced Positioning ─────────────────────────────── */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">Advanced Positioning</label>
              <div className="grid grid-cols-2 gap-4">
                <InspectorField label="Left">
                  <InspectorInput 
                    value={localState.styles.left} 
                    onChange={(val) => handleStyleChange('left', val)}
                  />
                </InspectorField>
                <InspectorField label="Top">
                  <InspectorInput 
                    value={localState.styles.top} 
                    onChange={(val) => handleStyleChange('top', val)}
                  />
                </InspectorField>
              </div>
              <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                 <span className="text-xs font-bold text-slate-600">Drop Shadow</span>
                 <button 
                  onClick={() => handleStyleChange('shadow', !localState.styles.shadow)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${localState.styles.shadow ? 'bg-sky-500' : 'bg-slate-300'}`}
                 >
                   <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${localState.styles.shadow ? 'left-6' : 'left-1'}`} />
                 </button>
              </div>
            </div>
          </div>
        );

      case 'Stats':
        return (
          <div className="space-y-6">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Performance Stats</label>
            <SubItemsEditor
              items={(localState.settings.stats || []).map((s, i) => s.id ? s : { ...s, id: `stat-${i}` })}
              fields={[
                { key: 'value', label: 'Value', placeholder: 'e.g. 10+' },
                { key: 'label', label: 'Label', placeholder: 'e.g. Experience' },
              ]}
              addLabel="Add Stat"
              defaultItem={{ value: '0', label: 'New Stat' }}
              onAdd={() => {
                const items = (localState.settings.stats || []).map((s, i) => s.id ? s : { ...s, id: `stat-${i}` });
                handleSettingChange('stats', [...items, { id: nanoid(), value: '0', label: 'New Stat' }]);
              }}
              onDelete={(id) => {
                const items = (localState.settings.stats || []).map((s, i) => s.id ? s : { ...s, id: `stat-${i}` });
                handleSettingChange('stats', items.filter(it => it.id !== id));
              }}
              onUpdate={(id, key, value) => {
                const items = (localState.settings.stats || []).map((s, i) => s.id ? s : { ...s, id: `stat-${i}` });
                handleSettingChange('stats', items.map(it => it.id === id ? { ...it, [key]: value } : it));
              }}
            />

            <div className="pt-6 border-t border-slate-100">
               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                 <Palette size={10} /> Accent Color
               </label>
               <div className="flex items-center gap-3">
                 <input
                   type="color"
                   value={localState.styles.accentColor || '#3b82f6'}
                   onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                   className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
                 />
                 <input
                   type="text"
                   value={localState.styles.accentColor || ''}
                   onChange={(e) => handleStyleChange('accentColor', e.target.value)}
                   placeholder="Primary"
                   className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                 />
               </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
               <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                 <Palette size={10} /> Label Color
               </label>
               <div className="flex items-center gap-3">
                 <input
                   type="color"
                   value={localState.styles.labelColor || '#64748b'}
                   onChange={(e) => handleStyleChange('labelColor', e.target.value)}
                   className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
                 />
                 <input
                   type="text"
                   value={localState.styles.labelColor || ''}
                   onChange={(e) => handleStyleChange('labelColor', e.target.value)}
                   placeholder="Default"
                   className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                 />
               </div>
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput 
                value={localState.settings.title} 
                onChange={(val) => handleSettingChange('title', val)}
                placeholder="Let's build something"
              />
            </InspectorField>
            <InspectorField label="Subtitle">
              <textarea
                value={localState.settings.subtitle}
                onChange={(e) => handleSettingChange('subtitle', e.target.value)}
                placeholder="Section Subtitle..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[80px] resize-none"
              />
            </InspectorField>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Contact Info</label>
              <SubItemsEditor
                items={(localState.settings.info || []).map((inf, i) => inf.id ? inf : { ...inf, id: `inf-${i}` })}
                fields={[
                  { key: 'label', placeholder: 'Email / Phone', label: 'Label' },
                  { key: 'value', placeholder: 'hello@alex.dev', label: 'Value' },
                  { key: 'icon',  placeholder: 'Mail / MapPin', label: 'Icon (Lucide Name)' },
                ]}
                addLabel="Add Info"
                defaultItem={{ label: 'Email', value: '', icon: 'Mail' }}
                onAdd={() => {
                  const items = (localState.settings.info || []).map((inf, i) => inf.id ? inf : { ...inf, id: `inf-${i}` });
                  handleSettingChange('info', [...items, { id: nanoid(), label: 'Label', value: '', icon: 'Mail' }]);
                }}
                onDelete={(id) => {
                  const items = (localState.settings.info || []).map((inf, i) => inf.id ? inf : { ...inf, id: `inf-${i}` });
                  handleSettingChange('info', items.filter(it => it.id !== id));
                }}
                onUpdate={(id, key, value) => {
                  const items = (localState.settings.info || []).map((inf, i) => inf.id ? inf : { ...inf, id: `inf-${i}` });
                  handleSettingChange('info', items.map(it => it.id === id ? { ...it, [key]: value } : it));
                }}
              />
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-6">
               <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                    <Palette size={10} /> Label Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localState.styles.labelColor || '#64748b'}
                      onChange={(e) => handleStyleChange('labelColor', e.target.value)}
                      className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={localState.styles.labelColor || ''}
                      onChange={(val) => handleStyleChange('labelColor', val)}
                      placeholder="Default"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
               </div>

               <InspectorField label="Button Text">
                  <InspectorInput 
                    value={localState.settings.buttonText} 
                    onChange={(val) => handleSettingChange('buttonText', val)}
                    placeholder="Send Message"
                  />
               </InspectorField>

               <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                    <Palette size={10} /> Button Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={localState.settings.buttonColor || '#3b82f6'}
                      onChange={(e) => handleSettingChange('buttonColor', e.target.value)}
                      className="w-12 h-10 rounded-xl border-0 overflow-hidden cursor-pointer flex-shrink-0"
                    />
                    <input
                      type="text"
                      value={localState.settings.buttonColor || ''}
                      onChange={(val) => handleSettingChange('buttonColor', val)}
                      placeholder="Primary"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                    <MousePointer2 size={10} /> Button Action
                  </label>
                  <ActionSelector 
                    action={localState.settings.action}
                    onChange={(val) => handleSettingChange('action', val)}
                    pages={pages}
                  />
               </div>
            </div>
          </div>
        );

      case 'Image':
      case 'Video': {
        // ── Unified Media Inspector Panel ────────────────────────
        const mediaType = selectedSection.type === 'Video' ? 'video' : 'image';
        const url = localState.settings.url || '';
        const isLocalFile = url.startsWith('data:');

        // Simple URL validity check
        const isValidUrl = !url || isLocalFile || (() => {
          try { new URL(url); return true; } catch { return false; }
        })();

        return (
          <div className="space-y-6">

            {/* ── Media Type Toggle ─────────────────────────────── */}
            <InspectorField label="Media Type">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                {[
                  { value: 'Image', label: 'Image', Icon: ImageIcon },
                  { value: 'Video', label: 'Video', Icon: Video },
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      // Switch the block's section TYPE via a settings flag
                      // We keep type in settings.mediaType so we don't break existing schema
                      handleSettingChange('mediaType', value.toLowerCase());
                      // Also update width default based on type
                      if (value === 'Video' && !localState.styles.width) {
                        handleStyleChange('width', '600px');
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      (localState.settings.mediaType || mediaType) === value.toLowerCase()
                        ? 'bg-white shadow-md text-sky-600'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 px-1">
                Switch between image and video media types.
              </p>
            </InspectorField>

            {/* ── URL Input ─────────────────────────────────────── */}
            <InspectorField label="Media URL">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <LinkIcon size={12} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={isLocalFile ? 'Local file uploaded ✓' : url}
                      readOnly={isLocalFile}
                      onChange={(e) => handleSettingChange('url', e.target.value)}
                      placeholder={(localState.settings.mediaType || mediaType) === 'video'
                        ? 'https://example.com/video.mp4'
                        : 'https://example.com/image.jpg'}
                      className={`w-full bg-slate-50 border rounded-xl pl-8 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all ${
                        !isValidUrl && url
                          ? 'border-rose-300 bg-rose-50 text-rose-700'
                          : 'border-slate-200 text-slate-900'
                      } ${isLocalFile ? 'text-emerald-600 font-bold' : ''}`}
                    />
                  </div>
                  {/* Upload button */}
                  <label
                    className="p-2.5 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-all border border-sky-100 shrink-0 cursor-pointer"
                    title="Upload Local File"
                  >
                    <Upload size={18} />
                    <input
                      type="file"
                      className="hidden"
                      accept={(localState.settings.mediaType || mediaType) === 'video' ? 'video/*' : 'image/*'}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => handleSettingChange('url', ev.target.result);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                  {/* Clear button */}
                  {url && (
                    <button
                      onClick={() => handleSettingChange('url', '')}
                      className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-100 transition-all border border-rose-100 shrink-0"
                      title="Clear"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Validation message */}
                {!isValidUrl && url && (
                  <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1 px-1">
                    <span>⚠</span> Invalid URL format
                  </p>
                )}
              </div>
            </InspectorField>

            {/* ── Live Preview ──────────────────────────────────── */}
            {url && isValidUrl && (
              <InspectorField label="Preview">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                  {(localState.settings.mediaType || mediaType) === 'video' ? (
                    <video
                      key={url}
                      src={url}
                      controls
                      muted
                      className="w-full max-h-48 object-contain"
                      style={{ borderRadius: '1rem' }}
                    />
                  ) : (
                    <img
                      src={url}
                      alt="Preview"
                      className="w-full max-h-48 object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
              </InspectorField>
            )}

            {/* ── Dimensions ────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
              <InspectorField label="Width">
                <InspectorInput
                  value={localState.styles.width || ((localState.settings.mediaType || mediaType) === 'video' ? '600px' : '400px')}
                  onChange={(val) => handleStyleChange('width', val)}
                  placeholder="e.g. 400px"
                />
              </InspectorField>
              <InspectorField label="Height">
                <InspectorInput
                  value={localState.styles.height || 'auto'}
                  onChange={(val) => handleStyleChange('height', val)}
                  placeholder="e.g. auto"
                />
              </InspectorField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InspectorField label="Radius (px)">
                <InspectorInput
                  type="number"
                  value={parseInt(localState.styles.borderRadius) || 24}
                  onChange={(val) => handleStyleChange('borderRadius', `${val}px`)}
                />
              </InspectorField>
              <InspectorField label="Rotate (deg)">
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-slate-400" />
                  <InspectorInput
                    type="number"
                    value={localState.styles.rotate || 0}
                    onChange={(val) => handleStyleChange('rotate', parseInt(val))}
                  />
                </div>
              </InspectorField>
            </div>

            {/* ── Shadow Toggle ─────────────────────────────────── */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-600">Drop Shadow</span>
              <button
                onClick={() => handleStyleChange('shadow', !localState.styles.shadow)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  localState.styles.shadow ? 'bg-sky-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                  localState.styles.shadow ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* ── Video-only: Playback Settings ─────────────────── */}
            {(localState.settings.mediaType || mediaType) === 'video' && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                  <Play size={10} /> Playback Settings
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'autoPlay', label: '⚡ Auto Play' },
                    { key: 'loop',     label: '🔁 Loop' },
                    { key: 'muted',    label: '🔇 Muted' },
                    { key: 'controls', label: '🎛 Controls' }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => handleSettingChange(
                        opt.key,
                        localState.settings[opt.key] === undefined ? true : !localState.settings[opt.key]
                      )}
                      className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${
                        localState.settings[opt.key]
                          ? 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                          : 'bg-slate-50 text-slate-400 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Image-only: Alt Text & Object Fit ────────────── */}
            {(localState.settings.mediaType || mediaType) === 'image' && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <InspectorField label="Alt Text">
                  <InspectorInput
                    value={localState.settings.alt || ''}
                    onChange={(val) => handleSettingChange('alt', val)}
                    placeholder="Description for accessibility"
                  />
                </InspectorField>
                <InspectorField label="Object Fit">
                  <select
                    value={localState.styles.objectFit || 'cover'}
                    onChange={(e) => handleStyleChange('objectFit', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer"
                  >
                    {['cover', 'contain', 'fill', 'none', 'scale-down'].map(v => (
                      <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                    ))}
                  </select>
                </InspectorField>
              </div>
            )}

            {/* ── Click Action ──────────────────────────────────── */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                <MousePointer2 size={10} /> Click Action
              </label>
              <ActionSelector
                action={localState.settings.action || { type: 'link', payload: '' }}
                onChange={(val) => handleSettingChange('action', val)}
                pages={pages || window.__BUILDER_PAGES__ || []}
              />
            </div>

          </div>
        );
      }

      case 'Portfolio':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="My Portfolio" />
            </InspectorField>
            <InspectorField label="Subtitle">
              <InspectorInput value={localState.settings.subtitle} onChange={(val) => handleSettingChange('subtitle', val)} placeholder="Selected projects..." />
            </InspectorField>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Projects</label>
            <SubItemsEditor
              items={(localState.settings.projects || []).map((p, i) => p.id ? p : { ...p, id: `proj-${i}` })}
              fields={[
                { key: 'title', label: 'Title', placeholder: 'Project Name' },
                { key: 'category', label: 'Category', placeholder: 'Web Design' },
                { key: 'description', label: 'Description', placeholder: 'Brief description...' },
                { key: 'image', label: 'Image URL', placeholder: 'https://...' },
              ]}
              addLabel="Add Project"
              defaultItem={{ title: 'New Project', category: 'Design', description: 'Project description.', image: '' }}
              onAdd={() => { const items = (localState.settings.projects || []).map((p, i) => p.id ? p : { ...p, id: `proj-${i}` }); handleSettingChange('projects', [...items, { id: nanoid(), title: 'New Project', category: 'Design', description: 'Project description.', image: '' }]); }}
              onDelete={(id) => { const items = (localState.settings.projects || []).map((p, i) => p.id ? p : { ...p, id: `proj-${i}` }); handleSettingChange('projects', items.filter(it => it.id !== id)); }}
              onUpdate={(id, key, value) => { const items = (localState.settings.projects || []).map((p, i) => p.id ? p : { ...p, id: `proj-${i}` }); handleSettingChange('projects', items.map(it => it.id === id ? { ...it, [key]: value } : it)); }}
            />
          </div>
        );

      case 'CTA':
        return (
          <div className="space-y-6">
            <InspectorField label="Heading">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="Ready to get started?" />
            </InspectorField>
            <InspectorField label="Subtitle">
              <InspectorInput value={localState.settings.subtitle} onChange={(val) => handleSettingChange('subtitle', val)} placeholder="Join thousands..." />
            </InspectorField>
            <InspectorField label="Primary Button Text">
              <InspectorInput value={localState.settings.primaryText} onChange={(val) => handleSettingChange('primaryText', val)} placeholder="Get Started" />
            </InspectorField>
            <InspectorField label="Secondary Button Text">
              <InspectorInput value={localState.settings.secondaryText} onChange={(val) => handleSettingChange('secondaryText', val)} placeholder="Learn More (leave empty to hide)" />
            </InspectorField>
            <div className="grid grid-cols-2 gap-4">
              <InspectorField label="Button Color">
                <div className="flex items-center gap-2">
                  <input type="color" value={localState.settings.primaryColor || '#ffffff'} onChange={(e) => handleSettingChange('primaryColor', e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer" />
                  <InspectorInput value={localState.settings.primaryColor || '#ffffff'} onChange={(val) => handleSettingChange('primaryColor', val)} />
                </div>
              </InspectorField>
              <InspectorField label="Button Text Color">
                <div className="flex items-center gap-2">
                  <input type="color" value={localState.settings.primaryTextColor || '#6366f1'} onChange={(e) => handleSettingChange('primaryTextColor', e.target.value)} className="w-10 h-10 rounded-xl border-0 cursor-pointer" />
                  <InspectorInput value={localState.settings.primaryTextColor || '#6366f1'} onChange={(val) => handleSettingChange('primaryTextColor', val)} />
                </div>
              </InspectorField>
            </div>
          </div>
        );

      case 'Logos':
        return (
          <div className="space-y-6">
            <InspectorField label="Label">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="Trusted by industry leaders" />
            </InspectorField>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Logos / Brands</label>
            <SubItemsEditor
              items={(localState.settings.logos || []).map((l, i) => l.id ? l : { ...l, id: `logo-${i}` })}
              fields={[
                { key: 'name', label: 'Brand Name', placeholder: 'Acme Corp' },
                { key: 'image', label: 'Logo URL (optional)', placeholder: 'https://...' },
              ]}
              addLabel="Add Logo"
              defaultItem={{ name: 'Brand', image: '' }}
              onAdd={() => { const items = (localState.settings.logos || []).map((l, i) => l.id ? l : { ...l, id: `logo-${i}` }); handleSettingChange('logos', [...items, { id: nanoid(), name: 'Brand', image: '' }]); }}
              onDelete={(id) => { const items = (localState.settings.logos || []).map((l, i) => l.id ? l : { ...l, id: `logo-${i}` }); handleSettingChange('logos', items.filter(it => it.id !== id)); }}
              onUpdate={(id, key, value) => { const items = (localState.settings.logos || []).map((l, i) => l.id ? l : { ...l, id: `logo-${i}` }); handleSettingChange('logos', items.map(it => it.id === id ? { ...it, [key]: value } : it)); }}
            />
          </div>
        );

      case 'Blog':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="From the Blog" />
            </InspectorField>
            <InspectorField label="Subtitle">
              <InspectorInput value={localState.settings.subtitle} onChange={(val) => handleSettingChange('subtitle', val)} placeholder="Insights and updates..." />
            </InspectorField>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Blog Posts</label>
            <SubItemsEditor
              items={(localState.settings.posts || []).map((p, i) => p.id ? p : { ...p, id: `post-${i}` })}
              fields={[
                { key: 'title', label: 'Title', placeholder: 'Article Title' },
                { key: 'category', label: 'Category', placeholder: 'Design' },
                { key: 'date', label: 'Date', placeholder: 'Mar 15, 2026' },
                { key: 'excerpt', label: 'Excerpt', placeholder: 'Short description...' },
                { key: 'image', label: 'Image URL', placeholder: 'https://...' },
              ]}
              addLabel="Add Post"
              defaultItem={{ title: 'New Post', category: 'Article', date: 'Mar 2026', excerpt: 'Post excerpt.', image: '' }}
              onAdd={() => { const items = (localState.settings.posts || []).map((p, i) => p.id ? p : { ...p, id: `post-${i}` }); handleSettingChange('posts', [...items, { id: nanoid(), title: 'New Post', category: 'Article', date: 'Mar 2026', excerpt: 'Post excerpt.', image: '' }]); }}
              onDelete={(id) => { const items = (localState.settings.posts || []).map((p, i) => p.id ? p : { ...p, id: `post-${i}` }); handleSettingChange('posts', items.filter(it => it.id !== id)); }}
              onUpdate={(id, key, value) => { const items = (localState.settings.posts || []).map((p, i) => p.id ? p : { ...p, id: `post-${i}` }); handleSettingChange('posts', items.map(it => it.id === id ? { ...it, [key]: value } : it)); }}
            />
          </div>
        );

      case 'Team':
        return (
          <div className="space-y-6">
            <InspectorField label="Section Title">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="Meet the Team" />
            </InspectorField>
            <InspectorField label="Subtitle">
              <InspectorInput value={localState.settings.subtitle} onChange={(val) => handleSettingChange('subtitle', val)} placeholder="The people behind the product." />
            </InspectorField>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Team Members</label>
            <SubItemsEditor
              items={(localState.settings.members || []).map((m, i) => m.id ? m : { ...m, id: `mem-${i}` })}
              fields={[
                { key: 'name', label: 'Name', placeholder: 'Full Name' },
                { key: 'role', label: 'Role', placeholder: 'CEO' },
                { key: 'avatar', label: 'Avatar URL', placeholder: 'https://...' },
                { key: 'bio', label: 'Bio (optional)', placeholder: 'Short bio...' },
              ]}
              addLabel="Add Member"
              defaultItem={{ name: 'New Member', role: 'Role', avatar: '', bio: '' }}
              onAdd={() => { const items = (localState.settings.members || []).map((m, i) => m.id ? m : { ...m, id: `mem-${i}` }); handleSettingChange('members', [...items, { id: nanoid(), name: 'New Member', role: 'Role', avatar: '', bio: '' }]); }}
              onDelete={(id) => { const items = (localState.settings.members || []).map((m, i) => m.id ? m : { ...m, id: `mem-${i}` }); handleSettingChange('members', items.filter(it => it.id !== id)); }}
              onUpdate={(id, key, value) => { const items = (localState.settings.members || []).map((m, i) => m.id ? m : { ...m, id: `mem-${i}` }); handleSettingChange('members', items.map(it => it.id === id ? { ...it, [key]: value } : it)); }}
            />
          </div>
        );

      case 'Newsletter':
        return (
          <div className="space-y-6">
            <InspectorField label="Heading">
              <InspectorInput value={localState.settings.title} onChange={(val) => handleSettingChange('title', val)} placeholder="Stay in the loop" />
            </InspectorField>
            <InspectorField label="Subtitle">
              <InspectorInput value={localState.settings.subtitle} onChange={(val) => handleSettingChange('subtitle', val)} placeholder="Get latest updates..." />
            </InspectorField>
            <InspectorField label="Placeholder">
              <InspectorInput value={localState.settings.placeholder} onChange={(val) => handleSettingChange('placeholder', val)} placeholder="your@email.com" />
            </InspectorField>
            <InspectorField label="Button Text">
              <InspectorInput value={localState.settings.buttonText} onChange={(val) => handleSettingChange('buttonText', val)} placeholder="Subscribe" />
            </InspectorField>
            <InspectorField label="Disclaimer">
              <InspectorInput value={localState.settings.disclaimer} onChange={(val) => handleSettingChange('disclaimer', val)} placeholder="No spam..." />
            </InspectorField>
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
                <Palette size={10} /> Button Color
              </label>
              <div className="flex items-center gap-3">
                <input type="color" value={localState.settings.buttonColor || '#3b82f6'} onChange={(e) => handleSettingChange('buttonColor', e.target.value)} className="w-12 h-10 rounded-xl border-0 cursor-pointer flex-shrink-0" />
                <input type="text" value={localState.settings.buttonColor || ''} onChange={(e) => handleSettingChange('buttonColor', e.target.value)} placeholder="Primary" className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500" />
              </div>
            </div>
          </div>
        );

      case 'Footer':
        return (
          <div className="space-y-6">
            <InspectorField label="Logo Text">
              <InspectorInput value={localState.settings.logoText} onChange={(val) => handleSettingChange('logoText', val)} placeholder="BRAND" />
            </InspectorField>
            <InspectorField label="Description">
              <textarea
                value={localState.settings.description || ''}
                onChange={(e) => handleSettingChange('description', e.target.value)}
                placeholder="Brand description..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[60px] resize-none"
              />
            </InspectorField>
            <InspectorField label="Copyright">
              <InspectorInput value={localState.settings.copyright} onChange={(val) => handleSettingChange('copyright', val)} placeholder="© 2026 All rights reserved." />
            </InspectorField>
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Link Columns</label>
              {(localState.settings.columns || []).map((col, ci) => (
                <div key={col.id || ci} className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <input type="text" value={col.title} onChange={(e) => { const cols = [...(localState.settings.columns || [])]; cols[ci] = { ...cols[ci], title: e.target.value }; handleSettingChange('columns', cols); }} className="text-xs font-bold uppercase bg-transparent outline-none text-slate-600 w-24" />
                    <button onClick={() => handleSettingChange('columns', (localState.settings.columns || []).filter((_, i) => i !== ci))} className="text-[10px] text-red-400 hover:text-red-600">Remove</button>
                  </div>
                  {(col.links || []).map((link, li) => (
                    <div key={li} className="flex items-center gap-2 mb-1">
                      <input type="text" value={link.label || ''} onChange={(e) => { const cols = [...(localState.settings.columns || [])]; const links = [...(cols[ci].links || [])]; links[li] = { ...links[li], label: e.target.value }; cols[ci] = { ...cols[ci], links }; handleSettingChange('columns', cols); }} placeholder="Link label" className="flex-1 text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none" />
                      <button onClick={() => { const cols = [...(localState.settings.columns || [])]; const links = [...(cols[ci].links || [])].filter((_, i) => i !== li); cols[ci] = { ...cols[ci], links }; handleSettingChange('columns', cols); }} className="text-[10px] text-slate-400 hover:text-red-500">✕</button>
                    </div>
                  ))}
                  <button onClick={() => { const cols = [...(localState.settings.columns || [])]; const links = [...(cols[ci].links || []), { label: 'New Link' }]; cols[ci] = { ...cols[ci], links }; handleSettingChange('columns', cols); }} className="text-[10px] text-sky-500 font-bold mt-1">+ Add Link</button>
                </div>
              ))}
              <button onClick={() => handleSettingChange('columns', [...(localState.settings.columns || []), { id: nanoid(), title: 'Column', links: [{ label: 'Link' }] }])} className="text-xs text-sky-600 font-bold">+ Add Column</button>
            </div>
          </div>
        );

      case 'Media': // backward-compat alias — same panel as Image/Video
      default:
        // If the type looks like a media block (has settings.url), use the media panel
        if (localState.settings.url !== undefined || localState.settings.mediaType !== undefined) {
          const mediaTypeFallback = localState.settings.mediaType || 'image';
          const urlFallback = localState.settings.url || '';
          const isLocalFileFallback = urlFallback.startsWith('data:');
          const isValidUrlFallback = !urlFallback || isLocalFileFallback || (() => { try { new URL(urlFallback); return true; } catch { return false; } })();

          return (
            <div className="space-y-6">
              <InspectorField label="Media Type">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                  {[
                    { value: 'image', label: 'Image', Icon: ImageIcon },
                    { value: 'video', label: 'Video', Icon: Video },
                  ].map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleSettingChange('mediaType', value)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        (localState.settings.mediaType || mediaTypeFallback) === value
                          ? 'bg-white shadow-md text-sky-600'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
              </InspectorField>

              <InspectorField label="Media URL">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <LinkIcon size={12} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={isLocalFileFallback ? 'Local file uploaded ✓' : urlFallback}
                        readOnly={isLocalFileFallback}
                        onChange={(e) => handleSettingChange('url', e.target.value)}
                        placeholder={mediaTypeFallback === 'video' ? 'https://example.com/video.mp4' : 'https://example.com/image.jpg'}
                        className={`w-full bg-slate-50 border rounded-xl pl-8 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all ${
                          !isValidUrlFallback && urlFallback ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-900'
                        } ${isLocalFileFallback ? 'text-emerald-600 font-bold' : ''}`}
                      />
                    </div>
                    <label className="p-2.5 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-all border border-sky-100 shrink-0 cursor-pointer" title="Upload">
                      <Upload size={18} />
                      <input type="file" className="hidden" accept={mediaTypeFallback === 'video' ? 'video/*' : 'image/*'}
                        onChange={(e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => handleSettingChange('url', ev.target.result); r.readAsDataURL(f); }}
                      />
                    </label>
                    {urlFallback && <button onClick={() => handleSettingChange('url', '')} className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-100 transition-all border border-rose-100"><X size={18} /></button>}
                  </div>
                  {!isValidUrlFallback && urlFallback && <p className="text-[11px] text-rose-500 font-bold px-1">⚠ Invalid URL format</p>}
                </div>
              </InspectorField>

              {urlFallback && isValidUrlFallback && (
                <InspectorField label="Preview">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                    {mediaTypeFallback === 'video' ? (
                      <video key={urlFallback} src={urlFallback} controls muted className="w-full max-h-48 object-contain" />
                    ) : (
                      <img src={urlFallback} alt="Preview" className="w-full max-h-48 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                    )}
                  </div>
                </InspectorField>
              )}

              <div className="grid grid-cols-2 gap-4">
                <InspectorField label="Width">
                  <InspectorInput value={localState.styles.width || (mediaTypeFallback === 'video' ? '600px' : '400px')} onChange={(val) => handleStyleChange('width', val)} placeholder="e.g. 400px" />
                </InspectorField>
                <InspectorField label="Height">
                  <InspectorInput value={localState.styles.height || 'auto'} onChange={(val) => handleStyleChange('height', val)} placeholder="auto" />
                </InspectorField>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600">Drop Shadow</span>
                <button onClick={() => handleStyleChange('shadow', !localState.styles.shadow)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${localState.styles.shadow ? 'bg-sky-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${localState.styles.shadow ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              {mediaTypeFallback === 'video' && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2"><Play size={10} /> Playback</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ key: 'autoPlay', label: '⚡ Auto Play' }, { key: 'loop', label: '🔁 Loop' }, { key: 'muted', label: '🔇 Muted' }, { key: 'controls', label: '🎛 Controls' }].map(opt => (
                      <button key={opt.key}
                        onClick={() => handleSettingChange(opt.key, localState.settings[opt.key] === undefined ? true : !localState.settings[opt.key])}
                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all ${localState.settings[opt.key] ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        return <div className="text-sm text-slate-400">No properties found for this block.</div>;
    }
  };

  const renderAnimationField = () => (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <InspectorField label="Entrance Animation">
        <div className="relative">
          <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" size={14} />
          <select
            value={localState.styles.animation || 'none'}
            onChange={(e) => handleStyleChange('animation', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all cursor-pointer"
          >
            {MOTION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronRight size={14} className="rotate-90" />
          </div>
        </div>
      </InspectorField>
    </div>
  );

  return (
    <aside className="h-full border-l border-slate-200 bg-white flex flex-col z-30 shadow-2xl overflow-hidden" style={{ width: `${width}px` }}>
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings2 className="text-sky-500" size={20} />
            Inspector
          </h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Editing: {selectedSection.type}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'content', label: 'Content' }, 
            { id: 'style', label: 'Style' },
            { id: 'code', label: 'Code' }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-black transition-all ${
                activeTab === id
                  ? 'bg-white shadow-sm text-sky-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel body */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'code' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex bg-slate-100 p-0.5 rounded-lg">
                {['jsx', 'html'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setCodeFormat(fmt)}
                    className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                      codeFormat === fmt 
                        ? 'bg-white text-sky-600 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => {
                  const code = generateSnippet(selectedSection.type, localState.settings, localState.styles, codeFormat);
                  navigator.clipboard.writeText(code);
                }}
                className="p-1 px-2 bg-slate-50 border border-slate-200 rounded-lg text-[9px] font-bold text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-all flex items-center gap-1"
              >
                <Copy size={10} /> Copy
              </button>
            </div>
            <div className="bg-slate-900 rounded-2xl p-4 overflow-x-auto shadow-inner border border-slate-800 scrollbar-thin scrollbar-thumb-slate-700">
              <pre className="text-[11px] font-mono text-sky-300 leading-relaxed">
                {generateSnippet(selectedSection.type, localState.settings, localState.styles, codeFormat)}
              </pre>
            </div>
            <p className="text-[10px] text-slate-400 px-1 leading-relaxed italic">
              {codeFormat === 'html' 
                ? '* Standalone HTML with Tailwind CDN. Ready for single-file use.' 
                : '* Component JSX with props and style configuration.'}
            </p>
          </div>
        ) : activeTab === 'content' ? (
          <>
            {renderSectionSpecificFields()}
            {renderAnimationField()}
          </>
        ) : (
          <StylePanel
            styles={localState.styles}
            onChange={(newStyles) =>
              setLocalState((prev) => ({ ...prev, styles: newStyles }))
            }
          />
        )}
      </div>
    </aside>
  );
};


export default InspectorSidebar;
