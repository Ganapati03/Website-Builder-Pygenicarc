import { nanoid } from 'nanoid';

// ═══════════════════════════════════════════════════════════════════════════════
// TEMPLATE GENERATOR ENGINE
// Generates fully normalized, renderer-compatible page schemas from onboarding input.
//
// INPUT:  { goal, style, sections, brandColor }
// OUTPUT: { pageName, blocks, GlobalTheme }
//
// Every block produced is 100% compatible with:
//   ✔ Renderer.jsx (SECTION_MAP dispatch)
//   ✔ InspectorSidebar.jsx (per-type field editors)
//   ✔ BuilderPage.jsx (canvas positioning via x/y)
//   ✔ MotionPresets.js (animation keys)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Section Height Estimates (must match BuilderPage HEIGHT_ESTIMATES) ──────
const HEIGHT_MAP = {
  Navbar: 72,
  Hero: 600,
  Pricing: 640,
  Features: 680,
  FAQ: 480,
  Testimonials: 520,
  Chips: 100,
  Icon: 80,
  Timeline: 850,
  Stats: 220,
  Contact: 800,
};

/** Auto-stacks sections vertically, returning cumulative y-offsets */
const autoStack = (types) => {
  let y = 0;
  return types.map((type) => {
    const thisY = y;
    y += HEIGHT_MAP[type] ?? 400;
    return thisY;
  });
};

// ─── Valid Animation Keys (match MotionPresets.js exactly) ───────────────────
const VALID_ANIMATIONS = new Set([
  'none',
  'fade-up',
  'fade-in',
  'slide-in-left',
  'zoom-in',
  'reveal-stagger',
]);

/** Safe animation getter — falls back to 'fade-up' if key is invalid */
const safeAnimation = (key) =>
  VALID_ANIMATIONS.has(key) ? key : 'fade-up';

