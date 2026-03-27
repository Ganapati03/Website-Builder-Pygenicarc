import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Users, ChevronRight } from 'lucide-react';
import { Card, AvatarWithStatus, Badge, Tag } from './GenericComponents';

export const ProfileCard = ({ profile, onClick }) => {
    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden group h-full relative">
            <Link to={`/profiles/${profile.id}`} onClick={onClick} className="absolute inset-0 z-10">
                <span className="sr-only">View profile of {profile.name}</span>
            </Link>
            <div className="h-24 bg-slate-200 relative">
                <div className="absolute -bottom-10 left-6 z-20">
                    <AvatarWithStatus src={profile.avatar} status={profile.status} size="lg" />
                </div>
            </div>
            <div className="p-6 pt-12">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{profile.name}</h3>
                        <p className="text-sm font-medium text-sky-600">{profile.role}</p>
                    </div>
                    {profile.isMentor && <Badge color="emerald">Mentor</Badge>}
                </div>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                        <Briefcase size={16} className="mr-2 text-slate-400" />
                        <span>{profile.company}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <Calendar size={16} className="mr-2 text-slate-400" />
                        <span>Class of {profile.graduationYear} &bull; {profile.major}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                        <MapPin size={16} className="mr-2 text-slate-400" />
                        <span>{profile.location}</span>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {profile.skills?.slice(0, 3).map((skill, i) => (
                        <Tag key={i} className="text-xs py-0.5 px-2 bg-slate-50 border border-slate-100">{skill}</Tag>
                    ))}
                    {profile.skills?.length > 3 && (
                        <Tag className="text-xs py-0.5 px-2 bg-slate-50 border border-slate-100">+{profile.skills.length - 3}</Tag>
                    )}
                </div>
            </div>
        </Card>
    );
};

export const EventCard = ({ event }) => {
    return (
        <Card className="flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-full sm:w-48 h-48 sm:h-auto relative bg-slate-100 flex-shrink-0">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                    <Badge color="sky" className="backdrop-blur-md bg-white/90 shadow-sm">{event.category}</Badge>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center text-sky-600 text-sm font-semibold mb-2">
                        <span>{event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <span className="mx-2">&bull;</span>
                        <span>{event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{event.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">{event.description}</p>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center">
                        <MapPin size={16} className="mr-1.5 text-slate-400" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                        <Users size={16} className="mr-1.5 text-slate-400" />
                        <span>{event.attendees} attending</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export const Table = ({ headers, data, renderRow }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200">
                        {headers.map((header, index) => (
                            <th key={index} className="py-4 px-6 bg-slate-50 text-slate-500 font-semibold text-sm first:rounded-tl-2xl last:rounded-tr-2xl">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                            {renderRow(item)}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={headers.length} className="py-8 text-center text-slate-500">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export const ChatMessageBubble = ({ message, isOwn }) => {
    return (
        <div className={`flex w-full mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] lg:max-w-[60%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                <div
                    className={`px-4 py-3 rounded-2xl ${isOwn
                        ? 'bg-sky-500 text-white rounded-tr-sm'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm shadow-sm'
                        }`}
                >
                    <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 mx-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};
