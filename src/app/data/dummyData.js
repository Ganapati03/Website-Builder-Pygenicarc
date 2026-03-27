// src/app/data/dummyData.js
import { subDays, subHours } from 'date-fns';

const now = new Date();

export const dummyProfiles = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'Senior Software Engineer',
        company: 'TechFlow Inc.',
        graduationYear: 2018,
        major: 'Computer Science',
        location: 'San Francisco, CA',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        status: 'online',
        skills: ['React', 'Node.js', 'System Design'],
        about: 'Passionate about building scalable web applications and mentoring junior developers. Always open to discussing tech and career growth!',
        isMentor: true,
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        role: 'Product Manager',
        company: 'InnovateX',
        graduationYear: 2019,
        major: 'Business Administration',
        location: 'New York, NY',
        avatar: 'https://i.pravatar.cc/150?u=marcus',
        status: 'offline',
        skills: ['Agile', 'Product Strategy', 'UX Research'],
        about: 'Bridging the gap between engineering and user needs. Love connecting with fellow alumni working in the startup space.',
        isMentor: false,
    },
    {
        id: '3',
        name: 'Emily Davis',
        role: 'UX Designer',
        company: 'Creative Solutions',
        graduationYear: 2021,
        major: 'Graphic Design',
        location: 'Austin, TX',
        avatar: 'https://i.pravatar.cc/150?u=emily',
        status: 'online',
        skills: ['Figma', 'User Testing', 'Prototyping'],
        about: 'Designing intuitive and beautiful digital experiences. Looking to collaborate on exciting side projects.',
        isMentor: true,
    },
    {
        id: '4',
        name: 'David Lee',
        role: 'Data Scientist',
        company: 'Quantify Analytics',
        graduationYear: 2017,
        major: 'Mathematics',
        location: 'Chicago, IL',
        avatar: 'https://i.pravatar.cc/150?u=david',
        status: 'away',
        skills: ['Python', 'Machine Learning', 'Data Visualization'],
        about: 'Turning data into actionable insights. Always happy to chat about the latest trends in AI and big data.',
        isMentor: false,
    },
    {
        id: '5',
        name: 'Alex Rodriguez',
        role: 'Marketing Director',
        company: 'Global Brands Hub',
        graduationYear: 2015,
        major: 'Communications',
        location: 'Miami, FL',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        status: 'online',
        skills: ['Digital Marketing', 'Brand Strategy', 'SEO'],
        about: 'Helping brands find their voice in a noisy world. Exploring new marketing strategies every day.',
        isMentor: true,
    }
];

export const dummyEvents = [
    {
        id: 'e1',
        title: 'Mastering Framer Motion',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
        location: 'Virtual Workshop',
        attendees: 145,
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=800',
        description: 'Join us for an advanced session on creating immersive web animations using Framer Motion.',
    },
    {
        id: 'e2',
        title: 'Build with AI',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 12),
        location: 'Creator Hub Lounge',
        attendees: 80,
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
        description: 'Learn how to integrate LLMs into your website templates for dynamic content generation.',
    },
    {
        id: 'e3',
        title: 'Monetizing Templates',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20),
        location: 'Global Stream',
        attendees: 210,
        category: 'Business',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
        description: 'A deep dive into the business of selling high-quality website templates to clients.',
    }
];

export const dummyMessages = [
    {
        id: 'm1',
        senderId: '1',
        text: 'Hey! I saw you recently transitioned to Product Management. Would love to hear about your experience doing so.',
        timestamp: subHours(now, 2),
        isOwn: false,
    },
    {
        id: 'm2',
        senderId: 'currentUser',
        text: 'Hi Sarah! Yes, it was definitely a learning curve but very rewarding. Are you thinking about making the switch?',
        timestamp: subHours(now, 1),
        isOwn: true,
    },
    {
        id: 'm3',
        senderId: '1',
        text: 'I am! Hoping we could grab a virtual coffee sometime next week to chat about it?',
        timestamp: subHours(now, 0.5),
        isOwn: false,
    }
];

export const dummyStats = [
    { label: 'Platform Creators', value: '12,450', trend: '+12%', icon: 'users', color: 'bg-sky-50 text-sky-500' },
    { label: 'Pro Templates', value: '840', trend: '+5%', icon: 'award', color: 'bg-emerald-50 text-emerald-500' },
    { label: 'Live Sites', value: '56k', trend: '+22%', icon: 'globe', color: 'bg-indigo-50 text-indigo-500' },
    { label: 'Creator Earnings', value: '$3.2M', trend: '+18%', icon: 'wallet', color: 'bg-amber-50 text-amber-500' }
];

export const dummyNews = [
    {
        id: 'n1',
        title: 'University Opens New Innovation Center',
        date: subDays(now, 2),
        summary: 'A state-of-the-art facility for student and alumni entrepreneurs opens its doors on campus.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'n2',
        title: 'Alumni Spotlight: Building the Future of Green Tech',
        date: subDays(now, 5),
        summary: 'Read how a group of recent graduates are making waves in the sustainable energy sector.',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800'
    }
];

export const currentUser = {
    id: 'currentUser',
    name: 'Current User',
    avatar: 'https://i.pravatar.cc/150?u=current',
    role: 'Creator'
}
