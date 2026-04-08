import React, { useState } from 'react';
import {
  Search,
  Globe,
  Info,
  CheckCircle2,
  BookOpen,
  Tag,
  Hash
} from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_CLASSES = [
  { id: '01', title: 'Produits chimiques', description: "Produits chimiques destinés à l'industrie, aux sciences, à la photographie, ainsi qu'à l'agriculture.", type: 'International (Nice)' },
  { id: '09', title: 'Appareils et instruments scientifiques', description: "Appareils et instruments scientifiques, de recherche, de navigation, géodésiques, photographiques.", type: 'International (Nice)' },
  { id: '35', title: 'Publicité ; gestion des affaires commerciales', description: "Publicité ; gestion des affaires commerciales ; administration commerciale ; travaux de bureau.", type: 'International (Nice)' },
  { id: '42', title: 'Services scientifiques et technologiques', description: "Services scientifiques et technologiques ainsi que services de recherches et de conception y relatifs.", type: 'International (Nice)' },
  { id: 'A01', title: 'Agriculture ; sylviculture ; élevage', description: 'Classification internationale des brevets (CIB).', type: 'Brevets (CIB)' },
  { id: 'G06', title: 'Calcul ; comptage', description: 'Classification internationale des brevets (CIB).', type: 'Brevets (CIB)' },
  { id: 'H01', title: 'Éléments électriques de base', description: 'Classification internationale des brevets (CIB).', type: 'Brevets (CIB)' },
];

export const ClassSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState<'All' | 'Nice' | 'CIB'>('All');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const filteredClasses = MOCK_CLASSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'All' ||
                       (activeType === 'Nice' && c.type.includes('Nice')) ||
                       (activeType === 'CIB' && c.type.includes('CIB'));
    return matchesSearch && matchesType;
  });

  const toggleClass = (id: string) => {
    setSelectedClasses(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="bg-white p-5 rounded-xl border border-brown-100 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-brown-800">Recherche de Classes IP</h3>
            <p className="text-xs text-brown-400">Classifications internationales (Nice) et brevets (CIB)</p>
          </div>
          <div className="flex bg-brown-50 p-1 rounded-lg border border-brown-100">
            {[
              { id: 'All', label: 'Toutes' },
              { id: 'Nice', label: 'Marques (Nice)' },
              { id: 'CIB', label: 'Brevets (CIB)' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  activeType === type.id
                    ? "bg-white text-brown-800 shadow-sm"
                    : "text-brown-400 hover:text-brown-700"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" size={14} />
          <input
            type="text"
            placeholder="Rechercher par numéro ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brown-50 border border-brown-100 rounded-lg py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brown-300 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredClasses.map((c) => (
            <div
              key={c.id}
              onClick={() => toggleClass(c.id)}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer",
                selectedClasses.includes(c.id)
                  ? "bg-brown-50 border-brown-300"
                  : "bg-white border-brown-100 hover:border-brown-200"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                  selectedClasses.includes(c.id) ? "bg-brown-700 text-white" : "bg-brown-50 text-brown-400"
                )}>
                  {c.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-sm font-medium text-brown-800 truncate">{c.title}</h4>
                    {selectedClasses.includes(c.id) && <CheckCircle2 size={14} className="text-brown-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-brown-400 mb-1">{c.type}</p>
                  <p className="text-xs text-brown-500 leading-relaxed line-clamp-2">{c.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedClasses.length > 0 && (
          <div className="pt-4 border-t border-brown-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-brown-400">Sélection:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedClasses.map(id => (
                  <span key={id} className="px-2 py-0.5 bg-brown-700 text-white text-[11px] font-medium rounded-md">
                    Classe {id}
                  </span>
                ))}
              </div>
            </div>
            <button className="bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all">
              Utiliser la sélection
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-brown-800 text-white p-5 rounded-xl flex items-center gap-5">
        <div className="w-10 h-10 bg-brown-200 text-brown-700 rounded-lg flex items-center justify-center shrink-0">
          <Info size={20} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold mb-0.5">Aide à la Classification</h4>
          <p className="text-xs text-brown-300 leading-relaxed">
            Soter IA peut déterminer automatiquement les classes pertinentes en analysant votre description technique.
          </p>
        </div>
        <button className="bg-white text-brown-800 px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-50 transition-all shrink-0">
          Analyse IA
        </button>
      </div>
    </div>
  );
};
