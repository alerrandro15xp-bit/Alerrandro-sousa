/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, DynamicLessonData, QuizQuestion, UserProfile } from './types';
import { initialUser, mathQuestions, subjectsData } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AITutorModal } from './components/AITutorModal';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { SubjectView } from './views/SubjectView';
import { LessonView } from './views/LessonView';
import { DynamicLessonView } from './views/DynamicLessonView';
import { QuizView } from './views/QuizView';
import { QuizResultView } from './views/QuizResultView';
import { ProgressView } from './views/ProgressView';

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('estudai_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('dashboard');
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [currentTutorContext, setCurrentTutorContext] = useState('Frações e Equivalência');
  const [currentTopicTitle, setCurrentTopicTitle] = useState('Frações e Equivalência');
  const [currentSubjectId, setCurrentSubjectId] = useState<'matematica' | 'portugues' | 'ciencias' | 'historia'>('matematica');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(mathQuestions);
  const [dynamicLesson, setDynamicLesson] = useState<DynamicLessonData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [aiLoadingInfo, setAiLoadingInfo] = useState<{ title: string; description: string } | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const [quizResults, setQuizResults] = useState<{
    correctCount: number;
    answers: Record<number, string>;
  }>({
    correctCount: 4,
    answers: {
      1: 'B',
      2: 'B',
      3: 'A',
      4: 'A',
      5: 'C',
    },
  });

  useEffect(() => {
    localStorage.setItem('estudai_user', JSON.stringify(user));
  }, [user]);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('auth');
  };

  const handleFinishQuiz = (results: { correctCount: number; answers: Record<number, string> }) => {
    setQuizResults(results);
    setCurrentScreen('quiz-result');
  };

  const handleAppendQuestions = (newQuestions: QuizQuestion[]) => {
    setActiveQuestions((prev) => [...prev, ...newQuestions]);
  };

  const handleStartCustomAiTopic = async (
    topicTitle: string,
    subjectId?: 'matematica' | 'portugues' | 'ciencias' | 'historia'
  ) => {
    if (subjectId) setCurrentSubjectId(subjectId);
    setCurrentTopicTitle(topicTitle);
    setCurrentTutorContext(topicTitle);
    setAiLoadingInfo({
      title: `Preparando Aula de ${topicTitle}`,
      description: 'O Tutor IA está formatando explicações acolhedoras, analogias práticas e lembretes para o seu ritmo de estudo...',
    });

    try {
      const response = await fetch('/api/ai/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicTitle }),
      });
      const data = await response.json();
      if (data && data.title && data.blocks) {
        setDynamicLesson({
          topicId: topicTitle.toLowerCase().replace(/\s+/g, '-'),
          title: data.title,
          subtitle: data.subtitle || 'Aula formulada especialmente pelo Tutor IA.',
          readingTime: data.readingTime || 'Leitura de 4 minutos',
          unitBadge: data.unitBadge || 'Módulo Gerado por IA',
          blocks: data.blocks,
          quickRecap: data.quickRecap || ['Concentre-se em um passo por vez.', 'Pratique para fixar.'],
        });
        setCurrentScreen('dynamic-lesson');
      } else {
        triggerToast('Não foi possível gerar a aula neste instante. Tente novamente!');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Erro de conexão ao gerar aula com IA.');
    } finally {
      setAiLoadingInfo(null);
    }
  };

  const handleStartExercisesForTopic = async (
    topicTitle: string,
    difficulty: string = 'médio',
    adaptiveGoal: 'reforço' | 'desafio' | 'prática' = 'prática',
    studentAccuracy?: number
  ) => {
    setCurrentTopicTitle(topicTitle);
    setCurrentTutorContext(topicTitle);
    setAiLoadingInfo({
      title: adaptiveGoal === 'desafio' ? 'Formulando Desafio Inédito de IA' : 'Criando Exercícios Personalizados',
      description: `O Tutor IA está calibrando as questões de "${topicTitle}" (${adaptiveGoal}) conforme seu desempenho anterior...`,
    });

    try {
      const response = await fetch('/api/ai/generate-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicTitle,
          count: 4,
          difficulty,
          adaptiveGoal,
          studentAccuracy,
          studentName: user.name,
        }),
      });
      const data = await response.json();
      if (data.exercises && data.exercises.length > 0) {
        const generated: QuizQuestion[] = data.exercises.map((ex: any, idx: number) => ({
          id: Date.now() + idx,
          category: ex.category || topicTitle,
          question: ex.prompt,
          options: ex.options.map((opt: any) => ({
            id: opt.id,
            text: opt.text,
            isCorrect: opt.id === ex.correctOptionId,
          })),
          correctOptionId: ex.correctOptionId,
          explanationTitle:
            adaptiveGoal === 'desafio'
              ? 'Excelente! Desafio Resolvido com Raciocínio!'
              : 'Exercício Adaptativo gerado pelo Tutor IA',
          explanationBody: ex.explanation,
          tutorTip: ex.tutorTip,
          bnccCode: ex.bnccCode || 'BNCC Geral',
        }));
        setActiveQuestions(generated);
        setCurrentScreen('quiz-fractions');
      } else {
        triggerToast('Não foi possível gerar novos exercícios. Tente novamente!');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Erro ao formular questões com IA.');
    } finally {
      setAiLoadingInfo(null);
    }
  };

  const handleAdaptiveChallenge = (topicTitle: string, goal: 'reforço' | 'desafio', accuracy: number) => {
    const diff = goal === 'desafio' ? 'avançado' : 'básico';
    handleStartExercisesForTopic(topicTitle, diff, goal, accuracy);
  };

  if (currentScreen === 'auth') {
    return <AuthView onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-background min-h-screen flex flex-col justify-between selection:bg-primary-fixed selection:text-primary">
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        user={user}
        onLogout={handleLogout}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      <main className="w-full pt-20 pb-12 flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {currentScreen === 'dashboard' && (
            <DashboardView
              user={user}
              onNavigate={setCurrentScreen}
              onOpenAITutor={() => setIsAITutorOpen(true)}
              onStartCustomAiTopic={handleStartCustomAiTopic}
            />
          )}

          {currentScreen === 'subject-math' && (
            <SubjectView
              subject={subjectsData.matematica}
              onNavigate={setCurrentScreen}
              onSelectModule={(modId) => {
                setCurrentSubjectId('matematica');
                if (modId === 'fracoes-equivalencia') {
                  setCurrentTutorContext('Frações e Equivalência');
                  setCurrentTopicTitle('Frações e Equivalência');
                  setCurrentScreen('lesson-fractions');
                } else {
                  const mod = subjectsData.matematica.modules.find((m) => m.id === modId);
                  handleStartCustomAiTopic(mod?.title || 'Matemática', 'matematica');
                }
              }}
            />
          )}

          {currentScreen === 'subject-portuguese' && (
            <SubjectView
              subject={subjectsData.portugues}
              onNavigate={setCurrentScreen}
              onSelectModule={(modId) => {
                setCurrentSubjectId('portugues');
                const mod = subjectsData.portugues.modules.find((m) => m.id === modId);
                handleStartCustomAiTopic(mod?.title || 'Língua Portuguesa', 'portugues');
              }}
            />
          )}

          {currentScreen === 'subject-ciencias' && (
            <SubjectView
              subject={subjectsData.ciencias}
              onNavigate={setCurrentScreen}
              onSelectModule={(modId) => {
                setCurrentSubjectId('ciencias');
                const mod = subjectsData.ciencias.modules.find((m: { id: string; title: string }) => m.id === modId);
                handleStartCustomAiTopic(mod?.title || 'Ciências Naturais', 'ciencias');
              }}
            />
          )}

          {currentScreen === 'subject-historia' && (
            <SubjectView
              subject={subjectsData.historia}
              onNavigate={setCurrentScreen}
              onSelectModule={(modId) => {
                setCurrentSubjectId('historia');
                const mod = subjectsData.historia.modules.find((m: { id: string; title: string }) => m.id === modId);
                handleStartCustomAiTopic(mod?.title || 'História do Brasil', 'historia');
              }}
            />
          )}

          {currentScreen === 'lesson-fractions' && (
            <LessonView onNavigate={setCurrentScreen} />
          )}

          {currentScreen === 'dynamic-lesson' && dynamicLesson && (
            <DynamicLessonView
              lesson={dynamicLesson}
              onNavigate={setCurrentScreen}
              onStartExercises={handleStartExercisesForTopic}
              onOpenAITutor={() => setIsAITutorOpen(true)}
            />
          )}

          {currentScreen === 'quiz-fractions' && (
            <QuizView
              questions={activeQuestions}
              onFinishQuiz={handleFinishQuiz}
              onNavigate={setCurrentScreen}
              onAppendQuestions={handleAppendQuestions}
              onOpenAITutor={() => setIsAITutorOpen(true)}
            />
          )}

          {currentScreen === 'quiz-result' && (
            <QuizResultView
              user={user}
              questions={activeQuestions}
              results={quizResults}
              onNavigate={setCurrentScreen}
              currentTopic={currentTopicTitle}
              currentSubjectId={currentSubjectId}
              onGenerateAdaptiveChallenge={handleAdaptiveChallenge}
            />
          )}

          {currentScreen === 'progress' && (
            <ProgressView
              onNavigate={setCurrentScreen}
              onStartTopic={(title, subj) => {
                if (subj) setCurrentSubjectId(subj);
                handleStartCustomAiTopic(title, subj);
              }}
              onStartExercises={(title, diff, goal) => {
                handleStartExercisesForTopic(title, diff, goal);
              }}
            />
          )}
        </div>
      </main>

      {/* AI Loading Modal Overlay */}
      {aiLoadingInfo && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-outline-variant/30 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 animate-bounce">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 font-sans">
              {aiLoadingInfo.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              {aiLoadingInfo.description}
            </p>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse w-3/4" />
            </div>
            <span className="text-[11px] text-outline mt-3">
              Adaptando conteúdo pedagógico ao seu progresso...
            </span>
          </div>
        </div>
      )}

      {/* Floating AI Tutor Quick Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAITutorOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30 cursor-pointer"
          title="Tirar dúvida com o Tutor IA Estudaí"
        >
          <span
            className="material-symbols-outlined text-[20px] text-amber-300 animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="hidden sm:inline">Dúvida? Fale com a IA</span>
        </button>
      </div>

      {/* AI Tutor Chat Drawer/Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        currentContext={currentTutorContext}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-sm p-4 rounded-xl bg-surface-container-highest border border-outline-variant/50 text-on-surface shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">info</span>
            <span className="text-xs font-medium leading-relaxed">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 text-on-surface-variant hover:text-on-surface cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
