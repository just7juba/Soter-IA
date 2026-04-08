import React from 'react';
import { Shield, User, Clock, FileText, Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const AUDIT_LOGS = [
  {
    id: 'LOG-001',
    user: 'Alex Rivera',
    action: 'Analyse de Document',
    resource: 'Brouillon Brevet Refroidissement Quantique',
    timestamp: '2024-03-23 10:45:12',
    status: 'Succès',
    details: 'Analyse IA terminée pour le jeu de revendications 1-5.'
  },
  {
    id: 'LOG-002',
    user: 'Alex Rivera',
    action: "Recherche d'Antériorité",
    resource: 'Requête Boucle Hélium-3',
    timestamp: '2024-03-23 09:30:05',
    status: 'Succès',
    details: 'La recherche a retourné 42 résultats sur USPTO et OEB.'
  },
  {
    id: 'LOG-003',
    user: 'Système',
    action: 'Audit de Sécurité',
    resource: 'Chiffrement BDD',
    timestamp: '2024-03-23 08:00:00',
    status: 'Sécurisé',
    details: 'Rotation quotidienne des clés de chiffrement terminée avec succès.'
  },
  {
    id: 'LOG-004',
    user: 'Sarah Chen',
    action: 'Accès Révoqué',
    resource: 'Projet Lumina',
    timestamp: '2024-03-22 17:15:44',
    status: 'Avertissement',
    details: "L'accès de l'utilisateur a expiré pour le contractant temporaire."
  },
  {
    id: 'LOG-005',
    user: 'Alex Rivera',
    action: 'Export Document',
    resource: 'Dépôt Final - Nav Drone',
    timestamp: '2024-03-22 14:20:11',
    status: 'Succès',
    details: 'Export PDF généré avec signature numérique.'
  }
];

export const AuditLogs = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-midnight">Audit & Traçabilité</h3>
          <p className="text-xs text-slate-400 mt-0.5">Historique de toutes les actions et interactions IA.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-slate-100 px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all">
            Exporter CSV
          </button>
          <button className="bg-midnight text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-midnight-light transition-all">
            Rapport de Conformité
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">ID</th>
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">Utilisateur</th>
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">Action</th>
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">Ressource</th>
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">Horodatage</th>
              <th className="px-4 py-3 text-[11px] font-medium text-slate-400 uppercase tracking-wide">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {AUDIT_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-slate-400">{log.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-medium text-slate-500">
                      {log.user.charAt(0)}
                    </div>
                    <span className="text-sm text-slate-700">{log.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-midnight">{log.action}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-slate-500">{log.resource}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium",
                    log.status === 'Succès' ? "bg-emerald-50 text-emerald-600" :
                    log.status === 'Sécurisé' ? "bg-blue-50 text-blue-600" :
                    "bg-amber-50 text-amber-600"
                  )}>
                    {log.status === 'Succès' ? <CheckCircle2 size={11} /> :
                     log.status === 'Sécurisé' ? <Shield size={11} /> :
                     <AlertTriangle size={11} />}
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Database size={16} />
            </div>
            <h4 className="text-sm font-medium text-midnight">Souveraineté des Données</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Données stockées dans votre instance cloud privée. Aucune donnée utilisée pour l'entraînement externe.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Shield size={16} />
            </div>
            <h4 className="text-sm font-medium text-midnight">Chiffrement E2E</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            AES-256 au repos, TLS 1.3 en transit. Modules de sécurité matériels (HSM) activés.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Clock size={16} />
            </div>
            <h4 className="text-sm font-medium text-midnight">Politique de Rétention</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Rétention automatisée de 7 ans. Protocoles de suppression sécurisée actifs.
          </p>
        </div>
      </div>
    </div>
  );
};
