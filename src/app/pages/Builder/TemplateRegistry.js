import { nanoid } from 'nanoid';

// Stacking helper: returns cumulative y offsets for a list of section types.
// Full-width section heights (from HEIGHT_ESTIMATES in BuilderPage):
const H = {
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
  Contact: 800
};
const stack = (types) => {
  let y = 0;
  return types.map((type) => {
    const thisY = y;
    y += H[type] ?? 400;
    return thisY;
  });
};

export const TEMPLATE_DATA = {
  blog: {
    pageId: 'blog-template',
    GlobalTheme: {
      colors: {
        primary: '#3b82f6',
        secondary: '#1e293b',
        background: '#ffffff',
        text: '#0f172a'
      },
      typography: { fontFamily: "'Inter', sans-serif" }
    },
    sections: (() => {
      const types = ['Navbar', 'Hero'];
      const ys = stack(types);
      return [
        {
          id: nanoid(), type: 'Navbar', x: 0, y: ys[0],
          settings: {
            logoText: 'THE CHRONICLE',
            links: [
              { label: 'Latest', href: '#' },
              { label: 'Featured', href: '#' },
              { label: 'Subscribe', href: '#', isButton: true }
            ]
          },
          styles: { backgroundColor: '#ffffff', paddingY: '1.25rem', sticky: true, animation: 'none' }
        },
        {
          id: nanoid(), type: 'Hero', x: 0, y: ys[1],
          settings: {
            headline: 'Stories that matter to your world.',
            subheadline: 'A minimal workspace for writers, thinkers, and digital nomads.',
            ctaText: 'Start Reading',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format'
          },
          styles: { align: 'left', paddingTop: '100px', paddingBottom: '100px', animation: 'fade-up' }
        }
      ];
    })()
  },

  finance: {
    pageId: 'finance-template',
    GlobalTheme: {
      colors: {
        primary: '#10b981',
        secondary: '#064e3b',
        background: '#f8fafc',
        text: '#0f172a'
      },
      typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
    sections: (() => {
      const types = ['Navbar', 'Hero', 'Pricing'];
      const ys = stack(types);
      return [
        {
          id: nanoid(), type: 'Navbar', x: 0, y: ys[0],
          settings: {
            logoText: 'EQUITY.IO',
            links: [
              { label: 'Markets', href: '#' },
              { label: 'Wealth', href: '#' },
              { label: 'Join Now', href: '#', isButton: true }
            ]
          },
          styles: { backgroundColor: '#0f172a', paddingY: '1rem', sticky: true, animation: 'none' }
        },
        {
          id: nanoid(), type: 'Hero', x: 0, y: ys[1],
          settings: {
            headline: 'Master your wealth with Flow.',
            subheadline: 'The enterprise-grade fintech dashboard for the modern investor.',
            ctaText: 'Open Account',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format'
          },
          styles: {
            align: 'center', paddingTop: '120px', paddingBottom: '120px',
            bgGradient: 'linear-gradient(to bottom, #0f172a, #1e293b)', animation: 'fade-up'
          }
        },
        {
          id: nanoid(), type: 'Pricing', x: 0, y: ys[2],
          settings: {
            title: 'Institutional Grade Plans',
            plans: [
              { name: 'Basic', price: '$0', features: ['Real-time Data', '1 Portfolio'] },
              { name: 'Pro', price: '$29', features: ['AI Insights', 'Unlimited Portfolios', 'API Access'] },
              { name: 'Elite', price: '$99', features: ['Priority Execution', 'Personal Manager'] }
            ]
          },
          styles: { animation: 'fade-up' }
        }
      ];
    })()
  },

  travel: {
    pageId: 'travel-template',
    GlobalTheme: {
      colors: {
        primary: '#f97316',
        secondary: '#431407',
        background: '#fff7ed',
        text: '#431407'
      },
      typography: { fontFamily: "'Outfit', sans-serif" }
    },
    sections: (() => {
      const types = ['Navbar', 'Hero', 'Features', 'Testimonials'];
      const ys = stack(types);
      return [
        {
          id: nanoid(), type: 'Navbar', x: 0, y: ys[0],
          settings: {
            logoText: 'WANDERLUST',
            links: [
              { label: 'Destinations', href: '#' },
              { label: 'Guides', href: '#' },
              { label: 'Book Trip', href: '#', isButton: true }
            ]
          },
          styles: { backgroundColor: '#fff7ed', paddingY: '1rem', sticky: true, animation: 'none' }
        },
        {
          id: nanoid(), type: 'Hero', x: 0, y: ys[1],
          settings: {
            headline: 'Adventure awaits in the wild.',
            subheadline: "Explore the world's most hidden gems with professional guides.",
            ctaText: 'Book Trip',
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format'
          },
          styles: { align: 'left', paddingTop: '140px', paddingBottom: '140px', animation: 'zoom-in' }
        },
        {
          id: nanoid(), type: 'Features', x: 0, y: ys[2],
          settings: {
            title: 'Why Travel With Us',
            subtitle: 'We make adventure accessible, safe, and unforgettable.',
            items: [
              { title: 'Expert Guides', description: 'Certified local guides who know every trail and hidden spot.' },
              { title: 'Small Groups', description: 'Intimate groups of max 12 so you never feel like a tourist.' },
              { title: 'All Inclusive', description: 'Accommodation, meals, transport — all sorted for you.' }
            ]
          },
          styles: { animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Testimonials', x: 0, y: ys[3],
          settings: {
            title: 'From Our Adventurers',
            testimonials: [
              {
                content: 'Absolutely life-changing. I never knew Patagonia could be so accessible.',
                author: 'Priya Sharma', role: 'Solo Traveller',
                avatar: 'https://i.pravatar.cc/150?img=47'
              },
              {
                content: 'The guides were amazing. We saw things no tourist group ever sees.',
                author: 'James Okafor', role: 'Adventure Photographer',
                avatar: 'https://i.pravatar.cc/150?img=12'
              }
            ]
          },
          styles: { animation: 'fade-up' }
        }
      ];
    })()
  },

  education: {
    pageId: 'education-template',
    GlobalTheme: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#4c1d95',
        background: '#faf5ff',
        text: '#1e1b4b'
      },
      typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" }
    },
    sections: (() => {
      const types = ['Navbar', 'Hero', 'Features', 'Pricing', 'FAQ'];
      const ys = stack(types);
      return [
        {
          id: nanoid(), type: 'Navbar', x: 0, y: ys[0],
          settings: {
            logoText: 'LEARNHUB',
            links: [
              { label: 'Courses', href: '#' },
              { label: 'Pricing', href: '#' },
              { label: 'Enroll Now', href: '#', isButton: true }
            ]
          },
          styles: { backgroundColor: '#faf5ff', paddingY: '1rem', sticky: true, animation: 'none' }
        },
        {
          id: nanoid(), type: 'Hero', x: 0, y: ys[1],
          settings: {
            headline: 'Learn anything. Become anyone.',
            subheadline: 'World-class instructors. Lifetime access. Real outcomes.',
            ctaText: 'Browse Courses',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format'
          },
          styles: { align: 'left', paddingTop: '100px', paddingBottom: '100px', animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Features', x: 0, y: ys[2],
          settings: {
            title: 'Everything You Need to Succeed',
            subtitle: 'Built for self-learners and enterprise teams alike.',
            items: [
              { title: 'Expert Instructors', description: 'Learn directly from industry veterans with years of real-world experience.' },
              { title: 'Hands-On Projects', description: 'Build a portfolio of projects you can show off to employers.' },
              { title: 'At Your Own Pace', description: 'No deadlines, no pressure. Learn when and how it suits you.' }
            ]
          },
          styles: { animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Pricing', x: 0, y: ys[3],
          settings: {
            title: 'Simple, Transparent Pricing',
            plans: [
              { name: 'Free', price: '$0', features: ['5 Courses', 'Community Access', 'Certificates'] },
              { name: 'Pro', price: '$19', features: ['All Courses', 'Offline Access', 'Mentorship'] },
              { name: 'Team', price: '$49', features: ['Unlimited Seats', 'Analytics', 'Priority Support'] }
            ]
          },
          styles: { animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'FAQ', x: 0, y: ys[4],
          settings: {
            title: 'Frequently Asked Questions',
            faqs: [
              { question: 'Do I need prior experience?', answer: 'Not at all. We have beginner-friendly tracks for every skill level.' },
              { question: 'Can I get a refund?', answer: 'Yes — we offer a 30-day money-back guarantee, no questions asked.' },
              { question: 'Are certificates recognised?', answer: 'Our certificates are industry-recognised and shareable on LinkedIn.' }
            ]
          },
          styles: { animation: 'fade-up' }
        }
      ];
    })()
  },

  portfolio: {
    pageId: 'portfolio-template',
    GlobalTheme: {
      colors: {
        primary: '#fb7185',
        secondary: '#334155',
        background: '#030712',
        text: '#f8fafc'
      },
      typography: { fontFamily: "'Sora', sans-serif" }
    },
    sections: (() => {
      const types = ['Navbar', 'Hero', 'Stats', 'Features', 'Timeline', 'Testimonials', 'Chips', 'Contact'];
      const ys = stack(types);
      return [
        {
          id: nanoid(), type: 'Navbar', x: 0, y: ys[0],
          settings: {
            logoText: 'ALEX.DEV',
            links: [
              { label: 'Services', href: '#' },
              { label: 'Work', href: '#' },
              { label: 'Contact', href: '#', isButton: true, color: '#fb7185' }
            ]
          },
          styles: { backgroundColor: 'rgba(3, 7, 18, 0.8)', paddingY: '1.5rem', sticky: true, animation: 'none' }
        },
        {
          id: nanoid(), type: 'Hero', x: 0, y: ys[1],
          settings: {
            items: [
              { id: 'h1', type: 'heading', text: 'Building digital products, brands, and experiences.' },
              { id: 'sh1', type: 'subheading', text: 'Senior Full-stack Developer & UI/UX Designer specializing in high-performance web applications.' },
              { id: 'b1', type: 'button', text: 'Latest Projects', style: 'primary', href: '#' },
              { id: 'b2', type: 'button', text: 'Get in Touch', style: 'outline', href: '#' }
            ],
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format'
          },
          styles: { align: 'left', paddingTop: '140px', paddingBottom: '140px', animation: 'fade-up', textColor: '#f8fafc' }
        },
        {
          id: nanoid(), type: 'Stats', x: 0, y: ys[2],
          settings: {
            stats: [
              { label: 'Years Experience', value: '8+' },
              { label: 'Projects Completed', value: '120+' },
              { label: 'Happy Clients', value: '45+' },
              { label: 'Awards Won', value: '12' }
            ]
          },
          styles: { backgroundColor: '#030712', accentColor: '#fb7185', textColor: '#f8fafc', animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Features', x: 0, y: ys[3],
          settings: {
            title: 'Featured Work',
            subtitle: 'A selection of my best work and case studies.',
            layout: 'bento',
            items: [
              { title: 'Nexus Finance', description: 'Institutional grade crypto trading platform with real-time analytics.', color: '#34d399', span: '2' },
              { title: 'Voyage CRM', description: 'A seamless customer management experience for modern teams.', color: '#fbbf24', span: '1' },
              { title: 'Echo Audio', description: 'Next-gen music streaming platform for independent artists.', color: '#818cf8', span: '3' }
            ]
          },
          styles: { backgroundColor: '#030712', textColor: '#f8fafc', animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Timeline', x: 0, y: ys[4],
          settings: {
            title: 'My Experience',
            subtitle: 'Professional history and milestones.',
            milestones: [
              { title: 'Tech Lead @ Stripe', date: '2022 - 2024', description: 'Leading the checkout experience team and improving conversion rates by 15%.' },
              { title: 'Senior Dev @ Google', date: '2019 - 2022', description: 'Architected scalable microservices for Google Cloud Platform.' },
              { id: 'm3', title: 'Open Source Contributor', date: '2017 - 2019', description: 'Active contributor to React and Tailwind CSS core libraries.' }
            ]
          },
          styles: { backgroundColor: '#030712', textColor: '#f8fafc', animation: 'none' }
        },
        {
          id: nanoid(), type: 'Testimonials', x: 0, y: ys[5],
          settings: {
            title: 'Kind words from clients',
            testimonials: [
              {
                content: 'Alex transformed our vision into a stunning reality. The codebase is clean and the UI is world-class.',
                author: 'Jonathan Ivey', role: 'Design Director, Apple',
                avatar: 'https://i.pravatar.cc/150?img=33'
              },
              {
                content: 'Unmatched technical depth and eye for design. A rare find in the development world.',
                author: 'Elena Petrova', role: 'CEO, Fintech Global',
                avatar: 'https://i.pravatar.cc/150?img=26'
              }
            ]
          },
          styles: { backgroundColor: '#030712', textColor: '#f8fafc', animation: 'fade-up' }
        },
        {
          id: nanoid(), type: 'Chips', x: 0, y: ys[6],
          settings: {
            chips: [
              { label: 'React / Next.js', isActive: true },
              { label: 'TypeScript', isActive: true },
              { label: 'Node.js / Go', isActive: true },
              { label: 'PostgreSQL', isActive: true },
              { label: 'Tailwind CSS', isActive: true },
              { label: 'System Design', isActive: true }
            ]
          },
          styles: { backgroundColor: '#030712', paddingY: '4rem', animation: 'scale-in', textColor: '#f8fafc' }
        },
        {
          id: nanoid(), type: 'Contact', x: 0, y: ys[7],
          settings: {
            title: "Let's build something great",
            subtitle: "Currently open to new projects and senior roles. Send a message to start a conversation.",
            info: [
              { label: 'Email', value: 'hello@alex.dev', icon: 'Mail' },
              { label: 'Location', value: 'London, UK / Remote', icon: 'MapPin' },
              { label: 'Twitter', value: '@alex_dev', icon: 'Twitter' }
            ]
          },
          styles: { backgroundColor: '#030712', textColor: '#f8fafc', labelColor: '#94a3b8', animation: 'fade-up' }
        }
      ];
    })()
  }
};
