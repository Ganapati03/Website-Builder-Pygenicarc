import React, { useState, useEffect } from 'react';
import { Card } from '../../components/GenericComponents';
import { Folder, Plus, Search, Filter, Trash2, ExternalLink, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SECTION_MAP } from './Renderer';
import { BuilderThemeProvider } from './BuilderThemeContext';
import * as Icons from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('builder_projects') || '[]');
    setProjects(saved.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  }, []);

  const handleOpen = (proj) => {
    // Navigate to the builder with ID and optionally the last active page
    const pageParam = proj.lastActivePage ? `&page=${proj.lastActivePage}` : '';
    navigate(`/builder?id=${proj.projectId}${pageParam}`);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      const updated = projects.filter(p => p.projectId !== id);
      setProjects(updated);
      localStorage.setItem('builder_projects', JSON.stringify(updated));
    }
  };

  const createNew = () => {
    navigate('/onboarding');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Project Hub</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your {projects.length} websites.</p>
        </div>
        <button
          onClick={createNew}
          className="flex items-center justify-center gap-2 bg-sky-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-sky-100 hover:bg-sky-700 transition-all active:scale-95 text-sm"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Folder size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No projects yet</h3>
          <p className="text-sm text-slate-500 max-w-xs mb-6">Start by choosing a template or building from scratch.</p>
          <button
            onClick={createNew}
            className="text-sky-600 text-sm font-bold hover:underline flex items-center gap-2"
          >
            Start your first project <ExternalLink size={14} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((proj) => (
            <Card
              key={proj.projectId}
              onClick={() => handleOpen(proj)}
              className="group hover:border-sky-500 transition-all cursor-pointer overflow-hidden border-slate-200 bg-white relative"
            >
              <div className="h-40 bg-white relative overflow-hidden group-hover:bg-slate-50 transition-colors border-b border-slate-100">
                {/* ── Real Visual Preview ── */}
                <div className="absolute inset-0 origin-top-left scale-[0.22] w-[456%] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <BuilderThemeProvider theme={proj.GlobalTheme}>
                    <div
                      className="min-h-[1400px] relative transition-colors"
                      style={{ 
                        backgroundColor: proj.GlobalTheme?.colors?.background || '#ffffff',
                        width: '100%' 
                      }}
                    >
                      {(() => {
                        const previewPage = proj.pages?.find(p => p.name === proj.lastActivePage) || proj.pages?.[0];
                        const sections = previewPage?.sections || proj.sections || [];

                        if (sections.length === 0) {
                          return (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center transform scale-[2]">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-slate-100">
                                  <Icons.Layout size={32} className="text-slate-200" />
                                </div>
                                <p className="text-slate-300 font-black uppercase tracking-widest text-xs">Empty</p>
                              </div>
                            </div>
                          );
                        }

                        return sections.map((section) => {
                          const SectionComponent = SECTION_MAP[section.type];
                          if (!SectionComponent) return null;
                          const isFullWidth = ['Navbar', 'Hero', 'Pricing', 'Features', 'FAQ', 'Testimonials', 'Chips', 'Timeline'].includes(section.type);

                          return (
                            <div
                              key={section.id}
                              style={{
                                position: 'absolute',
                                left: isFullWidth ? 0 : (section.x || 0),
                                top: (section.y || 0),
                                width: isFullWidth ? '100%' : 'auto'
                              }}
                            >
                              <SectionComponent settings={section.settings} styles={section.styles} />
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </BuilderThemeProvider>
                </div>

                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Publishing to GitHub... (Backend integration coming soon!)');
                    }}
                    className="p-1.5 bg-white/90 backdrop-blur-md text-slate-400 hover:text-slate-900 rounded-lg shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    title="Publish to GitHub"
                  >
                    <Icons.Github size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/view/${proj.projectId}`, '_blank');
                    }}
                    className="p-1.5 bg-white/90 backdrop-blur-md text-slate-400 hover:text-sky-500 rounded-lg shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    title="Live View"
                  >
                    <ExternalLink size={14} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(proj.projectId, e)}
                    className="p-1.5 bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500 rounded-lg shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900 mb-0.5 group-hover:text-sky-600 transition-colors uppercase tracking-tight text-sm truncate">{proj.projectName || 'Untitled'}</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase tracking-wider">
                  {new Date(proj.updatedAt).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap gap-1.5 min-h-[32px] mb-4">
                  {proj.pages?.slice(0, 3).map((page) => (
                    <button
                      key={page.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/builder?id=${proj.projectId}&page=${page.name.toLowerCase()}`);
                      }}
                      className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all border ${proj.lastActivePage === page.name
                          ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                          : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-sky-200 hover:text-sky-600'
                        }`}
                    >
                      {page.name}
                    </button>
                  ))}
                  {proj.pages?.length > 3 && (
                    <span className="text-[9px] text-slate-300 font-bold flex items-center px-1">+{proj.pages.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(proj);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-2 bg-slate-900 text-white rounded-lg text-[10px] font-black hover:bg-black transition-all active:scale-95"
                  >
                    Open Builder
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
