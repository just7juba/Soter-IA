# ARCHITECTURE.md

Documentation de toutes les fonctions, composants et leurs dependances dans le projet **Soter IA**.

---

## Arbre des dependances global

```
index.html
  └── src/main.tsx
        ├── react, react-dom
        ├── src/index.css (Tailwind v4 + @theme)
        └── src/App.tsx
              ├── src/lib/utils.ts
              ├── src/types.ts
              ├── motion/react (framer-motion)
              ├── lucide-react
              ├── src/components/Dashboard.tsx
              ├── src/components/IPDirectory.tsx
              ├── src/components/PriorArtSearch.tsx
              ├── src/components/LegalDrafting.tsx
              ├── src/components/ClassSearch.tsx
              └── src/components/AuditLogs.tsx

(non route) src/components/Trademarks.tsx
```

---

## Fichiers utilitaires

### `src/lib/utils.ts`

| Export | Type | Description | Dependances |
|--------|------|-------------|-------------|
| `cn(...inputs)` | Fonction | Fusionne les classes CSS conditionnellement | `clsx`, `tailwind-merge` |

### `src/types.ts`

| Export | Type | Description |
|--------|------|-------------|
| `UserRole` | Type | `'Analyste Juridique' \| 'Ingenieur R&D' \| 'Consultant en Innovation' \| 'Conseil en Propriete Industrielle' \| 'Directeur PI'` |
| `Case` | Interface | Dossier IP : id, title, type, status, priority, lastModified, client, progress, sector, description? |
| `Message` | Interface | Message du chat IA : id, role, content, timestamp, reasoning?, sources? |
| `MOCK_CASES` | Constante | Tableau de 15 dossiers IP fictifs (`Case[]`) |
| `USER_PROFILES` | Constante | Tableau de 5 profils utilisateur avec roles et permissions |

---

## Point d'entree

### `src/main.tsx`

| Dependance | Usage |
|------------|-------|
| `react` | `StrictMode` |
| `react-dom/client` | `createRoot` |
| `src/App.tsx` | Composant racine `App` |
| `src/index.css` | Styles globaux Tailwind |

---

## Composant principal

### `src/App.tsx` — `export default function App()`

**Role :** Shell de l'application. Gere l'onboarding, la navigation par onglets, le chat IA flottant.

| Dependance | Usage |
|------------|-------|
| `react` | `useState`, `useEffect` |
| `lucide-react` | 30+ icones (Users, BookOpen, Search, Shield, Cpu, etc.) |
| `motion/react` | `motion`, `AnimatePresence` (animations du chat panel) |
| `src/lib/utils` | `cn()` |
| `src/types` | `Case`, `MOCK_CASES`, `USER_PROFILES`, `UserRole`, `Message` |
| `src/components/Dashboard` | Onglet "Tableau de bord" |
| `src/components/IPDirectory` | Onglet "Dossiers" |
| `src/components/PriorArtSearch` | Onglet "Recherche" |
| `src/components/LegalDrafting` | Onglet "Co-Redaction" |
| `src/components/ClassSearch` | Onglet "Classification" |
| `src/components/AuditLogs` | Onglet "Audit" |

**Sous-composants internes (definis dans App.tsx) :**

| Composant | Props | Description |
|-----------|-------|-------------|
| `SidebarItem` | `icon, label, active?, onClick?` | Element de navigation dans la sidebar |
| `StatCard` | `label, value, trend, icon` | Carte de statistique (non utilisee dans le render actuel) |
| `CaseRow` | `caseData: Case` | Ligne de dossier (non utilisee dans le render actuel) |

**Fonctions internes :**

| Fonction | Description |
|----------|-------------|
| `renderContent()` | Switch sur `activeTab` pour afficher le composant correspondant |
| `handleSendMessage()` | Envoie un message utilisateur + genere une reponse mock apres 1s |

**State :**

| State | Type | Description |
|-------|------|-------------|
| `onboarded` | `boolean` | Si l'utilisateur a passe l'onboarding |
| `selectedRole` | `UserRole \| null` | Role choisi a l'onboarding |
| `activeTab` | `string` | Onglet actif (Dashboard, Patents, Search, Drafting, Classification, Audit) |
| `isChatOpen` | `boolean` | Visibilite du panel chat |
| `messages` | `Message[]` | Historique du chat |
| `input` | `string` | Texte en cours de saisie dans le chat |

---

## Composants de pages

### `src/components/Dashboard.tsx` — `export const Dashboard`

