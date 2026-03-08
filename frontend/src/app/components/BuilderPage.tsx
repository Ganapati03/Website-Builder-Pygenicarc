import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { 
  FileCode, 
  FolderTree, 
  Play, 
  Save, 
  Eye, 
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Send,
  X,
  Menu
} from 'lucide-react';

export function BuilderPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  const fileTree = [
    {
      name: 'src',
      type: 'folder' as const,
      children: [
        { name: 'index.html', type: 'file' as const },
        { name: 'styles.css', type: 'file' as const },
        { name: 'script.js', type: 'file' as const },
      ]
    },
    { name: 'package.json', type: 'file' as const },
  ];

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const chatMessages = [
    { role: 'ai', content: 'Hello! I can help you build your website. What would you like to create?' },
    { role: 'user', content: 'Create a landing page for a tech startup' },
    { role: 'ai', content: "I've created a modern landing page with a hero section, features, and call-to-action buttons. The design uses a clean, professional style with responsive layout. Would you like me to make any changes?" },
  ];

  return (
    <div className="flex h-screen bg-[#0D0D0D]">
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-14 sm:h-16 border-b border-[#1a1a1a] flex items-center justify-between px-4 sm:px-6 bg-[#121212]">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-[#E0E0E0]" />
            </button>
            <h1 className="text-sm sm:text-base lg:text-lg text-[#E0E0E0] truncate">Landing Page Project</h1>
            <div className="hidden sm:block px-2 sm:px-3 py-1 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-xs whitespace-nowrap">
              Unsaved
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="px-2 sm:px-4 py-2 rounded-lg bg-[#1a1a1a] text-[#E0E0E0] hover:bg-[#242424] transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Save className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button className="px-2 sm:px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Deploy</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Explorer - Hidden on small screens */}
          <div className={`${showFileExplorer ? 'w-48 sm:w-56 lg:w-64' : 'w-0'} hidden md:block border-r border-[#1a1a1a] bg-[#121212] overflow-auto transition-all`}>
            {showFileExplorer && (
              <>
                <div className="p-3 sm:p-4 border-b border-[#1a1a1a] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#E0E0E0]">
                    <FolderTree className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Files</span>
                  </div>
                  <button
                    onClick={() => setShowFileExplorer(false)}
                    className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-[#A0A0A0]" />
                  </button>
                </div>
                <div className="p-2">
                  <FileTreeView items={fileTree} expandedFolders={expandedFolders} toggleFolder={toggleFolder} />
                </div>
              </>
            )}
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <div className="h-8 sm:h-10 border-b border-[#1a1a1a] flex items-center justify-between px-2 sm:px-4 bg-[#0D0D0D]">
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-[#121212] rounded-t-lg text-xs sm:text-sm text-[#E0E0E0]">
                <FileCode className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>index.html</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                {!showFileExplorer && (
                  <button
                    onClick={() => setShowFileExplorer(true)}
                    className="hidden md:block p-1 sm:p-1.5 text-xs sm:text-sm text-[#A0A0A0] hover:text-[#00FF88]"
                  >
                    Files
                  </button>
                )}
                {!showPreview && (
                  <button
                    onClick={() => setShowPreview(true)}
                    className="p-1 sm:p-1.5 text-xs sm:text-sm text-[#A0A0A0] hover:text-[#00FF88]"
                  >
                    Preview
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <CodeEditor />
            </div>
          </div>

          {/* Live Preview - Responsive */}
          <div className={`${showPreview ? 'w-full sm:w-1/2 lg:w-1/3' : 'w-0'} border-l border-[#1a1a1a] bg-[#121212] flex-col transition-all hidden sm:flex`}>
            {showPreview && (
              <>
                <div className="h-10 border-b border-[#1a1a1a] flex items-center justify-between px-4">
                  <div className="flex items-center gap-2 text-[#E0E0E0]">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsChatOpen(!isChatOpen)}
                      className="px-2 sm:px-3 py-1 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors flex items-center gap-2 text-xs sm:text-sm"
                    >
                      <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden lg:inline">AI Chat</span>
                    </button>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-[#A0A0A0]" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto bg-white">
                  <div className="p-8 text-center text-gray-600">
                    <p className="text-sm sm:text-base">Preview will appear here</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile AI Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="sm:hidden fixed bottom-4 right-4 w-12 h-12 rounded-full bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-all glow-green shadow-lg flex items-center justify-center z-30"
        >
          <MessageSquare className="w-6 h-6" />
        </button>

        {/* AI Chat Panel - Responsive */}
        {isChatOpen && (
          <div className="fixed bottom-0 right-0 w-full sm:w-96 h-[70vh] sm:h-[500px] bg-[#121212] border-l border-t border-[#1a1a1a] flex flex-col shadow-2xl z-40">
            <div className="h-12 border-b border-[#1a1a1a] flex items-center justify-between px-4">
              <div className="flex items-center gap-2 text-[#E0E0E0]">
                <MessageSquare className="w-5 h-5 text-[#00FF88]" />
                <span className="text-sm sm:text-base">AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
              >
                <X className="w-5 h-5 text-[#A0A0A0]" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg text-sm sm:text-base ${
                      msg.role === 'user'
                        ? 'bg-[#1a1a1a] text-[#E0E0E0]'
                        : 'bg-[#0D0D0D] text-[#E0E0E0] border border-[#00FF88]/30'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-4 border-t border-[#1a1a1a]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Describe the website you want to build..."
                  className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] text-[#E0E0E0] placeholder-[#A0A0A0] focus:border-[#00FF88] focus:outline-none text-sm sm:text-base"
                />
                <button className="px-3 sm:px-4 py-2 rounded-lg bg-[#00FF88] text-[#0D0D0D] hover:bg-[#00cc66] transition-colors">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTreeView({ 
  items, 
  expandedFolders, 
  toggleFolder, 
  level = 0 
}: { 
  items: any[]; 
  expandedFolders: Set<string>; 
  toggleFolder: (name: string) => void;
  level?: number;
}) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.name}>
          <button
            onClick={() => item.type === 'folder' && toggleFolder(item.name)}
            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#1a1a1a] rounded text-xs sm:text-sm text-[#E0E0E0]"
            style={{ paddingLeft: `${level * 12 + 8}px` }}
          >
            {item.type === 'folder' ? (
              expandedFolders.has(item.name) ? (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              )
            ) : (
              <FileCode className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF88]" />
            )}
            <span>{item.name}</span>
          </button>
          {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
            <FileTreeView
              items={item.children}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function CodeEditor() {
  const code = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <nav class="navbar">
      <div class="logo">TechStartup</div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <section class="hero">
    <h1>Build Amazing Products</h1>
    <p>Transform your ideas into reality with our platform</p>
    <button class="cta-button">Get Started</button>
  </section>

  <script src="script.js"></script>
</body>
</html>`;

  return (
    <pre className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-[#E0E0E0] bg-[#0D0D0D]">
      <code>{code}</code>
    </pre>
  );
}
