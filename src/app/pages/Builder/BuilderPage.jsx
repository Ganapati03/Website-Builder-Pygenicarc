import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useSearchParams, useParams } from 'react-router-dom';
import {
  DndContext,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  arrayMove, 
  useSortable, 
  sortableKeyboardCoordinates 
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  MousePointer2,
  Plus,
  Trash2,
  Settings2,
  Image as ImageIcon,
  Type,
  CreditCard,
  ChevronLeft,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Tag,
  Eye,
  Edit3,
  Save,
  Share2,
  Search,
  PanelsTopLeft,
  PanelRightClose,
  Folder,
  Video,
  Upload,
  Maximize,
  RotateCcw
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { nanoid } from 'nanoid';
import PageRenderer, { SECTION_MAP } from './Renderer';
import InspectorSidebar from './InspectorSidebar';
import ThemeInspector from './ThemeInspector';
import AnimationSidebarSection from './AnimationSidebarSection';
import { BuilderThemeProvider } from './BuilderThemeContext';
import { TEMPLATE_DATA } from './TemplateRegistry';
import { BLOCK_VARIANTS } from './BlockPresets';
// ─── Constants & Templates ────────────────────────────────────────────────────
const BLOCK_TEMPLATES = [
  {
    type: 'Navbar',
    label: 'Navigation Bar',
    icon: Layout,
    defaultSettings: {
      logoText: 'CREATOR',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Join', href: '#', isButton: true }
      ]
    },
    defaultStyles: { backgroundColor: '#ffffff', paddingY: '1rem', sticky: true, animation: 'none' }
  },
  {
    type: 'Hero',
    label: 'Hero Section',
    icon: ImageIcon,
    defaultSettings: {
      headline: 'Change the world.',
      subheadline: 'The most powerful builder for modern creators.',
      ctaText: 'Get Started',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format'
    },
    defaultStyles: { align: 'left', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
  },
  {
    type: 'Pricing',
    label: 'Pricing Table',
    icon: CreditCard,
    defaultSettings: {
      title: 'Simple Pricing',
      plans: [
        { name: 'Starter', price: '$0', features: ['1 Project', 'Basic Templates'] },
        { name: 'Pro', price: '$19', features: ['Unlimited Projects', 'Custom CSS', 'No Ads'] },
        { name: 'Business', price: '$49', features: ['Priority Support', 'Team Org'] }
      ]
    },
    defaultStyles: { animation: 'fade-up' }
  },
  {
    type: 'Timeline',
    label: 'Career Journey',
    icon: Icons.List,
    defaultSettings: {
      title: 'My Professional Path',
      subtitle: 'A chronological look at my career growth and key achievements.',
      milestones: [
        { title: 'Senior Product Designer', date: '2022 - Present', description: 'Leading design systems and user experience strategy for global fintech platforms.' },
        { title: 'UI/UX Designer', date: '2019 - 2022', description: 'Crafted intuitive mobile applications and web interfaces for high-growth startups.' }
      ]
    },
    defaultStyles: { backgroundColor: '#ffffff', animation: 'none' }
  }
];

const DraggableSidebarItem = ({ variant, type }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${variant.id}`,
    data: {
      template: {
        type,
        label: variant.label,
        icon: variant.icon,
        defaultSettings: variant.settings,
        defaultStyles: variant.styles
      }
    }
  });

  const renderMiniPreview = () => {
    switch (type) {
      case 'Navbar':
        return (
          <div className="w-full h-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-between px-2 gap-1 overflow-hidden">
            <div className="w-3 h-3 bg-sky-500 rounded-sm shrink-0" />
            <div className="flex gap-1 flex-1 justify-end">
              <div className="w-3 h-1 bg-slate-200 rounded-full" />
              <div className="w-3 h-1 bg-slate-200 rounded-full" />
              <div className="w-4 h-2 bg-sky-200 rounded-sm" />
            </div>
          </div>
        );
      case 'Hero':
        return (
          <div className={`w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center p-2 gap-2 overflow-hidden ${variant.styles.align === 'center' ? 'flex-col justify-center' : 'flex-row'}`}>
            <div className={`space-y-1 shrink-0 ${variant.styles.align === 'center' ? 'w-full flex flex-col items-center' : 'w-1/2'}`}>
              <div className={`h-2 bg-slate-300 rounded-full ${variant.styles.align === 'center' ? 'w-full' : 'w-full'}`} />
              <div className={`h-1 bg-slate-200 rounded-full ${variant.styles.align === 'center' ? 'w-3/4' : 'w-2/3'}`} />
              <div className="w-6 h-2 bg-sky-500 rounded-sm" />
            </div>
            {variant.settings.image && variant.styles.align !== 'center' && (
              <div className="flex-1 h-full bg-slate-200 rounded-sm flex items-center justify-center">
                <ImageIcon size={8} className="text-slate-400" />
              </div>
            )}
          </div>
        );
      case 'Pricing':
        return (
          <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex gap-1 p-1 overflow-hidden">
            <div className="flex-1 bg-white border border-slate-200 rounded-sm flex flex-col items-center p-1 gap-1">
              <div className="w-full h-1 bg-slate-100 rounded-full" />
              <div className="w-full h-2 bg-slate-200 rounded-sm" />
              <div className="w-full h-1.5 bg-sky-200 rounded-full mt-auto" />
            </div>
            <div className="flex-1 bg-white border border-sky-200 rounded-sm flex flex-col items-center p-1 gap-1 ring-1 ring-sky-100">
              <div className="w-full h-1 bg-sky-50 rounded-full" />
              <div className="w-full h-2 bg-sky-500 rounded-sm" />
              <div className="w-full h-1.5 bg-sky-100 rounded-full mt-auto" />
            </div>
          </div>
        );
      case 'Image':
        return (
          <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center justify-center p-1 overflow-hidden">
             <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center">
                <ImageIcon size={14} className="text-slate-400" />
             </div>
          </div>
        );
      case 'Video':
        return (
          <div className="w-full h-12 bg-slate-50 border border-slate-100 rounded flex items-center justify-center p-1 overflow-hidden">
             <div className="w-full h-full bg-slate-900 rounded flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
                </div>
             </div>
          </div>
        );
      default:
        return <variant.icon size={18} className="text-slate-400" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative p-3 bg-white border border-slate-200 rounded-2xl hover:border-sky-500 hover:shadow-xl transition-all cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{variant.label}</div>
      {renderMiniPreview()}
    </div>
  );
};



const DraggableIcon = ({ iconName, IconComponent }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `icon-${iconName}`,
    data: { type: 'ICON', iconName }
  });

  if (!IconComponent) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 bg-white border border-slate-200 rounded-xl hover:border-sky-500 hover:shadow-md transition-all cursor-grab active:cursor-grabbing flex items-center justify-center group ${isDragging ? 'opacity-50' : ''}`}
      title={iconName}
    >
      <IconComponent size={20} className="text-slate-600 group-hover:text-sky-500" />
    </div>
  );
};

