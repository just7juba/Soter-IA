import React, { useState } from 'react';
import {
  Search,
  Cpu,
  Globe,
  Download,
  FileText,
  Tag,
  Calendar,
  User,
  Sparkles,
  FolderOpen,
  History as HistoryIcon
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_CASES, Case } from '../types';

export const IPDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Brevet' | 'Marque'>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(MOCK_CASES[0].id);

  const filteredCases = MOCK_CASES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || c.type === filterType;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId);

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-6">
      {/* Left: List */}
      <div className="w-[360px] flex flex-col gap-4">
        <div className="bg-white p-5 rounded-xl border border-brown-100 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-brown-800">Dossiers IP</h2>
            <p className="text-xs text-brown-400">Gérez vos brevets et marques</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un dossier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brown-50 border border-brown-100 rounded-lg py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brown-300 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" size={14} />
          </div>
          <div className="flex gap-2">
            {['All', 'Brevet', 'Marque'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  filterType === type
                    ? "bg-brown-700 text-white"
                    : "bg-brown-50 text-brown-500 hover:bg-brown-100"
                )}
              >
                {type === 'All' ? 'Tous' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredCases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl transition-all border",
                selectedCaseId === c.id
                  ? "bg-white border-brown-200 shadow-sm"
                  : "bg-white/50 border-transparent hover:bg-white hover:border-brown-100"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  c.type === 'Brevet' ? "bg-brown-100 text-brown-600" : "bg-brown-700 text-brown-200"
                )}>
                  {c.type === 'Brevet' ? <Cpu size={14} /> : <Globe size={14} />}
                </div>
                <span className={cn(
                  "text-[11px] font-medium px-2 py-0.5 rounded-md",
                  c.status === 'Terminé' ? "bg-emerald-50 text-emerald-600" :
                  c.status === 'Révision' ? "bg-amber-50 text-amber-600" : "bg-brown-50 text-brown-600"
                )}>
                  {c.status}
                </span>
              </div>
              <h4 className="text-sm font-medium text-brown-800 mb-1">{c.title}</h4>
              <p className="text-xs text-brown-400">{c.id} · {c.client}</p>
            </button>
          ))}

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <Search size={24} className="mx-auto text-brown-200 mb-2" />
              <p className="text-xs text-brown-400">Aucun dossier trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 min-w-0">
        {selectedCase ? (
          <div className="h-full flex flex-col gap-5 overflow-y-auto">
            <div className="bg-white p-6 rounded-xl border border-brown-100 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  selectedCase.type === 'Brevet' ? "bg-brown-100 text-brown-600" : "bg-brown-700 text-brown-200"
                )}>
                  {selectedCase.type === 'Brevet' ? <Cpu size={24} /> : <Globe size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-lg font-semibold text-brown-800">{selectedCase.title}</h1>
                    <span className="px-2 py-0.5 bg-brown-50 text-brown-500 text-[11px] font-medium rounded-md border border-brown-100">
                      {selectedCase.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-brown-400">
                    <span className="flex items-center gap-1"><User size={12} /> {selectedCase.client}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {selectedCase.lastModified}</span>
                    <span className="flex items-center gap-1"><Tag size={12} /> {selectedCase.sector}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-brown-50 text-brown-400 rounded-lg hover:text-brown-700 transition-all border border-brown-100">
                  <Download size={16} />
                </button>
                <button className="bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all">
                  Ouvrir l'éditeur
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0">
              <div className="lg:col-span-2 space-y-5">
                {/* AI Analysis */}
                <div className="bg-brown-800 text-white p-6 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                        <Sparkles size={18} className="text-brown-200" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">Analyse Soter IA</h3>
                        <p className="text-[11px] text-brown-300">Intelligence Artificielle IP</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-brown-200">94%</span>
                      <p className="text-[11px] text-brown-300">Indice de Protection</p>
                    </div>
                  </div>
                  <p className="text-sm text-brown-200 leading-relaxed">
                    L'invention présente une forte activité inventive. Nous recommandons de renforcer les revendications 3 et 4 pour couvrir les variantes d'interface thermique.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Nouveauté', value: '98%', color: 'text-emerald-400' },
                      { label: 'Clarté', value: '82%', color: 'text-brown-200' },
                      { label: 'Risque', value: 'Bas', color: 'text-blue-300' }
                    ].map((stat, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[11px] text-brown-300 mb-0.5">{stat.label}</p>
                        <p className={cn("text-base font-bold", stat.color)}>{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white p-5 rounded-xl border border-brown-100">
                    <h4 className="text-xs font-semibold text-brown-800 mb-3 flex items-center gap-2">
                      <FileText size={14} className="text-brown-400" />
                      Résumé Technique
                    </h4>
                    <p className="text-sm text-brown-500 leading-relaxed">{selectedCase.description}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-brown-100">
                    <h4 className="text-xs font-semibold text-brown-800 mb-3 flex items-center gap-2">
                      <Globe size={14} className="text-brown-400" />
                      Juridictions & Classes
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {['OEB', 'USPTO', 'WIPO'].map(j => (
                        <span key={j} className="px-2 py-0.5 bg-brown-50 text-brown-600 text-[11px] font-medium rounded-md border border-brown-100">{j}</span>
                      ))}
                    </div>
                    <div className="p-3 bg-brown-50 rounded-lg">
                      <p className="text-[11px] text-brown-400 mb-1">Classification CIB</p>
                      <p className="text-xs font-medium text-brown-800">G06N 10/00 · H01L 39/00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-white p-5 rounded-xl border border-brown-100">
                  <h4 className="text-xs font-semibold text-brown-800 mb-4 flex items-center gap-2">
                    <HistoryIcon size={14} className="text-brown-400" />
                    Historique
                  </h4>
                  <div className="space-y-4 relative before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-px before:bg-brown-100">
                    {[
                      { date: '22 Mars', action: 'Révision des revendications', user: 'Alex R.' },
                      { date: '20 Mars', action: 'Optimisation IA', user: 'Soter IA' },
                      { date: '18 Mars', action: 'Dépôt provisoire', user: 'Alex R.' }
                    ].map((h, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-white border-2 border-brown-200 z-10" />
                        <p className="text-xs font-medium text-brown-800">{h.action}</p>
                        <p className="text-[11px] text-brown-400">{h.date} · {h.user}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-brown-100">
                  <h4 className="text-xs font-semibold text-brown-800 mb-4 flex items-center gap-2">
                    <FolderOpen size={14} className="text-brown-400" />
                    Documents
                  </h4>
                  <div className="space-y-2">
                    {['Divulgation.pdf', 'Dessins.dwg', 'Recherche.xlsx'].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-brown-50 rounded-lg hover:bg-brown-100 transition-all cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-brown-400" />
                          <span className="text-xs text-brown-600">{doc}</span>
                        </div>
                        <Download size={12} className="text-brown-400" />
                      </div>
                    ))}
                    <button className="w-full py-2.5 border border-dashed border-brown-200 rounded-lg text-xs text-brown-400 hover:border-brown-500 hover:text-brown-700 transition-all">
                      + Ajouter un fichier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-white rounded-xl border border-dashed border-brown-200">
            <div className="text-center">
              <FolderOpen size={32} className="mx-auto text-brown-200 mb-2" />
              <p className="text-sm text-brown-400">Sélectionnez un dossier</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
