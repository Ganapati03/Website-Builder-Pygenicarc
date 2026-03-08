import { Sidebar } from './Sidebar';
import { Search, Filter, Sparkles, Menu, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { templatesService, Template } from '../../services/templates';

export function TemplatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTemplates();
  }, [selectedCategory]);

  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const category = selectedCategory === 'All' ? undefined : selectedCategory;
      const response = await templatesService.getTemplates(category);
      
      if (response.success && response.data) {
        setTemplates(response.data.templates || []);
        
        // Get categories from response if available
        if (response.data.categories) {
          setCategories(['All', ...response.data.categories]);
        }
      } else {
        setError(response.error || 'Failed to load templates');
      }
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError('Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter templates by search query
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl sm:text-2xl text-[#E0E0E0]">Templates</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#00FF88] focus:outline-none w-48 lg:w-64"
              />
            </div>
            <button className="sm:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
              <Search className="w-5 h-5 text-[#A0A0A0]" />
            </button>
            <button className="p-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-all text-xs sm:text-sm ${
                    category === selectedCategory
                      ? 'bg-[#00FF88] text-[#0D0D0D]'
                      : 'bg-[#121212] text-[#E0E0E0] hover:bg-[#1a1a1a] border border-[#1a1a1a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#00FF88] animate-spin" />
                <span className="ml-3 text-[#A0A0A0]">Loading templates...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                  onClick={fetchTemplates}
                  className="px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredTemplates.length === 0 && (
              <div className="text-center py-20">
                <Sparkles className="w-12 h-12 text-[#A0A0A0] mx-auto mb-4" />
                <p className="text-[#A0A0A0]">No templates found</p>
              </div>
            )}

            {/* Templates Grid */}
            {!loading && !error && filteredTemplates.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="rounded-xl bg-[#121212] border border-[#1a1a1a] overflow-hidden hover:border-[#00FF88]/50 transition-all group glow-green-hover"
                  >
                    {/* Template Preview */}
                    <div className="aspect-video bg-[#0D0D0D] border-b border-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#A0A0A0] group-hover:text-[#00FF88] transition-colors" />
                    </div>

                    {/* Template Info */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base sm:text-lg text-[#E0E0E0]">{template.name}</h3>
                        <span className="px-2 py-1 rounded bg-[#00FF88]/10 text-[#00FF88] text-xs whitespace-nowrap">
                          {template.category}
                        </span>
                      </div>
                    <p className="text-xs sm:text-sm text-[#A0A0A0] mb-4">{template.description}</p>
                    
                      <div className="flex gap-2">
                        <Link to={`/customizer?template=${template.id}`} className="flex-1">
                          <button className="w-full py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors text-sm sm:text-base">
                            Use Template
                          </button>
                        </Link>
                        <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors text-sm sm:text-base">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}