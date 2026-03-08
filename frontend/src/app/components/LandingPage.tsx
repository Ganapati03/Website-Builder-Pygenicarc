import { Sparkles, Code2, Layout, Rocket, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#00FF88] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#00FF88] rounded-full blur-[120px]"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF88]" />
            <span className="text-lg sm:text-xl text-[#E0E0E0]">WebBuilder AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-3 lg:gap-4">
            <Link 
              to="/login"
              className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base text-[#E0E0E0] hover:bg-[#121212] transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/login"
              className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-[#E0E0E0]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden relative z-20 bg-[#121212] border-b border-[#1a1a1a] px-4 py-4 space-y-2">
            <Link 
              to="/login"
              className="block px-4 py-2 rounded-lg text-[#E0E0E0] hover:bg-[#1a1a1a] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/login"
              className="block px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <div className="inline-block mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#121212] border border-[#00FF88]/30">
            <span className="text-xs sm:text-sm text-[#00FF88]">✨ AI-Powered Website Generation</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-[#E0E0E0] leading-tight">
            Build Websites <br />
            <span className="text-gradient">with AI</span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-[#A0A0A0] mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            Create stunning, production-ready websites in minutes using our AI-powered platform. 
            Chat with AI, edit code, and deploy instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/dashboard"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-all glow-green-hover inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Building
            </Link>
            <Link
              to="/templates"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#121212] text-[#E0E0E0] hover:bg-[#1a1a1a] border border-[#00FF88]/30 transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
              View Templates
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="text-3xl sm:text-4xl text-center mb-10 sm:mb-16 text-[#E0E0E0]">
          Everything You Need to Build
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <FeatureCard
            icon={<Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="AI Chat"
            description="Describe your website in plain English and let AI build it for you"
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="Code Editor"
            description="Full-featured VS Code-style editor with syntax highlighting"
          />
          <FeatureCard
            icon={<Layout className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="Templates"
            description="Start with professionally designed templates and customize them"
          />
          <FeatureCard
            icon={<Rocket className="w-6 h-6 sm:w-8 sm:h-8" />}
            title="One-Click Deploy"
            description="Deploy your website instantly with custom domain support"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a1a] mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-[#A0A0A0] text-sm sm:text-base">
          <p>&copy; 2026 WebBuilder AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 sm:p-6 rounded-xl bg-[#121212] border border-[#1a1a1a] hover:border-[#00FF88]/50 transition-all glow-green-hover group">
      <div className="mb-3 sm:mb-4 text-[#00FF88] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl mb-2 text-[#E0E0E0]">{title}</h3>
      <p className="text-sm sm:text-base text-[#A0A0A0]">{description}</p>
    </div>
  );
}