import React, { useState } from 'react';
import { Search, Send, File, Image, MoreVertical, Phone, Video, MicOff, ArrowLeft } from 'lucide-react';
import { dummyProfiles, dummyMessages } from '../../data/dummyData';
import useAuth from '../../hooks/useAuth';

const Chat = () => {
    const { user } = useAuth();
    const currentUser = user || { id: 'currentUser', name: 'User', avatar: 'https://i.pravatar.cc/150?u=current' };
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState(dummyMessages);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage = {
            id: `m${messages.length + 1}`,
            senderId: currentUser.id,
            text: messageInput,
            timestamp: new Date(),
            isOwn: true
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
    };

    const getFormatTime = (date) => {
        return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(date));
    };

    return (
        <div className="flex bg-white rounded-2xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>

            {/* Sidebar (Conversations List) */}
            <div className={`w-full md:w-80 border-r border-slate-200 flex flex-col h-full shrink-0 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-slate-200 shrink-0">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Messages</h2>
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2 text-sm font-medium">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full cursor-pointer">All</span>
                        <span className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded-full cursor-pointer">Alumni</span>
                        <span className="px-3 py-1 text-slate-500 hover:bg-slate-50 rounded-full cursor-pointer">Students</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {dummyProfiles.map(profile => (
                        <div
                            key={profile.id}
                            onClick={() => setSelectedChat(profile)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors mb-1
                ${selectedChat?.id === profile.id ? 'bg-sky-50' : 'hover:bg-slate-50'}
              `}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="relative shrink-0">
                                    <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                                    {profile.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-800 truncate">{profile.name}</h4>
                                    <p className="text-xs text-slate-500 truncate">{profile.role}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end shrink-0 pl-2">
                                <span className="text-xs text-slate-400">6 mins</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col h-full bg-slate-50 min-w-0 ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-16 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <button
                                    className="md:hidden mr-1 p-2 hover:bg-slate-100 rounded-full text-slate-500 shrink-0"
                                    onClick={() => setSelectedChat(null)}
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <div className="relative shrink-0">
                                    <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover" />
                                    {selectedChat.status === 'online' && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-bold text-slate-800 truncate">{selectedChat.name}</h3>
                                    <div className="flex items-center gap-1.5">
                                        {selectedChat.status === 'online' && <span className="w-2 h-2 bg-green-500 rounded-full bg-green-500 shrink-0"></span>}
                                        {selectedChat.status !== 'online' && <span className="w-2 h-2 bg-slate-300 rounded-full shrink-0"></span>}
                                        <p className="text-xs text-slate-500 capitalize">{selectedChat.status === 'online' ? 'Online' : 'Offline'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4 text-slate-400 shrink-0">
                                <button className="p-2 hover:text-slate-600 transition-colors hidden sm:block"><MicOff size={20} /></button>
                                <button className="p-2 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
                            </div>
                        </div>

                        {/* Messages Feed */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                            {messages.map(msg => {
                                const isIncoming = !msg.isOwn;
                                const senderProps = dummyProfiles.find(p => p.id === msg.senderId) || currentUser;

                                return (
                                    <div key={msg.id} className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`flex gap-2 max-w-[85%] sm:max-w-[70%] ${isIncoming ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <img src={senderProps.avatar} alt={senderProps.name} className="w-6 h-6 rounded-full shrink-0 mt-1" />
                                            <div className="flex flex-col min-w-0">
                                                <div className={`px-4 py-2 text-sm text-slate-700
                          ${isIncoming ? 'bg-emerald-50 rounded-2xl rounded-tl-sm' : 'bg-sky-100 rounded-2xl rounded-tr-sm'}
                        `}>
                                                    {msg.text}
                                                </div>
                                                <span className={`text-[11px] text-slate-400 mt-1 ${isIncoming ? 'text-left' : 'text-right'}`}>
                                                    {getFormatTime(msg.timestamp)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Chat Input */}
                        <div className="border-t border-slate-200 px-4 py-3 bg-white flex items-end gap-3 shrink-0">
                            <div className="flex items-center gap-1 text-slate-400 pb-1">
                                <button type="button" className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Image size={20} /></button>
                                <button type="button" className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden sm:block"><File size={20} /></button>
                            </div>
                            <textarea
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 py-3 px-4 min-h-[44px] max-h-32 text-sm outline-none transition-all"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center justify-center mb-0.5"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-slate-300">
                            <span className="text-2xl">💬</span>
                        </div>
                        <p className="text-lg font-medium text-slate-600">Select a conversation</p>
                        <p className="text-sm mt-1">Choose a chat from the left panel to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