**Role :** Tableau de bord principal avec stats, recommandation IA, activite recente, recherche rapide, sante du portefeuille, echeances.

| Dependance | Usage |
|------------|-------|
| `react` | - |
| `lucide-react` | Briefcase, Zap, PenTool, Clock, CheckCircle2, TrendingUp, Shield, Search, Plus, Cpu, Globe, ArrowUpRight, Calendar, ChevronRight, Activity |
| `src/lib/utils` | `cn()` |
| `src/types` | `MOCK_CASES`, `Case` |

**Sous-composants internes :**

| Composant | Props | Description |
|-----------|-------|-------------|
| `StatCard` | `label, value, trend, icon, color?` | Carte de statistique avec decoration |
| `ActivityItem` | `title, time, type, status` | Element d'activite recente |

---

### `src/components/IPDirectory.tsx` — `export const IPDirectory`

**Role :** Explorateur de dossiers IP a deux panneaux (liste + details) avec recherche, filtrage et analyse IA.

| Dependance | Usage |
|------------|-------|
| `react` | `useState` |
| `lucide-react` | Search, Filter, Cpu, Globe, ChevronRight, MoreVertical, Download, FileText, Tag, Calendar, User, Hash, Sparkles, FolderOpen, History |
| `src/lib/utils` | `cn()` |
| `src/types` | `MOCK_CASES`, `Case` |

**State :**

| State | Type | Description |
|-------|------|-------------|
| `searchTerm` | `string` | Terme de recherche |
| `filterType` | `'All' \| 'Brevet' \| 'Marque'` | Filtre par type |
| `filterStatus` | `string` | Filtre par statut |
| `selectedCaseId` | `string \| null` | ID du dossier selectionne |

---

### `src/components/PriorArtSearch.tsx` — `export const PriorArtSearch`

**Role :** Recherche d'anteriorite semantique avec filtres avances, scores de similarite, analyse des effets techniques.

| Dependance | Usage |
|------------|-------|
| `react` | `useState` |
| `lucide-react` | Search, Filter, Download, ExternalLink, Bookmark, CheckCircle2, AlertCircle, Zap, ChevronRight, FileSearch |
| `motion/react` | `motion`, `AnimatePresence` |
| `src/lib/utils` | `cn()` |

**Donnees locales :** `ALL_MOCK_RESULTS` — 5 resultats de brevets fictifs avec similarite.

**State :**

| State | Type | Description |
|-------|------|-------------|
| `query` | `string` | Requete de recherche |
| `isSearching` | `boolean` | Indicateur de chargement |
| `results` | `array` | Resultats affiches |
| `showAdvanced` | `boolean` | Visibilite des filtres avances |
| `selectedResult` | `any \| null` | Resultat selectionne pour analyse |

**Fonctions :**

| Fonction | Description |
|----------|-------------|
| `handleSearch()` | Filtre les mock results apres un delai de 800ms |
| `findSimilar(id)` | Melange aleatoirement les resultats (mock) apres 600ms |

---

### `src/components/LegalDrafting.tsx` — `export const LegalDrafting`

**Role :** Editeur de revendications de brevet avec 4 onglets (Revendications, Description, Effets Techniques, Depot) et co-pilote IA lateral.

| Dependance | Usage |
|------------|-------|
| `react` | `useState` |
| `lucide-react` | FileText, Sparkles, CheckCircle2, AlertCircle, Download, Share2, History, Plus, Trash2, Zap, Cpu, MoreVertical, FolderOpen, Search, BookOpen, Hash, Globe, Settings, ChevronRight, MessageSquare, Eye, Type |
| `motion/react` | `motion`, `AnimatePresence` |
| `src/lib/utils` | `cn()` |
| `src/types` | `MOCK_CASES` |

**Donnees locales :** `INITIAL_CLAIMS` — 2 revendications initiales avec suggestions IA.

**State :**

| State | Type | Description |
|-------|------|-------------|
| `claims` | `Claim[]` | Liste des revendications editables |
| `activeClaim` | `number` | ID de la revendication active |
| `isGenerating` | `boolean` | Indicateur de generation IA |
| `isCoDrafting` | `boolean` | Co-redaction IA activee (defaut: true) |
| `activeTab` | `string` | Onglet actif (claims, description, technical, filing) |
| `selectedCaseId` | `string` | ID du dossier selectionne |

**Fonctions :**

| Fonction | Description |
|----------|-------------|
| `handleGenerateSuggestion()` | Simule une generation IA (2s timeout) |
| `handleAddClaim()` | Ajoute une nouvelle revendication dependante |

---

