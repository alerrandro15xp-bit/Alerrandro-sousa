import React from 'react';
import { ActiveScreen, DynamicLessonData } from '../types';

interface DynamicLessonViewProps {
  lesson: DynamicLessonData;
  onNavigate: (screen: ActiveScreen) => void;
  onStartExercises: (topic: string) => void;
  onOpenAITutor: () => void;
}

export const DynamicLessonView: React.FC<DynamicLessonViewProps> = ({
  lesson,
  onNavigate,
  onStartExercises,
  onOpenAITutor,
}) => {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Navegação da trilha"
        className="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm font-semibold mb-6"
      >
        <button
          onClick={() => onNavigate('dashboard')}
          className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Início</span>
        </button>
        <span className="text-outline-variant font-normal">/</span>
        <span className="text-outline-variant font-normal">Aula IA</span>
        <span className="text-outline-variant font-normal">/</span>
        <span aria-current="page" className="text-on-surface font-bold">
          {lesson.title}
        </span>
      </nav>

      {/* Header Section */}
      <header className="relative bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/30 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>{lesson.unitBadge || 'Conteúdo Personalizado'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span>
            <span>{lesson.readingTime || 'Leitura de 4 minutos'}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight font-sans">
            {lesson.title}
          </h1>
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          {lesson.subtitle}
        </p>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Content Stream */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {lesson.blocks.map((block, idx) => (
            <section
              key={idx}
              className="bg-surface-container-lowest rounded-2xl p-6 md:p-7 shadow-sm border border-outline-variant/30 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-sm">
                  {block.stepNumber || idx + 1}
                </div>
                <h2 className="text-xl font-bold text-on-surface">{block.title}</h2>
              </div>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
                {block.explanation}
              </p>

              {block.visualHint && (
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs sm:text-sm text-on-surface flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                    visibility
                  </span>
                  <div>
                    <strong className="text-primary font-bold">Visualização mental: </strong>
                    <span className="text-on-surface-variant">{block.visualHint}</span>
                  </div>
                </div>
              )}

              {block.practicalExample && (
                <div className="p-4 rounded-xl bg-surface-container-low/70 border border-emerald-300 text-xs sm:text-sm space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                    Exemplo Resolvido
                  </span>
                  <h4 className="font-bold text-on-surface">{block.practicalExample.question}</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {block.practicalExample.stepByStep}
                  </p>
                  <div className="p-2.5 rounded-lg bg-surface-container-lowest font-bold text-emerald-800 border border-emerald-200">
                    Resultado: {block.practicalExample.answer}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Supplementary Side Panel */}
        <aside className="lg:col-span-4 flex flex-col gap-5 w-full">
          {/* Quick Recap Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <h4 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container">lightbulb</span>
              Lembretes Rápidos do Tutor
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant leading-relaxed">
              {lesson.quickRecap.map((recap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                    arrow_right
                  </span>
                  <span>{recap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ask AI Tutor Box */}
          <div className="bg-gradient-to-br from-primary-fixed/20 to-surface-container-lowest rounded-2xl p-6 shadow-sm border border-primary/20 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">Dúvida nesta aula?</h4>
                <p className="text-xs text-on-surface-variant">Converse com o Tutor IA agora</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Não entendeu algum conceito? O Tutor IA explica de outro jeito, passo a passo.
            </p>
            <button
              onClick={onOpenAITutor}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Abrir Tutor IA</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Action Footer */}
      <footer className="mt-10 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Voltar ao Início</span>
        </button>

        <button
          onClick={() => onStartExercises(lesson.title)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-bold shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>Praticar Exercícios deste Assunto</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};
