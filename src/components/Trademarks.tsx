import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Globe, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  ExternalLink,
  Bookmark,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_CASES } from '../types';

export const Trademarks = () => {
  const trademarkCases = MOCK_CASES.filter(c => c.type === 'Marque');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            placeholder="RECHERCHER UNE MARQUE..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-[11px] outline-none focus:ring-2 focus:ring-beige-dark/20 transition-all font-bold tracking-widest placeholder:text-slate-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-midnight transition-colors" size={18} />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2.5 px-6 py-4 bg-slate-50 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">
            <Filter size={16} />
            Filtres
          </button>
          <button className="flex items-center gap-2.5 px-8 py-4 bg-midnight text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-midnight-light transition-all shadow-xl shadow-midnight/10">
            <Plus size={18} />
            Déposer une marque
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trademarkCases.map((tm, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={tm.id}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:border-beige-dark hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-beige text-midnight rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm border border-beige-dark/30">
                  {tm.title.charAt(0)}
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  tm.status === 'Terminé' ? "bg-emerald-50 text-emerald-600" : "bg-beige text-midnight"
                )}>
                  {tm.status}
                </div>
              </div>
 
              <div>
                <h3 className="font-black text-slate-900 group-hover:text-midnight transition-colors uppercase tracking-tight text-lg">{tm.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{tm.sector}</p>
              </div>
 
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-slate-300" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">EUIPO, INPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-300 hover:text-midnight hover:bg-beige rounded-xl transition-all">
                    <Bookmark size={18} />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-midnight hover:bg-beige rounded-xl transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 bg-midnight rounded-full animate-pulse shadow-[0_0_8px_rgba(2,6,23,0.3)]" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Analyse IA en cours</span>
              </div>
              <button className="text-[10px] font-black text-midnight uppercase tracking-widest hover:underline">Détails</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