// ─── Style Profiles ─────────────────────────────────────────────────────────
const STYLE_PROFILES = {
  minimalist: {
    navBg: 'transparent',
    heroBg: '#ffffff',
    sectionBg: '#ffffff',
    altSectionBg: '#f8fafc',
    contactBg: '#ffffff',
    shadow: 'sm',
  },
  corporate: {
    navBg: '#ffffff',
    heroBg: '#f8fafc',
    sectionBg: '#ffffff',
    altSectionBg: '#f8fafc',
    contactBg: '#f8fafc',
    shadow: 'sm',
  },
  creative: {
    navBg: 'rgba(255, 255, 255, 0.7)',
    heroBg: '#ffffff',
    sectionBg: '#ffffff',
    altSectionBg: '#f8fafc',
    contactBg: '#ffffff',
    shadow: 'sm',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-FIX / NORMALIZER
// Ensures every block conforms to what Renderer + Inspector actually read.
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Normalizes a single block to match the EXACT schema expected by
 * Renderer.jsx, InspectorSidebar.jsx, and the canvas system.
 *
 * Fixes:
 *  - Missing id / x / y
 *  - Invalid animation keys
 *  - Wrong prop names (headline→headline is kept because renderer uses it)
 *  - Missing required fields (title, subtitle, etc.)
 *  - Empty arrays/objects
 */
const normalizeBlock = (block, yPos = 0) => {
  const type = block.type;
  const settings = { ...(block.settings || {}) };
  const styles = { ...(block.styles || {}) };

  // ── Common Fixes ──────────────────────────────────────────────────────────
  const id = block.id || nanoid();
  const x = typeof block.x === 'number' ? block.x : 0;
  const y = typeof block.y === 'number' ? block.y : yPos;
  styles.animation = safeAnimation(styles.animation);

  // ── Per-Type Normalization ────────────────────────────────────────────────
  switch (type) {
    case 'Navbar':
      // Renderer reads: settings.logoText, settings.links[]
      settings.logoText = settings.logoText || settings.logo || 'BRAND';
      if (!Array.isArray(settings.links) || settings.links.length === 0) {
        settings.links = [
          { label: 'Home', href: '#' },
          { label: 'Features', href: '#' },
          { label: 'Contact', href: '#', isButton: true },
        ];
      }
      settings.links = settings.links.map((l, i) => ({
        ...l,
        id: l.id || nanoid(),
        label: l.label || `Link ${i + 1}`,
        href: l.href || '#',
      }));
      // Clean invalid keys
      delete settings.logo;
      delete settings.buttonText;
      styles.animation = 'none'; // Navbar should never animate
      break;

    case 'Hero':
      // Renderer reads: settings.headline, settings.subheadline, settings.ctaText
      // OR settings.items[] (modern format)
      // Fix common wrong keys
      if (settings.title && !settings.headline) {
        settings.headline = settings.title;
        delete settings.title;
      }
      if (settings.subtitle && !settings.subheadline) {
        settings.subheadline = settings.subtitle;
        delete settings.subtitle;
      }
      if (settings.buttonText && !settings.ctaText) {
        settings.ctaText = settings.buttonText;
        delete settings.buttonText;
      }
      settings.headline = settings.headline || 'Build something amazing.';
      settings.subheadline = settings.subheadline || 'A modern platform designed to help you succeed.';
      settings.ctaText = settings.ctaText || 'Get Started';
      break;

    case 'Features':
      // Renderer reads: settings.title, settings.subtitle, settings.items[]
      settings.title = settings.title || settings.headline || 'Our Features';
      settings.subtitle = settings.subtitle || settings.description || 'Everything you need in one place.';
      delete settings.headline;
      delete settings.description;
      if (!Array.isArray(settings.items) || settings.items.length === 0) {
        settings.items = [
          { title: 'Fast Setup', description: 'Get started in under a minute.' },
          { title: 'Secure', description: 'Enterprise-grade security built in.' },
          { title: 'Scalable', description: 'From one user to millions.' },
        ];
      }
      settings.items = settings.items.map((item, i) => ({
        ...item,
        id: item.id || nanoid(),
        title: item.title || item.name || `Item ${i + 1}`,
        description: item.description || item.subtitle || item.text || 'Description here.',
      }));
      break;

    case 'Pricing':
      // Renderer reads: settings.title, settings.plans[]
      settings.title = settings.title || settings.headline || 'Simple Pricing';
      delete settings.headline;
      if (!Array.isArray(settings.plans) || settings.plans.length === 0) {
        settings.plans = [
          { name: 'Free', price: '$0', features: ['Core features', 'Community support'] },
          { name: 'Pro', price: '$29', features: ['All features', 'Priority support'] },
        ];
      }
      settings.plans = settings.plans.map((plan, i) => ({
        ...plan,
        id: plan.id || nanoid(),
        name: plan.name || plan.title || `Plan ${i + 1}`,
        price: plan.price || '$0',
        features: Array.isArray(plan.features) && plan.features.length > 0
          ? plan.features
          : ['Feature included'],
      }));
      break;

    case 'Testimonials':
      // Renderer reads: settings.title, settings.testimonials[]
      settings.title = settings.title || settings.headline || 'What People Say';
      delete settings.headline;
      if (!Array.isArray(settings.testimonials) || settings.testimonials.length === 0) {
        settings.testimonials = [
          { author: 'Jane Doe', role: 'CEO', content: 'Great experience!', avatar: 'https://i.pravatar.cc/150?u=jane' },
        ];
      }
      settings.testimonials = settings.testimonials.map((t, i) => ({
        ...t,
        id: t.id || nanoid(),
        author: t.author || t.name || `Person ${i + 1}`,
        role: t.role || 'Client',
        content: t.content || t.quote || t.text || 'Amazing experience.',
        avatar: t.avatar || `https://i.pravatar.cc/150?u=person${i}`,
      }));
      // Clean invalid keys
      settings.testimonials.forEach((t) => {
        delete t.name;
        delete t.quote;
        delete t.text;
      });
      break;

    case 'FAQ':
      // Renderer reads: settings.title, settings.faqs[]
      settings.title = settings.title || settings.headline || 'Frequently Asked Questions';
      delete settings.headline;
      if (!Array.isArray(settings.faqs) || settings.faqs.length === 0) {
        settings.faqs = [
          { question: 'Is it free?', answer: 'Yes, we have a generous free tier.' },
          { question: 'Can I cancel anytime?', answer: 'Absolutely, no contracts required.' },
        ];
      }
      settings.faqs = settings.faqs.map((f, i) => ({
        ...f,
        id: f.id || nanoid(),
        question: f.question || f.title || `Question ${i + 1}`,
        answer: f.answer || f.description || f.text || 'Answer coming soon.',
      }));
      break;

    case 'Stats':
      // Renderer reads: settings.stats[]
      if (!Array.isArray(settings.stats) || settings.stats.length === 0) {
        settings.stats = [
          { label: 'Experience', value: '10+' },
          { label: 'Clients', value: '250+' },
          { label: 'Satisfaction', value: '98%' },
        ];
      }
      settings.stats = settings.stats.map((s) => ({
        ...s,
        label: s.label || s.title || 'Metric',
        value: s.value || '0',
      }));
      break;

    case 'Contact':
      // Renderer reads: settings.title, settings.subtitle, settings.info[], settings.buttonText
      settings.title = settings.title || settings.headline || "Let's work together";
      settings.subtitle = settings.subtitle || settings.description ||
        'Have a project in mind? Drop a message and let\'s discuss.';
      settings.buttonText = settings.buttonText || 'Send Message';
      delete settings.headline;
      delete settings.description;
      if (!Array.isArray(settings.info) || settings.info.length === 0) {
        settings.info = [
          { label: 'Email', value: 'hello@example.com', icon: 'Mail' },
          { label: 'Location', value: 'Remote', icon: 'MapPin' },
        ];
      }
      break;

    case 'Timeline':
      // Renderer reads: settings.title, settings.subtitle, settings.milestones[]
      settings.title = settings.title || 'My Journey';
      settings.subtitle = settings.subtitle || 'Key milestones along the way.';
      if (!Array.isArray(settings.milestones) || settings.milestones.length === 0) {
        settings.milestones = [
          { title: 'Started', date: '2020', description: 'The beginning of an exciting journey.' },
        ];
      }
      settings.milestones = settings.milestones.map((m, i) => ({
        ...m,
        id: m.id || nanoid(),
        title: m.title || `Milestone ${i + 1}`,
        date: m.date || 'Date',
        description: m.description || m.text || 'Milestone description.',
      }));
      break;

    case 'Chips':
      // Renderer reads: settings.chips[]
      if (!Array.isArray(settings.chips) || settings.chips.length === 0) {
        settings.chips = [
          { label: 'React', isActive: true },
          { label: 'TypeScript', isActive: true },
          { label: 'Design', isActive: false },
        ];
      }
      settings.chips = settings.chips.map((c) => ({
        ...c,
        id: c.id || nanoid(),
        label: c.label || c.text || 'Tag',
        isActive: c.isActive ?? false,
      }));
      break;

    default:
      break;
  }

  return { id, type, x, y, settings, styles };
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// Each returns a raw block object that gets normalized before output.
// ═══════════════════════════════════════════════════════════════════════════════

const buildNavbar = (goal, style, profile, brandColor, activeSections) => ({
  type: 'Navbar',
  settings: {
    logoText:
      goal === 'portfolio' ? 'CREATOR'
        : goal === 'store' ? 'SHOP'
          : 'BRAND',
    links: [
      { id: nanoid(), label: 'Home', href: '#', type: 'scroll', targetId: '' },
      ...activeSections.slice(0, 3).map((s) => ({
        id: nanoid(),
        label: s.label.split(' ')[0],
        href: '#',
        type: 'scroll',
        targetId: s.id,
      })),
      {
        id: nanoid(),
        label: goal === 'store' ? 'Shop Now' : 'Get Started',
        href: '#',
        isButton: true,
        type: 'scroll',
        targetId: 'contact',
        color: brandColor,
      },
    ],
  },
  styles: {
    backgroundColor: profile.navBg,
    paddingY: '1.5rem',
    sticky: true,
    animation: 'none',
    ...(style === 'creative'
      ? { backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(226, 232, 240, 0.5)' }
      : { borderBottom: '1px solid rgba(0,0,0,0.05)' }),
  },
});

const buildHero = (goal, style, profile, brandColor) => ({
  type: 'Hero',
  settings: {
    headline:
      goal === 'portfolio'
        ? 'Crafting digital experiences that inspire.'
        : goal === 'store'
          ? 'Premium products for the modern lifestyle.'
          : 'Grow your business with confidence.',
    subheadline:
      goal === 'portfolio'
        ? 'Designer & developer focused on clean, impactful interfaces.'
        : goal === 'store'
          ? 'Curated collections designed for quality and comfort.'
          : 'A beautiful platform perfectly tailored to convert visitors.',
    ctaText:
      goal === 'portfolio'
        ? 'View My Work'
        : goal === 'store'
          ? 'Shop Collection'
          : 'Start Free Trial',
    image:
      goal === 'portfolio'
        ? 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
        : goal === 'store'
          ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
          : null,
  },
  styles: {
    backgroundColor: profile.heroBg,
    paddingTop: '120px',
    paddingBottom: '120px',
    align: goal === 'landing' ? 'center' : 'left',
    animation: 'fade-up',
    ...(style === 'creative' && goal === 'landing'
      ? { bgGradient: `linear-gradient(135deg, #f8fafc 0%, ${brandColor}08 100%)` }
      : {}),
  },
});

const buildWorkGallery = (goal, style, profile) => ({
  type: 'Features',
  settings: {
    title: goal === 'portfolio' ? 'Selected Work' : 'Top Products',
    subtitle:
      goal === 'portfolio'
        ? 'A curated gallery of recent projects and case studies.'
        : 'Handpicked items from our latest collection.',
    layout: style === 'creative' ? 'bento' : 'grid',
    items: goal === 'portfolio'
      ? [
          { id: nanoid(), title: 'Project Alpha', description: 'High-conversion web application redesign for enterprise clients.', span: style === 'creative' ? '2' : '1' },
          { id: nanoid(), title: 'Project Beta', description: 'Complex data visualization simplified for everyday users.' },
          { id: nanoid(), title: 'Project Gamma', description: 'Complete brand identity and digital product refresh.' },
        ]
      : [
          { id: nanoid(), title: 'Classic Collection', description: 'Timeless designs crafted with premium materials.' },
          { id: nanoid(), title: 'Limited Edition', description: 'Exclusive pieces available for a limited time only.' },
          { id: nanoid(), title: 'New Arrivals', description: 'Fresh styles just landed. Be the first to shop.' },
        ],
  },
  styles: {
    backgroundColor: profile.sectionBg,
    paddingTop: '80px',
    paddingBottom: '80px',
    animation: 'fade-up',
  },
});

const buildAbout = (goal, style, profile) => ({
  type: 'Features',
  settings: {
    title: 'About',
    subtitle:
      goal === 'portfolio'
        ? 'Passionate about building scalable, beautiful products.'
        : goal === 'store'
          ? 'Our story is built on quality, craftsmanship, and care.'
          : 'We help businesses grow with modern technology.',
    layout: 'grid',
    items: [
      { id: nanoid(), title: 'Experience', description: 'Over 5 years delivering production-grade products.' },
      { id: nanoid(), title: 'Philosophy', description: 'Form follows function. Clean code, clear design.' },
    ],
  },
  styles: {
    backgroundColor: profile.altSectionBg,
    paddingTop: '80px',
    paddingBottom: '80px',
    animation: 'fade-up',
  },
});

const buildFAQ = (goal, style, profile) => ({
  type: 'FAQ',
  settings: {
    title: 'Frequently Asked Questions',
    faqs: [
      {
        id: nanoid(),
        question: goal === 'portfolio' ? 'What is your process?' : 'What is your return policy?',
        answer: goal === 'portfolio'
          ? 'I prioritize clear communication, rapid prototyping, and iterative design.'
          : 'We offer a hassle-free 30-day return policy on all items.',
      },
      {
        id: nanoid(),
        question: goal === 'portfolio' ? 'Are you available for work?' : 'How long does shipping take?',
        answer: goal === 'portfolio'
          ? 'Yes, I am currently accepting new clients and collaborations.'
          : 'Standard shipping takes 3-5 business days. Express options available.',
      },
      {
        id: nanoid(),
        question: 'Do you offer support?',
        answer: 'Absolutely, we provide dedicated support to all our clients and customers.',
      },
    ],
  },
  styles: {
    backgroundColor: profile.sectionBg,
    paddingTop: '80px',
    paddingBottom: '80px',
    animation: 'fade-up',
    align: 'left',
  },
});

const buildTestimonials = (goal, style, profile) => ({
  type: 'Testimonials',
  settings: {
    title: goal === 'portfolio' ? 'Kind Words from Clients' : 'Customer Stories',
    testimonials: [
      {
        id: nanoid(),
        author: 'Sarah Johnson',
        role: 'CEO at TechFlow',
        content: goal === 'portfolio'
          ? 'The quality of work exceeded all expectations. Truly world class.'
          : 'Best purchase I have ever made. Quality is outstanding.',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
      },
      {
        id: nanoid(),
        author: 'Marcus Chen',
        role: 'Product Lead',
        content: 'Incredible attention to detail and delivered ahead of schedule.',
        avatar: 'https://i.pravatar.cc/150?u=marcus',
      },
      {
        id: nanoid(),
        author: 'Emily Torres',
        role: 'Designer',
        content: 'Seamless collaboration and the results speak for themselves.',
        avatar: 'https://i.pravatar.cc/150?u=emily',
      },
    ],
  },
  styles: {
    backgroundColor: profile.altSectionBg,
    paddingTop: '80px',
    paddingBottom: '80px',
    animation: 'fade-up',
  },
});

const buildContact = (goal, style, profile, brandColor) => ({
  type: 'Contact',
  settings: {
    title: goal === 'portfolio' ? "Let's Work Together" : 'Get in Touch',
    subtitle:
      goal === 'portfolio'
        ? 'Have a project in mind? Send a message and I\'ll get back within 24 hours.'
        : 'Questions? Feedback? We\'d love to hear from you.',
    buttonText: 'Send Message',
    buttonColor: brandColor,
    info: [
      { label: 'Email', value: 'hello@example.com', icon: 'Mail' },
      { label: 'Location', value: 'San Francisco, CA', icon: 'MapPin' },
    ],
  },
  styles: {
    backgroundColor: profile.contactBg,
    paddingTop: '100px',
    paddingBottom: '100px',
    animation: 'fade-up',
  },
});

const buildStats = (goal, brandColor) => ({
  type: 'Stats',
  settings: {
    stats:
      goal === 'portfolio'
        ? [
            { label: 'Years Experience', value: '8+' },
            { label: 'Projects Done', value: '120+' },
            { label: 'Happy Clients', value: '50+' },
            { label: 'Awards Won', value: '12' },
          ]
        : goal === 'store'
          ? [
              { label: 'Products', value: '500+' },
              { label: 'Happy Customers', value: '10k+' },
              { label: 'Countries', value: '45' },
              { label: 'Satisfaction', value: '99%' },
            ]
          : [
              { label: 'Active Users', value: '50k+' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Response Time', value: '<1hr' },
              { label: 'NPS Score', value: '82' },
            ],
  },
  styles: {
    backgroundColor: '#f8fafc',
    accentColor: brandColor,
    animation: 'fade-up',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION MAPPING — Maps user-facing section names to builder functions
// ═══════════════════════════════════════════════════════════════════════════════
const SECTION_NAME_MAP = {
  'work gallery':  'gallery',
  'gallery':       'gallery',
  'portfolio':     'gallery',
  'projects':      'gallery',
  'about':         'about',
  'about section': 'about',
  'about me':      'about',
  'faq':           'faq',
  'faqs':          'faq',
  'testimonials':  'testimonials',
  'reviews':       'testimonials',
  'contact':       'contact',
  'contact form':  'contact',
  'stats':         'stats',
  'statistics':    'stats',
  'pricing':       'pricing',
  'team':          'team',
  'meet the team': 'team',
  'logos':         'logos',
  'client logos':  'logos',
  'blog':          'blog',
  'latest blog posts': 'blog',
  'newsletter':    'newsletter',
  'newsletter signup': 'newsletter',
};

const normalizeSectionName = (name) =>
  SECTION_NAME_MAP[name.toLowerCase().trim()] || name.toLowerCase().trim();

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generates a complete, normalized page layout from onboarding input.
 *
 * @param {Object} input
 * @param {string} input.goal        - 'portfolio' | 'store' | 'landing'
 * @param {string} input.style       - 'minimalist' | 'corporate' | 'creative'
 * @param {string[]} input.sections  - e.g. ['Work Gallery', 'About', 'Contact']
 * @param {string} input.brandColor  - e.g. '#6366f1'
 *
 * @returns {{ pageName: string, blocks: Object[], GlobalTheme: Object }}
 */
export const generatePageLayout = ({ goal, style, sections, brandColor }) => {
  // ── Normalize inputs ──
  const normalizedGoal = (goal || 'portfolio').toLowerCase().replace(/\s+/g, '');
  const goalKey =
    normalizedGoal.includes('portfolio') ? 'portfolio'
      : normalizedGoal.includes('store') ? 'store'
        : 'landing';

  const styleKey = (style || 'minimalist').toLowerCase();
  const profile = STYLE_PROFILES[styleKey] || STYLE_PROFILES.minimalist;
  const color = brandColor || '#6366f1';

  // Map user section names to internal keys
  const activeSections = (sections || []).map((s) => ({
    id: normalizeSectionName(typeof s === 'string' ? s : s.label || s.id || ''),
    label: typeof s === 'string' ? s : s.label || s.id || 'Section',
  }));

  const activeKeys = new Set(activeSections.map((s) => s.id));

  // ── Build blocks in order ──
  const rawBlocks = [];

  // 1. Navbar (ALWAYS included)
  rawBlocks.push(buildNavbar(goalKey, styleKey, profile, color, activeSections));

  // 2. Hero (ALWAYS included)
  rawBlocks.push(buildHero(goalKey, styleKey, profile, color));

  // 3. Stats (included for portfolio by default, or if user selected)
  if (activeKeys.has('stats') || (goalKey === 'portfolio' && !activeKeys.has('stats') && activeSections.length > 0)) {
    rawBlocks.push(buildStats(goalKey, color));
  }

  // 4. Work Gallery / Products (if user selected gallery/portfolio/projects)
  if (activeKeys.has('gallery')) {
    rawBlocks.push(buildWorkGallery(goalKey, styleKey, profile));
  }

  // 5. About
  if (activeKeys.has('about')) {
    rawBlocks.push(buildAbout(goalKey, styleKey, profile));
  }

  // 6. Pricing (if user selected, mostly for store/landing)
  if (activeKeys.has('pricing')) {
    rawBlocks.push({
      type: 'Pricing',
      settings: {
        title: 'Simple, Transparent Pricing',
        plans: [
          { id: nanoid(), name: 'Starter', price: '$0', features: ['Core features', 'Community support', '1 project'] },
          { id: nanoid(), name: 'Pro', price: '$29', features: ['All features', 'Priority support', 'Unlimited projects'], color: color },
          { id: nanoid(), name: 'Enterprise', price: '$99', features: ['Custom solutions', 'Dedicated manager', 'SLA guarantee'] },
        ],
      },
      styles: {
        backgroundColor: profile.altSectionBg,
        paddingTop: '80px',
        paddingBottom: '80px',
        animation: 'fade-up',
      },
    });
  }

  // 7. Testimonials
  if (activeKeys.has('testimonials')) {
    rawBlocks.push(buildTestimonials(goalKey, styleKey, profile));
  }

  // 8. FAQ
  if (activeKeys.has('faq')) {
    rawBlocks.push(buildFAQ(goalKey, styleKey, profile));
  }

  // 9. Contact (ALWAYS included if user selected, otherwise add for portfolio/landing)
  if (activeKeys.has('contact') || goalKey !== 'store') {
    rawBlocks.push(buildContact(goalKey, styleKey, profile, color));
  }

  // 10. Meet the Team
  if (activeKeys.has('team')) {
    rawBlocks.push({
      type: 'Team',
      settings: {
        title: 'Meet the Team',
        subtitle: 'The brilliant minds behind our success.',
        members: [
          { id: nanoid(), name: 'Alex Johnson', role: 'CEO', avatar: 'https://i.pravatar.cc/150?u=alex', bio: 'Visionary leader.' },
          { id: nanoid(), name: 'Sam Smith', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=sam', bio: 'Tech enthusiast.' }
        ]
      },
      styles: {
        backgroundColor: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '80px',
        animation: 'fade-up'
      }
    });
  }

  // 11. Client Logos
  if (activeKeys.has('logos')) {
    rawBlocks.push({
      type: 'Logos',
      settings: {
        title: 'Trusted by innovative companies worldwide',
        logos: [
          { id: nanoid(), name: 'Acme Corp' },
          { id: nanoid(), name: 'Global Tech' },
          { id: nanoid(), name: 'InnovateHub' },
          { id: nanoid(), name: 'Nexus' }
        ]
      },
      styles: {
        backgroundColor: profile.altSectionBg,
        paddingTop: '60px',
        paddingBottom: '60px',
        animation: 'fade-up'
      }
    });
  }

  // 12. Blog
  if (activeKeys.has('blog')) {
    rawBlocks.push({
      type: 'Blog',
      settings: {
        title: 'Latest from the Blog',
        subtitle: 'Insights, thoughts, and updates.',
        posts: [
          { id: nanoid(), title: 'The Future of Web Design', category: 'Design', date: 'Mar 15, 2026', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop', excerpt: 'Exploring upcoming trends in web interfaces...' },
          { id: nanoid(), title: 'Why Performance Matters', category: 'Engineering', date: 'Mar 12, 2026', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop', excerpt: 'How speed impacts user retention.' }
        ]
      },
      styles: {
        backgroundColor: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '80px',
        animation: 'fade-up'
      }
    });
  }

  // 13. Newsletter
  if (activeKeys.has('newsletter')) {
    rawBlocks.push({
      type: 'Newsletter',
      settings: {
        title: 'Subscribe to our Newsletter',
        subtitle: 'Get the latest updates right in your inbox.',
        buttonText: 'Subscribe',
        buttonColor: color,
        placeholder: 'your@email.com',
        disclaimer: 'We promise not to spam you.'
      },
      styles: {
        backgroundColor: profile.altSectionBg,
        paddingTop: '80px',
        paddingBottom: '80px',
        animation: 'fade-up'
      }
    });
  }

  // 14. Footer (ALWAYS included at the bottom)
  rawBlocks.push({
    type: 'Footer',
    settings: {
      logoText: 'BRAND',
      description: 'Creating amazing experiences.',
      copyright: '© 2026 BRAND. All rights reserved.',
      columns: [
        { id: nanoid(), title: 'Product', links: [{ label: 'Features' }, { label: 'Pricing' }] },
        { id: nanoid(), title: 'Company', links: [{ label: 'About Us' }, { label: 'Careers' }] }
      ]
    },
    styles: {
      backgroundColor: '#0f172a',
      color: '#ffffff',
      paddingTop: '60px',
      paddingBottom: '40px',
      animation: 'none'
    }
  });

  // ── Auto-stack y positions ──
  const types = rawBlocks.map((b) => b.type);
  const yPositions = autoStack(types);

  // ── Normalize every block ──
  const blocks = rawBlocks.map((block, i) => normalizeBlock(block, yPositions[i]));

  // ── Build GlobalTheme ──
  const GlobalTheme = {
    colors: {
      primary: color,
      secondary: '#475569',
      background: styleKey === 'corporate' ? '#f8fafc' : '#ffffff',
      text: '#1e293b',
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
  };

  return {
    pageName: 'Home',
    blocks,
    GlobalTheme,
  };
};

/**
 * Normalizes an EXISTING array of blocks (e.g. from saved templates or
 * inconsistent developer data). Fixes prop names, fills missing fields,
 * replaces invalid variants, etc.
 *
 * @param {Object[]} blocks - Array of possibly-inconsistent block objects
 * @returns {Object[]} - Fully normalized blocks
 */
export const normalizeExistingBlocks = (blocks) => {
  if (!Array.isArray(blocks)) return [];

  const types = blocks.map((b) => b.type);
  const yPositions = autoStack(types);

  return blocks.map((block, i) => {
    // Fix common prop name errors before normalizing
    const fixed = { ...block };
    if (fixed.settings) {
      const s = { ...fixed.settings };
      // headline → keep as headline (Renderer uses it for Hero)
      // But for Features/FAQ etc, headline should be title
      if (fixed.type !== 'Hero') {
        if (s.headline && !s.title) {
          s.title = s.headline;
          delete s.headline;
        }
      }
      if (s.cta && !s.ctaText && !s.buttonText) {
        s.ctaText = s.cta;
        delete s.cta;
      }
      if (s.description && !s.subtitle && fixed.type !== 'Hero') {
        s.subtitle = s.description;
        delete s.description;
      }
      fixed.settings = s;
    }

    // Fix variant → valid keys only (but this system uses settings + styles, not variant)
    if (fixed.variant) {
      const validVariants = new Set(['standard', 'classic', 'centered', 'minimal', 'grid', 'split', 'bento']);
      if (!validVariants.has(fixed.variant)) {
        fixed.variant = 'standard';
      }
    }

    return normalizeBlock(fixed, yPositions[i]);
  });
};

export default generatePageLayout;