const SortablePageItem = ({ 
  p, 
  activePageId, 
  setActivePage, 
  editingPageId, 
  setEditingPageId, 
  tempPageName, 
  setTempPageName, 
  handleRenamePage, 
  setProjectData,
  projectData 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: p.id, data: { type: 'PAGE', page: p } });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${isDragging ? 'opacity-50 shadow-2xl scale-[1.02] border-sky-400 bg-white' : activePageId === p.id ? 'bg-sky-50 border-sky-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-300'}`}
      onClick={() => setActivePage(p.name)}
    >
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        <div 
          {...attributes} 
          {...listeners}
          className="p-2 rounded-xl transition-colors shrink-0 bg-slate-50 text-slate-400 cursor-grab active:cursor-grabbing hover:bg-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Icons.GripVertical size={14} />
        </div>
        <div className="flex-1 min-w-0">
          {editingPageId === p.id ? (
            <input
              autoFocus
              value={tempPageName}
              onChange={(e) => setTempPageName(e.target.value)}
              onBlur={() => handleRenamePage(p.id, tempPageName)}
              onKeyDown={(e) => e.key === 'Enter' && handleRenamePage(p.id, tempPageName)}
              className="w-full bg-white border border-sky-300 rounded px-2 py-0.5 text-sm font-bold focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <p className={`text-sm font-bold truncate ${activePageId === p.id ? 'text-sky-900' : 'text-slate-700'}`}>{p.name}</p>
              <p className="text-[10px] font-medium text-slate-400">{p.sections.length} Sections</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all ml-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingPageId(p.id);
            setTempPageName(p.name);
          }}
          className="p-1.5 text-slate-300 hover:text-sky-600"
          title="Rename Page"
        >
          <Edit3 size={13} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Remove ${p.name}?`)) {
              setProjectData(prev => {
                const filtered = prev.pages.filter(pg => pg.id !== p.id);
                if (filtered.length === 0) {
                  return { ...prev, pages: [{ id: 'p-home', name: 'Home', sections: [] }] };
                }
                return { ...prev, pages: filtered };
              });
              if (activePageId === p.id) {
                const remaining = projectData.pages.filter(pg => pg.id !== p.id);
                setActivePage(remaining.length > 0 ? remaining[0].name : 'Home');
              }
            }
          }}
          className="p-1.5 text-slate-300 hover:text-rose-500"
          title="Delete Page"
        >
          <Icons.Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};

const IconSidebar = () => {
  const [search, setSearch] = useState('');

  // Robustly get the icon source (handles various import patterns)
  const iconSource = Icons?.icons || Icons || {};

  const allIconNames = React.useMemo(() =>
    Object.keys(iconSource).filter(name =>
      /^[A-Z]/.test(name) &&
      name !== 'createLucideIcon' &&
      name !== 'LucideIcon' &&
      name !== 'Icon'
    )
    , [iconSource]);

  const COMMON_ALIASES = React.useMemo(() => ({
    'people': ['Users', 'User', 'UserCircle', 'Contact'],
    'add': ['Plus', 'PlusCircle', 'BadgePlus', 'PlusSquare'],
    'delete': ['Trash', 'Trash2', 'X', 'Eraser'],
    'edit': ['Pencil', 'Edit', 'PenLine'],
    'mail': ['Mail', 'Envelope', 'Send'],
    'phone': ['Phone', 'Smartphone', 'Iphone'],
    'image': ['Image', 'ImageIcon', 'FileImage', 'Camera'],
    'home': ['Home', 'Building', 'Warehouse'],
    'settings': ['Settings', 'Cog', 'Sliders'],
    'search': ['Search', 'ZoomIn', 'Scan'],
    'social': ['Facebook', 'Twitter', 'Github', 'Instagram', 'Linkedin']
  }), []);

  const filteredIcons = React.useMemo(() => {
    return allIconNames
      .filter(name => {
        const lowerName = name.toLowerCase();
        const lowerSearch = search.toLowerCase();
        if (!lowerSearch) return true;
        if (lowerName.includes(lowerSearch)) return true;

        // Check aliases
        return Object.entries(COMMON_ALIASES).some(([alias, targets]) =>
          alias.includes(lowerSearch) && targets.some(t => t.toLowerCase() === lowerName)
        );
      })
      .slice(0, 80); // Slightly smaller slice for better performance
  }, [search, allIconNames, COMMON_ALIASES]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
          />
        </div>
        <div className="flex items-center justify-between mt-2 px-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
            Showing {filteredIcons.length} of {allIconNames.length}
          </p>
          <p className="text-[9px] text-sky-500 font-bold cursor-help" title="Drag to canvas">HELP</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-2 bg-slate-50/50">
        {filteredIcons.map(name => {
          const IconComp = iconSource[name];
          if (!IconComp) return null;
          return <DraggableIcon key={name} iconName={name} IconComponent={IconComp} />;
        })}
        {filteredIcons.length === 0 && (
          <div className="col-span-4 py-8 text-center text-slate-400 text-xs italic">
            No icons found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
};

// Section types that should always span the full canvas width
const FULL_WIDTH_TYPES = new Set(['Navbar', 'Hero', 'Pricing', 'Features', 'FAQ', 'Testimonials', 'Chips', 'Timeline', 'Contact', 'Stats', 'Portfolio', 'CTA', 'Logos', 'Blog', 'Team', 'Newsletter', 'Footer']);

// ─── Action Executor ─────────────────────────────────────────────────────────
// Called when an element is clicked in preview/readOnly mode.
const executeAction = (action) => {
  if (!action?.value) return;
  switch (action.type) {
    case 'page':
      window.dispatchEvent(new CustomEvent('builder-navigate', { detail: action.value.toLowerCase() }));
      break;
    case 'link':
      window.open(action.value, '_blank', 'noopener,noreferrer');
      break;
    case 'scroll': {
      const target = document.getElementById(action.value);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      break;
    }
    case 'mailto':
      window.location.href = `mailto:${action.value}`;
      break;
    default:
      break;
  }
};

// ─── Free-Form Canvas Element ─────────────────────────────────────────────────
// Each element lives at absolute (x, y) coordinates on the canvas.
// During drag, @dnd-kit provides a live `transform` delta for smooth visual tracking.
// On drop, we commit: newX = prevX + delta.x, newY = prevY + delta.y.
const DraggableElement = ({ section, onRemove, isSelected, onSelect, isReadOnly, isMobile, onInlineEdit }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: section.id,
    disabled: isReadOnly,
  });

  const isFullWidth = FULL_WIDTH_TYPES.has(section.type);
  const action = section.settings?.action;
  const hasAction = isReadOnly && action?.value;

  const style = {
    position: 'relative', // Switch from absolute to vertical flow
    width: '100%',         // Enforce full width for all sections
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 1000 : undefined,
    opacity: isDragging ? 0.4 : 1,
    cursor: isReadOnly
      ? (hasAction ? 'pointer' : 'default')
      : (isDragging ? 'grabbing' : 'grab'),
    transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
    willChange: 'transform',
    // Remove individual top/left to follow the DOM flow
    margin: 0,
    display: 'block'
  };

  const SectionComponent = SECTION_MAP[section.type];

  const handleClick = (e) => {
    e.stopPropagation();
    if (isReadOnly) {
      executeAction(action);
    } else {
      onSelect(section.id);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.75 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      className={`group ${isSelected && !isReadOnly
          ? 'outline outline-2 outline-sky-500 outline-offset-2 rounded-lg'
          : ''
        } ${hasAction
          ? 'hover:opacity-90 transition-opacity'
          : ''
        }`}
      onClick={handleClick}
    >
      {/* Hover Tip — only in edit mode and not dragging */}
      {!isReadOnly && !isDragging && (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          <div className="absolute top-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg shadow-xl translate-y-1 group-hover:translate-y-0 transition-transform">
            Tap & Hold to Drag
          </div>
        </div>
      )}

      {/* Floating control bar — only when selected in edit mode */}
      {!isReadOnly && isSelected && (
        <div
          className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white shadow-2xl border border-slate-200 p-1 rounded-xl z-[1001] whitespace-nowrap"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(section.id); }}
            className="p-1.5 hover:bg-sky-50 rounded-lg text-slate-500 hover:text-sky-600 transition-colors"
            title="Inspect"
          >
            <Settings2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(section.id); }}
            className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-500 hover:text-rose-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Action badge — visible in preview mode when element has an action */}
      {hasAction && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 bg-sky-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg pointer-events-none whitespace-nowrap">
          {action.type === 'link' ? '🔗 Link'
            : action.type === 'scroll' ? '⬇ Scroll'
              : action.type === 'mailto' ? '✉ Mail'
                : action.type}
        </div>
      )}

      {/* Render the actual section component — wrapper gets inline editing layer class so clicks reach EditableText */}
      {/* onPointerDown stops dnd-kit drag listeners from firing when user clicks inside to edit text */}
      <div 
        className={!isReadOnly ? 'inline-edit-layer' : ''}
        onPointerDown={!isReadOnly ? (e) => {
          // If click target is or is inside a contentEditable element, stop propagation
          // so dnd-kit doesn't begin a drag when the user wants to edit text
          const target = e.target;
          if (
            target.contentEditable === 'true' ||
            target.closest('[contenteditable="true"]') ||
            target.classList.contains('editable-text--hover') ||
            target.closest('.editable-text--hover')
          ) {
            e.stopPropagation();
          }
        } : undefined}
      >
        {SectionComponent
          ? <SectionComponent 
              settings={section.settings} 
              styles={section.styles} 
              isMobile={isMobile} 
              onInlineEdit={!isReadOnly ? (field, value, index, itemField) => onInlineEdit(section.id, field, value, index, itemField) : undefined}
            />
          : null
        }
      </div>
    </motion.div>
  );
};

