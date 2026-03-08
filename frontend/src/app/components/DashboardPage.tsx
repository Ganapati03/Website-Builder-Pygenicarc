import { Plus, Search, MoreVertical, Globe, Clock, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const projects = [
    {
      id: 1,
      name: 'E-commerce Store',
      url: 'ecommerce-demo.webbuilder.ai',
      lastEdited: '2 hours ago',
      status: 'deployed'
    },
    {
      id: 2,
      name: 'Portfolio Website',
      url: 'portfolio.webbuilder.ai',
      lastEdited: '1 day ago',
      status: 'deployed'
    },
    {
      id: 3,
      name: 'Landing Page',
      url: 'landing.webbuilder.ai',
      lastEdited: '3 days ago',
      status: 'draft'
    },
  ];

  return (
    <div className="flex h-screen bg-[#0D0D0D]">
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 sm:h-16 border-b border-[#1a1a1a] flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#121212]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-[#E0E0E0]" />
            </button>
            <h1 className="text-xl sm:text-2xl text-[#E0E0E0]">My Projects</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#00FF88] focus:outline-none w-48 lg:w-64"
              />
            </div>
            <button className="sm:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
              <Search className="w-5 h-5 text-[#A0A0A0]" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Create New Project Button */}
            <Link
              to="/builder"
              className="block mb-6 sm:mb-8 p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#1a1a1a] hover:border-[#00FF88]/50 transition-all group"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00FF88]/10 flex items-center justify-center group-hover:bg-[#00FF88]/20 transition-colors">
                  <Plus className="w-6 h-6 text-[#00FF88]" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl text-[#E0E0E0] mb-1">Create New Project</h3>
                  <p className="text-sm sm:text-base text-[#A0A0A0]">Start building with AI or choose a template</p>
                </div>
              </div>
            </Link>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 sm:p-6 rounded-xl bg-[#121212] border border-[#1a1a1a] hover:border-[#00FF88]/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg text-[#E0E0E0] mb-1 truncate">{project.name}</h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A0A0A0]">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{project.url}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-[#A0A0A0]" />
                    </button>
                  </div>

                  <div className="mb-4 h-24 sm:h-32 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center">
                    <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-[#A0A0A0]" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A0A0A0]">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{project.lastEdited}</span>
                    </div>
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs ${
                      project.status === 'deployed'
                        ? 'bg-[#00FF88]/10 text-[#00FF88]'
                        : 'bg-[#A0A0A0]/10 text-[#A0A0A0]'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1a1a1a] flex gap-2">
                    <Link
                      to="/customizer"
                      className="flex-1 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] text-center hover:bg-[#00cc66] transition-colors text-sm sm:text-base"
                    >
                      Customize
                    </Link>
                    <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors text-sm sm:text-base">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}