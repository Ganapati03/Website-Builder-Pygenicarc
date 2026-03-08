import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { templatesService } from '../../services/templates';
import {
  Menu,
  Save,
  Eye,
  Undo,
  Redo,
  Trash2,
  Settings,
  Type,
  Image as ImageIcon,
  Square,
  Layout,
  MousePointer2,
  Palette,
  AlignLeft,
  ChevronDown,
  Plus,
  X,
  Loader2
} from 'lucide-react';

// Component types that can be dragged
const COMPONENT_TYPES = {
  HEADING: 'heading',
  TEXT: 'text',
  BUTTON: 'button',
  IMAGE: 'image',
  CONTAINER: 'container',
  CARD: 'card',
};

interface ComponentData {
  id: string;
  type: string;
  content: string;
  src?: string; // For images
  alt?: string; // For images
  styles: {
    backgroundColor?: string;
    color?: string;
    padding?: string;
    margin?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
    objectFit?: string;
  };
}

export function CustomizerPage() {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState(!!templateId);
  const [templateName, setTemplateName] = useState('New Design');
  const [components, setComponents] = useState<ComponentData[]>([]);

  // Load template when templateId is present
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    } else {
      // Default components for new design
      setComponents([
        {
          id: '1',
          type: COMPONENT_TYPES.HEADING,
          content: 'Welcome to Our Website',
          styles: { fontSize: '48px', fontWeight: '700', textAlign: 'center', margin: '20px 0' }
        },
        {
          id: '2',
          type: COMPONENT_TYPES.TEXT,
          content: 'This is a customizable landing page template. Drag and drop components to build your perfect website.',
          styles: { textAlign: 'center', margin: '10px 0', color: '#A0A0A0' }
        },
        {
          id: '3',
          type: COMPONENT_TYPES.BUTTON,
          content: 'Get Started',
          styles: { backgroundColor: '#00FF88', color: '#0D0D0D', padding: '12px 24px', borderRadius: '8px', margin: '20px auto', display: 'block', width: 'fit-content' }
        }
      ]);
    }
  }, [templateId]);

  const loadTemplate = async (id: string) => {
    setLoading(true);
    try {
      const response = await templatesService.getTemplate(id);
      if (response.success && response.data?.template) {
        const template = response.data.template;
        setTemplateName(template.name);
        
        // Load components from template structure
        if (template.structure_json?.components) {
          setComponents(template.structure_json.components.map((comp: any) => ({
            id: comp.id || Date.now().toString(),
            type: comp.type || COMPONENT_TYPES.TEXT,
            content: comp.content || '',
            styles: comp.styles || {}
          })));
        }
      }
    } catch (err) {
      console.error('Failed to load template:', err);
    } finally {
      setLoading(false);
    }
  };

  const addComponent = (type: string) => {
    const newComponent: ComponentData = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      ...(type === COMPONENT_TYPES.IMAGE && { src: '', alt: 'Image' })
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const draggedComponent = components[dragIndex];
    const newComponents = [...components];
    newComponents.splice(dragIndex, 1);
    newComponents.splice(hoverIndex, 0, draggedComponent);
    setComponents(newComponents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-[#0D0D0D]">
        <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-[#0D0D0D]/80 z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
                <span className="text-[#A0A0A0]">Loading template...</span>
              </div>
            </div>
          )}
          
          {/* Top Toolbar */}
          <header className="h-14 sm:h-16 border-b border-[#1a1a1a] flex items-center justify-between px-4 sm:px-6 bg-[#121212]">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-[#E0E0E0]" />
              </button>
              <h1 className="text-sm sm:text-lg text-[#E0E0E0]">{templateName}</h1>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#E0E0E0] transition-colors">
                <Undo className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#E0E0E0] transition-colors">
                <Redo className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="hidden sm:block w-px h-6 bg-[#1a1a1a] mx-2"></div>
              <button className="px-2 sm:px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button className="px-2 sm:px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Component Library Panel */}
            <ComponentLibrary addComponent={addComponent} />

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto bg-[#0D0D0D] p-4 sm:p-6">
              <Canvas
                components={components}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                onMoveComponent={moveComponent}
                onDeleteComponent={deleteComponent}
              />
            </div>

            {/* Properties Panel */}
            {selectedComponent && (
              <PropertiesPanel
                component={selectedComponent}
                onUpdateComponent={(updates) => updateComponent(selectedComponent.id, updates)}
                onClose={() => setSelectedComponent(null)}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

// Component Library Panel
function ComponentLibrary({ addComponent }: { addComponent: (type: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const componentBlocks = [
    { type: COMPONENT_TYPES.HEADING, icon: Type, label: 'Heading', color: '#00FF88' },
    { type: COMPONENT_TYPES.TEXT, icon: AlignLeft, label: 'Text', color: '#00FF88' },
    { type: COMPONENT_TYPES.BUTTON, icon: MousePointer2, label: 'Button', color: '#00FF88' },
    { type: COMPONENT_TYPES.IMAGE, icon: ImageIcon, label: 'Image', color: '#00FF88' },
    { type: COMPONENT_TYPES.CONTAINER, icon: Square, label: 'Container', color: '#00FF88' },
    { type: COMPONENT_TYPES.CARD, icon: Layout, label: 'Card', color: '#00FF88' },
  ];

  return (
    <>
      {/* Desktop Panel */}
      <div className={`${isExpanded ? 'w-56 sm:w-64' : 'w-0'} hidden md:block border-r border-[#1a1a1a] bg-[#121212] overflow-hidden transition-all`}>
        {isExpanded && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base text-[#E0E0E0] font-medium">Components</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-[#A0A0A0] rotate-90" />
              </button>
            </div>

            <div className="space-y-2">
              {componentBlocks.map((block) => (
                <ComponentBlock
                  key={block.type}
                  type={block.type}
                  icon={block.icon}
                  label={block.label}
                  color={block.color}
                  onAdd={() => addComponent(block.type)}
                />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
              <h3 className="text-sm text-[#E0E0E0] font-medium mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-xs text-[#A0A0A0]">
                <li>• Click to add components</li>
                <li>• Drag to reorder</li>
                <li>• Click to edit properties</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden fixed bottom-20 left-4 w-12 h-12 rounded-full bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-all glow-green shadow-lg flex items-center justify-center z-30"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#1a1a1a] z-50 rounded-t-2xl max-h-[70vh] overflow-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base text-[#E0E0E0] font-medium">Add Component</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#A0A0A0]" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {componentBlocks.map((block) => (
                  <ComponentBlock
                    key={block.type}
                    type={block.type}
                    icon={block.icon}
                    label={block.label}
                    color={block.color}
                    onAdd={() => {
                      addComponent(block.type);
                      setShowMobileMenu(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Component Block in Library
function ComponentBlock({ type, icon: Icon, label, color, onAdd }: any) {
  return (
    <button
      onClick={onAdd}
      className="w-full p-3 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] hover:border-[#00FF88]/50 transition-all group flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded bg-[#00FF88]/10 flex items-center justify-center group-hover:bg-[#00FF88]/20 transition-colors">
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <span className="text-sm text-[#E0E0E0]">{label}</span>
      <Plus className="w-4 h-4 text-[#A0A0A0] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

// Canvas where components are dropped
function Canvas({ components, selectedComponent, onSelectComponent, onMoveComponent, onDeleteComponent }: any) {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl min-h-[600px] p-6 sm:p-8">
      <div className="space-y-4">
        {components.map((component: ComponentData, index: number) => (
          <DraggableComponent
            key={component.id}
            component={component}
            index={index}
            isSelected={selectedComponent?.id === component.id}
            onSelect={() => onSelectComponent(component)}
            onMove={onMoveComponent}
            onDelete={() => onDeleteComponent(component.id)}
          />
        ))}
        
        {components.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Start building by adding components</p>
            <p className="text-sm mt-2">Click on components from the left panel to add them here</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Draggable Component
function DraggableComponent({ component, index, isSelected, onSelect, onMove, onDelete }: any) {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'component',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      onClick={onSelect}
      className={`relative group cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } ${
        isSelected ? 'ring-2 ring-[#00FF88] rounded-lg' : ''
      }`}
    >
      {/* Component Content */}
      <div style={component.styles} className="transition-all">
        {renderComponent(component)}
      </div>

      {/* Hover Toolbar */}
      {isSelected && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-[#121212] border border-[#00FF88] rounded-lg p-1 shadow-lg z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 hover:bg-[#1a1a1a] rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )}
    </div>
  );
}

// Properties Panel
function PropertiesPanel({ component, onUpdateComponent, onClose }: any) {
  const updateContent = (content: string) => {
    onUpdateComponent({ content });
  };

  const updateStyle = (key: string, value: string) => {
    onUpdateComponent({
      styles: { ...component.styles, [key]: value }
    });
  };

  const updateImageSrc = (src: string) => {
    onUpdateComponent({ src });
  };

  const updateImageAlt = (alt: string) => {
    onUpdateComponent({ alt });
  };

  return (
    <div className="w-full sm:w-80 border-l border-[#1a1a1a] bg-[#121212] overflow-auto">
      <div className="p-4 border-b border-[#1a1a1a] flex items-center justify-between sticky top-0 bg-[#121212] z-10">
        <div className="flex items-center gap-2 text-[#E0E0E0]">
          <Settings className="w-5 h-5 text-[#00FF88]" />
          <span className="text-sm sm:text-base">Properties</span>
        </div>
        <button
          onClick={onClose}
          className="sm:hidden p-1 hover:bg-[#1a1a1a] rounded transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-[#A0A0A0]" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Image-specific properties */}
        {component.type === COMPONENT_TYPES.IMAGE && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#E0E0E0] mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00FF88]" />
                Image URL
              </label>
              <input
                type="url"
                value={component.src || ''}
                onChange={(e) => updateImageSrc(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              />
              <p className="text-xs text-[#A0A0A0] mt-1">Enter image URL or paste from clipboard</p>
            </div>
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Alt Text</label>
              <input
                type="text"
                value={component.alt || ''}
                onChange={(e) => updateImageAlt(e.target.value)}
                placeholder="Describe the image"
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Object Fit</label>
              <select
                value={component.styles.objectFit || 'cover'}
                onChange={(e) => updateStyle('objectFit', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        )}

        {/* Content - hide for images */}
        {component.type !== COMPONENT_TYPES.IMAGE && (
          <div>
            <label className="block text-sm text-[#E0E0E0] mb-2">Content</label>
            <textarea
              value={component.content}
              onChange={(e) => updateContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Styles */}
        <div>
          <h4 className="text-sm text-[#E0E0E0] mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00FF88]" />
            Styling
          </h4>

          <div className="space-y-4">
            {/* Background Color */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Background Color</label>
              <input
                type="color"
                value={component.styles.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-full h-10 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] cursor-pointer"
              />
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Text Color</label>
              <input
                type="color"
                value={component.styles.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full h-10 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] cursor-pointer"
              />
            </div>

            {/* Font Size */}
            {(component.type === COMPONENT_TYPES.HEADING || component.type === COMPONENT_TYPES.TEXT) && (
              <div>
                <label className="block text-xs text-[#A0A0A0] mb-2">Font Size</label>
                <input
                  type="text"
                  value={component.styles.fontSize || '16px'}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  placeholder="e.g., 24px"
                  className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
                />
              </div>
            )}

            {/* Width & Height for Images */}
            {component.type === COMPONENT_TYPES.IMAGE && (
              <>
                <div>
                  <label className="block text-xs text-[#A0A0A0] mb-2">Width</label>
                  <input
                    type="text"
                    value={component.styles.width || '100%'}
                    onChange={(e) => updateStyle('width', e.target.value)}
                    placeholder="e.g., 300px or 100%"
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A0A0A0] mb-2">Height</label>
                  <input
                    type="text"
                    value={component.styles.height || '200px'}
                    onChange={(e) => updateStyle('height', e.target.value)}
                    placeholder="e.g., 200px or auto"
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
                  />
                </div>
              </>
            )}

            {/* Padding */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Padding</label>
              <input
                type="text"
                value={component.styles.padding || '0px'}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="e.g., 20px"
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              />
            </div>

            {/* Margin */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Margin</label>
              <input
                type="text"
                value={component.styles.margin || '0px'}
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="e.g., 10px 0"
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              />
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Border Radius</label>
              <input
                type="text"
                value={component.styles.borderRadius || '0px'}
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                placeholder="e.g., 8px"
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              />
            </div>

            {/* Text Align */}
            <div>
              <label className="block text-xs text-[#A0A0A0] mb-2">Text Align</label>
              <select
                value={component.styles.textAlign || 'left'}
                onChange={(e) => updateStyle('textAlign', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getDefaultContent(type: string): string {
  switch (type) {
    case COMPONENT_TYPES.HEADING:
      return 'New Heading';
    case COMPONENT_TYPES.TEXT:
      return 'This is a text paragraph. Click to edit.';
    case COMPONENT_TYPES.BUTTON:
      return 'Click Me';
    case COMPONENT_TYPES.IMAGE:
      return 'Image Placeholder';
    case COMPONENT_TYPES.CONTAINER:
      return 'Container';
    case COMPONENT_TYPES.CARD:
      return 'Card Content';
    default:
      return 'New Component';
  }
}

function getDefaultStyles(type: string) {
  switch (type) {
    case COMPONENT_TYPES.HEADING:
      return { fontSize: '32px', fontWeight: '700', margin: '20px 0' };
    case COMPONENT_TYPES.TEXT:
      return { fontSize: '16px', margin: '10px 0', color: '#333' };
    case COMPONENT_TYPES.BUTTON:
      return { 
        backgroundColor: '#00FF88', 
        color: '#0D0D0D', 
        padding: '12px 24px', 
        borderRadius: '8px',
        margin: '10px 0',
        width: 'fit-content'
      };
    case COMPONENT_TYPES.IMAGE:
      return { width: '100%', height: '200px', backgroundColor: '#1a1a1a', borderRadius: '8px', objectFit: 'cover' };
    case COMPONENT_TYPES.CONTAINER:
      return { padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', margin: '10px 0' };
    case COMPONENT_TYPES.CARD:
      return { padding: '20px', backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px', margin: '10px 0' };
    default:
      return {};
  }
}

function renderComponent(component: ComponentData) {
  switch (component.type) {
    case COMPONENT_TYPES.HEADING:
      return <h2>{component.content}</h2>;
    case COMPONENT_TYPES.TEXT:
      return <p>{component.content}</p>;
    case COMPONENT_TYPES.BUTTON:
      return <button style={{ border: 'none', cursor: 'pointer' }}>{component.content}</button>;
    case COMPONENT_TYPES.IMAGE:
      return component.src ? (
        <img 
          src={component.src} 
          alt={component.alt || component.content || 'Image'}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: (component.styles.objectFit as any) || 'cover'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#A0A0A0"><span>Image not found</span></div>';
          }}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', height: '100%', color: '#A0A0A0' }}>
          <ImageIcon className="w-12 h-12" />
          <span style={{ fontSize: '12px' }}>Click to add image URL</span>
        </div>
      );
    case COMPONENT_TYPES.CONTAINER:
      return <div>{component.content}</div>;
    case COMPONENT_TYPES.CARD:
      return <div>{component.content}</div>;
    default:
      return <div>{component.content}</div>;
  }
}