// ─── Canvas Drop Container ────────────────────────────────────────────────────
const CanvasContainer = ({ canvasRef, canvasHeight, children, isReadOnly, selectedId, isMobile }) => {
  const { setNodeRef } = useDroppable({ id: 'canvas-droppable' });

  // Merge dnd-kit's ref with our measurement ref
  const mergedRef = (node) => {
    setNodeRef(node);
    canvasRef.current = node;
  };

  // 10px cross-hatch grid — matches the snap grid exactly so users see where elements will land
  const gridStyle = !isReadOnly ? {
    backgroundImage: [
      'linear-gradient(rgba(148,163,184,0.25) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '10px 10px',
    backgroundColor: '#f8fafc',
  } : {};

  return (
    <div
      ref={mergedRef}
      style={{
        minHeight: isReadOnly ? '100vh' : canvasHeight,
        transition: 'min-height 0.3s ease',
        paddingBottom: isReadOnly ? '0' : '150px',
        ...gridStyle,
      }}
      className={`${isReadOnly
          ? ''
          : `border border-slate-200/60 rounded-3xl shadow-2xl flex flex-col bg-white relative overflow-hidden ${selectedId ? 'ring-2 ring-sky-500/10' : ''
          }`
        }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Faux browser chrome / Mobile Status Bar — editor only */}
      {!isReadOnly && (
        isMobile ? (
          <div className="h-12 flex items-center justify-between px-8 shrink-0 sticky top-0 z-20 bg-white/90 backdrop-blur-md">
            <span className="text-[12px] font-black text-slate-900">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex items-center gap-1.5">
              <Icons.Signal size={12} className="text-slate-900" strokeWidth={2.5} />
              <Icons.Wifi size={12} className="text-slate-900" strokeWidth={2.5} />
              <div className="flex items-center gap-0.5 ml-0.5">
                <div className="w-5 h-2.5 border border-slate-900 rounded-[2px] p-[1px] relative">
                  <div className="h-full bg-slate-900 w-[70%]" />
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-slate-900 rounded-r-sm" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center px-4 gap-2 shrink-0 sticky top-0 z-20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="mx-auto w-1/3 h-5 bg-slate-100 border border-slate-200 rounded-md flex items-center px-3 gap-2">
               <Icons.Lock size={8} className="text-slate-400" />
               <div className="w-24 h-1 bg-slate-200 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest"
              style={{ minWidth: 'max-content' }}>
              {Math.round(canvasHeight)}px canvas
            </span>
          </div>
        )
      )}
      <div className={isReadOnly ? '' : 'flex-1 relative'}>
        {children}
      </div>
    </div>
  );
};
// Estimated rendered heights per section type (used for canvas auto-expansion & bounding)
const HEIGHT_ESTIMATES = {
  Navbar: 72, 
  Hero: 600, 
  Pricing: 640, 
  Features: 680,
  FAQ: 480, 
  Testimonials: 520, 
  Chips: 100, 
  Icon: 80, 
  Timeline: 850,
  Stats: 220, 
  Contact: 800,
  Portfolio: 700,
  CTA: 350,
  Logos: 200,
  Blog: 700,
  Team: 600,
  Newsletter: 350,
  Footer: 350,
};
// Estimated widths for free-float (non-full-width) elements
const WIDTH_ESTIMATES = {
  Icon: 60,
};

// ── Grid & Constraint Helpers ────────────────────────────────────────────────────
const GRID_SIZE = 10;

/** Round a value to the nearest grid cell */
const snapToGrid = (val) => Math.round(val / GRID_SIZE) * GRID_SIZE;

/**
 * Snap + clamp a drop position to stay inside the canvas.
 * For full-width sections: x is always 0, only y is snapped/clamped.
 * For free-float elements (icons): both x and y are snapped and clamped.
 *
 * @param {number} rawX  - raw drop x relative to canvas
 * @param {number} rawY  - raw drop y relative to canvas
 * @param {string} type  - section type (e.g. 'Icon', 'Hero')
 * @param {HTMLElement|null} canvasEl - canvas DOM node for dimension reading
 * @param {number} canvasHeight - current canvas height state
 * @returns {{ x: number, y: number }}
 */
const clampToCanvas = (rawX, rawY, type, canvasEl, canvasHeight) => {
  const isFullWidth = FULL_WIDTH_TYPES.has(type);
  const canvasW = canvasEl?.offsetWidth ?? 1200;
  const estH = HEIGHT_ESTIMATES[type] ?? 400;
  const estW = WIDTH_ESTIMATES[type] ?? 400;

  // Snap first
  const snappedX = isFullWidth ? 0 : snapToGrid(rawX);
  const snappedY = snapToGrid(rawY);

  // Then clamp within canvas boundaries
  const maxX = isFullWidth ? 0 : Math.max(0, canvasW - estW);
  const maxY = Math.max(0, canvasHeight - estH);

  return {
    x: isFullWidth ? 0 : Math.min(Math.max(0, snappedX), maxX),
    y: Math.min(Math.max(0, snappedY), maxY),
  };
};

// ─── Builder Page ─────────────────────────────────────────────────────────────
const BuilderPage = ({ isLiveView = false }) => {
  const { id: routeId } = useParams();
  const canvasRef = useRef(null);
  // Dynamic canvas height — starts at 100vh, grows as elements approach the bottom
  const [canvasHeight, setCanvasHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const activePageName = searchParams.get('page') || 'Home';

  const [projectData, setProjectData] = useState({
    projectId: null,
    projectName: 'Untitled Project',
    updatedAt: new Date().toISOString(),
    GlobalTheme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
      },
      typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }
    },
    pages: [
      { id: 'p-home', name: 'Home', sections: [] }
    ]
  });

  // Current active page object
  const activePage = projectData.pages.find(p => p.name.toLowerCase() === activePageName.toLowerCase()) || projectData.pages[0];
  const activePageId = activePage.id;

  const setActivePage = (name) => {
    setSearchParams({ page: name.toLowerCase() });
  };

  // Persistence logic - Load on mount if ID exists
  useEffect(() => {
    const pid = routeId || searchParams.get('id');
    if (pid) {
      const saved = JSON.parse(localStorage.getItem('builder_projects') || '[]');
      const found = saved.find(p => p.projectId === pid);
      if (found) {
        // ── Normalize Data Structure (Migration) ──
        // If the project doesn't have a 'pages' array but has root 'sections', migrate them.
        let normalized = { ...found };
        if (!normalized.pages && normalized.sections) {
          normalized.pages = [
            { id: 'p1', name: 'Home', sections: normalized.sections }
          ];
          delete normalized.sections; // Clean up legacy key
        }
        
        // Ensure pages exists and is an array
        if (!normalized.pages) {
          normalized.pages = [{ id: 'p1', name: 'Home', sections: [] }];
        }

        setProjectData(normalized);
        
        if (isLiveView) {
          setIsReadOnly(true);
          try {
            if (document.documentElement.requestFullscreen) {
              // Browser may block this
            }
          } catch(e) {}
        }
      }
    }
  }, [routeId, isLiveView]);

  // ── Auto-Calculation of Canvas Height ──
  // Ensures the scrollable area grows to accommodate the stacked sections
  useEffect(() => {
    if (!activePage?.sections || activePage.sections.length === 0) {
      // Default to slightly more than viewport to keep grid clean
      setCanvasHeight(Math.max(window.innerHeight, 900));
      return;
    }

    const margin = 300; // Extra buffer space for dropping at the bottom
    // In vertical flow (relative blocks), compute the total height by summing estimates
    const totalHeight = activePage.sections.reduce((acc, s) => {
       const heightEst = 
        ['Contact', 'Timeline'].includes(s.type) ? 850 :
        ['Hero', 'Pricing', 'Features', 'Portfolio', 'Blog'].includes(s.type) ? 700 : 
        ['FAQ', 'Testimonials', 'Team'].includes(s.type) ? 500 : 400;
       return acc + heightEst;
    }, 0);

    const newHeight = Math.max(window.innerHeight, totalHeight + margin);
    setCanvasHeight(newHeight);
  }, [activePage, projectData]);

  // Auto-save logic
  useEffect(() => {
    if (!projectData.projectId) return;
    
    const handler = setTimeout(() => {
      const projects = JSON.parse(localStorage.getItem('builder_projects') || '[]');
      const index = projects.findIndex(p => p.projectId === projectData.projectId);
      
      const updatedProject = {
        ...projectData,
        updatedAt: new Date().toISOString()
      };

      if (index >= 0) {
        // Only update if something actually changed to avoid loop
        if (JSON.stringify(projects[index]) !== JSON.stringify(updatedProject)) {
          projects[index] = updatedProject;
          localStorage.setItem('builder_projects', JSON.stringify(projects));
        }
      } else {
        projects.push(updatedProject);
        localStorage.setItem('builder_projects', JSON.stringify(projects));
      }
    }, 2000);

    return () => clearTimeout(handler);
  }, [projectData]);

  // Internal Navigation Listener
  useEffect(() => {
    const handleNavigate = (e) => {
      const targetPageName = e.detail;
      const targetPage = projectData.pages.find(p => p.name.toLowerCase() === targetPageName);
      if (targetPage) {
        setActivePage(targetPage.name);
      }
    };
    window.addEventListener('builder-navigate', handleNavigate);
    return () => window.removeEventListener('builder-navigate', handleNavigate);
  }, [projectData.pages]);

  const handleSaveProject = () => {
    const projects = JSON.parse(localStorage.getItem('builder_projects') || '[]');
    const currentId = projectData.projectId || searchParams.get('id') || `proj-${nanoid(8)}`;

    const updatedProject = {
      ...projectData,
      projectId: currentId,
      lastActivePage: activePageName,
      updatedAt: new Date().toISOString()
    };

    const index = projects.findIndex(p => p.projectId === currentId);
    if (index >= 0) {
      projects[index] = updatedProject;
    } else {
      projects.push(updatedProject);
    }

    localStorage.setItem('builder_projects', JSON.stringify(projects));
    setProjectData(updatedProject);
    setSearchParams(prev => {
      prev.set('id', currentId);
      return prev;
    }, { replace: true });
    // Show a small toast instead of alert would be better but let's keep it simple
    alert(`Success: "${projectData.projectName}" saved to your Project Hub!`);
  };

  const isProcessingTemplate = useRef(false);

  // Template Bootloader - updated to REPLACE empty home or ADD as a NEW PAGE
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId && TEMPLATE_DATA[templateId] && !isProcessingTemplate.current) {
      isProcessingTemplate.current = true;
      const raw = TEMPLATE_DATA[templateId];
      const templateName = templateId.charAt(0).toUpperCase() + templateId.slice(1);

      // Calculate layout for sections
      let cumulativeY = 0;
      const migratedSections = raw.sections.map((s) => {
        const thisY = cumulativeY;
        cumulativeY += (HEIGHT_ESTIMATES[s.type] ?? 400);
        return { ...s, x: 0, y: thisY };
      });

      const newPageName = `${templateName} Page`;
      
      setProjectData(prev => {
        // If we only have one page and it's empty, replace it
        if (prev.pages.length === 1 && prev.pages[0].sections.length === 0) {
          return {
            ...prev,
            GlobalTheme: raw.GlobalTheme || prev.GlobalTheme,
            pages: [{ ...prev.pages[0], name: newPageName, sections: migratedSections }]
          };
        }
        
        // Otherwise append if it doesn't exist
        const exists = prev.pages.find(p => p.name === newPageName);
        if (exists) return prev;

        return {
          ...prev,
          GlobalTheme: raw.GlobalTheme || prev.GlobalTheme,
          pages: [...prev.pages, { id: nanoid(), name: newPageName, sections: migratedSections }]
        };
      });

      // Switch to the new page and clean up URL
      setSearchParams(prev => {
        prev.set('page', newPageName.toLowerCase());
        prev.delete('template');
        return prev;
      }, { replace: true });

      setCanvasHeight(Math.max(window.innerHeight, cumulativeY + 200));
      
      // Reset processing flag after a short delay to allow state to settle
      setTimeout(() => { isProcessingTemplate.current = false; }, 500);
    }
  }, [searchParams]);

  const [selectedId, setSelectedId] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(isLiveView);
  const [activeItem, setActiveItem] = useState(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Hero');
  const [sidebarView, setSidebarView] = useState('sections'); // 'sections' or 'icons'
  const [editingPageId, setEditingPageId] = useState(null);
  const [tempPageName, setTempPageName] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'

  // Inspector Resizing Logic
  const [inspectorWidth, setInspectorWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);

  // ── KEYBOARD SHORTCUTS & PASTE ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not trigger global shortcuts if typing in an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      // ESC key to exit preview mode or deselect
      if (e.key === 'Escape') {
        if (isReadOnly && !isLiveView) setIsReadOnly(false);
        else if (selectedId) setSelectedId(null);
        return;
      }
      
      // Delete selected component
      if (!isReadOnly && selectedId && (e.key === 'Delete' || e.key === 'Backspace')) {
        setProjectData((prev) => ({
          ...prev,
          pages: prev.pages.map(p => p.id === activePageId ? {
            ...p,
            sections: p.sections.filter((s) => s.id !== selectedId)
          } : p)
        }));
        setSelectedId(null);
        return;
      }

      // Move component with arrow keys
      if (!isReadOnly && selectedId) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault(); // Prevent page scrolling
          const amt = e.shiftKey ? 10 : 1; // hold shift for faster movement
          
          setProjectData(prev => {
            return {
              ...prev,
              pages: prev.pages.map(p => {
                if (p.id !== activePageId) return p;
                return {
                  ...p,
                  sections: p.sections.map(s => {
                    if (s.id !== selectedId) return s;
                    
                    const isFull = FULL_WIDTH_TYPES.has(s.type);
                    let newX = s.x || 0;
                    let newY = s.y || 0;
                    
                    if (e.key === 'ArrowUp') newY -= amt;
                    if (e.key === 'ArrowDown') newY += amt;
                    if (e.key === 'ArrowLeft' && !isFull) newX -= amt;
                    if (e.key === 'ArrowRight' && !isFull) newX += amt;
                    
                    return { ...s, x: newX, y: Math.max(0, newY) };
                  })
                }
              })
            };
          });
        }
      }
    };

    const handlePaste = (e) => {
      if (isReadOnly || ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const file = items[i].getAsFile();
          const reader = new FileReader();
          
          reader.onload = (event) => {
            const base64Str = event.target.result;
            // Place near the top of the currently visible window scroll
            const scrollY = document.querySelector('.builder-canvas')?.scrollTop || 0;
            const newY = scrollY + 100;
            
            const newSection = {
              id: nanoid(),
              type: 'Image',
              x: 100, // arbitrary drop X offset
              y: newY,
              settings: {
                url: base64Str,
                action: { type: 'link', payload: '' },
              },
              styles: {
                width: '400px',
                height: 'auto',
                borderRadius: '16px',
                shadow: true,
                animation: 'fade-up'
              },
            };
            
            setProjectData((prev) => ({
              ...prev,
              pages: prev.pages.map(p => p.id === activePageId ? { 
                ...p, 
                sections: [...p.sections, newSection] 
              } : p)
            }));
            
            setSelectedId(newSection.id);
          };
          reader.readAsDataURL(file);
          break; // Stop after first image found
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('paste', handlePaste);
    };
  }, [isReadOnly, isLiveView, selectedId, activePageId]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth > 300 && newWidth < 800) setInspectorWidth(newWidth);
      }
      if (isResizingLeft) {
        const newWidth = e.clientX;
        if (newWidth > 240 && newWidth < 600) setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsResizingLeft(false);
    };

    if (isResizing || isResizingLeft) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, isResizingLeft]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveItem(event.active);
  };

  // ── Canvas auto-expansion ─────────────────────────────────────────────────
  // If the element's bottom edge is within 100px of the canvas bottom,
  // grow the canvas by (elementBottom + 200px buffer).
  const expandCanvasIfNeeded = (elementY, elementType) => {
    const estimatedHeight = HEIGHT_ESTIMATES[elementType] ?? 400;
    const bottomEdge = elementY + estimatedHeight;
    setCanvasHeight((prev) => {
      if (bottomEdge > prev - 100) return bottomEdge + 200;
      return prev;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    setActiveItem(null);

    // ── Drop new TEMPLATE BLOCK from sidebar ───────────────────────────────────
    if (active.id.toString().startsWith('template-')) {
      if (!over) return;
      const isCanvasDrop = over.id === 'canvas-droppable' || activePage.sections.some((s) => s.id === over.id);

      if (isCanvasDrop) {
        const template = active.data.current.template;
        const newSection = {
          id: nanoid(),
          type: template.type,
          // No more manual X/Y coordinates needed for vertical flow
          settings: template.defaultSettings,
          styles: {
            ...template.defaultStyles,
            // Enforce clean layout on drop
            position: undefined,
            top: undefined,
            left: undefined,
            width: '100%',
            paddingTop: template.defaultStyles?.paddingTop || '80px',
            paddingBottom: template.defaultStyles?.paddingBottom || '80px',
            marginTop: 0,
            marginBottom: 0
          },
        };

        setProjectData(prev => ({
          ...prev,
          pages: prev.pages.map(p => p.id === activePageId ? { ...p, sections: [...p.sections, newSection] } : p)
        }));
      }
      return;
    }

    // ── Drop new ICON from sidebar ─────────────────────────────────────────────
    if (active.id.toString().startsWith('icon-')) {
      if (!over) return;
      const isCanvasDrop = over.id === 'canvas-droppable' || activePage.sections.some((s) => s.id === over.id);

      if (isCanvasDrop) {
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        const rawX = canvasRect ? event.activatorEvent.clientX + delta.x - canvasRect.left : 100;
        const rawY = canvasRect ? event.activatorEvent.clientY + delta.y - canvasRect.top : 100;
        const { x: finalX, y: finalY } = clampToCanvas(rawX, rawY, 'Icon', canvasRef.current, canvasHeight);

        const newSection = {
          id: nanoid(),
          type: 'Icon',
          x: finalX,
          y: finalY,
          settings: {
            iconName: active.data.current.iconName,
            action: { type: 'link', value: '' },
          },
          styles: {
            size: 48,
            color: projectData.GlobalTheme?.colors?.primary || '#3b82f6',
          },
        };
        setProjectData(prev => ({
          ...prev,
          pages: prev.pages.map(p => p.id === activePageId ? { ...p, sections: [...p.sections, newSection] } : p)
        }));
        expandCanvasIfNeeded(finalY, 'Icon');
      }
      return;
    }

    // ── Reorder PAGES in sidebar ───────────────────────────────────────────────
    if (active.data.current?.type === 'PAGE' && over) {
      if (active.id !== over.id) {
        setProjectData(prev => {
          const oldIndex = prev.pages.findIndex(p => p.id === active.id);
          const newIndex = prev.pages.findIndex(p => p.id === over.id);
          return {
            ...prev,
            pages: arrayMove(prev.pages, oldIndex, newIndex)
          };
        });
      }
      return;
    }

    // ── Reorder or Sort Sections (If implementing sortability) ────────────────
    // Since we now use vertical flow, we rely on the sections array order.
    // X/Y movement is disabled to prevent misalignment.
    const movedId = active.id.toString();
    const isSection = activePage.sections.some(s => s.id === movedId);
    if (isSection) {
       // Optional: We could implement arrayMove here if using SortableContext
       // For now, we just ensure no manual X/Y coordinates are updated.
    }
  };

  const handleAddSectionAtBottom = (variant, category) => {
    // Use variant.type if specified (e.g. Media variants specify 'Image' or 'Video').
    // Fall back to category name for all other block types.
    const sectionType = variant.type || category;

    const newSection = {
      id: nanoid(),
      type: sectionType,
      settings: variant.settings,
      styles: {
        ...variant.styles,
        // Enforce normalization on add
        position: undefined,
        top: undefined,
        left: undefined,
        width: '100%',
        paddingTop: variant.styles?.paddingTop || '80px',
        paddingBottom: variant.styles?.paddingBottom || '80px',
        marginTop: 0,
        marginBottom: 0
      },
    };
    
    setProjectData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? { ...p, sections: [...p.sections, newSection] } : p)
    }));
    
    setSelectedId(newSection.id);
  };

  const handleUpdateSection = (id, newSettings, newStyles, newAnimation) => {
    setProjectData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.map(s => s.id === id ? { 
          ...s, 
          settings: newSettings, 
          styles: newStyles || s.styles,
          ...(newAnimation !== undefined ? { animation: newAnimation } : {})
        } : s)
      } : p)
    }));
  };

  const handleInlineEdit = (sectionId, field, value, index, itemField) => {
    setProjectData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.map(s => {
          if (s.id !== sectionId) return s;
          
          let newSettings = { ...s.settings };
          
          if (index !== undefined && itemField !== undefined) {
             // Array editing (items, faqs, plans, testimonials, etc)
             if (Array.isArray(newSettings[field])) {
                newSettings[field] = newSettings[field].map((item, i) => 
                   i === index ? { ...item, [itemField]: value } : item
                );
             }
          } else {
             // Root field editing (title, subtitle, etc)
             newSettings[field] = value;
          }

          return { ...s, settings: newSettings };
        })
      } : p)
    }));
  };

  const handleSubItemUpdate = (sectionId, arrayKey, itemId, propKey, value) => {
    setProjectData((prev) => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.map((s) => {
          if (s.id !== sectionId) return s;
          return {
            ...s,
            settings: {
              ...s.settings,
              [arrayKey]: (s.settings[arrayKey] || []).map((item) =>
                item.id === itemId ? { ...item, [propKey]: value } : item
              ),
            },
          };
        }),
      } : p)
    }));
  };

  const handleSubItemDelete = (sectionId, arrayKey, itemId) => {
    setProjectData((prev) => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.map((s) => {
          if (s.id !== sectionId) return s;
          return {
            ...s,
            settings: {
              ...s.settings,
              [arrayKey]: (s.settings[arrayKey] || []).filter((item) => item.id !== itemId),
            },
          };
        }),
      } : p)
    }));
  };

  const handleSubItemAdd = (sectionId, arrayKey, defaultItem) => {
    setProjectData((prev) => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.map((s) => {
          if (s.id !== sectionId) return s;
          return {
            ...s,
            settings: {
              ...s.settings,
              [arrayKey]: [
                ...(s.settings[arrayKey] || []),
                { id: nanoid(), ...defaultItem },
              ],
            },
          };
        }),
      } : p)
    }));
  };

  const handleRemoveSection = (id) => {
    setProjectData((prev) => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? {
        ...p,
        sections: p.sections.filter((s) => s.id !== id)
      } : p)
    }));
  };

  const handleRenamePage = (id, newName) => {
    if (!newName.trim()) return;
    setProjectData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === id ? { ...p, name: newName } : p)
    }));
    setEditingPageId(null);
    // If we renamed the active page, update URL
    if (id === activePageId) {
       setSearchParams(prev => {
         prev.set('page', newName.toLowerCase());
         return prev;
       });
    }
  };

  const handleUpdateTheme = (newGlobalTheme) => {
    setProjectData((prev) => ({ ...prev, GlobalTheme: newGlobalTheme }));
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    if (id) setIsThemeOpen(false);
  };

  const selectedSection = activePage.sections.find(s => s.id === selectedId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveItem(null)}
    >
      <BuilderThemeProvider theme={projectData.GlobalTheme}>
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">

          {/* SIDEBAR: Draggable Blocks (Hide in ReadOnly) */}
          {!isReadOnly && (
            <AnimatePresence>
              {showSidebar && (
                <div className="flex sticky top-0 h-full z-30 shrink-0">
                  <motion.aside
                    initial={{ x: -320, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -320, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="h-full border-r border-slate-200 bg-white flex flex-col overflow-hidden"
                    style={{ width: sidebarWidth }}
                  >
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-sky-500 rounded-xl text-white">
                          <Layout size={20} />
                        </div>
                        Blocks
                      </h2>
                      <button
                        onClick={() => setShowSidebar(false)}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
                        title="Hide Sidebar"
                      >
                        <PanelRightClose size={18} />
                      </button>
                    </div>
                    <div className="p-2 px-6">
                      <div className="flex p-1 bg-slate-100 rounded-xl mt-4">
                        <button
                          onClick={() => setSidebarView('sections')}
                          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${sidebarView === 'sections' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Sections
                        </button>
                        <button
                          onClick={() => setSidebarView('icons')}
                          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${sidebarView === 'icons' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Icons
                        </button>
                        <button
                          onClick={() => setSidebarView('pages')}
                          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${sidebarView === 'pages' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Pages
                        </button>
                        <button
                          onClick={() => setSidebarView('animations')}
                          className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${sidebarView === 'animations' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          Anim
                        </button>
                      </div>
                    </div>

                    {sidebarView === 'animations' ? (
                      <AnimationSidebarSection 
                        selectedId={selectedId} 
                        projectData={projectData} 
                        handleUpdateSection={handleUpdateSection} 
                      />
                    ) : sidebarView === 'pages' ? (
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex items-center justify-between px-2 mb-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Structure</span>
                            <span className="text-[9px] font-bold text-sky-500 truncate max-w-[140px] italic">{projectData.projectName}</span>
                          </div>
                          <button
                            onClick={() => {
                              const name = `Page ${projectData.pages.length + 1}`;
                              setProjectData(prev => ({
                                ...prev,
                                pages: [...prev.pages, { id: nanoid(), name, sections: [] }]
                              }));
                              setActivePage(name);
                            }}
                            className="p-1 px-2 bg-sky-50 text-sky-600 rounded-lg text-[10px] font-black hover:bg-sky-100 transition-all flex items-center gap-1"
                          >
                            <Plus size={12} /> New Page
                          </button>
                        </div>
                        <div className="space-y-2">
                          <SortableContext items={projectData.pages.map(p => p.id)} strategy={verticalListSortingStrategy}>
                            {projectData.pages.map((p) => (
                              <SortablePageItem
                                key={p.id}
                                p={p}
                                activePageId={activePageId}
                                setActivePage={setActivePage}
                                editingPageId={editingPageId}
                                setEditingPageId={setEditingPageId}
                                tempPageName={tempPageName}
                                setTempPageName={setTempPageName}
                                handleRenamePage={handleRenamePage}
                                setProjectData={setProjectData}
                                projectData={projectData}
                              />
                            ))}
                          </SortableContext>
                        </div>
                      </div>
                    ) : sidebarView === 'sections' ? (
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {Object.entries(BLOCK_VARIANTS).map(([category, variants]) => (
                          <div key={category} className="space-y-3">
                            <button
                              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg transition-colors ${activeCategory === category ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                                  {category === 'Navbar' && <Layout size={16} />}
                                  {category === 'Hero' && <ImageIcon size={16} />}
                                  {category === 'Pricing' && <CreditCard size={16} />}
                                  {category === 'Features' && <Sparkles size={16} />}
                                  {category === 'FAQ' && <HelpCircle size={16} />}
                                  {category === 'Testimonials' && <MessageSquare size={16} />}
                                  {category === 'Chips' && <Tag size={16} />}
                                  {category === 'Timeline' && <Icons.List size={16} />}
                                  {category === 'Stats' && <Icons.BarChart3 size={16} />}
                                  {category === 'Contact' && <Icons.Mail size={16} />}
                                  {category === 'Media' && <ImageIcon size={16} />}
                                  {category === 'Portfolio' && <Icons.Briefcase size={16} />}
                                  {category === 'CTA' && <Icons.Megaphone size={16} />}
                                  {category === 'Logos' && <Icons.Building2 size={16} />}
                                  {category === 'Blog' && <Icons.BookOpen size={16} />}
                                  {category === 'Team' && <Icons.Users size={16} />}
                                  {category === 'Newsletter' && <Icons.Bell size={16} />}
                                  {category === 'Footer' && <Icons.PanelBottom size={16} />}
                                </div>
                                <span className="text-sm font-bold text-slate-700">{category}</span>
                              </div>
                              {activeCategory === category ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRightIcon size={14} className="text-slate-400" />}
                            </button>

                            {activeCategory === category && (
                              <div className="grid grid-cols-2 gap-3 pl-2 pr-1 pb-2">
                                {variants.map((variant) => (
                                  <div key={variant.id} onClick={() => handleAddSectionAtBottom(variant, category)}>
                                    <DraggableSidebarItem variant={variant} type={category} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 overflow-hidden">
                        <IconSidebar />
                      </div>
                    )}

                    <div className="p-4 border-t border-slate-100 bg-slate-50">
                      <button
                        onClick={() => { setIsThemeOpen(true); setSelectedId(null); }}
                        className={`w-full py-4 font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${isThemeOpen ? 'bg-sky-600 text-white' : 'bg-slate-900 text-white hover:bg-black'}`}
                      >
                        <Plus size={18} />
                        Customize Theme
                      </button>
                    </div>
                  </motion.aside>
                  {/* Resize Handle (Left Sidebar) */}
                  <div
                    onMouseDown={() => setIsResizingLeft(true)}
                    className="w-1.5 h-full cursor-col-resize hover:bg-sky-500/30 transition-colors z-40"
                  />
                </div>
              )}
            </AnimatePresence>
          )}

          {/* Floating Sidebar Toggle (Only when hidden) */}
          {!isReadOnly && !showSidebar && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setShowSidebar(true)}
              className="fixed top-24 left-8 z-50 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-700 hover:text-sky-600 hover:border-sky-200 transition-all group"
              title="Show Sidebar"
            >
              <PanelsTopLeft size={20} className="group-hover:scale-110 transition-transform" />
            </motion.button>
          )}

          {/* CANVAS: Drop Zone & Preview */}
          <main
            className={`flex-1 overflow-y-auto ${isReadOnly ? 'p-0' : 'p-8 bg-slate-100 scrollbar-thin scrollbar-thumb-slate-300'}`}
            style={{ backgroundColor: isLiveView ? 'transparent' : (isReadOnly ? 'white' : '#f1f5f9') }}
            onClick={() => { setSelectedId(null); setIsThemeOpen(false); }}
          >
            {/* ── GLOBAL BUILDER HEADER (Always Outside Canvas) ────────────────── */}
            {!isReadOnly && !isLiveView && (
              <div className="max-w-[1240px] mx-auto flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <Link
                    to="/projects"
                    className="flex items-center gap-2 p-2 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-all font-bold text-sm"
                  >
                    <ChevronLeft size={18} />
                    Back
                  </Link>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                    <button 
                      onClick={() => setViewMode('desktop')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${viewMode === 'desktop' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Icons.Monitor size={14} />
                      Desktop
                    </button>
                    <button 
                      onClick={() => setViewMode('mobile')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-xs ${viewMode === 'mobile' ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                      <Icons.Smartphone size={14} />
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Project Title Manager */}
                <div className="flex items-center gap-2 group cursor-pointer px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200">
                  <Layout size={16} className="text-sky-500" />
                  <input
                    type="text"
                    value={projectData.projectName}
                    onChange={(e) => setProjectData(prev => ({ ...prev, projectName: e.target.value }))}
                    className="bg-transparent border-none text-sm font-black text-slate-900 focus:outline-none w-auto min-w-[120px]"
                    placeholder="Project Name"
                  />
                  <Edit3 size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveProject}
                    className="flex items-center gap-2 px-5 py-2.5 bg-sky-50 text-sky-600 rounded-xl text-sm font-bold hover:bg-sky-100 transition-all"
                  >
                    <Folder size={16} />
                    Save to Hub
                  </button>
                  <button
                    onClick={() => setIsReadOnly(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-sky-600 hover:border-sky-200 transition-all"
                    title="Live Preview"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                  <button
                    onClick={() => {
                        alert('Connecting to GitHub... \n\nThis will export your project as a clean React/Tailwind repository. (Backend processing planned for next phase)');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95"
                  >
                    <Icons.Github size={16} />
                    Deploy
                  </button>
                  <button className="bg-sky-600 text-white py-3 px-8 rounded-2xl font-black shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all">Publish</button>
                </div>
              </div>
            )}

            {/* ── RESPONSIVE CANVAS FRAME ──────────────────────────────────────── */}
            <div 
              className={`transition-all duration-700 ease-in-out bg-white mx-auto ${
                isReadOnly 
                  ? 'max-w-none shadow-none overflow-visible' 
                  : (viewMode === 'mobile' ? 'max-w-[390px] rounded-[3.5rem] border-[14px] border-slate-900 shadow-[0_0_0_12px_rgba(15,23,42,0.1)] my-8 min-h-[844px] overflow-hidden' : 'max-w-[1240px] rounded-2xl shadow-2xl overflow-hidden')
              }`}
            >



              {/* ── Free-Form Canvas ───────────────────────────────── */}
              <CanvasContainer
                canvasRef={canvasRef}
                canvasHeight={canvasHeight}
                isReadOnly={isReadOnly}
                selectedId={selectedId}
                isMobile={viewMode === 'mobile'}
              >
                {/* Empty state */}
                <AnimatePresence>
                  {activePage.sections.length === 0 && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none"
                    >
                      <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl border border-slate-100">
                        <Plus size={32} className="text-slate-300" />
                      </div>
                      <p className="text-lg font-black text-slate-900">Your Canvas is Empty</p>
                      <p className="text-sm font-medium mt-1">Drag any block or icon here to start.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* All elements are free-floating — each at absolute (x, y) */}
                <AnimatePresence>
                  {activePage.sections.map((section) => (
                    <DraggableElement
                      key={section.id}
                      section={section}
                      isSelected={selectedId === section.id}
                      onSelect={handleSelect}
                      onRemove={handleRemoveSection}
                      isReadOnly={isReadOnly}
                      isMobile={viewMode === 'mobile'}
                      onInlineEdit={handleInlineEdit}
                    />
                  ))}
                </AnimatePresence>
              </CanvasContainer>

              {!isReadOnly && (
                <p className="text-center text-slate-400 text-sm mt-12 font-medium">
                  Made with <span className="text-rose-500">♥</span> in Website Builder Portal
                </p>
              )}
            </div>
          </main>

          {/* INSPECTOR: Property Editor (Hide in ReadOnly) */}
          <AnimatePresence>
            {selectedId && !isReadOnly && (
              <div className="flex relative z-40">
                {/* Resize Handle */}
                <div
                  onMouseDown={() => setIsResizing(true)}
                  className="w-1.5 h-full cursor-col-resize hover:bg-sky-500/30 transition-colors absolute -left-1 z-50"
                />
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{ width: inspectorWidth }}
                >
                  <InspectorSidebar
                    selectedSection={selectedSection}
                    onUpdate={handleUpdateSection}
                    onSubItemUpdate={handleSubItemUpdate}
                    onSubItemDelete={handleSubItemDelete}
                    onSubItemAdd={handleSubItemAdd}
                    pages={projectData.pages}
                    onClose={() => setSelectedId(null)}
                    width={inspectorWidth}
                  />
                </motion.div>
              </div>
            )}

            {isThemeOpen && !isReadOnly && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative z-40"
              >
                <ThemeInspector
                  theme={projectData.GlobalTheme}
                  onUpdate={handleUpdateTheme}
                  onClose={() => setIsThemeOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeItem ? (
            activeItem.id.toString().startsWith('template-') ? (
              <div className="flex items-center gap-3 p-4 bg-white border-2 border-sky-500 rounded-2xl shadow-2xl opacity-90 scale-105 pointer-events-none touch-none">
                <div className="p-2 bg-sky-50 rounded-lg text-sky-500">
                  {React.createElement(activeItem.data.current.template.icon, { size: 20 })}
                </div>
                <span className="text-sm font-bold text-slate-700">{activeItem.data.current.template.label}</span>
              </div>
            ) : activeItem.id.toString().startsWith('icon-') ? (
              <div className="p-4 bg-white border-2 border-sky-500 rounded-2xl shadow-2xl opacity-90 scale-125 pointer-events-none touch-none flex items-center justify-center">
                {(() => {
                  const IconComponent = Icons[activeItem.data.current.iconName];
                  return IconComponent ? <IconComponent size={32} className="text-sky-500" /> : null;
                })()}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md border-2 border-sky-500 rounded-xl shadow-2xl overflow-hidden scale-105 pointer-events-none opacity-80 touch-none">
                {(() => {
                  const section = activePage.sections.find(s => s.id === activeItem.id);
                  if (!section) return null;
                  const SectionComponent = SECTION_MAP[section.type];
                  return SectionComponent ? <SectionComponent settings={section.settings} styles={section.styles} isMobile={viewMode === 'mobile'} /> : null;
                })()}
              </div>
            )
          ) : null}
        </DragOverlay>
      </BuilderThemeProvider>
    </DndContext>
  );
};

export default BuilderPage;
