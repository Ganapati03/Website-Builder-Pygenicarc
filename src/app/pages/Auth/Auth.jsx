import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from 'app/hooks/useAuth';
import WorkspaceLoader from '../../components/WorkspaceLoader';
import {
    Eye, EyeOff, Lock, Mail, User, Briefcase,
    GraduationCap, Building2, MapPin, Link as LinkIcon, Phone
} from 'lucide-react';

// ==========================================
// Animation Variants
// ==========================================

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

// ==========================================
// Reusable Auth Components
// ==========================================

const AuthInput = ({ label, icon: Icon, type = "text", ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <motion.div variants={fadeInUp} className="w-full">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">{label}</label>
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                    </div>
                )}
                <input
                    type={inputType}
                    className={`block w-full rounded-xl border-0 bg-white py-2.5 text-slate-900 shadow-sm
                               ring-1 ring-inset ring-slate-200 placeholder:text-slate-400
                               focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6
                               transition-all duration-200 ${Icon ? 'pl-11' : 'pl-4'} pr-10`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-sky-600 transition-colors"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
            </div>
        </motion.div>
    );
};


const FormSection = ({ title, icon: Icon, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 last:mb-0"
    >
        <div className="border-b border-slate-100 pb-5 mb-8 flex items-center gap-4">
            <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-200"
            >
                <Icon className="h-5 w-5" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {children}
        </div>
    </motion.div>
);

// ==========================================
// Login Page
// ==========================================

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPreparingWorkspace, setIsPreparingWorkspace] = useState(false);
    const { login } = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setIsPreparingWorkspace(true);
            setTimeout(() => {
                const target = location.state?.from?.pathname || '/projects';
                navigate(target);
            }, 1200);
        } catch (e) { 
            console.error(e); 
            setIsPreparingWorkspace(false);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-slate-900 py-12 lg:py-0">
            <WorkspaceLoader isVisible={isPreparingWorkspace} message="Authenticating and preparing dashboard" />
            
            {/* Full Screen Pattern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900 opacity-90" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 px-6 lg:px-12">

                {/* Left Panel: Animated Hero */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 w-full max-w-md lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto lg:mx-0 mb-8 lg:mb-10 border border-white/20 shadow-2xl"
                    >
                        <span className="text-white font-black text-3xl lg:text-4xl">W</span>
                    </motion.div>

                    <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.15] lg:leading-[1.1] mb-6 tracking-tighter">
                        Design without<br />
                        <motion.span
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-[length:200%_auto] bg-clip-text text-transparent"
                        >
                            boundaries.
                        </motion.span>
                    </h1>
                    <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
                        The visual engine for next-gen developers. Seamlessly transition from idea to production.
                    </p>

                    <div className="flex items-center justify-center lg:justify-start gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <motion.img
                                    key={i}
                                    whileHover={{ y: -5, zIndex: 50 }}
                                    className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800"
                                    src={`https://i.pravatar.cc/100?u=${i}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-slate-400 font-bold tracking-wide uppercase">Used by 12k+ teams</span>
                    </div>
                </motion.div>

                {/* Right Panel: Form */}
                <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="w-full"
                    >
                        <motion.div variants={fadeInUp} className="mb-8 text-center lg:text-left">
                            <h2 className="text-3xl font-black text-white tracking-tight">Welcome back</h2>
                            <p className="text-sky-200 mt-2 font-medium">Continue your building journey</p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-sky-900/50 rounded-3xl border border-white/20"
                        >
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <AuthInput
                                    label="Identifier"
                                    icon={Mail}
                                    placeholder="Email (use 'admin' for admin access)"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <AuthInput
                                    label="Secret Key"
                                    icon={Lock}
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <motion.button
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.02, backgroundColor: "#0284c7" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-sky-600 text-white py-3.5 rounded-xl font-bold shadow-xl shadow-sky-100 transition-colors"
                                >
                                    Launch Dashboard
                                </motion.button>
                            </form>

                            <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-500 font-medium">
                                    New here? <Link to="/register" className="text-sky-600 font-bold hover:underline">Create account</Link>
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// Register Page
// ==========================================

export const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [isPreparingWorkspace, setIsPreparingWorkspace] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register();
            setIsPreparingWorkspace(true);
            setTimeout(() => {
                navigate('/projects');
            }, 1200);
        } catch (error) { 
            console.error(error); 
            setIsPreparingWorkspace(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center py-16 px-6 overflow-hidden bg-slate-900">
            <WorkspaceLoader isVisible={isPreparingWorkspace} message="Provisioning your workspace" />
            
            {/* Full Screen Pattern Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900 opacity-90" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10 w-full max-w-4xl mx-auto mt-12 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-2xl"
                    >
                        <span className="text-white font-black text-3xl">W</span>
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Join the movement</h2>
                    <p className="mt-4 text-sky-200 font-medium max-w-md mx-auto">
                        Your workspace is being prepared. Fill in the details to customize your experience.
                    </p>
                </motion.div>

                <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/50 rounded-[2.5rem] border border-white/20 p-8 sm:p-12">
                    <form onSubmit={handleSubmit}>
                        <FormSection title="The Basics" icon={User}>
                            <AuthInput label="Full Name" icon={User} placeholder="Jane Doe" required />
                            <AuthInput label="Email Address" icon={Mail} type="email" placeholder="jane@example.com" required />
                            <AuthInput label="Phone" icon={Phone} type="tel" placeholder="+1..." />
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Gender</label>
                                <select className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm focus:ring-2 focus:ring-sky-500 transition-all">
                                    <option value="">Select...</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </FormSection>

                        <FormSection title="Education" icon={GraduationCap}>
                            <AuthInput label="Institution" icon={Building2} placeholder="State University" required />
                            <AuthInput label="Major" icon={GraduationCap} placeholder="Computer Science" required />
                            <AuthInput label="Batch" icon={GraduationCap} type="number" placeholder="2024" required />
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Degree</label>
                                <select className="w-full rounded-xl border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm focus:ring-2 focus:ring-sky-500 transition-all">
                                    <option value="bachelors">Bachelor's</option>
                                    <option value="masters">Master's</option>
                                </select>
                            </div>
                        </FormSection>

                        <FormSection title="Professional" icon={Briefcase}>
                            <AuthInput label="Role" icon={Briefcase} placeholder="Lead Designer" />
                            <AuthInput label="Company" icon={Building2} placeholder="Acme Inc" />
                            <div className="md:col-span-2">
                                <AuthInput label="LinkedIn Profile" icon={LinkIcon} type="url" placeholder="https://..." />
                            </div>
                        </FormSection>

                        <FormSection title="Security" icon={Lock}>
                            <AuthInput label="Password" icon={Lock} type="password" required />
                            <AuthInput label="Confirm" icon={Lock} type="password" required />
                        </FormSection>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="pt-10 mt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <Link to="/login" className="text-slate-400 font-bold hover:text-slate-600 transition-colors">
                                &larr; Back to login
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-2xl shadow-slate-200 hover:bg-black transition-all"
                            >
                                Complete Setup
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
            </div>
        </div>
    );
};