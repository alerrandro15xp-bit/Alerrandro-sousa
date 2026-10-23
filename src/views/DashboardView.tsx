import React, { useState } from 'react';
import { ActiveScreen, UserProfile } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAITutor: () => void;
  onStartCustomAiTopic: (topic: string, subjectId?: 'matematica' | 'portugues' | 'ciencias' | 'historia') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onOpenAITutor,
  onStartCustomAiTopic,
}) => {
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [isGeneratingLesson, setIsGeneratingLesson] = useState(false);

  const handleStartCustomTopic = async (topicName?: string) => {
    const topic = (topicName || customTopicInput).trim();
    if (!topic || isGeneratingLesson) return;
    setIsGeneratingLesson(true);
    try {
      await onStartCustomAiTopic(topic);
    } finally {
      setIsGeneratingLesson(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 md:gap-8 animate-in fade-in duration-200">
      {/* Welcome / Personalized Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary border border-outline-variant/30">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Trilha Personalizada</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight font-sans">
            Olá, {user.name.split(' ')[0]}! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant">
            O que vamos praticar hoje? Cada passo conta rumo à sua meta!
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAITutor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span
                className="material-symbols-outlined text-[18px] text-amber-300"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span>Abrir Tutor IA para tirar dúvidas</span>
            </button>
          </div>
        </div>

        {/* Study Streak Pill */}
        <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl self-start md:self-auto border border-outline-variant/30 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-on-surface leading-tight block">
              {user.streakDays} Dias
            </span>
            <p className="text-xs text-on-surface-variant font-medium">Sequência de estudo</p>
          </div>
        </div>
      </div>

      {/* AI Custom Topic Study Bar */}
      <section className="bg-gradient-to-r from-primary-fixed/30 via-surface-container-lowest to-tertiary-fixed/20 p-5 sm:p-6 rounded-2xl border border-primary/20 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
              <h3 className="text-base font-bold text-on-surface">Estude Qualquer Assunto com IA</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Novo
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Digite o tópico escolar que você quer aprender ou reforçar (Matemática, Ciências, História, etc.).
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartCustomTopic();
            }}
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <input
              type="text"
              value={customTopicInput}
              onChange={(e) => setCustomTopicInput(e.target.value)}
              placeholder="Ex: Células e Fotossíntese, História do Brasil..."
              disabled={isGeneratingLesson}
              className="w-full md:w-72 h-11 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface text-xs sm:text-sm border border-outline-variant/40 outline-none focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={!customTopicInput.trim() || isGeneratingLesson}
              className="h-11 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[16px] ${isGeneratingLesson ? 'animate-spin' : ''}`}>
                {isGeneratingLesson ? 'autorenew' : 'auto_awesome'}
              </span>
              <span>{isGeneratingLesson ? 'Gerando...' : 'Criar com IA'}</span>
            </button>
          </form>
        </div>

        {/* Quick Topic Chips */}
        <div className="mt-3 pt-3 border-t border-outline-variant/20 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-on-surface-variant shrink-0">Sugestões rápidas:</span>
          {['Células e Fotossíntese', 'História do Brasil Colonial', 'Equações de 1º Grau', 'Regência e Crase'].map(
            (topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleStartCustomTopic(topic)}
                className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant hover:text-primary text-[11px] font-semibold border border-outline-variant/30 transition-all shrink-0 cursor-pointer"
              >
                {topic}
              </button>
            )
          )}
        </div>
      </section>

      {/* AI Adaptive Recommendation Banner */}
      <section className="bg-gradient-to-r from-primary-fixed/25 via-surface-container-lowest to-secondary-fixed/25 rounded-2xl p-5 sm:p-6 border border-primary/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              psychology
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-container/10 px-2 py-0.5 rounded-full">
                IA Adaptativa • Próximo Passo
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Reforço Estratégico
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-on-surface">
              Recomendação para hoje: Ortografia e Pontuação
            </h3>
            <p className="text-xs text-on-surface-variant max-w-xl leading-relaxed mt-0.5">
              Identificamos que seu rendimento em vírgula e crase está em 60%. O Tutor IA preparou uma aula leve com exemplos contextualizados para você dominar o conteúdo hoje!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => onStartCustomAiTopic('Ortografia e Pontuação', 'portugues')}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Estudar com Tutor IA</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Disciplinas Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Disciplinas</h2>
          <p className="text-sm text-on-surface-variant">
            Escolha uma matéria para explorar lições estruturadas e desafios práticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Língua Portuguesa Card */}
          <div className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-outline-variant/30 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container/15 text-tertiary flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">menu_book</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary border border-tertiary/20">
                  Em andamento
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-tertiary transition-colors">
                  Língua Portuguesa
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Interpretação de textos, gramática, ortografia e pontuação sem complicação.
                </p>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant text-xs py-1">
                <span className="material-symbols-outlined text-[18px] text-tertiary">school</span>
                <span>3 assuntos em andamento</span>
                <span className="text-outline-variant">•</span>
                <span>12 exercícios respondidos</span>
              </div>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate('subject-portuguese')}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-surface-container-low text-tertiary font-bold text-sm group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Estudar Português</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Matemática Card */}
          <div className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-outline-variant/30 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/15 text-primary flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">calculate</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-container/10 text-primary border border-primary/20">
                  Em andamento
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  Matemática
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Operações básicas, frações, porcentagem e raciocínio lógico passo a passo.
                </p>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant text-xs py-1">
                <span className="material-symbols-outlined text-[18px] text-primary">calculate</span>
                <span>2 assuntos em andamento</span>
                <span className="text-outline-variant">•</span>
                <span>18 exercícios respondidos</span>
              </div>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate('subject-math')}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-surface-container-low text-primary font-bold text-sm group-hover:bg-primary group-hover:text-on-primary transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Estudar Matemática</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Ciências Card */}
          <div className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-outline-variant/30 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed/40 text-secondary flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">science</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Disponível
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-secondary transition-colors">
                  Ciências Naturais
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Células, fotossíntese, corpo humano e o equilíbrio dos ecossistemas.
                </p>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant text-xs py-1">
                <span className="material-symbols-outlined text-[18px] text-secondary">psychology</span>
                <span>3 tópicos disponíveis</span>
                <span className="text-outline-variant">•</span>
                <span>8 exercícios respondidos</span>
              </div>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate('subject-ciencias')}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-surface-container-low text-secondary font-bold text-sm group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Estudar Ciências</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* História Card */}
          <div className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-outline-variant/30 transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed/50 text-tertiary flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">history_edu</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary border border-tertiary/20">
                  Disponível
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-tertiary transition-colors">
                  História do Brasil
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Período colonial, independência, império e proclamação da república.
                </p>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant text-xs py-1">
                <span className="material-symbols-outlined text-[18px] text-tertiary">castle</span>
                <span>3 tópicos disponíveis</span>
                <span className="text-outline-variant">•</span>
                <span>11 exercícios respondidos</span>
              </div>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => onNavigate('subject-historia')}
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-surface-container-low text-tertiary font-bold text-sm group-hover:bg-tertiary group-hover:text-on-tertiary transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>Estudar História</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Continuar estudando Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">play_circle</span>
          <h2 className="text-2xl font-bold text-on-surface">Continuar estudando</h2>
        </div>

        <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-container/10 text-primary font-bold">
                Matemática
              </span>
              <span className="text-xs text-on-surface-variant">
                • Última atividade há 2 horas
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-on-surface mb-1">
                Frações e Equivalência
              </h3>
              <p className="text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                Você parou na explicação sobre soma de frações com denominadores diferentes. Falta pouco para o quiz final da unidade!
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 max-w-xl">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Progresso no módulo</span>
                <span className="text-primary font-bold">60% concluído</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('lesson-fractions')}
              className="px-6 py-3.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
              <span>Continuar assunto</span>
            </button>
            <span className="text-xs text-on-surface-variant text-center font-medium">
              Tempo estimado: 8 min
            </span>
          </div>
        </div>
      </section>

      {/* Resumo do seu progresso Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Resumo do seu progresso</h2>
          <p className="text-sm text-on-surface-variant">Acompanhe seu desempenho nesta semana.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">assignment_turned_in</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-on-surface leading-none block">5</span>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Assuntos estudados</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">draw</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-on-surface leading-none block">30</span>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Exercícios praticados</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/15 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">percent</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-on-surface leading-none block">84%</span>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Acertos gerais</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-outline-variant/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">timer</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-on-surface leading-none block">45m</span>
              <p className="text-xs text-on-surface-variant font-medium mt-1">Tempo dedicado</p>
            </div>
          </div>
        </div>

        {/* Quick Study Tip */}
        <div className="p-5 bg-surface-container-low rounded-2xl flex items-center gap-4 text-on-surface border border-outline-variant/30">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">lightbulb</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-on-surface">Dica rápida de estudo:</p>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Estudar 15 minutos por dia faz toda a diferença! A regularidade é o segredo para consolidar o que você aprendeu.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
