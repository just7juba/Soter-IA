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
          <h3 className="text-base font-semibold text-brown-800">Audit & Traçabilité</h3>
          <p className="text-xs text-brown-400 mt-0.5">Historique de toutes les actions et interactions IA.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-brown-100 px-4 py-2 rounded-lg text-xs font-medium text-brown-600 hover:bg-brown-50 transition-all">
            Exporter CSV
          </button>
          <button className="bg-brown-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-brown-800 transition-all">
            Rapport de Conformité
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brown-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-brown-50 border-b border-brown-100">
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">ID</th>
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">Utilisateur</th>
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">Action</th>
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">Ressource</th>
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">Horodatage</th>
              <th className="px-4 py-3 text-[11px] font-medium text-brown-400 uppercase tracking-wide">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brown-50">
            {AUDIT_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-brown-50/50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-xs font-mono text-brown-400">{log.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-brown-100 flex items-center justify-center text-[10px] font-medium text-brown-600">
                      {log.user.charAt(0)}
                    </div>
                    <span className="text-sm text-brown-700">{log.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-brown-800">{log.action}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-brown-500">{log.resource}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-brown-400">{log.timestamp}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium",
                    log.status === 'Succès' ? "bg-emerald-50 text-emerald-600" :
                    log.status === 'Sécurisé' ? "bg-brown-100 text-brown-700" :
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
        <div className="bg-white p-5 rounded-xl border border-brown-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-brown-100 text-brown-600 rounded-lg">
              <Database size={16} />
            </div>
            <h4 className="text-sm font-medium text-brown-800">Souveraineté des Données</h4>
          </div>
          <p className="text-xs text-brown-500 leading-relaxed">
            Données stockées dans votre instance cloud privée. Aucune donnée utilisée pour l'entraînement externe.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-brown-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Shield size={16} />
            </div>
            <h4 className="text-sm font-medium text-brown-800">Chiffrement E2E</h4>
          </div>
          <p className="text-xs text-brown-500 leading-relaxed">
            AES-256 au repos, TLS 1.3 en transit. Modules de sécurité matériels (HSM) activés.
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-brown-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-brown-700 text-brown-200 rounded-lg">
              <Clock size={16} />
            </div>
            <h4 className="text-sm font-medium text-brown-800">Politique de Rétention</h4>
          </div>
          <p className="text-xs text-brown-500 leading-relaxed">
            Rétention automatisée de 7 ans. Protocoles de suppression sécurisée actifs.
          </p>
        </div>
      </div>
    </div>
  );
};
