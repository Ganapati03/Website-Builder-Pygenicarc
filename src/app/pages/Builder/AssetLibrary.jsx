import React from 'react';
import { Card } from '../../components/GenericComponents';
import { Image as ImageIcon, Upload, Search, Grid, List } from 'lucide-react';

const AssetLibrary = () => (
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Asset Library</h2>
        <p className="text-slate-500 font-medium">Your media, icons, and reusable components.</p>
      </div>
      <button className="flex items-center justify-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:bg-sky-700 transition-all">
        <Upload size={20} />
        Upload Assets
      </button>
    </div>

    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button className="p-2 bg-white rounded-lg shadow-sm text-slate-900"><Grid size={18} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-900"><List size={18} /></button>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent hover:border-sky-500 cursor-pointer overflow-hidden group transition-all">
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={32} className="text-slate-300 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AssetLibrary;
