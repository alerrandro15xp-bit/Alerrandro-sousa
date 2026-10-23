import React, { useState } from 'react';
import { ActiveScreen, SubjectData } from '../types';

interface SubjectViewProps {
  subject: SubjectData;
  onNavigate: (screen: ActiveScreen) => void;
  onSelectModule: (moduleId: string) => void;
}

export const SubjectView: React.FC<SubjectViewProps> = ({
  subject,
  onNavigate,
  onSelectModule,
}) => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  const filteredModules = subject.modules.filter((m) => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return m.status === 'in_progress';
    if (filter === 'completed') return m.status === 'completed';
    return true;
  });

  const isMath = subject.id === 'matematica';

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Trilha de Navegação"
        className="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm font-semibold mb-6"
      >
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>Início</span>
        </button>
        <span className="material-symbols-outlined text-[16px] text-outline-variant">
          chevron_right
        </span>
        <span className="text-on-surface font-bold">{subject.name}</span>
      </nav>

      {/* Hero Subject Overview Panel */}
      <section className="relative bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/30 overflow-hidden mb-8">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/30 to-tertiary-fixed/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                  isMath
                    ? 'bg-primary-fixed text-primary'
                    : 'bg-tertiary-fixed text-tertiary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {subject.icon}
                </span>
              </div>
              <div>
                <span
                  className={`text-[11px] uppercase tracking-wider font-bold ${
                    isMath ? 'text-primary' : 'text-tertiary'
                  }`}
                >
                  Trilha Estruturada
                </span>
                <h1 className="text-3xl font-bold text-on-surface font-sans">
                  {subject.name}
                </h1>
              </div>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
              {subject.description}
            </p>

            {/* Global Subject Progress Pill Row */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px] text-primary">menu_book</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  <strong className="text-on-surface">{subject.modulesCount}</strong> módulos cadastrados
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  <strong className="text-on-surface">{subject.questionsAnswered}</strong> de {subject.totalQuestions} questões concluídas
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  Sequência de {subject.streakDays} dias de foco
                </span>
              </div>
            </div>
          </div>

          {/* Overall Performance Ring Visual */}
          <div className="flex flex-col items-center justify-center bg-surface-container-low p-5 rounded-2xl min-w-[210px] shadow-sm border border-outline-variant/30">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className={`transition-all duration-700 ease-out ${
                    isMath ? 'text-primary' : 'text-tertiary'
                  }`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${subject.progressPercentage}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className={`text-xl font-extrabold leading-tight ${
                    isMath ? 'text-primary' : 'text-tertiary'
                  }`}
                >
                  {subject.progressPercentage}%
                </span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-tight font-bold">
                  Progresso
                </span>
              </div>
            </div>
            <span className="text-xs text-on-surface mt-2 font-bold">
              {isMath ? 'Nível 2: Consolidando' : 'Nível 3: Avançado'}
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              {isMath ? '2 tópicos restantes' : '1 tópico restante'}
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Controls & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/30 self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
              filter === 'all'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Todos os assuntos
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
              filter === 'in_progress'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Em andamento
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
              filter === 'completed'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Concluídos
          </button>
        </div>

        {/* Quick Stats Indicator */}
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
          <span className="flex h-2 w-2 rounded-full bg-secondary-container" />
          <span>
            Você está estudando:{' '}
            <strong className="text-on-surface">
              {isMath ? 'Frações e Equivalência' : 'Ortografia e Pontuação'}
            </strong>
          </span>
        </div>
      </div>

      {/* Content Grid: 8 Columns Modules List + 4 Columns Contextual Study Companion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Main Column (Cards) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {filteredModules.map((module) => {
            const isFractions = module.id === 'fracoes-equivalencia';
            const isCompleted = module.status === 'completed';
            const isInProgress = module.status === 'in_progress';

            return (
              <article
                key={module.id}
                className="group relative bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md border border-outline-variant/30 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-100/70 text-[#166534]'
                          : isInProgress
                          ? isMath
                            ? 'bg-surface-container-high text-primary'
                            : 'bg-tertiary-fixed text-tertiary'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {module.icon}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {isInProgress && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-secondary-fixed text-on-secondary-fixed border border-secondary/20">
                            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                            Em andamento
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#166534]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                            Concluído
                          </span>
                        )}
                        {module.status === 'not_started' && (
                          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface-variant">
                            Não iniciado
                          </span>
                        )}
                        {module.badgeLabel && (
                          <span
                            className={`text-xs font-bold ${
                              isCompleted
                                ? 'text-emerald-700'
                                : isInProgress
                                ? 'text-primary'
                                : 'text-outline'
                            }`}
                          >
                            {module.badgeLabel}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {module.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  {module.description}
                </p>

                {/* Progress Bar (if in progress) */}
                {isInProgress && (
                  <div className="bg-surface-container-low rounded-xl p-3.5 mb-4 border border-outline-variant/30">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-on-surface-variant font-medium">Progresso das atividades</span>
                      <span className="font-bold text-on-surface">
                        {module.completedQuestions}/{module.totalQuestions} exercícios respondidos (
                        {Math.round((module.completedQuestions / module.totalQuestions) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(module.completedQuestions / module.totalQuestions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Completion Info Pill (if completed) */}
                {isCompleted && (
                  <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2.5 rounded-xl mb-4 border border-outline-variant/30">
                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">
                      verified
                    </span>
                    <span className="text-xs text-on-surface">
                      Desempenho máximo:{' '}
                      <strong className="font-bold text-emerald-800">
                        {module.completedQuestions}/{module.totalQuestions} exercícios corretos (100%)
                      </strong>
                    </span>
                  </div>
                )}

                {/* Footer and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-medium">
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      {isCompleted ? 'check_circle' : isInProgress ? 'schedule' : 'quiz'}
                    </span>
                    <span>
                      {isCompleted
                        ? module.lastStudied || 'Finalizado na semana passada'
                        : isInProgress
                        ? `Aprox. ${module.estimatedMinutes || 15} minutos restantes`
                        : `${module.totalQuestions} exercícios de fixação`}
                    </span>
                  </div>

                  {isFractions ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigate('lesson-fractions')}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container text-primary font-bold text-xs hover:bg-surface-container-high transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                        <span>Ver lição</span>
                      </button>
                      <button
                        onClick={() => onNavigate('quiz-fractions')}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all"
                      >
                        <span>Continuar estudando</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => onSelectModule(module.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high font-bold text-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">refresh</span>
                      <span>Revisar aula com IA</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectModule(module.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <span>Aprender com IA</span>
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Sidebar Column (Companion & Alternate Discipline) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Alternate Discipline Recommendation Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isMath
                    ? 'bg-tertiary-fixed text-tertiary'
                    : 'bg-primary-fixed text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isMath ? 'history_edu' : 'calculate'}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">
                  Outra disciplina
                </span>
                <h3 className="text-xl font-bold text-on-surface">
                  {isMath ? 'Língua Portuguesa' : 'Matemática'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
              {isMath
                ? 'Prefere alternar para interpretação de texto, concordância ou ortografia? Alterne de matéria a qualquer momento.'
                : 'Quer praticar cálculos com frações, porcentagens ou raciocínio ágil? Alterne para exatas.'}
            </p>

            <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between mb-4 border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[18px]">bookmark</span>
                <span className="text-xs text-on-surface font-semibold">
                  {isMath ? 'Parou em: Concordância Verbal' : 'Parou em: Frações e Equivalência'}
                </span>
              </div>
              <span className="text-xs text-tertiary font-bold">
                {isMath ? '75%' : '60%'}
              </span>
            </div>

            <button
              onClick={() => onNavigate(isMath ? 'subject-portuguese' : 'subject-math')}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all text-center ${
                isMath
                  ? 'bg-tertiary text-on-tertiary hover:bg-tertiary-container'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
            >
              <span>{isMath ? 'Ir para Português' : 'Ir para Matemática'}</span>
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
            </button>
          </div>

          {/* Quick Helpful Tutor Note */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[26px] mt-0.5">
                lightbulb
              </span>
              <div>
                <h4 className="text-sm text-on-surface font-bold">Dica de Aprendizado</h4>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  "Errar uma questão faz parte da construção do raciocínio. No Estudaí, cada resposta incorreta ganha um passo a passo acolhedor para desatar o nó."
                </p>
              </div>
            </div>
          </div>

          {/* Study Session Visual Card */}
          <div className="relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
            <div
              className="h-32 w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80')",
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-surface-container-lowest to-transparent" />
            </div>
            <div className="p-4 -mt-4 relative">
              <div className="inline-flex items-center gap-1 text-primary text-[11px] font-bold bg-surface-container-high px-2.5 py-1 rounded-full mb-1">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>Método Ativo</span>
              </div>
              <h4 className="text-base font-bold text-on-surface">Revise sem ansiedade</h4>
              <p className="text-xs text-on-surface-variant mt-1">
                Revisões curtas de 15 minutos são mais eficientes que horas de sobrecarga contínua.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
