import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Download,
  Share2,
  History,
  Plus,
  Trash2,
  Zap,
  Cpu,
  Globe,
  Settings,
  Hash,
  Eye,
  Type,
  Search,
  BookOpen,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_CASES } from '../types';

const INITIAL_CLAIMS = [
  {
    id: 1,
    type: 'Indépendante',
    content: "Un système de refroidissement cryogénique pour un processeur quantique, comprenant : un réfrigérateur à dilution multi-étages ; une interface de couplage thermique ; et une unité de contrôle configurée pour moduler le flux d'hélium-3 basé sur la télémétrie de température des qubits en temps réel.",
    suggestions: [
      'Envisagez de spécifier la plage de température (ex: < 10mK).',
      'Ajoutez des détails sur le type de capteur de télémétrie.'
    ]
  },
  {
    id: 2,
    type: 'Dépendante',
    content: "Le système de la revendication 1, dans lequel l'interface de couplage thermique comprend une pluralité de vias thermiques supraconducteurs.",
    suggestions: []
  }
];

export const LegalDrafting = () => {
  const [claims, setClaims] = useState(INITIAL_CLAIMS);
  const [activeClaim, setActiveClaim] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCoDrafting, setIsCoDrafting] = useState(true);
  const [activeTab, setActiveTab] = useState<'claims' | 'description' | 'technical' | 'filing'>('claims');
  const [selectedCaseId, setSelectedCaseId] = useState(MOCK_CASES[0].id);

  const selectedCase = MOCK_CASES.find(c => c.id === selectedCaseId) || MOCK_CASES[0];

  const handleGenerateSuggestion = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleAddClaim = () => {
    const newId = claims.length + 1;
    setClaims([...claims, {
      id: newId,
      type: 'Dépendante',
      content: 'Le système de la revendication 1, caractérisé en ce que...',
      suggestions: []
    }]);
    setActiveClaim(newId);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-5">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Tabs */}
        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-brown-100">
          <div className="flex items-center gap-1 bg-brown-50 p-1 rounded-lg">
            {[
              { id: 'claims', label: 'Revendications', icon: Hash },
              { id: 'description', label: 'Description', icon: FileText },
              { id: 'technical', label: 'Effets Techniques', icon: Zap },
              { id: 'filing', label: 'Dépôt', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-white text-brown-800 shadow-sm"
                    : "text-brown-400 hover:text-brown-700"
                )}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-md">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-700">Co-Rédaction Active</span>
            </div>
            <button className="bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all flex items-center gap-2">
              <Download size={14} />
              Finaliser
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0">
          {/* Editor */}
          <div className="lg:col-span-2 flex flex-col gap-4 overflow-y-auto pr-1">
            {/* Case Banner */}
            <div className="bg-white p-4 rounded-xl border border-brown-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  selectedCase.type === 'Brevet' ? "bg-brown-100 text-brown-600" : "bg-brown-700 text-brown-200"
                )}>
                  {selectedCase.type === 'Brevet' ? <Cpu size={18} /> : <Globe size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-brown-800">{selectedCase.title}</h4>
                  <p className="text-xs text-brown-400">{selectedCase.id} · {selectedCase.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-brown-400 hover:text-brown-700 rounded-lg transition-all">
                  <History size={16} />
                </button>
                <button className="p-2 text-brown-400 hover:text-brown-700 rounded-lg transition-all">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {activeTab === 'claims' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-brown-800">Revendications</h3>
                    <p className="text-xs text-brown-400">Définissez la portée juridique de votre invention</p>
                  </div>
                  <button
                    onClick={handleAddClaim}
                    className="flex items-center gap-2 bg-brown-50 text-brown-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-100 transition-all border border-brown-100"
                  >
                    <Plus size={14} /> Nouvelle
                  </button>
                </div>

                {claims.map((claim) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={claim.id}
                    onClick={() => setActiveClaim(claim.id)}
                    className={cn(
                      "p-5 rounded-xl border transition-all cursor-pointer bg-white group",
                      activeClaim === claim.id
                        ? "border-brown-300 shadow-sm"
                        : "border-brown-100 hover:border-brown-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold",
                          activeClaim === claim.id ? "bg-brown-700 text-white" : "bg-brown-50 text-brown-400"
                        )}>
                          {claim.id}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-brown-800">
                            {claim.type === 'Indépendante' ? 'Principale' : 'Dépendante'}
                          </span>
                          <p className="text-[11px] text-brown-400">
                            {claim.type === 'Dépendante' ? 'Rattachée à Rev. 1' : 'Portée autonome'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-brown-400 hover:text-brown-700 rounded-md transition-all">
                          <Share2 size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setClaims(claims.filter(c => c.id !== claim.id)); }}
                          className="p-1.5 text-brown-400 hover:text-red-500 rounded-md transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      className="w-full bg-brown-50 border border-brown-100 rounded-lg p-4 text-sm leading-relaxed text-brown-800 resize-none focus:border-brown-300 outline-none transition-all"
                      rows={4}
                      value={claim.content}
                      onChange={(e) => {
                        const newClaims = [...claims];
                        newClaims.find(c => c.id === claim.id)!.content = e.target.value;
                        setClaims(newClaims);
                      }}
                    />

                    {isCoDrafting && activeClaim === claim.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-brown-50 rounded-lg border border-brown-200 flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brown-700 flex items-center justify-center text-white shrink-0">
                          <Sparkles size={14} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium text-brown-800">Suggestion Soter IA</p>
                            <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">94%</span>
                          </div>
                          <p className="text-sm text-brown-600 leading-relaxed">
                            Utilisez 'caractérisé en ce que' et spécifiez que l'unité de contrôle est 'autoadaptative'.
                          </p>
                          <div className="flex gap-3 mt-3">
                            <button className="bg-brown-700 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-brown-800 transition-all">Appliquer</button>
                            <button className="text-xs text-brown-400 hover:text-brown-700 transition-colors">Ignorer</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-brown-800">Description Détaillée</h3>
                    <p className="text-xs text-brown-400">Exposez l'invention de manière claire et complète</p>
                  </div>
                  <button className="bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all">
                    Générer via IA
                  </button>
                </div>
                <div className="bg-white p-5 rounded-xl border border-brown-100 space-y-5">
                  {[
                    { label: "Domaine de l'invention", rows: 3, placeholder: "Décrivez le domaine technique..." },
                    { label: "État de la technique", rows: 3, placeholder: "Décrivez l'art antérieur..." },
                    { label: "Exposé de l'invention", rows: 6, placeholder: "Détaillez la solution technique..." }
                  ].map((field, i) => (
                    <div key={i}>
                      <label className="text-xs font-medium text-brown-800 mb-2 block">{field.label}</label>
                      <textarea
                        className="w-full bg-brown-50 border border-brown-100 rounded-lg p-4 text-sm leading-relaxed text-brown-800 resize-none focus:border-brown-300 outline-none transition-all"
                        rows={field.rows}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-brown-800">Effets Techniques</h3>
                    <p className="text-xs text-brown-400">Identifiez les avantages concrets</p>
                  </div>
                  <button className="flex items-center gap-2 bg-brown-50 text-brown-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-100 transition-all border border-brown-100">
                    <Plus size={14} /> Ajouter
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Efficacité Énergétique', desc: "Réduction de 30% de la consommation via l'optimisation des cycles.", icon: Zap, color: 'text-amber-600 bg-amber-50' },
                    { title: 'Vitesse de Traitement', desc: "Accélération des calculs grâce au nouvel algorithme.", icon: Cpu, color: 'text-brown-600 bg-brown-100' },
                    { title: 'Stabilité Système', desc: "Amélioration de la résilience face aux pics de charge.", icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' }
                  ].map((effect, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-brown-100">
                      <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", effect.color)}>
                        <effect.icon size={18} />
                      </div>
                      <h4 className="text-sm font-medium text-brown-800 mb-1">{effect.title}</h4>
                      <p className="text-xs text-brown-500 leading-relaxed">{effect.desc}</p>
                    </div>
                  ))}
                  <button className="border border-dashed border-brown-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-brown-400 transition-all">
                    <Plus size={18} className="text-brown-300" />
                    <span className="text-xs text-brown-400">Nouvel effet</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'filing' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-brown-800">Dépôt & Classification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-brown-100">
                    <h4 className="text-xs font-medium text-brown-800 mb-3 flex items-center gap-2">
                      <Globe size={14} className="text-brown-400" />
                      Juridictions
                    </h4>
                    <div className="space-y-2">
                      {['France (INPI)', 'Europe (OEB)', 'USA (USPTO)'].map((j) => (
                        <label key={j} className="flex items-center justify-between p-3 rounded-lg bg-brown-50 border border-brown-100 cursor-pointer hover:bg-brown-100 transition-all">
                          <span className="text-sm text-brown-800">{j}</span>
                          <input type="checkbox" className="rounded border-brown-300 text-brown-700 focus:ring-brown-500" defaultChecked={j === 'France (INPI)'} />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-brown-100">
                    <h4 className="text-xs font-medium text-brown-800 mb-3 flex items-center gap-2">
                      <BookOpen size={14} className="text-brown-400" />
                      Classification (CIB/CPC)
                    </h4>
                    <div className="p-3 rounded-lg bg-brown-50 border border-brown-100 mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-brown-800">G06F 17/00</span>
                        <span className="text-[11px] text-emerald-600">Suggéré</span>
                      </div>
                      <p className="text-xs text-brown-500">Traitement de données numériques...</p>
                    </div>
                    <button className="w-full py-2 rounded-lg border border-dashed border-brown-200 text-xs text-brown-400 hover:border-brown-400 hover:text-brown-700 transition-all">
                      Rechercher d'autres classes
                    </button>
                  </div>
                </div>
                <div className="bg-brown-800 text-white p-5 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">Prêt pour le dépôt ?</h4>
                    <p className="text-xs text-brown-300">142 points de conformité vérifiés.</p>
                  </div>
                  <button className="bg-white text-brown-800 px-5 py-2.5 rounded-lg text-xs font-medium hover:bg-brown-50 transition-all">
                    Lancer la Procédure
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* AI Sidebar */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-white rounded-xl border border-brown-100 p-5 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-brown-700 flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-brown-800">Co-Pilote IA</h3>
                  <p className="text-[11px] text-brown-400">Analyse en temps réel</p>
                </div>
              </div>

              <div className="flex-1 overflow-auto space-y-5 pr-1">
                <div className="space-y-3">
                  <p className="text-[11px] text-brown-400">Conformité</p>
                  {[
                    { label: 'Nouveauté (Art. 54)', score: 92, color: 'bg-emerald-500', status: 'Optimal' },
                    { label: 'Activité Inventive', score: 78, color: 'bg-brown-500', status: 'À renforcer' },
                    { label: 'Clarté & Précision', score: 85, color: 'bg-brown-400', status: 'Bon' }
                  ].map((insight, idx) => (
                    <div key={idx} className="p-3 bg-brown-50 rounded-lg border border-brown-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-brown-800">{insight.label}</span>
                        <span className={cn("text-xs font-medium", insight.score > 80 ? "text-emerald-600" : "text-amber-600")}>{insight.score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.score}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 }}
                          className={cn("h-full rounded-full", insight.color)}
                        />
                      </div>
                      {insight.score < 80 && (
                        <p className="text-[11px] text-amber-600 mt-2 bg-amber-50 p-2 rounded-md">
                          Détaillez l'effet de synergie entre les composants.
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] text-brown-400">Lexique Recommandé</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Moyen de couplage', 'Interface thermique', 'Structure de support', 'Dilution multi-étages'].map(tag => (
                      <button key={tag} className="px-2.5 py-1.5 bg-brown-50 hover:bg-brown-100 rounded-md text-[11px] text-brown-500 transition-all border border-brown-100">
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] text-brown-400">Actions IA récentes</p>
                  {[
                    { action: 'Optimisation sémantique', time: '2 min', icon: Type },
                    { action: 'Vérification antériorité', time: '5 min', icon: Search },
                    { action: 'Analyse de clarté', time: '12 min', icon: Eye }
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-brown-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <a.icon size={12} className="text-brown-400" />
                        <span className="text-[11px] text-brown-600">{a.action}</span>
                      </div>
                      <span className="text-[10px] text-brown-400">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateSuggestion}
                disabled={isGenerating}
                className="w-full bg-brown-700 text-white py-2.5 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {isGenerating ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Zap size={14} className="text-brown-200" />
                )}
                Générer Analyse IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
