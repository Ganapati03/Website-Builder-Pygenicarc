import { Code2, FolderOpen, MessageSquare, Rocket, Settings, Layout, X, Palette, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

interface SidebarProps {
  className?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ className = '', mobileOpen = false, onMobileClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const navItems = [
    { icon: FolderOpen, label: 'My Projects', path: '/dashboard' },
    { icon: Layout, label: 'Templates', path: '/templates' },
    { icon: Palette, label: 'Customizer', path: '/customizer' },
    { icon: MessageSquare, label: 'AI Chat', path: '/builder' },
    { icon: Rocket, label: 'Deploy', path: '/deploy' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-[#1a1a1a] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF88]" />
          <span className="text-lg sm:text-xl text-[#E0E0E0]">WebBuilder AI</span>
        </Link>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <ul className="space-y-1 sm:space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    isActive
                      ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30'
                      : 'text-[#A0A0A0] hover:bg-[#1a1a1a] hover:text-[#E0E0E0]'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-3 sm:p-4 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-[#0D0D0D]">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00FF88] flex items-center justify-center text-[#0D0D0D] text-sm sm:text-base flex-shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-[#E0E0E0] truncate">John Doe</p>
            <p className="text-xs text-[#A0A0A0] truncate">john@example.com</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-[#1a1a1a] text-[#A0A0A0] hover:text-[#FF4444] transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:w-64 xl:w-72 bg-[#121212] border-r border-[#1a1a1a] flex-col ${className}`}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onMobileClose}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 sm:w-72 bg-[#121212] border-r border-[#1a1a1a] flex flex-col z-50 lg:hidden">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}