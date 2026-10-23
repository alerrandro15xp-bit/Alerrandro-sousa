import React from 'react';
import { ActiveScreen, QuizQuestion, UserProfile } from '../types';

interface QuizResultViewProps {
  user: UserProfile;
  questions: QuizQuestion[];
  results: { correctCount: number; answers: Record<number, string> };
  onNavigate: (screen: ActiveScreen) => void;
  currentTopic?: string;
  currentSubjectId?: 'matematica' | 'portugues' | 'ciencias' | 'historia';
  onGenerateAdaptiveChallenge?: (topic: string, goal: 'reforço' | 'desafio', accuracy: number) => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  user,
  questions,
  results,
  onNavigate,
  currentTopic = 'Frações e Equivalência',
  currentSubjectId = 'matematica',
  onGenerateAdaptiveChallenge,
}) => {
  const total = questions.length;
  const scorePercent = Math.round((results.correctCount / total) * 100);

  // SVG circular geometry
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.159
  const strokeDashoffset = circumference - (circumference * scorePercent) / 100;

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        {/* Celebration Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed-dim/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header Section */}
        <div className="relative text-center pt-4 pb-8 flex flex-col items-center">
          {/* Animated Milestone Badge */}
          <div className="relative mb-6 group">
            <div className="absolute inset-0 bg-secondary-container/40 rounded-full blur-md group-hover:scale-110 transition-transform duration-500" />
            <div className="relative w-24 h-24 bg-surface-container-lowest rounded-full shadow-md flex items-center justify-center p-3 border border-outline-variant/30">
              <div className="w-full h-full rounded-full bg-secondary-fixed/40 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-secondary text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-tertiary text-on-tertiary rounded-full p-1.5 shadow-sm flex items-center justify-center animate-bounce">
              <span
                className="material-symbols-outlined text-sm font-bold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
            </div>
          </div>

          {/* Encouraging Headings */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold mb-3 border border-outline-variant/30">
            <span
              className="material-symbols-outlined text-base text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span>Módulo Concluído com Sucesso</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight max-w-xl font-sans">
            Parabéns pelo seu esforço, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-base text-on-surface-variant mt-2 max-w-lg">
            Você concluiu o módulo de exercícios de{' '}
            <span className="font-bold text-on-surface">{currentTopic}</span>.
          </p>
        </div>

        {/* Main Score & Performance Card */}
        <div className="relative bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant/30 p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Score Gauge */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle
                    className="text-surface-container"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="10"
                  />
                  <circle
                    className="text-primary-container transition-all duration-1000 ease-out"
                    cx="60"
                    cy="60"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold text-on-surface leading-none font-sans">
                    {scorePercent}
                    <span className="text-2xl text-primary">%</span>
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium mt-1">
                    {results.correctCount} de {total} acertos
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-outline font-bold uppercase tracking-wider mt-3">
                Aproveitamento
              </span>
            </div>

            {/* Encouraging Narrative & Status */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 text-primary text-sm font-bold">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sentiment_very_satisfied
                </span>
                <span>
                  {scorePercent >= 80
                    ? 'Ótimo trabalho!'
                    : scorePercent >= 60
                    ? 'Bom progresso!'
                    : 'Vale a pena reforçar!'}
                </span>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                Você compreendeu muito bem como identificar frações equivalentes e simplificar números. Pequenos passos constroem grandes conquistas!
              </p>

              {/* Status Indicator Pill */}
              <div className="mt-2 p-4 rounded-xl bg-surface-container flex items-center justify-between gap-4 border border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      task_alt
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">Status do Tópico</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">
                      Seu progresso neste assunto foi atualizado para:
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold border border-tertiary/20">
                  <span>Concluído</span>
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Breakdown Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-on-surface">Resumo das questões</h2>
              <p className="text-xs text-on-surface-variant font-medium">
                Veja como foi o seu desempenho em cada ponto da atividade
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-outline uppercase tracking-wider">
              {total} Questões
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              const isQCorrect = results.answers[question.id] === question.correctOptionId;

              return (
                <div
                  key={question.id}
                  className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm border border-outline-variant/30"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold text-on-surface shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-on-surface truncate">
                        Questão {index + 1} • {question.category}
                      </span>
                      <span className="text-xs text-on-surface-variant truncate">
                        {question.explanationBody.substring(0, 75)}...
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isQCorrect ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tertiary-container/15 text-tertiary font-bold text-xs">
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="hidden sm:inline">Correta</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs">
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          lightbulb
                        </span>
                        <span>Atenção • revisada</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Tip Banner */}
        <div className="bg-surface-container-low rounded-2xl p-6 flex items-start gap-4 mb-8 border border-outline-variant/30">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-on-surface">Dica do Tutor</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Errar faz parte natural do aprendizado. As explicações passo a passo ficam salvas e você pode refazer qualquer questão quando desejar reforçar a fixação!
            </p>
          </div>
        </div>

        {/* Adaptive AI Next Step Section */}
        {onGenerateAdaptiveChallenge && (
          <div className="bg-gradient-to-r from-primary-fixed/30 via-surface-container-lowest to-tertiary-fixed/20 rounded-2xl p-6 border border-primary/20 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  {scorePercent >= 80 ? 'Você mandou super bem! Topa um Desafio da IA?' : 'Quer reforçar este assunto com o Tutor IA?'}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {scorePercent >= 80
                    ? 'A IA analisou seu acerto de ' + scorePercent + '% e pode formular um desafio aprofundado com problemas práticos.'
                    : 'A IA preparou novas questões de reforço com passos acolhedores e analogias visuais para fixar este assunto.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onGenerateAdaptiveChallenge(currentTopic, scorePercent >= 80 ? 'desafio' : 'reforço', scorePercent)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>{scorePercent >= 80 ? 'Gerar Desafio Inédito com IA' : 'Gerar Reforço Adaptado com IA'}</span>
            </button>
          </div>
        )}

        {/* Clear Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-6 border-t border-outline-variant/20">
          <button
            onClick={() => onNavigate(currentTopic === 'Frações e Equivalência' ? 'lesson-fractions' : 'dynamic-lesson')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 border border-outline-variant/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">menu_book</span>
            <span>Revisar assunto e explicações</span>
          </button>

          <button
            onClick={() => {
              if (currentSubjectId === 'portugues') onNavigate('subject-portuguese');
              else if (currentSubjectId === 'ciencias') onNavigate('subject-ciencias');
              else if (currentSubjectId === 'historia') onNavigate('subject-historia');
              else onNavigate('subject-math');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              Voltar aos assuntos de{' '}
              {currentSubjectId === 'portugues'
                ? 'Português'
                : currentSubjectId === 'ciencias'
                ? 'Ciências'
                : currentSubjectId === 'historia'
                ? 'História'
                : 'Matemática'}
            </span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>

        {/* Subtle General Progress Link */}
        <div className="text-center pb-6">
          <button
            onClick={() => onNavigate('progress')}
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">insights</span>
            <span>Ver meu progresso geral</span>
          </button>
        </div>
      </div>
    </div>
  );
};
