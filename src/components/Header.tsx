import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  user: UserProfile;
  onLogout: () => void;
  onOpenAITutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  user,
  onLogout,
  onOpenAITutor,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isInicioActive =
    currentScreen === 'dashboard' ||
    currentScreen === 'subject-math' ||
    currentScreen === 'subject-portuguese' ||
    currentScreen === 'lesson-fractions' ||
    currentScreen === 'quiz-fractions' ||
    currentScreen === 'quiz-result';

  const isProgressoActive = currentScreen === 'progress';

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg text-left"
          >
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-surface-container-high text-primary shadow-sm transition-transform group-hover:scale-105">
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_stories
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl text-primary tracking-tight font-sans">
                Estudaí
              </span>
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`relative py-1 text-sm font-semibold transition-colors ${
              isInicioActive
                ? 'text-primary after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className={`relative py-1 text-sm font-semibold transition-colors ${
              isProgressoActive
                ? 'text-primary after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Meu progresso
          </button>
        </nav>

        {/* Actions & User Account Area */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAITutor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
            title="Abrir Tutor Inteligente IA"
          >
            <span
              className="material-symbols-outlined text-[16px] text-amber-500 animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span>Tutor IA</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-surface-container-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Abrir menu do usuário"
          >
            <span className="hidden md:inline-block text-xs font-semibold text-on-surface-variant">
              Olá, {user.name.split(' ')[0]}
            </span>
            <div className="p-0.5 rounded-full ring-1 ring-outline-variant/50 bg-surface-container-lowest">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline hidden sm:inline">
              expand_more
            </span>
          </button>

          {/* User Popover Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-lg border border-outline-variant/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-outline-variant/20">
                <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
              </div>

              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
                Painel do Aluno
              </button>

              <button
                onClick={() => {
                  onNavigate('progress');
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-tertiary">monitoring</span>
                Meu Progresso
              </button>

              <div className="my-1 border-t border-outline-variant/20"></div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sair da conta
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </header>
  );
};
