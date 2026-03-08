import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Rocket, Globe, CheckCircle2, Copy, ExternalLink, Settings, Menu } from 'lucide-react';

export function DeployPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [domain, setDomain] = useState('my-awesome-site');
  const deployedUrl = `${domain}.webbuilder.ai`;

  const handleDeploy = () => {
    // Simulate deployment
    setTimeout(() => {
      setIsDeployed(true);
    }, 1500);
  };

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
            <h1 className="text-xl sm:text-2xl text-[#E0E0E0]">Deploy</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {!isDeployed ? (
              <div className="space-y-6 sm:space-y-8">
                {/* Project Summary */}
                <div className="p-4 sm:p-6 rounded-xl bg-[#121212] border border-[#1a1a1a]">
                  <h2 className="text-lg sm:text-xl text-[#E0E0E0] mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF88]" />
                    Project Summary
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Project Name</span>
                      <span className="text-[#E0E0E0] truncate ml-4">Landing Page Project</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Files</span>
                      <span className="text-[#E0E0E0]">3 files</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Last Modified</span>
                      <span className="text-[#E0E0E0]">2 hours ago</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Status</span>
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-xs sm:text-sm">
                        Ready to Deploy
                      </span>
                    </div>
                  </div>
                </div>

                {/* Domain Configuration */}
                <div className="p-4 sm:p-6 rounded-xl bg-[#121212] border border-[#1a1a1a]">
                  <h2 className="text-lg sm:text-xl text-[#E0E0E0] mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF88]" />
                    Domain Configuration
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#E0E0E0] mb-2">
                        Custom Subdomain
                      </label>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                          type="text"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] focus:border-[#00FF88] focus:outline-none text-sm sm:text-base"
                        />
                        <span className="text-[#A0A0A0] text-sm sm:text-base text-center sm:text-left">.webbuilder.ai</span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-[#A0A0A0]">
                        Your site will be available at: <span className="text-[#00FF88] break-all">{deployedUrl}</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1a1a1a]">
                      <label className="flex items-center gap-2 text-[#E0E0E0] cursor-pointer text-sm sm:text-base">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#1a1a1a]" />
                        <span>Enable HTTPS (SSL Certificate)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Deploy Button */}
                <button
                  onClick={handleDeploy}
                  className="w-full py-3 sm:py-4 rounded-xl bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-all glow-green-hover flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                >
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  Deploy Now
                </button>

                <p className="text-center text-xs sm:text-sm text-[#A0A0A0]">
                  Deployment typically takes 30-60 seconds
                </p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {/* Success Message */}
                <div className="p-6 sm:p-8 rounded-xl bg-[#121212] border border-[#00FF88]/50 text-center glow-green">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#00FF88]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#00FF88]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl text-[#E0E0E0] mb-2">
                    Deployment Successful! 🎉
                  </h2>
                  <p className="text-sm sm:text-base text-[#A0A0A0] mb-6">
                    Your website is now live and accessible worldwide
                  </p>

                  {/* Live URL */}
                  <div className="max-w-md mx-auto p-3 sm:p-4 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 flex items-center gap-2 text-[#00FF88] min-w-0 w-full sm:w-auto">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="truncate text-sm sm:text-base">{deployedUrl}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors">
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors">
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deployment Details */}
                <div className="p-4 sm:p-6 rounded-xl bg-[#121212] border border-[#1a1a1a]">
                  <h3 className="text-base sm:text-lg text-[#E0E0E0] mb-4">Deployment Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Status</span>
                      <span className="flex items-center gap-2 text-[#00FF88]">
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        Live
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Deployed At</span>
                      <span className="text-[#E0E0E0]">Just now</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#1a1a1a] text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">SSL</span>
                      <span className="text-[#00FF88]">Enabled</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm sm:text-base">
                      <span className="text-[#A0A0A0]">Build Time</span>
                      <span className="text-[#E0E0E0]">45s</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setIsDeployed(false)}
                    className="flex-1 py-2 sm:py-3 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors text-sm sm:text-base"
                  >
                    Deploy Again
                  </button>
                  <button className="flex-1 py-2 sm:py-3 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors text-sm sm:text-base">
                    View Analytics
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}