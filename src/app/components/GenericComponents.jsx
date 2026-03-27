import React from 'react';
import { User, Bell, Search, Menu, X, ChevronRight, Check, CheckCircle } from 'lucide-react';

// ==========================================
// Base Utilities — Tailwind UI patterns
// ==========================================
export const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>
        {children}
    </div>
);

// Tailwind UI: Badges — ring-inset style
export const Badge = ({ children, color = 'sky', className = '' }) => {
    const colors = {
        sky:     'bg-sky-50 text-sky-700 ring-sky-600/20',
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
        amber:   'bg-amber-50 text-amber-700 ring-amber-600/20',
        rose:    'bg-rose-50 text-rose-700 ring-rose-600/20',
        slate:   'bg-slate-50 text-slate-700 ring-slate-600/20',
        violet:  'bg-violet-50 text-violet-700 ring-violet-600/20',
        indigo:  'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
    };
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colors[color] || colors.slate} ${className}`}>
            {children}
        </span>
    );
};

export const Tag = ({ children, className = '' }) => (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600 ${className}`}>
        {children}
    </span>
);

export const AvatarWithStatus = ({ src, alt, status, size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24'
    };

    const statusColors = {
        online: 'bg-emerald-400',
        offline: 'bg-slate-300',
        away: 'bg-amber-400',
        busy: 'bg-rose-400'
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <img
                src={src || 'https://via.placeholder.com/150'}
                alt={alt || 'Avatar'}
                className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`}
            />
            {status && (
                <span
                    className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'}
            ${statusColors[status] || statusColors.offline}
          `}
                />
            )}
        </div>
    );
};

// ==========================================
// Complex Components
// ==========================================

// Tailwind UI: Stats — simple with icon right, tracking-tight
export const StatCard = ({ label, value, trend, icon: Icon, colorClass = 'bg-sky-50 text-sky-500' }) => (
    <div className="overflow-hidden rounded-xl bg-white px-4 py-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <dt className="truncate text-sm font-medium text-slate-500">{label}</dt>
            {Icon && (
                <div className={`flex-shrink-0 rounded-md p-2.5 ${colorClass}`}>
                    <Icon size={20} aria-hidden="true" />
                </div>
            )}
        </div>
        <dd className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</dd>
        {trend && (
            <p className="mt-2 flex items-center gap-1 text-xs">
                <span className={trend.startsWith('+') ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>{trend}</span>
                <span className="text-slate-500">vs last month</span>
            </p>
        )}
    </div>
);

// Tailwind UI: Tabs — pill variant (background highlight)
export const PillTab = ({ tabs, activeTab, onChange }) => (
    <div className="flex space-x-1 bg-slate-100/60 p-1 rounded-xl w-max">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${activeTab === tab.id
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
            >
                {tab.label}
            </button>
        ))}
    </div>
);

// Tailwind UI: Tabs — underline variant (border-bottom style)
export const UnderlineTab = ({ tabs, activeTab, onChange }) => (
    <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors
                        ${activeTab === tab.id
                            ? 'border-sky-500 text-sky-600'
                            : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                        }`}
                    aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                    {tab.label}
                    {tab.count != null && (
                        <span className={`ml-2 rounded-full py-0.5 px-2 text-xs font-medium hidden sm:inline-block
                            ${activeTab === tab.id ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500'}`}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </nav>
    </div>
);

// Tailwind UI: Modal Dialogs — centered panel with backdrop blur
export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    if (!isOpen) return null;
    const maxW = { sm: 'sm:max-w-sm', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-4xl' }[size] || 'sm:max-w-lg';
    return (
        <div className="relative z-50" aria-modal="true">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {/* Panel — Tailwind UI transform pattern */}
                    <div className={`relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${maxW}`}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-base font-semibold leading-6 text-slate-900">{title}</h2>
                            <button
                                onClick={onClose}
                                className="rounded-md text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            >
                                <span className="sr-only">Close</span>
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="px-6 py-5 overflow-y-auto max-h-[75vh]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Tailwind UI: Notifications / Alert toasts
export const Toast = ({ show, type = 'success', title, message, onClose }) => {
    if (!show) return null;
    const icon = type === 'success'
        ? <CheckCircle className="h-6 w-6 text-emerald-400" aria-hidden="true" />
        : <X className="h-6 w-6 text-rose-400" aria-hidden="true" />;
    return (
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">{icon}</div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        {title && <p className="text-sm font-semibold text-slate-900">{title}</p>}
                        {message && <p className="mt-1 text-sm text-slate-500">{message}</p>}
                    </div>
                    {onClose && (
                        <div className="ml-4 flex flex-shrink-0">
                            <button onClick={onClose} className="inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                <span className="sr-only">Close</span>
                                <X size={16} aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
