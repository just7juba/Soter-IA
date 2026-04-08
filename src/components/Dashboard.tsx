import React from 'react';
import {
  Briefcase,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Bell,
  Plus,
  Cpu,
  Globe,
  ChevronRight,
  Activity,
  MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_CASES, Case } from '../types';

export const Dashboard = () => {
  const stats = [
    { label: 'Dossiers actifs', value: '12', trend: '+2', icon: Briefcase },
    { label: 'Temps gagné (IA)', value: '142h', trend: '+12%', icon: Clock },
    { label: 'Vitesse de rédaction', value: '2.4x', trend: '+0.3', icon: TrendingUp },
    { label: 'Score protection', value: '92%', trend: 'Optimal', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-brown-400 uppercase tracking-wider">Vue d'ensemble</h2>
        <div className="flex items-center gap-3">
          <button className="p-2 text-brown-400 hover:text-brown-700 transition-colors">
            <Bell size={18} />
          </button>
          <button className="flex items-center gap-2 bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all">
            <Plus size={14} />
            Nouveau dossier
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-brown-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brown-50 rounded-lg text-brown-500">
                <stat.icon size={16} />
              </div>
              <span className="text-xs text-brown-400 uppercase tracking-wide font-medium">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-brown-900">{stat.value}</span>
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-md",
                stat.trend.startsWith('+') ? "text-emerald-700 bg-emerald-50" : "text-brown-600 bg-brown-50"
              )}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendation */}
      <div className="bg-brown-800 text-white p-6 rounded-xl flex items-start gap-5">
        <div className="w-12 h-12 bg-brown-200 text-brown-700 rounded-xl flex items-center justify-center shrink-0">
          <Zap size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-semibold">Recommandation Soter IA</h3>
            <span className="px-2 py-0.5 bg-brown-200 text-brown-800 text-[11px] font-medium rounded-md">Priorité Haute</span>
          </div>
          <p className="text-sm text-brown-200 leading-relaxed">
            Une nouvelle technologie concurrente a été détectée dans le secteur Quantum Cooling. Nous vous suggérons de finaliser la rédaction du dossier QC-2024-001 pour sécuriser votre antériorité.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-white text-brown-800 px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-50 transition-all">
              Voir l'analyse
            </button>
            <button className="text-xs text-brown-300 hover:text-white transition-colors">
              Ignorer
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-brown-100">
          <div className="px-5 py-4 border-b border-brown-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brown-800">Dossiers à faire</h3>
            <button className="text-xs text-brown-500 font-medium hover:underline">Voir tout</button>
          </div>
          <div className="divide-y divide-brown-50">
            {MOCK_CASES.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-brown-50/50 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    c.type === 'Brevet' ? "bg-brown-100 text-brown-600" : "bg-brown-700 text-brown-200"
                  )}>
                    {c.type === 'Brevet' ? <Cpu size={16} /> : <Globe size={16} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-brown-800 truncate">{c.title}</p>
                    <p className="text-xs text-brown-400">{c.id} · {c.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] text-brown-300 mb-1">Statut</p>
                    <span className={cn(
                      "text-xs font-medium",
                      c.status === 'Terminé' ? "text-emerald-600" :
                      c.status === 'Rédaction' ? "text-brown-600" :
                      c.status === 'Analyse' ? "text-amber-600" :
                      "text-brown-400"
                    )}>{c.status}</span>
                  </div>
                  <div className="hidden md:block w-20">
                    <p className="text-[11px] text-brown-300 mb-1">Progress</p>
                    <div className="h-1.5 w-full bg-brown-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brown-500 rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <button className="p-1 text-brown-300 hover:text-brown-700 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Portfolio Health */}
          <div className="bg-white p-5 rounded-xl border border-brown-100">
            <h4 className="text-sm font-semibold text-brown-800 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-brown-400" />
              Santé du portefeuille
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Conformité', value: 94, color: 'bg-emerald-500' },
                { label: 'Risque Litige', value: 12, color: 'bg-brown-400' },
                { label: 'Renouvellements', value: 85, color: 'bg-brown-600' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-brown-500">{item.label}</span>
                    <span className="font-medium text-brown-800">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-brown-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div className="bg-white p-5 rounded-xl border border-brown-100">
            <h4 className="text-sm font-semibold text-brown-800 mb-4 flex items-center gap-2">
              <Clock size={16} className="text-brown-400" />
              Échéances proches
            </h4>
            <div className="space-y-3">
              {[
                { title: 'Réponse OEB', date: 'Dans 3 jours', priority: 'high' },
                { title: 'Renouvellement TM', date: 'Dans 12 jours', priority: 'medium' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-brown-50 rounded-lg">
                  <div className={cn(
                    "w-2 h-2 rounded-full shrink-0",
                    d.priority === 'high' ? "bg-red-500" : "bg-brown-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-brown-800">{d.title}</p>
                    <p className="text-[11px] text-brown-400">{d.date}</p>
                  </div>
                  <ChevronRight size={14} className="text-brown-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
