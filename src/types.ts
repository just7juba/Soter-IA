export type UserRole = 'Analyste Juridique' | 'Ingénieur R&D' | 'Consultant en Innovation' | 'Conseil en Propriété Industrielle' | 'Directeur PI';

export interface Case {
  id: string;
  title: string;
  type: 'Brevet' | 'Marque' | 'Modèle' | 'Juridique';
  status: 'Rédaction' | 'Analyse' | 'Recherche' | 'Révision' | 'Terminé';
  priority: 'Haute' | 'Moyenne' | 'Basse';
  lastModified: string;
  client: string;
  progress: number;
  sector: string;
  description?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  reasoning?: {
    step: string;
    details: string;
    confidence: number;
  }[];
  sources?: {
    title: string;
    url: string;
    relevance: number;
  }[];
}

export const MOCK_CASES: Case[] = [
  {
    id: 'CAS-2024-001',
    title: 'Système de refroidissement pour informatique quantique',
    type: 'Brevet',
    status: 'Rédaction',
    priority: 'Haute',
    lastModified: '2024-03-20',
    client: 'TechCorp Dynamics',
    progress: 65,
    sector: 'Informatique Quantique',
    description: 'Système de refroidissement cryogénique avancé pour processeurs quantiques à haute fidélité.'
  },
  {
    id: 'CAS-2024-002',
    title: 'Polymère d\'emballage écologique',
    type: 'Brevet',
    status: 'Analyse',
    priority: 'Moyenne',
    lastModified: '2024-03-21',
    client: 'GreenPack Solutions',
    progress: 40,
    sector: 'Agroalimentaire'
  },
  {
    id: 'CAS-2024-003',
    title: 'Identité de marque Lumina',
    type: 'Marque',
    status: 'Recherche',
    priority: 'Basse',
    lastModified: '2024-03-19',
    client: 'Lumina Lighting',
    progress: 20,
    sector: 'Énergie'
  },
  {
    id: 'CAS-2024-004',
    title: 'Navigation autonome pour drones',
    type: 'Brevet',
    status: 'Révision',
    priority: 'Haute',
    lastModified: '2024-03-22',
    client: 'SkyBound Robotics',
    progress: 90,
    sector: 'Aérospatiale'
  },
  {
    id: 'CAS-2024-005',
    title: 'Équilibreur de charge pour réseau intelligent',
    type: 'Brevet',
    status: 'Rédaction',
    priority: 'Moyenne',
    lastModified: '2024-03-22',
    client: 'EnergyPlus',
    progress: 55,
    sector: 'Technologies solaires et l\'éolien'
  },
  {
    id: 'CAS-2024-006',
    title: 'Capteur de glucose non invasif',
    type: 'Brevet',
    status: 'Analyse',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'HealthTech Inc',
    progress: 30,
    sector: 'Santé'
  },
  {
    id: 'CAS-2024-007',
    title: 'Système de freinage régénératif intelligent',
    type: 'Brevet',
    status: 'Rédaction',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'AutoConnect',
    progress: 15,
    sector: 'Voitures connectées'
  },
  {
    id: 'CAS-2024-008',
    title: 'Thermostat intelligent à apprentissage profond',
    type: 'Brevet',
    status: 'Révision',
    priority: 'Moyenne',
    lastModified: '2024-03-23',
    client: 'SmartHome Co',
    progress: 80,
    sector: 'Objets connectés'
  },
  {
    id: 'CAS-2024-009',
    title: 'Procédé de fermentation accélérée',
    type: 'Brevet',
    status: 'Terminé',
    priority: 'Basse',
    lastModified: '2024-03-20',
    client: 'BioFood Lab',
    progress: 100,
    sector: 'Agroalimentaire'
  },
  {
    id: 'CAS-2024-010',
    title: 'Algorithme de détection de fraude en temps réel',
    type: 'Brevet',
    status: 'Recherche',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'SecurePay',
    progress: 10,
    sector: 'Fintech'
  },
  {
    id: 'CAS-2024-011',
    title: 'Structure d\'aile adaptative en composite',
    type: 'Brevet',
    status: 'Rédaction',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'AeroNext',
    progress: 45,
    sector: 'Aéronautique'
  },
  {
    id: 'CAS-2024-012',
    title: 'Séquençage ADN ultra-rapide par nanopores',
    type: 'Brevet',
    status: 'Analyse',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'GeneStream',
    progress: 25,
    sector: 'Biotechnologie'
  },
  {
    id: 'CAS-2024-013',
    title: 'Protocole de consensus post-quantique',
    type: 'Brevet',
    status: 'Révision',
    priority: 'Moyenne',
    lastModified: '2024-03-23',
    client: 'CryptoGuard',
    progress: 75,
    sector: 'Cybersécurité'
  },
  {
    id: 'CAS-2024-014',
    title: 'Bras robotisé à retour haptique haute fidélité',
    type: 'Brevet',
    status: 'Rédaction',
    priority: 'Haute',
    lastModified: '2024-03-23',
    client: 'RoboTouch',
    progress: 35,
    sector: 'Robotique industrielle'
  },
  {
    id: 'CAS-2024-015',
    title: 'Antenne MIMO massive pour réseaux 6G',
    type: 'Brevet',
    status: 'Recherche',
    priority: 'Moyenne',
    lastModified: '2024-03-23',
    client: 'WaveLink',
    progress: 15,
    sector: 'Télécommunications'
  }
];

export const USER_PROFILES = [
  {
    id: 'analyst',
    name: 'Analyste Juridique',
    role: 'Analyste Juridique' as UserRole,
    description: 'Analyste junior se concentrant sur l\'état de la technique et la rédaction initiale.',
    icon: 'Search',
    permissions: ['Recherche', 'Rédaction', 'Lecture']
  },
  {
    id: 'engineer',
    name: 'Ingénieur R&D',
    role: 'Ingénieur R&D' as UserRole,
    description: 'Expert technique fournissant des divulgations d\'invention.',
    icon: 'Cpu',
    permissions: ['Divulgation', 'Analyse Technique']
  },
  {
    id: 'consultant',
    name: 'Consultant en Innovation',
    role: 'Consultant en Innovation' as UserRole,
    description: 'Conseiller stratégique gérant les portefeuilles de PI.',
    icon: 'Lightbulb',
    permissions: ['Stratégie', 'Audit', 'Portefeuille']
  },
  {
    id: 'counsel',
    name: 'Conseil en PI',
    role: 'Conseil en Propriété Industrielle' as UserRole,
    description: 'Expert juridique senior pour les dépôts à enjeux élevés.',
    icon: 'Scale',
    permissions: ['Validation Juridique', 'Dépôt', 'Litige']
  },
  {
    id: 'director',
    name: 'Directeur PI',
    role: 'Directeur PI' as UserRole,
    description: 'Supervision globale de la stratégie PI et des budgets.',
    icon: 'Shield',
    permissions: ['Admin', 'Budget', 'Approbation']
  }
];
