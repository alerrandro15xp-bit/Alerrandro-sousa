import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Lucas Ferreira Silva');
  const [email, setEmail] = useState('lucas.silva@estudante.com.br');
  const [password, setPassword] = useState('Estuda@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        name: name || 'Lucas Ferreira Silva',
        email: email || 'lucas.silva@estudante.com.br',
        streakDays: 4,
        avatarUrl:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden rounded-2xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30">
            {/* Ambient Blobs */}
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none" />

            {/* Header */}
            <header className="relative flex flex-col items-center text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-container-high text-primary shadow-sm mb-3">
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_stories
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-3xl font-bold text-primary tracking-tight font-sans">
                  Estudaí
                </h1>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
              </div>
              <p className="text-sm text-on-surface-variant max-w-xs mt-2">
                Seu espaço diário de reforço escolar simples e direto
              </p>
            </header>

            {/* Mode Switcher Tabs */}
            <div className="relative flex p-1 rounded-xl bg-surface-container mb-6">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                  authMode === 'login'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                  authMode === 'register'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Criar conta
              </button>
            </div>

            {/* Recovery notice banner */}
            {recoveryNotice && (
              <div className="mb-4 p-3 rounded-xl bg-primary-fixed/25 border border-primary/20 text-on-surface text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  <span>{recoveryNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRecoveryNotice(null)}
                  className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {authMode === 'register' && (
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="name">
                    Nome completo
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                      person
                    </span>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Lucas Ferreira Silva"
                      required
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/40 outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-on-surface" htmlFor="email">
                  E-mail
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="seu.email@escola.com.br"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/40 outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface" htmlFor="password">
                    Senha
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setRecoveryNotice('Um link de recuperação simulado foi enviado para seu e-mail!')}
                      className="text-xs text-primary hover:underline font-medium cursor-pointer"
                    >
                      Esqueci minha senha
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Digite sua senha de acesso"
                    className="w-full h-12 pl-10 pr-11 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/40 outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Alternar exibição da senha"
                    className="absolute right-3 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70"
                >
                  <span>
                    {loading
                      ? authMode === 'login'
                        ? 'Acessando plataforma...'
                        : 'Configurando acesso...'
                      : authMode === 'login'
                      ? 'Entrar no Estudaí'
                      : 'Criar conta no Estudaí'}
                  </span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              {/* Supportive Tip */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low text-on-surface-variant border border-outline-variant/20">
                <span
                  className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  tips_and_updates
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong className="font-semibold text-on-surface">Dica:</strong> use o e-mail
                  cadastrado na sua escola ou informado pelos seus responsáveis.
                </p>
              </div>
            </form>

            {/* Footer */}
            <footer className="mt-6 pt-4 text-center border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
              >
                {authMode === 'login' ? (
                  <>
                    Ainda não tem cadastro?{' '}
                    <span className="text-primary font-bold underline underline-offset-4">
                      Crie sua conta gratuitamente
                    </span>
                  </>
                ) : (
                  <>
                    Já possui uma conta?{' '}
                    <span className="text-primary font-bold underline underline-offset-4">
                      Acesse com suas credenciais
                    </span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-outline">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span className="text-[11px] font-semibold">Ambiente seguro focado em estudantes</span>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};