### `src/components/ClassSearch.tsx` — `export const ClassSearch`

**Role :** Recherche de classifications IP (Nice pour marques, CIB pour brevets) avec selection multiple.

| Dependance | Usage |
|------------|-------|
| `react` | `useState` |
| `lucide-react` | Search, Globe, MapPin, ChevronRight, Info, CheckCircle2, AlertCircle, BookOpen, Tag, Hash |
| `src/lib/utils` | `cn()` |

**Donnees locales :** `MOCK_CLASSES` — 7 classes (4 Nice + 3 CIB).

**State :**

| State | Type | Description |
|-------|------|-------------|
| `searchTerm` | `string` | Terme de recherche |
| `activeType` | `'All' \| 'Nice' \| 'CIB'` | Filtre par type de classification |
| `selectedClasses` | `string[]` | IDs des classes selectionnees |

**Fonctions :**

| Fonction | Description |
|----------|-------------|
| `toggleClass(id)` | Ajoute/retire une classe de la selection |

---

### `src/components/AuditLogs.tsx` — `export const AuditLogs`

**Role :** Journal d'audit avec tableau de logs, cartes info sur la souverainete des donnees, chiffrement et retention.

| Dependance | Usage |
|------------|-------|
| `react` | - |
| `lucide-react` | Shield, User, Clock, FileText, Database, AlertTriangle, CheckCircle2 |
| `src/lib/utils` | `cn()` |

**Donnees locales :** `AUDIT_LOGS` — 5 entrees de log fictives.

---

### `src/components/Trademarks.tsx` — `export const Trademarks`

**Role :** Liste de marques deposees avec recherche et filtres. **Non route dans la sidebar.**

| Dependance | Usage |
|------------|-------|
| `react` | `useState` |
| `lucide-react` | Search, Plus, Globe, Shield, CheckCircle2, AlertCircle, MoreVertical, ExternalLink, Bookmark, Filter |
| `motion/react` | `motion` |
| `src/lib/utils` | `cn()` |
| `src/types` | `MOCK_CASES` |

**State :**

| State | Type | Description |
|-------|------|-------------|
| `searchQuery` | `string` | Terme de recherche |

---

## Dependances npm

### Production

| Package | Version | Usage |
|---------|---------|-------|
| `react` | ^19.0.0 | Framework UI |
| `react-dom` | ^19.0.0 | Rendu DOM |
| `motion` | ^12.38.0 | Animations (framer-motion) |
| `lucide-react` | ^0.546.0 | Icones SVG |
| `clsx` | ^2.1.1 | Classes CSS conditionnelles |
| `tailwind-merge` | ^3.5.0 | Fusion intelligente de classes Tailwind |
| `tailwindcss` | ^4.1.14 | Framework CSS (via @tailwindcss/vite) |
| `@tailwindcss/vite` | ^4.1.14 | Plugin Vite pour Tailwind v4 |
| `@vitejs/plugin-react` | ^5.0.4 | Plugin Vite pour React |
| `vite` | ^6.2.0 | Build tool / dev server |
| `@google/genai` | ^1.29.0 | SDK Google Gemini (pas encore utilise) |
| `react-markdown` | ^10.1.0 | Rendu Markdown (importe mais pas utilise) |
| `express` | ^4.21.2 | Serveur Node (pas utilise cote client) |
| `dotenv` | ^17.2.3 | Variables d'environnement |

### Dev

| Package | Version | Usage |
|---------|---------|-------|
| `typescript` | ~5.8.2 | Typage statique |
| `@types/node` | ^22.14.0 | Types Node.js |
| `@types/express` | ^4.17.21 | Types Express |
| `tsx` | ^4.21.0 | Execution TypeScript |
| `autoprefixer` | ^10.4.21 | PostCSS autoprefixer |

---

## Matrice de dependances (composant -> module)

| Composant | `cn()` | `types.ts` | `motion` | `lucide-react` |
|-----------|--------|------------|----------|-----------------|
| App | oui | MOCK_CASES, USER_PROFILES, Case, Message, UserRole | oui | oui (30+) |
| Dashboard | oui | MOCK_CASES, Case | non | oui (17) |
| IPDirectory | oui | MOCK_CASES, Case | non | oui (17) |
| PriorArtSearch | oui | non | oui | oui (10) |
| LegalDrafting | oui | MOCK_CASES | oui | oui (22) |
| ClassSearch | oui | non | non | oui (10) |
| AuditLogs | oui | non | non | oui (7) |
| Trademarks | oui | MOCK_CASES | oui | oui (10) |
