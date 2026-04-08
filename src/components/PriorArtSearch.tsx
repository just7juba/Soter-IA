import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Bookmark, CheckCircle2, AlertCircle, Zap, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const ALL_MOCK_RESULTS = [
  {
    id: 'US-11234567-B2',
    title: 'Système de Refroidissement Cryogénique pour Processeurs Quantiques',
    assignee: 'IBM Corporation',
    date: '2023-11-14',
    similarity: 0.94,
    status: 'Actif',
    tags: ['Solaire', 'IA'],
    abstract: 'Un système et une méthode pour refroidir les processeurs quantiques utilisant un réfrigérateur à dilution multi-étages avec un couplage thermique amélioré...'
  },
  {
    id: 'EP-3456789-A1',
    title: "Interface d'Échange de Chaleur pour Circuits Supraconducteurs",
    assignee: 'Google LLC',
    date: '2022-05-20',
    similarity: 0.88,
    status: 'En attente',
    tags: ['Photovoltaïque', 'IoT'],
    abstract: 'Une interface pour transférer la chaleur entre un circuit supraconducteur et un bain cryogénique, comprenant une pluralité de vias thermiques...'
  },
  {
    id: 'WO-2021-098765',
    title: "Réfrigération à Faible Bruit pour l'Informatique Quantique",
    assignee: 'Rigetti Computing',
    date: '2021-09-30',
    similarity: 0.82,
    status: 'Actif',
    tags: ['Éolien', 'IA'],
    abstract: "Un réfrigérateur à tube pulsé configuré pour un fonctionnement à faibles vibrations dans un environnement d'informatique quantique..."
  },
  {
    id: 'US-2024-001234',
    title: 'Optimisation par IA de Panneaux Solaires Connectés',
    assignee: 'SolarEdge Technologies',
    date: '2024-01-15',
    similarity: 0.91,
    status: 'Actif',
    tags: ['Solaire', 'IA', 'IoT'],
    abstract: "Algorithmes d'apprentissage automatique pour maximiser l'efficacité des cellules photovoltaïques en temps réel via des capteurs IoT."
  },
  {
    id: 'EP-5566778-B1',
    title: 'Maintenance Prédictive pour Éoliennes via IoT',
    assignee: 'Vestas Wind Systems',
    date: '2023-08-22',
    similarity: 0.85,
    status: 'Actif',
    tags: ['Éolien', 'IoT', 'IA'],
    abstract: 'Système de surveillance vibratoire utilisant des réseaux de capteurs sans fil pour prédire les défaillances mécaniques des pales.'
  }
];

export const PriorArtSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(ALL_MOCK_RESULTS.slice(0, 3));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const filtered = ALL_MOCK_RESULTS.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.abstract.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
      if (filtered.length === 0 && query.length > 0) {
        setResults(ALL_MOCK_RESULTS);
      } else {
        setResults(filtered.length > 0 ? filtered : ALL_MOCK_RESULTS.slice(0, 3));
      }
      setIsSearching(false);
    }, 800);
  };

  const findSimilar = (id: string) => {
    setIsSearching(true);
    setTimeout(() => {
      setResults([...ALL_MOCK_RESULTS].sort(() => Math.random() - 0.5));
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Search Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Recherche d'antériorité sémantique..."
              className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2.5 pl-9 pr-28 text-sm outline-none focus:border-slate-300 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-medium rounded-md">
              Sémantique
            </span>
          </div>
          <button
            onClick={handleSearch}
            className="bg-midnight text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-midnight-light transition-all flex items-center gap-2"
          >
            {isSearching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={14} />}
            Rechercher
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-slate-400 hover:text-midnight flex items-center gap-1 transition-colors"
          >
            <Filter size={12} />
            {showAdvanced ? 'Masquer les filtres' : 'Filtres avancés'}
          </button>
          <span className="text-xs text-slate-300">Bases: USPTO, OEB, WIPO, INPI</span>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 grid grid-cols-3 gap-3 border-t border-slate-50">
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Classification (CIB/CPC)</label>
                  <input type="text" placeholder="ex: G06N 10/00" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-300" />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Déposant / Inventeur</label>
                  <input type="text" placeholder="Nom" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-300" />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 mb-1 block">Plage de dates</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="De" className="w-1/2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-300" />
                    <input type="text" placeholder="À" className="w-1/2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Results */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-medium text-slate-500">Résultats ({results.length})</h4>
            <select className="bg-transparent text-xs text-slate-500 outline-none">
              <option>Pertinence</option>
              <option>Date</option>
            </select>
          </div>

          {results.map((result, i) => (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={result.id}
              onClick={() => setSelectedResult(result)}
              className={cn(
                "bg-white p-4 rounded-xl border transition-all cursor-pointer",
                selectedResult?.id === result.id ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-medium text-midnight bg-slate-50 px-2 py-0.5 rounded">{result.id}</span>
                    <span className="text-[11px] text-slate-400">{result.date}</span>
                  </div>
                  <h5 className="text-sm font-medium text-midnight">{result.title}</h5>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-midnight">{(result.similarity * 100).toFixed(0)}%</div>
                  <div className="text-[11px] text-slate-400">Similarité</div>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{result.abstract}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  {result.assignee}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); findSimilar(result.id); }}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-600 rounded-md text-[11px] hover:bg-slate-100 transition-all"
                  >
                    <Search size={10} /> Similaires
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-midnight rounded-md transition-all">
                    <Bookmark size={14} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-midnight rounded-md transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analysis Panel */}
        <div className="bg-midnight text-white p-5 rounded-xl sticky top-4 h-fit">
          <h4 className="text-xs font-semibold mb-4 flex items-center gap-2">
            <Zap size={14} className="text-amber-300" />
            Analyse des Effets Techniques
          </h4>

          {selectedResult ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] text-amber-300 mb-1">Problème Technique</p>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Comment réduire les vibrations mécaniques dans un environnement cryogénique sans compromettre la stabilité thermique ?"
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-amber-300">Effets Identifiés</p>
                {[
                  { label: 'Isolation Acoustique', value: 'Élevée' },
                  { label: 'Conductivité Thermique', value: 'Optimisée' },
                  { label: 'Stabilité des Qubits', value: '+15%' },
                ].map((effect, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <span className="text-xs text-slate-400">{effect.label}</span>
                    <span className="text-xs font-medium text-amber-300">{effect.value}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[11px] text-amber-300 mb-1">Conclusion IA</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ce brevet présente un risque d'antériorité majeur pour votre revendication sur le découplage du compresseur.
                </p>
              </div>

              <button className="w-full bg-white text-midnight py-2.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                Générer Rapport Complet
              </button>
            </div>
          ) : (
            <div className="py-10 text-center opacity-50">
              <FileSearch size={28} className="mx-auto text-slate-500 mb-2" />
              <p className="text-xs text-slate-400">Sélectionnez un brevet pour analyser</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
