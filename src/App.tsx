import React, { useState } from 'react';
import {
  Shield,
  LayoutDashboard,
  Briefcase,
  Search,
  PenTool,
  Tag,
  Bell,
  LogOut,
  MessageSquare,
  X,
  Send,
  Sparkles,
  Globe,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { Case, MOCK_CASES, USER_PROFILES, UserRole, Message } from './types';

import { Dashboard } from './components/Dashboard';
import { IPDirectory } from './components/IPDirectory';
import { ClassSearch } from './components/ClassSearch';
import { PriorArtSearch } from './components/PriorArtSearch';
import { LegalDrafting } from './components/LegalDrafting';
import { AuditLogs } from './components/AuditLogs';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all text-sm font-medium",
      active
        ? "bg-brown-700 text-white"
        : "text-brown-400 hover:bg-brown-50 hover:text-brown-800"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Bonjour ! Je suis votre Copilote IA. Comment puis-je vous aider dans vos dossiers de Propriété Intellectuelle aujourd'hui ?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <Dashboard />;
      case 'Patents': return <IPDirectory />;
      case 'Search': return <PriorArtSearch />;
      case 'Drafting': return <LegalDrafting />;
      case 'Classification': return <ClassSearch />;
      case 'Audit': return <AuditLogs />;
      default: return <Dashboard />;
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Je traite votre demande concernant '${input}'. Un instant s'il vous plaît...`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  if (!onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #F8F5F0 0%, #F0EBE3 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-lg border border-brown-100 text-center space-y-8"
        >
          <div className="w-16 h-16 bg-brown-800 rounded-2xl flex items-center justify-center mx-auto text-brown-200">
            <Shield size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brown-900">IP Guardian</h2>
            <p className="text-xs text-brown-400 mt-1">Choisissez votre profil pour commencer</p>
          </div>

          <div className="space-y-3">
            {[
              { id: 'attorney', label: 'Avocat / Conseil PI', icon: Briefcase },
              { id: 'examiner', label: 'Examinateur', icon: Search },
              { id: 'corporate', label: 'Juriste Entreprise', icon: Globe },
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id as UserRole);
                  setOnboarded(true);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-xl border border-brown-100 hover:border-brown-300 hover:bg-brown-50 transition-all text-left"
              >
                <div className="p-2 bg-brown-50 rounded-lg text-brown-500">
                  <role.icon size={18} />
                </div>
                <span className="text-sm font-medium text-brown-700">{role.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen text-midnight font-sans" style={{ background: '#F8F5F0' }}>
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-brown-100 flex flex-col h-full">
        <div className="p-5 flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brown-800 rounded-xl flex items-center justify-center text-brown-200">
            <Shield size={18} />
          </div>
          <span className="text-base font-bold text-brown-900 tracking-tight">IP Guardian</span>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          <SidebarItem icon={LayoutDashboard} label="Tableau de bord" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <SidebarItem icon={Briefcase} label="Dossiers" active={activeTab === 'Patents'} onClick={() => setActiveTab('Patents')} />
          <SidebarItem icon={Search} label="Recherche" active={activeTab === 'Search'} onClick={() => setActiveTab('Search')} />
          <SidebarItem icon={PenTool} label="Rédaction" active={activeTab === 'Drafting'} onClick={() => setActiveTab('Drafting')} />
          <SidebarItem icon={Tag} label="Classification" active={activeTab === 'Classification'} onClick={() => setActiveTab('Classification')} />
        </nav>

        <div className="p-4 mt-auto border-t border-brown-50">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-lg bg-brown-100 flex items-center justify-center text-brown-700 font-bold text-xs">
              {selectedRole?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-brown-800">Utilisateur</p>
              <p className="text-[11px] text-brown-400 truncate capitalize">{selectedRole}</p>
            </div>
          </div>
          <button
            onClick={() => setOnboarded(false)}
            className="flex items-center gap-2 text-xs text-brown-400 hover:text-brown-700 transition-colors mt-2 px-2"
          >
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-14 bg-white border-b border-brown-100 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-sm font-semibold text-brown-800">Soter IA</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-brown-400 hover:text-brown-700 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brown-500 rounded-full" />
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brown-700 text-white text-xs font-medium hover:bg-brown-800 transition-all"
            >
              <MessageSquare size={14} />
              Assistant IA
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}

          {/* Legal Box */}
          <div className="mt-10 bg-brown-800 rounded-2xl p-8 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-14 h-14 bg-brown-200 text-brown-700 rounded-xl flex items-center justify-center shrink-0">
              <Scale size={28} />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-lg font-bold text-white mb-1">Boîte Juridique IA</h3>
              <p className="text-sm text-brown-300 max-w-xl">
                Posez vos questions juridiques complexes sur la propriété intellectuelle. Notre IA analyse la jurisprudence et les règlements internationaux.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Votre question juridique..."
                  className="w-full lg:w-96 bg-white/10 border border-white/10 focus:border-brown-400 rounded-xl py-3 pl-4 pr-12 text-sm text-white outline-none transition-all placeholder:text-brown-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brown-200 text-brown-800 rounded-lg hover:bg-brown-300 transition-all">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 top-16 bottom-4 w-[360px] bg-white rounded-2xl shadow-xl border border-brown-100 flex flex-col z-50 overflow-hidden"
            >
              <div className="p-4 bg-brown-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                    <Sparkles size={16} className="text-brown-200" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Assistant IP Guardian</h3>
                    <p className="text-[11px] text-brown-300">En ligne</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1.5 text-brown-300 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brown-50/30">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user'
                        ? "bg-brown-700 text-white rounded-br-md"
                        : "bg-white text-brown-800 border border-brown-100 rounded-bl-md"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t border-brown-100">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Posez une question juridique..."
                    className="w-full pl-4 pr-12 py-3 bg-brown-50 border border-brown-100 rounded-xl text-sm text-brown-800 outline-none focus:border-brown-300 transition-all placeholder:text-brown-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
