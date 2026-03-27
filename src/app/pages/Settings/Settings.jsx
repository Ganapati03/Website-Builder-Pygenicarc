import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

// Inline edit modal
const EditModal = ({ field, label, value, onSave, onClose }) => {
    const [val, setVal] = useState(value);
    const isPassword = field === 'password';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Update {label}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full"><X size={18} /></button>
                </div>
                <input
                    type={isPassword ? 'password' : 'text'}
                    className="block w-full rounded-md border-0 bg-white px-4 py-2 text-sm text-slate-900
                               shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400
                               focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:leading-6 mb-4 outline-none transition-shadow"
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    placeholder={`Enter new ${label.toLowerCase()}`}
                    autoFocus
                />
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 rounded-md bg-white py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">Cancel</button>
                    <button onClick={() => onSave(field, val)} disabled={!val.trim()} className="flex-1 rounded-md bg-sky-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-colors disabled:opacity-50">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper component for Toggle Switch
const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between py-4">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
            type="button"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 ${checked ? 'bg-sky-600' : 'bg-slate-200'}`}
            role="switch"
            aria-checked={checked}
            onClick={onChange}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
            />
        </button>
    </div>
);

// Helper component for Setting Row
const SettingRow = ({ label, value, actionText = "Update", onAction }) => (
    <div className="flex items-center justify-between py-4 sm:py-5 border-b border-slate-100 last:border-0">
        <div className="flex-1 min-w-0 pr-4">
            <p className="text-sm font-medium text-slate-800">{label}</p>
        </div>
        <div className="flex-1 min-w-0 pr-4 hidden sm:block">
            <p className="text-sm text-slate-500 truncate">{value}</p>
        </div>
        <div className="flex-shrink-0 ml-4">
            {actionText ? (
                <button
                    onClick={onAction}
                    className="text-sm font-medium text-sky-600 hover:text-sky-500 transition-colors"
                >
                    {actionText}
                </button>
            ) : null}
        </div>
        {/* Mobile value text under the label if hidden sm */}
        <div className="sm:hidden block w-full mt-1">
            <p className="text-sm text-slate-500 truncate">{value}</p>
        </div>
    </div>
);


const Settings = () => {
    const { user } = useAuth();
    const currentUser = user || { name: 'User', avatar: 'https://i.pravatar.cc/150?u=current' };
    const [activeTab, setActiveTab] = useState('profile');

    // Editable profile data
    const [profileData, setProfileData] = useState({
        name: currentUser.name || 'User',
        email: 'user@alumni.edu',
        position: 'Senior Frontend Engineer',
        department: 'Computer Science',
        graduationYear: '2018',
    });

    // Edit modal state
    const [editModal, setEditModal] = useState(null); // { field, label, value }
    const [savedField, setSavedField] = useState(null);

    const openEditModal = (field, label, value) => setEditModal({ field, label, value });
    const closeEditModal = () => setEditModal(null);
    const handleEditSave = (field, value) => {
        if (field !== 'password') setProfileData(prev => ({ ...prev, [field]: value }));
        setEditModal(null);
        setSavedField(field);
        setTimeout(() => setSavedField(null), 2000);
    };

    // States for Privacy
    const [showEmail, setShowEmail] = useState(true);
    const [showPhone, setShowPhone] = useState(false);
    const [allowMessages, setAllowMessages] = useState(true);
    const [showInDirectory, setShowInDirectory] = useState(true);

    // States for Notifications
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [notifyConnections, setNotifyConnections] = useState(true);
    const [notifyEvents, setNotifyEvents] = useState(true);

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'privacy', label: 'Privacy' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {editModal && (
                <EditModal
                    field={editModal.field}
                    label={editModal.label}
                    value={editModal.value}
                    onSave={handleEditSave}
                    onClose={closeEditModal}
                />
            )}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Settings</h1>

            {/* Navigation */}
            <div className="mb-8">
                {/* Mobile dropdown */}
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">Select a tab</label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-0 bg-white py-2 pl-3 pr-10 text-sm text-slate-900
                                   shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 outline-none"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.id} value={tab.id}>{tab.label}</option>
                        ))}
                    </select>
                </div>

                {/* Desktop horizontal tabs */}
                <div className="hidden sm:block">
                    <nav className="flex space-x-8 border-b border-slate-200" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                    ${activeTab === tab.id
                                        ? 'border-sky-500 text-sky-600'
                                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content Areas */}
            <div className="mt-6">

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-base/7 font-semibold text-slate-900">Profile Information</h2>
                            <p className="mt-1 text-sm/6 text-slate-500">
                                This information will be displayed to other users on the platform.
                            </p>

                            <div className="mt-6 border-t border-slate-200">
                                <div className="flex items-center gap-6 py-5 border-b border-slate-100">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-800">Avatar</p>
                                        <p className="text-sm text-slate-500 mt-1">Update your profile picture visible to the community.</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <img src={currentUser.avatar} alt="Profile" className="h-12 w-12 rounded-full object-cover bg-slate-100" />
                                        <button type="button" className="text-sm font-medium text-sky-600 hover:text-sky-500 transition-colors">
                                            Update
                                        </button>
                                    </div>
                                </div>

                                <SettingRow label="Full name" value={savedField === 'name' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Saved!</span> : profileData.name} onAction={() => openEditModal('name', 'Full Name', profileData.name)} />
                                <SettingRow label="Email address" value={savedField === 'email' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Saved!</span> : profileData.email} onAction={() => openEditModal('email', 'Email Address', profileData.email)} />
                                <SettingRow label="Title/Position" value={savedField === 'position' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Saved!</span> : profileData.position} onAction={() => openEditModal('position', 'Title/Position', profileData.position)} />
                                <SettingRow label="Department/Major" value={savedField === 'department' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Saved!</span> : profileData.department} onAction={() => openEditModal('department', 'Department/Major', profileData.department)} />
                                <SettingRow label="Graduation Year" value={savedField === 'graduationYear' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Saved!</span> : profileData.graduationYear} onAction={() => openEditModal('graduationYear', 'Graduation Year', profileData.graduationYear)} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-base/7 font-semibold text-slate-900">Privacy Settings</h2>
                            <p className="mt-1 text-sm/6 text-slate-500">
                                Manage what information is visible to other users.
                            </p>

                            <div className="mt-6 border-t border-slate-200 divide-y divide-slate-100">
                                <ToggleSwitch
                                    label="Show email address on profile"
                                    checked={showEmail}
                                    onChange={() => setShowEmail(!showEmail)}
                                />
                                <ToggleSwitch
                                    label="Show phone number on profile"
                                    checked={showPhone}
                                    onChange={() => setShowPhone(!showPhone)}
                                />
                                <ToggleSwitch
                                    label="Allow messages from students"
                                    checked={allowMessages}
                                    onChange={() => setAllowMessages(!allowMessages)}
                                />
                                <ToggleSwitch
                                    label="Show my profile in the Alumni Directory"
                                    checked={showInDirectory}
                                    onChange={() => setShowInDirectory(!showInDirectory)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-base/7 font-semibold text-slate-900">Notification Preferences</h2>
                            <p className="mt-1 text-sm/6 text-slate-500">
                                Choose how and when you want to be notified by the platform.
                            </p>

                            <div className="mt-6 border-t border-slate-200 divide-y divide-slate-100">
                                <ToggleSwitch
                                    label="Receive email notifications"
                                    checked={emailNotifs}
                                    onChange={() => setEmailNotifs(!emailNotifs)}
                                />
                                <ToggleSwitch
                                    label="Receive push notifications"
                                    checked={pushNotifs}
                                    onChange={() => setPushNotifs(!pushNotifs)}
                                />
                                <ToggleSwitch
                                    label="Notify me about new connections"
                                    checked={notifyConnections}
                                    onChange={() => setNotifyConnections(!notifyConnections)}
                                />
                                <ToggleSwitch
                                    label="Notify me about upcoming events"
                                    checked={notifyEvents}
                                    onChange={() => setNotifyEvents(!notifyEvents)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-base/7 font-semibold text-slate-900">Security Details</h2>
                            <p className="mt-1 text-sm/6 text-slate-500">
                                Manage your password and account security settings.
                            </p>

                            <div className="mt-6 border-t border-slate-200">
                                <SettingRow label="Current password" value={savedField === 'password' ? <span className="flex items-center gap-1 text-emerald-600"><Check size={13}/> Updated!</span> : '••••••••••••'} actionText="Change password" onAction={() => openEditModal('password', 'Password', '')} />
                                <SettingRow label="Two-factor authentication" value="Disabled" actionText="Enable" onAction={() => alert('2FA setup coming soon.')} />
                                <SettingRow label="Session recovery" value="Active on 2 devices" actionText="Review" onAction={() => alert('Session management coming soon.')} />
                            </div>

                            <div className="mt-10 border-t border-slate-100 pt-8">
                                <h3 className="text-base font-semibold leading-7 text-rose-600">Danger Zone</h3>
                                <p className="mt-1 text-sm leading-6 text-slate-500 mb-4">
                                    Permanently delete your account and all associated data.
                                </p>
                                <button
                                    type="button"
                                    className="rounded-md bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 shadow-sm hover:bg-rose-100 transition-colors"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
