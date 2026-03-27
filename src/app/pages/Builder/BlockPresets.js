import { 
  Layout, 
  ImageIcon, 
  CreditCard, 
  AlignCenter, 
  AlignLeft, 
  Layers, 
  Columns,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Tag,
  BarChart3,
  Mail,
  List,
  Briefcase,
  Megaphone,
  Building2,
  BookOpen,
  Users,
  Bell,
  PanelBottom
} from 'lucide-react';

export const BLOCK_VARIANTS = {
  Navbar: [
    {
      id: 'nav-standard',
      label: 'Standard Nav',
      icon: Layout,
      settings: {
        logoText: 'CREATOR',
        links: [
          { label: 'Features', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Sign In', href: '#', isButton: true }
        ]
      },
      styles: { backgroundColor: '#ffffff', paddingY: '1rem', sticky: true, animation: 'none' }
    },
    {
      id: 'nav-minimal',
      label: 'Minimalist',
      icon: Layers,
      settings: {
        logoText: 'PORTFOLIO',
        links: [
          { label: 'Work', href: '#' },
          { label: 'About', href: '#' },
          { label: 'Contact', href: '#' }
        ]
      },
      styles: { backgroundColor: 'transparent', paddingY: '1.5rem', sticky: false, animation: 'none' }
    },
    {
      id: 'nav-dark',
      label: 'Midnight',
      icon: Layout,
      settings: {
        logoText: 'STUDIO',
        links: [
          { label: 'Services', href: '#' },
          { label: 'Blog', href: '#' },
          { label: 'Hire Us', href: '#', isButton: true }
        ]
      },
      styles: { backgroundColor: '#0f172a', paddingY: '1rem', sticky: true, animation: 'none' }
    },
    {
      id: 'nav-glass',
      label: 'Glassmorphism',
      icon: Layers,
      settings: {
        logoText: 'ACME',
        links: [
          { label: 'Products', href: '#' },
          { label: 'Company', href: '#' },
          { label: 'Login', href: '#', isButton: true, style: 'outline' }
        ]
      },
      styles: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        paddingY: '1rem',
        sticky: true,
        animation: 'fade-in',
        borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
      }
    },
    {
      id: 'nav-centered-new',
      label: 'Centered',
      icon: AlignCenter,
      settings: {
        logoText: 'LUMINA',
        links: [
          { label: 'Home', href: '#' },
          { label: 'Portfolio', href: '#' },
          { label: 'Contact', href: '#' }
        ]
      },
      styles: { backgroundColor: '#ffffff', paddingY: '1.5rem', sticky: false, animation: 'none', align: 'center' }
    },
    {
      id: 'nav-branded',
      label: 'Branded',
      icon: Tag,
      settings: {
        logoText: 'VERTEX',
        links: [
          { label: "Solutions", href: "#" },
          { label: "Docs", href: "#" },
          { label: "Get Started", href: "#", isButton: true, style: "solid", color: "#ffffff" }
        ]
      },
      styles: { backgroundColor: 'var(--builder-primary)', textColor: '#ffffff', paddingY: '1rem', sticky: true, animation: 'slide-down' }
    },
    {
      id: "nav-soft-shadow",
      label: "Soft App Nav",
      icon: Layout,
      settings: {
        logoText: "APP",
        links: [
          { label: "Dashboard", href: "#", isButton: false },
          { label: "Settings", href: "#", isButton: false },
          { label: "Upgrade", href: "#", isButton: true, style: "primary", color: "var(--builder-primary)" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingY: "1rem", sticky: true, animation: "none", borderBottom: "1px solid rgba(0,0,0,0.05)", shadow: "sm" }
    },
    {
      id: "nav-transparent-clean",
      label: "Transparent Clean",
      icon: Layers,
      settings: {
        logoText: "AGENCY",
        links: [
          { label: "Case Studies", href: "#", isButton: false },
          { label: "Team", href: "#", isButton: false },
          { label: "Contact", href: "#", isButton: false }
        ]
      },
      styles: { backgroundColor: "transparent", paddingY: "2rem", sticky: false, animation: "none", align: "center" }
    }
  ],
  Hero: [
    {
      id: 'hero-classic',
      label: 'Split Layout',
      icon: Columns,
      settings: {
        headline: 'Create with confidence.',
        subheadline: 'The all-in-one platform for modern professionals.',
        ctaText: 'Get Started',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format'
      },
      styles: { align: 'left', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    },
    {
      id: 'hero-centered',
      label: 'Centered',
      icon: AlignCenter,
      settings: {
        headline: 'Focus on what matters.',
        subheadline: 'Eliminate distractions and build your dream today.',
        ctaText: 'Start Building',
        image: null
      },
      styles: { align: 'center', paddingTop: '120px', paddingBottom: '120px', animation: 'zoom-in', bgGradient: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }
    },
    {
      id: 'hero-minimal',
      label: 'Minimal Text',
      icon: AlignLeft,
      settings: {
        headline: 'Hello World.',
        subheadline: 'A beautiful journey begins here.',
        ctaText: 'Explore',
        image: null
      },
      styles: { align: 'left', paddingTop: '160px', paddingBottom: '160px', animation: 'fade-up' }
    },
    {
      id: "hero-gradient-glass",
      label: "Gradient Glass",
      icon: Sparkles,
      settings: {
        headline: "Scale your workflow effortlessly.",
        subheadline: "Join thousands of teams building the future with our tools.",
        ctaText: "Start for free",
        image: null
      },
      styles: { bgGradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", paddingTop: "140px", paddingBottom: "140px", align: "center", animation: "zoom-in" }
    },
    {
      id: "hero-split-modern",
      label: "Split Modern",
      icon: Columns,
      settings: {
        headline: "Design without limits.",
        subheadline: "Create beautiful, responsive interfaces faster than ever before.",
        buttons: [
          { id: "hero-btn-1", text: "Download Now", style: "primary" },
          { id: "hero-btn-2", text: "View Demo", style: "ghost" }
        ],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px", align: "left", animation: "fade-up" }
    },
    {
      id: "hero-dark-minimal",
      label: "Dark Minimal",
      icon: Layers,
      settings: {
        headline: "The new standard.",
        subheadline: "Minimal, fast, and completely customizable.",
        ctaText: "Request Access",
        image: null
      },
      styles: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingTop: "160px", paddingBottom: "160px", align: "center", animation: "fade-up" }
    },
    {
      id: "hero-split-light",
      label: "Split Soft",
      icon: Columns,
      settings: {
        headline: "Build better tools.",
        subheadline: "Empower your team with a platform that scales automatically.",
        ctaText: "Start Building",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format"
      },
      styles: { align: "left", paddingTop: "120px", paddingBottom: "120px", backgroundColor: "#f8fafc", animation: "fade-up" }
    },
    {
      id: "hero-centered-clean",
      label: "Centered Clean",
      icon: AlignCenter,
      settings: {
        headline: "One platform for everything.",
        subheadline: "Stop managing multiple subscriptions. Bring your workflow together.",
        ctaText: "Get Access",
        image: null
      },
      styles: { align: "center", paddingTop: "140px", paddingBottom: "140px", backgroundColor: "#ffffff", animation: "fade-up" }
    }
  ],
  Pricing: [
    {
      id: 'pricing-grid',
      label: 'Modern Grid',
      icon: CreditCard,
      settings: {
        title: 'Simple Pricing',
        plans: [
          { name: 'Starter', price: '$0', features: ['Core features', 'Community support'] },
          { name: 'Pro', price: '$29', features: ['Advanced tools', 'Priority support'] },
          { name: 'Elite', price: '$99', features: ['Full custom tools', '24/7 Support'] }
        ]
      },
      styles: { animation: 'fade-up' }
    },
    {
      id: 'pricing-compact',
      label: 'Compact List',
      icon: Layers,
      settings: {
        title: 'Ready to upgrade?',
        plans: [
          { name: 'Monthly', price: '$15', features: ['Cancel anytime', 'All features'] },
          { name: 'Yearly', price: '$120', features: ['Save 30%', 'All features', 'Direct support'] }
        ]
      },
      styles: { animation: 'zoom-in' }
    },
    {
      id: "pricing-bento",
      label: "Bento Cards",
      icon: Layout,
      settings: {
        title: "Transparent Pricing",
        plans: [
          { name: "Hobby", price: "$9", features: ["1 Project", "Basic Analytics", "Community Support"] },
          { name: "Pro", price: "$49", features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domains"], color: "var(--builder-primary)" },
          { name: "Enterprise", price: "$199", features: ["Custom Contracts", "SLA", "Dedicated Success Manager"] }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up" }
    },
    {
      id: "pricing-minimal-cards",
      label: "Minimal Cards",
      icon: Tag,
      settings: {
        title: "Choose your plan",
        plans: [
          { name: "Basic", price: "Free", features: ["Up to 3 users", "Core features"] },
          { name: "Premium", price: "$29/mo", features: ["Unlimited users", "All features", "API access"] }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "zoom-in" }
    },
    {
      id: "pricing-dark-panel",
      label: "Dark Panel",
      icon: Layers,
      settings: {
        title: "Scale seamlessly",
        plans: [
          { name: "Creator", price: "$15", features: ["Content tools", "Basic monetization"] },
          { name: "Business", price: "$79", features: ["Team collaboration", "Advanced monetization", "White-labeling"] }
        ]
      },
      styles: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px", animation: "fade-up" }
    },
    {
      id: "pricing-split-cards",
      label: "Split Cards",
      icon: CreditCard,
      settings: {
        title: "Clear Plans",
        plans: [
          { name: "Team", price: "$49", features: ["Up to 5 users", "Basic Analytics"], color: "#f8fafc" },
          { name: "Enterprise", price: "$299", features: ["Unlimited users", "Advanced Analytics", "SSO"], color: "var(--builder-primary)" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up", align: "center" }
    },
    {
      id: "pricing-bento-new",
      label: "Bento Tiers",
      icon: Layers,
      settings: {
        title: "Accessible Pricing",
        plans: [
          { name: "Free", price: "$0", features: ["1 Project", "Community Support"] },
          { name: "Pro", price: "$12", features: ["Unlimited Projects", "Email Support"] },
          { name: "Max", price: "$39", features: ["Everything in Pro", "Priority Support"] }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "100px", paddingBottom: "100px", animation: "zoom-in", align: "center" }
    }
  ],
  Features: [
    {
      id: 'features-grid',
      label: 'Feature Grid',
      icon: Sparkles,
      settings: {
        title: 'Amazing Features',
        subtitle: 'Everything you need to succeed in one place.',
        items: [
          { title: 'Fast Setup', description: 'Get started in minutes with our intuitive interface.' },
          { title: 'Secure', description: 'Enterprise-grade security for all your data.' },
          { title: 'Scalable', description: 'Grow your project from zero to millions of users.' }
        ]
      },
      styles: { animation: 'fade-up' }
    },
    {
      id: "features-glass-grid",
      label: "Glass Bento",
      icon: Layout,
      settings: {
        title: "Why choose us?",
        subtitle: "Built for speed and reliability.",
        layout: "bento",
        items: [
          { title: "Lightning Fast", description: "Optimized for global edge networks.", span: "2" },
          { title: "Secure", description: "End-to-end encryption by default." },
          { title: "Collaborative", description: "Work together in real-time." },
          { title: "Analytics", description: "Deep insights into your metrics.", span: "2" }
        ]
      },
      styles: { bgGradient: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up" }
    },
    {
      id: "features-minimal-list",
      label: "Minimal List",
      icon: List,
      settings: {
        title: "Everything you need",
        subtitle: "",
        layout: "grid",
        items: [
          { title: "24/7 Support", description: "We're here whenever you need us." },
          { title: "Automated Backups", description: "Your data is always safe." },
          { title: "Custom Domains", description: "Bring your own brand identity." }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up", align: "center" }
    },
    {
      id: "features-split-zigzag",
      label: "Split Zigzag",
      icon: Columns,
      settings: {
        title: "Powerful Tools",
        subtitle: "Designed for modern teams.",
        layout: "grid",
        items: [
          { title: "Design Systems", description: "Sync tokens automatically." },
          { title: "Version Control", description: "Track every change perfectly." }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "120px", animation: "zoom-in" }
    },
    {
      id: "features-centered-grid",
      label: "Centered Grid",
      icon: Sparkles,
      settings: {
        title: "Everything you need",
        subtitle: "No plugins or extensions required.",
        layout: "grid",
        items: [
          { title: "Native Integrations", description: "Connects with the tools you already use daily." },
          { title: "Automated Workflows", description: "Set it up once and let the system do the rest." },
          { title: "Granular Permissions", description: "Control exactly who has access to what." }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up", align: "center" }
    },
    {
      id: "features-soft-bento",
      label: "Soft Bento",
      icon: Layers,
      settings: {
        title: "Platform Capabilities",
        subtitle: "Discover what you can build.",
        layout: "bento",
        items: [
          { title: "Global CDN", description: "Serve your assets from 200+ edge locations.", span: "2" },
          { title: "DDOS Protection", description: "Enterprise grade security standard." },
          { title: "Daily Backups", description: "Snapshot recovery within seconds." },
          { title: "Live Preview", description: "See changes instantly.", span: "2" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "120px", animation: "zoom-in", align: "left" }
    }
  ],
  FAQ: [
    {
      id: 'faq-standard',
      label: 'Question List',
      icon: HelpCircle,
      settings: {
        title: 'Common Questions',
        faqs: [
          { question: 'Is it free?', answer: 'Yes, we have a generous free tier for everyone.' },
          { question: 'Can I cancel?', answer: 'Of course, you can cancel at any time.' }
        ]
      },
      styles: { animation: 'fade-up' }
    },
    {
      id: "faq-split",
      label: "Split Layout",
      icon: Columns,
      settings: {
        title: "Frequently Asked Questions",
        faqs: [
          { question: "How does billing work?", answer: "We charge per active seat on a monthly basis." },
          { question: "Can I upgrade later?", answer: "Yes, you can upgrade or downgrade at any time." },
          { question: "Do you offer discounts for non-profits?", answer: "Yes, please contact our support team for a 50% discount." }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up", align: "left" }
    },
    {
      id: "faq-minimal-cards",
      label: "Minimal Cards",
      icon: Layers,
      settings: {
        title: "Got questions?",
        faqs: [
          { question: "Is there a setup fee?", answer: "No hidden fees. You only pay the listed price." },
          { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee." }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "80px", paddingBottom: "80px", animation: "zoom-in" }
    },
    {
      id: "faq-dark",
      label: "Dark Support",
      icon: HelpCircle,
      settings: {
        title: "Support & FAQs",
        faqs: [
          { question: "Do you integrate with Slack?", answer: "Yes, our native Slack integration is available on all plans." },
          { question: "Where is my data stored?", answer: "We use enterprise-grade AWS servers located in the US." }
        ]
      },
      styles: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px", animation: "fade-up" }
    },
    {
      id: "faq-clean",
      label: "Clean Layout",
      icon: HelpCircle,
      settings: {
        title: "Your Questions",
        faqs: [
          { question: "Do you offer an API?", answer: "Yes, our REST API is available on all paid plans." },
          { question: "Is there a limit on bandwidth?", answer: "We enforce a soft limit of 1TB per month." }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up" }
    },
    {
      id: "faq-contained",
      label: "Contained Layout",
      icon: Layers,
      settings: {
        title: "Answers & Support",
        faqs: [
          { question: "How is data protected?", answer: "All data traverses over 256-bit TLS encryption." },
          { question: "Can I export my data?", answer: "Yes, exports are available in CSV and JSON formats." }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "120px", animation: "fade-up" }
    }
  ],
  Testimonials: [
    {
      id: 'testimonials-grid',
      label: 'User Reviews',
      icon: MessageSquare,
      settings: {
        title: 'Loved by thousands',
        testimonials: [
          { author: 'Sarah J.', role: 'CEO', content: 'This changed my business forever.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
          { author: 'Mike D.', role: 'Designer', content: 'The best tool I have ever used.', avatar: 'https://i.pravatar.cc/150?u=mike' }
        ]
      },
      styles: { animation: 'fade-up' }
    },
    {
      id: "testimonials-highlight",
      label: "Highlights",
      icon: MessageSquare,
      settings: {
        title: "Don't just take our word for it",
        testimonials: [
          { author: "Emily Chen", role: "Product Manager", content: "The intuitive nature of this platform saved our team hundreds of hours during launch.", avatar: "https://i.pravatar.cc/150?u=emily" },
          { author: "Marcus Johnson", role: "CTO", content: "Unparalleled performance and developer experience. Highly recommended.", avatar: "https://i.pravatar.cc/150?u=marcus" },
          { author: "Sophia Taylor", role: "Freelancer", content: "It completely transformed how I deliver client projects.", avatar: "https://i.pravatar.cc/150?u=sophia" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px", animation: "zoom-in" }
    },
    {
      id: "testimonials-single-quote",
      label: "Single Quote",
      icon: AlignCenter,
      settings: {
        title: "",
        testimonials: [
          { author: "Elena R.", role: "Founder", content: "This is the single most important tool in our marketing stack.", avatar: "https://i.pravatar.cc/150?u=elena" }
        ]
      },
      styles: { backgroundColor: "var(--builder-primary)", textColor: "#ffffff", paddingTop: "140px", paddingBottom: "140px", animation: "fade-up", align: "center" }
    },
    {
      id: "testimonials-clean",
      label: "Clean Grid",
      icon: MessageSquare,
      settings: {
        title: "Customer Stories",
        testimonials: [
          { author: "Alex F.", role: "Developer", content: "The latency dropped by 50% after migrating.", avatar: "https://i.pravatar.cc/150?u=alex" },
          { author: "Sam R.", role: "Operations", content: "Support was incredible during our transition.", avatar: "https://i.pravatar.cc/150?u=sam" },
          { author: "Jordan P.", role: "Product", content: "This is easily the cleanest UI I've worked with.", avatar: "https://i.pravatar.cc/150?u=jordan" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up" }
    },
    {
      id: "testimonials-soft",
      label: "Soft Focus",
      icon: AlignLeft,
      settings: {
        title: "What people are saying",
        testimonials: [
          { author: "Kelly T.", role: "Designer", content: "It perfectly mapped into our component logic.", avatar: "https://i.pravatar.cc/150?u=kelly" },
          { author: "Tom W.", role: "Founder", content: "We shipped three weeks earlier than expected.", avatar: "https://i.pravatar.cc/150?u=tom" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "80px", paddingBottom: "80px", animation: "zoom-in" }
    }
  ],
  Chips: [
    {
      id: 'chips-row',
      label: 'Action Chips',
      icon: Tag,
      settings: {
        chips: [
          { label: 'Website', isActive: true },
          { label: 'Mobile App', isActive: false },
          { label: 'Desktop', isActive: false }
        ]
      },
      styles: { backgroundColor: '#f8fafc', animation: 'zoom-in' }
    },
    {
      id: "chips-soft",
      label: "Soft Tabs",
      icon: Layers,
      settings: {
        chips: [
          { label: "Overview", isActive: true },
          { label: "Integrations", isActive: false },
          { label: "Security", isActive: false }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "40px", paddingBottom: "40px", animation: "fade-up" }
    },
    {
      id: "chips-glass",
      label: "Glass Pills",
      icon: Tag,
      settings: {
        chips: [
          { label: "Frontend", isActive: true },
          { label: "Backend", isActive: true },
          { label: "DevOps", isActive: false }
        ]
      },
      styles: { backgroundColor: "transparent", paddingTop: "60px", paddingBottom: "60px", animation: "zoom-in" }
    },
    {
      id: "chips-dark",
      label: "Dark Rounded",
      icon: Layout,
      settings: {
        chips: [
          { label: "React", isActive: true },
          { label: "Vue", isActive: false },
          { label: "Svelte", isActive: false },
          { label: "Angular", isActive: false }
        ]
      },
      styles: { backgroundColor: "#0f172a", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up" }
    },
    {
      id: "chips-clean",
      label: "Clean Tags",
      icon: Tag,
      settings: {
        chips: [
          { label: "Engineering", isActive: true },
          { label: "Marketing", isActive: false },
          { label: "Sales", isActive: false }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "40px", paddingBottom: "40px", animation: "zoom-in" }
    },
    {
      id: "chips-soft-pills",
      label: "Soft Pills",
      icon: Layers,
      settings: {
        chips: [
          { label: "Q1 2026", isActive: true },
          { label: "Q2 2026", isActive: false },
          { label: "Q3 2026", isActive: false },
          { label: "Q4 2026", isActive: false }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "60px", paddingBottom: "60px", animation: "fade-up" }
    }
  ],
  Timeline: [
    {
      id: 'timeline-career',
      label: 'Career Journey',
      icon: Layers,
      settings: {
        title: 'Professional Path',
        subtitle: 'The milestones that defined my growth.',
        milestones: [
          { title: 'Project Lead', date: '2023 - Present', description: 'Driving product innovation and managing cross-disciplinary teams.' },
          { title: 'Senior Designer', date: '2020 - 2023', description: 'Evolved design languages for enterprise-grade SaaS products.' },
          { title: 'Junior Developer', date: '2018 - 2020', description: 'Built robust foundations in full-stack implementation.' }
        ]
      },
      styles: { backgroundColor: '#ffffff', animation: 'none' }
    },
    {
      id: "timeline-minimal",
      label: "Company History",
      icon: Layers,
      settings: {
        title: "Our History",
        subtitle: "How we got here.",
        milestones: [
          { title: "Series A Funding", date: "2023", description: "Raised $10M to scale the team." },
          { title: "Product Launch", date: "2021", description: "Released v1 to the public." },
          { title: "Company Founded", date: "2020", description: "Started in a small garage." }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "100px", paddingBottom: "100px", animation: "none" }
    },
    {
      id: "timeline-dark-roadmap",
      label: "Dark Roadmap",
      icon: Sparkles,
      settings: {
        title: "Product Roadmap",
        subtitle: "What we're building next.",
        milestones: [
          { title: "AI Integration", date: "Q4 2026", description: "Generative AI tools natively embedded." },
          { title: "Enterprise SSO", date: "Q3 2026", description: "Okta and SAML support." }
        ]
      },
      styles: { backgroundColor: "#0f172a", textColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px", animation: "none" }
    },
    {
      id: "timeline-soft",
      label: "Soft History",
      icon: Layers,
      settings: {
        title: "Project Progress",
        subtitle: "Key phases of our development cycle.",
        milestones: [
          { title: "Planning", date: "Month 1", description: "Defining the architecture and schemas." },
          { title: "Execution", date: "Month 2", description: "Writing the actual implementation code." },
          { title: "Review", date: "Month 3", description: "Security audits and performance testing." }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "120px", animation: "none" }
    },
    {
      id: "timeline-clean",
      label: "Clean Steps",
      icon: AlignCenter,
      settings: {
        title: "Onboarding",
        subtitle: "Getting started is easy.",
        milestones: [
          { title: "Create Workspace", date: "Step 1", description: "Set up your team domain and branding." },
          { title: "Invite Users", date: "Step 2", description: "Add your team members via email." },
          { title: "Start Building", date: "Step 3", description: "Create your first active project board." }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "none" }
    }
  ],
  Stats: [
    {
      id: 'stats-grid',
      label: 'Performance Stats',
      icon: BarChart3,
      settings: {
        stats: [
          { label: 'Years Experience', value: '10+' },
          { label: 'Clients Served', value: '250+' },
          { label: 'Retention Rate', value: '98%' }
        ]
      },
      styles: { backgroundColor: '#ffffff', animation: 'fade-up' }
    },
    {
      id: "stats-clean-row",
      label: "Clean Row",
      icon: Layers,
      settings: {
        stats: [
          { label: "Active Users", value: "100k+" },
          { label: "Countries", value: "45" },
          { label: "Uptime", value: "99.99%" },
          { label: "API Requests", value: "2B+" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up" }
    },
    {
      id: "stats-accent",
      label: "Accent Focus",
      icon: BarChart3,
      settings: {
        stats: [
          { label: "Hours Saved", value: "50k" },
          { label: "Community Members", value: "12k" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", accentColor: "var(--builder-primary)", paddingTop: "100px", paddingBottom: "100px", animation: "zoom-in" }
    },
    {
      id: "stats-dark-boxes",
      label: "Dark Metrics",
      icon: AlignCenter,
      settings: {
        stats: [
          { label: "Downloads", value: "5M+" },
          { label: "5-Star Reviews", value: "10k+" },
          { label: "Data Processed", value: "10PB" }
        ]
      },
      styles: { backgroundColor: "#0f172a", textColor: "#94a3b8", accentColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px", animation: "fade-up" }
    },
    {
      id: "stats-soft-cards",
      label: "Soft Cards",
      icon: BarChart3,
      settings: {
        stats: [
          { label: "Queries/sec", value: "50k+" },
          { label: "Latency", value: "12ms" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "100px", paddingBottom: "100px", animation: "fade-up", accentColor: "var(--builder-primary)" }
    },
    {
      id: "stats-clean-metrics",
      label: "Clean Metrics",
      icon: Layers,
      settings: {
        stats: [
          { label: "Lines of Code", value: "1.2M" },
          { label: "Commits", value: "24k" },
          { label: "Contributors", value: "450" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "120px", paddingBottom: "120px", animation: "zoom-in", accentColor: "#0f172a" }
    }
  ],
  Contact: [
    {
      id: 'contact-standard',
      label: 'Standard Form',
      icon: Mail,
      settings: {
        title: "Let's Get in Touch",
        subtitle: "I'd love to hear from you. Send me a message and I'll get back to you within 24 hours.",
        info: [
          { label: 'Email', value: 'contact@example.com', icon: 'Mail' },
          { label: 'Location', value: 'San Francisco, CA', icon: 'MapPin' }
        ]
      },
      styles: { backgroundColor: '#ffffff', animation: 'fade-up' }
    },
    {
      id: "contact-dark-card",
      label: "Dark Card",
      icon: Mail,
      settings: {
        title: "Partner with us",
        subtitle: "We are currently accepting new enterprise applications.",
        buttonText: "Join Waitlist",
        info: [
          { label: "Headquarters", value: "New York, NY", icon: "MapPin" }
        ]
      },
      styles: { backgroundColor: "#0f172a", textColor: "#ffffff", labelColor: "#cbd5e1", paddingTop: "120px", paddingBottom: "120px", animation: "zoom-in" }
    },
    {
      id: "contact-clean-centered",
      label: "Clean Minimal",
      icon: AlignCenter,
      settings: {
        title: "Say Hello",
        subtitle: "Follow us on social media or send an email directly.",
        buttonText: "Send Message",
        info: [
          { label: "General", value: "hello@company.com", icon: "Mail" },
          { label: "Press", value: "press@company.com", icon: "Tag" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up" }
    },
    {
      id: "contact-soft",
      label: "Soft Layout",
      icon: Mail,
      settings: {
        title: "Drop a line",
        subtitle: "Our sales team is available around the clock.",
        buttonText: "Send Message",
        info: [
          { label: "Support Desk", value: "help@platform.com", icon: "Mail" },
          { label: "Office", value: "London, UK", icon: "MapPin" }
        ]
      },
      styles: { backgroundColor: "#f8fafc", paddingTop: "120px", paddingBottom: "120px", animation: "fade-up" }
    },
    {
      id: "contact-clean",
      label: "Clean Form",
      icon: AlignCenter,
      settings: {
        title: "Contact Us",
        subtitle: "We typically respond within two business hours.",
        buttonText: "Submit",
        info: [
          { label: "Inquiries", value: "contact@platform.com", icon: "Mail" }
        ]
      },
      styles: { backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px", animation: "fade-up" }
    }
  ],
  Media: [
    {
      id: 'media-image',
      label: 'Image Block',
      icon: ImageIcon,
      type: 'Image',
      settings: {
        url: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format',
        alt: 'Cool image',
        mediaType: 'image',
      },
      styles: { width: '400px', borderRadius: '24px', shadow: true, rotate: 0, animation: 'fade-up' }
    },
    {
      id: 'media-video',
      label: 'Video Block',
      icon: ImageIcon,
      type: 'Video',
      settings: {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        mediaType: 'video',
        autoPlay: false,
        loop: true,
        muted: true,
        controls: true
      },
      styles: { width: '600px', borderRadius: '24px', shadow: true, rotate: 0, animation: 'fade-up' }
    },
    {
      id: 'media-banner',
      label: 'Banner Image',
      icon: ImageIcon,
      type: 'Image',
      settings: {
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&w=1200&q=80',
        alt: 'Banner image',
        mediaType: 'image',
        objectFit: 'cover',
      },
      styles: { width: '100%', height: '320px', borderRadius: '16px', shadow: true, rotate: 0, animation: 'fade-up' }
    },
    {
      id: 'media-autoplay-video',
      label: 'Auto-Play Video',
      icon: ImageIcon,
      type: 'Video',
      settings: {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        mediaType: 'video',
        autoPlay: true,
        loop: true,
        muted: true,
        controls: false
      },
      styles: { width: '600px', borderRadius: '24px', shadow: true, rotate: 0, animation: 'none' }
    }
  ],
  Portfolio: [
    {
      id: 'portfolio-grid',
      label: 'Project Grid',
      icon: Briefcase,
      settings: {
        title: 'My Portfolio',
        subtitle: 'Selected projects and case studies.',
        projects: [
          { id: 'p1', title: 'E-Commerce Redesign', category: 'Web Design', description: 'Complete visual overhaul for a leading retail brand.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=600&q=60' },
          { id: 'p2', title: 'Mobile Banking App', category: 'UI/UX', description: 'Intuitive mobile-first banking experience.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&w=600&q=60' },
          { id: 'p3', title: 'Brand Identity', category: 'Branding', description: 'Full brand system for an innovative startup.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&w=600&q=60' }
        ]
      },
      styles: { backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    },
    {
      id: 'portfolio-minimal',
      label: 'Minimal Showcase',
      icon: Layers,
      settings: {
        title: 'Selected Work',
        subtitle: 'A curated collection of recent projects.',
        projects: [
          { id: 'p1', title: 'Project Nova', category: 'Development', description: 'Next-gen platform built with modern technologies.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&w=600&q=60' },
          { id: 'p2', title: 'Project Horizon', category: 'Design', description: 'Award-winning interface design.', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&w=600&q=60' }
        ]
      },
      styles: { backgroundColor: '#f8fafc', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    }
  ],
  CTA: [
    {
      id: 'cta-gradient',
      label: 'Gradient Banner',
      icon: Megaphone,
      settings: {
        title: 'Ready to transform your business?',
        subtitle: 'Join 10,000+ companies already growing with us.',
        primaryText: 'Start Free Trial',
        secondaryText: 'Learn More',
        primaryColor: '#ffffff',
        primaryTextColor: '#6366f1'
      },
      styles: { bgGradient: 'linear-gradient(135deg, #6366f1, #a855f7)', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    },
    {
      id: 'cta-simple',
      label: 'Simple CTA',
      icon: Megaphone,
      settings: {
        title: 'Get started today',
        subtitle: 'No credit card required. Free 14-day trial.',
        primaryText: 'Sign Up Free',
        primaryColor: '#ffffff',
        primaryTextColor: '#0f172a'
      },
      styles: { backgroundColor: '#0f172a', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    }
  ],
  Logos: [
    {
      id: 'logos-standard',
      label: 'Client Logos',
      icon: Building2,
      settings: {
        title: 'Trusted by industry leaders',
        logos: [
          { id: 'l1', name: 'Acme Corp' },
          { id: 'l2', name: 'Globex' },
          { id: 'l3', name: 'Initech' },
          { id: 'l4', name: 'Umbrella' },
          { id: 'l5', name: 'Stark Inc' }
        ]
      },
      styles: { backgroundColor: '#f8fafc', paddingTop: '48px', paddingBottom: '48px', animation: 'fade-in' }
    },
    {
      id: 'logos-dark',
      label: 'Dark Logos',
      icon: Building2,
      settings: {
        title: 'Partners & Clients',
        logos: [
          { id: 'l1', name: 'TechFlow' },
          { id: 'l2', name: 'DataSync' },
          { id: 'l3', name: 'CloudBase' },
          { id: 'l4', name: 'NeuralNet' },
          { id: 'l5', name: 'PixelPro' }
        ]
      },
      styles: { backgroundColor: '#0f172a', paddingTop: '48px', paddingBottom: '48px', animation: 'fade-in' }
    }
  ],
  Blog: [
    {
      id: 'blog-grid',
      label: 'Article Grid',
      icon: BookOpen,
      settings: {
        title: 'Latest Articles',
        subtitle: 'Insights, updates, and tutorials from our team.',
        posts: [
          { id: 'b1', title: 'Getting Started with Modern Web Design', category: 'Design', date: 'Mar 15, 2026', excerpt: 'Learn the fundamentals of building stunning websites.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&w=500&q=60' },
          { id: 'b2', title: '10 Tips for Better UI/UX', category: 'Tutorial', date: 'Mar 10, 2026', excerpt: 'Practical advice to improve your user interfaces.', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&w=500&q=60' },
          { id: 'b3', title: 'The Future of No-Code', category: 'Industry', date: 'Mar 5, 2026', excerpt: 'How no-code tools are reshaping software development.', image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&w=500&q=60' }
        ]
      },
      styles: { backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    }
  ],
  Team: [
    {
      id: 'team-grid',
      label: 'Team Grid',
      icon: Users,
      settings: {
        title: 'Meet Our Team',
        subtitle: 'The talented people behind everything we build.',
        members: [
          { id: 'm1', name: 'Sarah Johnson', role: 'CEO & Founder', avatar: 'https://i.pravatar.cc/256?u=sarah', bio: 'Visionary leader with 15+ years in tech.' },
          { id: 'm2', name: 'Marcus Chen', role: 'CTO', avatar: 'https://i.pravatar.cc/256?u=marcus', bio: 'Full-stack architect and open source contributor.' },
          { id: 'm3', name: 'Emily Torres', role: 'Head of Design', avatar: 'https://i.pravatar.cc/256?u=emily', bio: 'Award-winning designer and creative director.' },
          { id: 'm4', name: 'Alex Kumar', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/256?u=alex', bio: 'Performance optimization specialist.' }
        ]
      },
      styles: { backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    },
    {
      id: 'team-compact',
      label: 'Compact Team',
      icon: Users,
      settings: {
        title: 'Our People',
        subtitle: 'A small team with big ambitions.',
        members: [
          { id: 'm1', name: 'Jane Smith', role: 'Founder', avatar: 'https://i.pravatar.cc/256?u=jane2' },
          { id: 'm2', name: 'Tom Wilson', role: 'Developer', avatar: 'https://i.pravatar.cc/256?u=tom' },
          { id: 'm3', name: 'Lisa Park', role: 'Designer', avatar: 'https://i.pravatar.cc/256?u=lisa' }
        ]
      },
      styles: { backgroundColor: '#f8fafc', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    }
  ],
  Newsletter: [
    {
      id: 'newsletter-centered',
      label: 'Centered Signup',
      icon: Bell,
      settings: {
        title: 'Stay in the loop',
        subtitle: 'Get the latest updates and news straight to your inbox.',
        placeholder: 'your@email.com',
        buttonText: 'Subscribe',
        disclaimer: 'No spam. Unsubscribe anytime.'
      },
      styles: { backgroundColor: '#f8fafc', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    },
    {
      id: 'newsletter-dark',
      label: 'Dark Newsletter',
      icon: Bell,
      settings: {
        title: 'Join our newsletter',
        subtitle: 'Weekly insights delivered to your inbox.',
        placeholder: 'Enter your email',
        buttonText: 'Get Updates',
        disclaimer: 'Free forever. No spam.'
      },
      styles: { backgroundColor: '#0f172a', paddingTop: '80px', paddingBottom: '80px', animation: 'fade-up' }
    }
  ],
  Footer: [
    {
      id: 'footer-standard',
      label: 'Standard Footer',
      icon: PanelBottom,
      settings: {
        logoText: 'BRAND',
        description: 'Building digital experiences that matter.',
        copyright: '© 2026 Brand. All rights reserved.',
        columns: [
          { id: 'c1', title: 'Product', links: [{ label: 'Features' }, { label: 'Pricing' }, { label: 'Changelog' }] },
          { id: 'c2', title: 'Company', links: [{ label: 'About' }, { label: 'Blog' }, { label: 'Careers' }] },
          { id: 'c3', title: 'Support', links: [{ label: 'Help Center' }, { label: 'Contact' }, { label: 'Status' }] }
        ],
        socials: [
          { icon: 'Twitter', href: '#' },
          { icon: 'Github', href: '#' },
          { icon: 'Linkedin', href: '#' }
        ]
      },
      styles: { backgroundColor: '#0f172a', paddingTop: '64px', paddingBottom: '32px', animation: 'none' }
    },
    {
      id: 'footer-minimal',
      label: 'Minimal Footer',
      icon: PanelBottom,
      settings: {
        logoText: 'BRAND',
        description: 'Simplicity at its finest.',
        copyright: '© 2026 All rights reserved.',
        columns: [
          { id: 'c1', title: 'Links', links: [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }] }
        ],
        socials: [
          { icon: 'Twitter', href: '#' },
          { icon: 'Github', href: '#' }
        ]
      },
      styles: { backgroundColor: '#1e293b', paddingTop: '48px', paddingBottom: '24px', animation: 'none' }
    }
  ]
};
