import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const generateId = () => Math.random().toString(36).substr(2, 9);
import { Layout, Palette, CheckSquare, Sparkles, Briefcase, ShoppingBag, Globe, ArrowRight, ChevronLeft } from 'lucide-react';
import { generatePageLayout } from '../Builder/TemplateGenerator';

const GOALS = [
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase, desc: 'Showcase your work and experience' },
  { id: 'store', label: 'Store', icon: ShoppingBag, desc: 'Sell products or services online' },
  { id: 'landing', label: 'Landing Page', icon: Globe, desc: 'Convert visitors into customers' }
];

const STYLES = [
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean, spacious, focusing on content', bg: 'bg-white' },
  { id: 'corporate', label: 'Corporate', desc: 'Professional, structured, trustworthy', bg: 'bg-slate-50' },
  { id: 'creative', label: 'Creative', desc: 'Bold, subtle gradients, modern', bg: 'bg-indigo-50/30' }
];

const SECTIONS = [
  { id: 'gallery', label: 'Work Gallery', checked: true },
  { id: 'about', label: 'About Section', checked: true },
  { id: 'team', label: 'Meet the Team', checked: false },
  { id: 'logos', label: 'Client Logos', checked: false },
  { id: 'blog', label: 'Latest Blog Posts', checked: false },
  { id: 'faq', label: 'FAQ', checked: false },
  { id: 'newsletter', label: 'Newsletter Signup', checked: false },
  { id: 'testimonials', label: 'Testimonials', checked: false },
  { id: 'contact', label: 'Contact Form', checked: true }
];

const COLORS = ['#6366f1', '#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#0f172a'];

/** Template generation is delegated to TemplateGenerator.js for normalization */

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('portfolio');
  const [style, setStyle] = useState('minimalist');
  const [sections, setSections] = useState(SECTIONS);
  const [brandColor, setBrandColor] = useState(COLORS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const toggleSection = (id) => {
    setSections(sections.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const finishOnboarding = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const activeSecs = sections.filter(s => s.checked);

      // Use the centralized TemplateGenerator for full normalization
      const goalMap = { portfolio: 'Portfolio', store: 'Store', landing: 'Landing Page' };
      const styleMap = { minimalist: 'Minimalist', corporate: 'Corporate', creative: 'Creative' };

      const result = generatePageLayout({
        goal: goalMap[goal] || goal,
        style: styleMap[style] || style,
        sections: activeSecs.map(s => s.label),
        brandColor,
      });

      const projectId = generateId();
      const newProject = {
        projectId,
        projectName: 'My Generated Site',
        updatedAt: new Date().toISOString(),
        lastActivePage: 'home',
        GlobalTheme: result.GlobalTheme,
        pages: [
          { id: generateId(), name: 'home', sections: result.blocks }
        ]
      };

      const existingProjects = JSON.parse(localStorage.getItem('builder_projects') || '[]');
      localStorage.setItem('builder_projects', JSON.stringify([newProject, ...existingProjects]));

      navigate(`/builder?id=${projectId}`);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-6 w-full absolute inset-0 z-50 overflow-y-auto pt-24">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-10 md:p-14 border border-slate-100 relative overflow-hidden mb-12 flex-shrink-0 mt-8">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
          <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        {isGenerating ? (
          <div className="py-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Sparkles size={32} className="text-sky-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Generating your website...</h2>
            <p className="text-slate-500 font-medium">Applying AI layouts and styling preferences.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-10">
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe size={24} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">What are you building?</h1>
                  <p className="text-slate-500 font-medium mt-2">We'll tailor the structure to your specific goal.</p>
                </div>
                <div className="grid gap-4">
                  {GOALS.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`flex items-center gap-5 p-5 border-2 rounded-2xl transition-all text-left ${goal === g.id ? 'border-sky-500 bg-sky-50/50 shadow-md shadow-sky-100' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${goal === g.id ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <g.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{g.label}</h3>
                        <p className="text-sm text-slate-500 font-medium">{g.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-10">
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Layout size={24} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Choose a Design Style</h1>
                  <p className="text-slate-500 font-medium mt-2">You can always customize every pixel later.</p>
                </div>
                <div className="grid gap-4">
                  {STYLES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={`flex items-center gap-5 p-5 border-2 rounded-2xl transition-all text-left ${style === s.id ? 'border-sky-500 shadow-md shadow-sky-100 ' + s.bg : 'border-slate-100 hover:border-slate-300 ' + s.bg}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${style === s.id ? 'border-sky-500' : 'border-slate-300'}`}>
                        {style === s.id && <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{s.label}</h3>
                        <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-10">
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <CheckSquare size={24} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Select Page Sections</h1>
                  <p className="text-slate-500 font-medium mt-2">What blocks do you need on your homepage?</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => toggleSection(s.id)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-2xl transition-all text-left ${s.checked ? 'border-sky-500 bg-sky-50/50 shadow-sm' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                    >
                      <div className={`w-5 h-5 border flex flex-shrink-0 items-center justify-center rounded ${s.checked ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 bg-white'}`}>
                        {s.checked && <CheckSquare size={14} className="stroke-[3px]" />}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-10">
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Palette size={24} />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pick a Brand Color</h1>
                  <p className="text-slate-500 font-medium mt-2">Sets the default accent for buttons and links.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      onClick={() => setBrandColor(c)}
                      className={`w-14 h-14 rounded-2xl shadow-sm border-4 transition-all hover:scale-110 active:scale-95 ${brandColor === c ? 'border-slate-900 scale-110' : 'border-white'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-100">
              {step > 1 ? (
                <button onClick={handleBack} className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
                  <ChevronLeft size={16} /> Back
                </button>
              ) : <div />}
              
              {step < 4 ? (
                <button onClick={handleNext} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-black hover:shadow-xl transition-all flex items-center gap-2">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={finishOnboarding} className="px-6 py-3 bg-sky-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-sky-200 hover:bg-sky-700 hover:shadow-xl transition-all flex items-center gap-2">
                  <Sparkles size={16} /> Generate Website
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
