import React, { useState } from 'react';
import { ActiveScreen, QuizQuestion } from '../types';
import { FractionVisualizer } from '../components/FractionVisualizer';

interface QuizViewProps {
  questions: QuizQuestion[];
  onFinishQuiz: (results: { correctCount: number; answers: Record<number, string> }) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onAppendQuestions?: (newQuestions: QuizQuestion[]) => void;
  onOpenAITutor?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  onFinishQuiz,
  onNavigate,
  onAppendQuestions,
  onOpenAITutor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiDiagnosticLoading, setAiDiagnosticLoading] = useState(false);
  const [aiDiagnostic, setAiDiagnostic] = useState<{ analysis: string; practicalTip: string } | null>(null);
  const [isGeneratingAiQuiz, setIsGeneratingAiQuiz] = useState(false);
  const [quizNotice, setQuizNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const currentQuestion = questions[currentIndex] || questions[0];
  const selectedOption = userAnswers[currentQuestion.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentQuestion.correctOptionId;

  const handleSelectOption = (optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    setShowExplanation(true);
    setAiDiagnostic(null);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(userAnswers[questions[currentIndex + 1].id] !== undefined);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctOptionId) {
          correctCount++;
        }
      });
      onFinishQuiz({ correctCount, answers: userAnswers });
    }
  };

  const handleResetQuestion = () => {
    const updated = { ...userAnswers };
    delete updated[currentQuestion.id];
    setUserAnswers(updated);
    setShowExplanation(false);
    setAiDiagnostic(null);
  };

  const handleAskAiDiagnosis = async () => {
    if (!isAnswered) return;
    setAiDiagnosticLoading(true);
    try {
      const selectedOptionObj = currentQuestion.options.find((o) => o.id === selectedOption);
      const correctOptionObj = currentQuestion.options.find((o) => o.id === currentQuestion.correctOptionId);

      const res = await fetch('/api/ai/explain-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionPrompt: currentQuestion.question,
          studentAnswerText: selectedOptionObj ? `${selectedOptionObj.id}) ${selectedOptionObj.text}` : '',
          correctAnswerText: correctOptionObj ? `${correctOptionObj.id}) ${correctOptionObj.text}` : '',
          topic: currentQuestion.category,
        }),
      });

      const data = await res.json();
      setAiDiagnostic(data);
    } catch (err) {
      console.error('Erro ao pedir diagnóstico da IA:', err);
    } finally {
      setAiDiagnosticLoading(false);
    }
  };

  const handleGenerateAiQuiz = async () => {
    setIsGeneratingAiQuiz(true);
    try {
      const res = await fetch('/api/ai/generate-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentQuestion.category || 'Frações e equivalência',
          count: 3,
        }),
      });

      const data = await res.json();
      if (data.exercises && data.exercises.length > 0 && onAppendQuestions) {
        const newQuestions: QuizQuestion[] = data.exercises.map((ex: any, idx: number) => ({
          id: Date.now() + idx,
          category: ex.category || currentQuestion.category,
          question: ex.prompt,
          options: ex.options.map((opt: any) => ({
            id: opt.id,
            text: opt.text,
            isCorrect: opt.id === ex.correctOptionId,
          })),
          correctOptionId: ex.correctOptionId,
          explanationTitle: 'Exercício Inédito gerado por IA',
          explanationBody: ex.explanation,
          tutorTip: ex.tutorTip,
          bnccCode: ex.bnccCode || 'BNCC Geral',
        }));
        onAppendQuestions(newQuestions);
        setQuizNotice({
          text: `O Tutor IA formulou ${newQuestions.length} novos exercícios inéditos para você!`,
          type: 'success',
        });
      }
    } catch (err) {
      console.error('Erro ao gerar exercícios com IA:', err);
      setQuizNotice({
        text: 'Tivemos uma oscilação na conexão ao gerar questões. Tente novamente em instantes.',
        type: 'error',
      });
    } finally {
      setIsGeneratingAiQuiz(false);
    }
  };

  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Progress Header */}
      <section className="w-full mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium flex-wrap">
            <button
              onClick={() => onNavigate('subject-math')}
              className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span>Matemática</span>
            </button>
            <span className="text-outline-variant font-normal">›</span>
            <button
              onClick={() => onNavigate('lesson-fractions')}
              className="hover:text-on-surface transition-colors"
            >
              Frações e Equivalência
            </button>
            <span className="text-outline-variant font-normal">›</span>
            <span className="text-on-surface font-bold bg-surface-container-high px-2 py-0.5 rounded-full">
              Exercícios
            </span>
          </nav>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-tertiary">spa</span>
              Ritmo tranquilo • Sem pressa
            </span>
            <span className="text-sm text-primary font-extrabold tracking-tight">
              Questão {currentIndex + 1}{' '}
              <span className="text-outline text-xs font-normal">de {questions.length}</span>
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </section>

      {/* Quiz notice banner */}
      {quizNotice && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center justify-between text-xs font-medium animate-in fade-in duration-200 ${
            quizNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-red-50 text-red-800 border-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              {quizNotice.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{quizNotice.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setQuizNotice(null)}
            className="p-1 hover:opacity-75 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Main Focus Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Primary Card (Col 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <article className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 relative overflow-hidden">
            {/* Subtle Gradient Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-tertiary to-primary-container" />

            {/* Enunciado Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pt-1">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {currentQuestion.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-on-surface leading-snug font-sans">
                  {currentQuestion.question}
                </h1>
              </div>

              {/* Text-to-speech button */}
              <button
                type="button"
                onClick={handleSpeakQuestion}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors shrink-0 ${
                  isSpeaking
                    ? 'bg-primary text-on-primary animate-pulse'
                    : 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
                title="Ouvir questão com voz calma"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSpeaking ? 'volume_up' : 'volume_up'}
                </span>
              </button>
            </div>

            {/* Multiple Choice Options */}
            <div className="flex flex-col gap-3 mb-6">
              {currentQuestion.options.map((option) => {
                const isThisSelected = selectedOption === option.id;
                const showCorrect = isAnswered && option.id === currentQuestion.correctOptionId;
                const showWrong = isThisSelected && !option.isCorrect;

                let cardClasses =
                  'relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm ';

                if (showCorrect) {
                  cardClasses += 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500';
                } else if (showWrong) {
                  cardClasses += 'bg-red-50/70 border-red-400 ring-2 ring-red-400';
                } else if (isThisSelected) {
                  cardClasses += 'bg-primary/5 border-primary ring-2 ring-primary';
                } else {
                  cardClasses +=
                    'bg-surface-container-lowest border-outline-variant/40 hover:bg-surface-container-low hover:border-primary/40';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={cardClasses}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-9 h-9 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${
                          showCorrect
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : showWrong
                            ? 'bg-red-500 text-white shadow-sm'
                            : isThisSelected
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {option.id}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-on-surface">
                          {option.text}
                        </span>
                        {showCorrect && (
                          <span className="text-xs text-emerald-700 font-semibold hidden sm:inline-block">
                            • Escolha validada
                          </span>
                        )}
                      </div>
                    </div>

                    {showCorrect && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span>Correta</span>
                      </div>
                    )}

                    {showWrong && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        <span>Revise</span>
                      </div>
                    )}

                    {!isAnswered && (
                      <span className="text-xs text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                        Selecionar
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Feedback Box */}
            {showExplanation && (
              <section
                aria-live="polite"
                className={`rounded-2xl p-5 mb-6 border transition-all duration-300 relative overflow-hidden ${
                  isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-amber-50/60 border-amber-300'
                }`}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    isCorrect ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                />

                <div className="flex items-start gap-3 mb-2 pl-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isCorrect ? 'sentiment_very_satisfied' : 'tips_and_updates'}
                    </span>
                  </div>
                  <div>
                    <h2
                      className={`text-base font-bold tracking-tight ${
                        isCorrect ? 'text-emerald-800' : 'text-amber-900'
                      }`}
                    >
                      {isCorrect
                        ? currentQuestion.explanationTitle
                        : 'Quase lá! Veja a explicação passo a passo:'}
                    </h2>
                    <p className="text-xs text-on-surface-variant font-medium">
                      {isCorrect
                        ? 'Você dominou a equivalência e proporção.'
                        : 'Errar faz parte do aprendizado. Analise os números com calma.'}
                    </p>
                  </div>
                </div>

                <div className="pl-1 sm:pl-11 text-on-surface space-y-2 text-xs sm:text-sm">
                  <p className="leading-relaxed text-on-surface-variant">
                    {currentQuestion.explanationBody}
                  </p>

                  {/* Mathematical Demonstration Box */}
                  {currentQuestion.formulaDemo && (
                    <div className="my-2 p-2.5 rounded-lg bg-surface-container-lowest inline-flex items-center gap-3 shadow-sm font-mono text-xs text-primary font-bold border border-outline-variant/30">
                      <div className="flex flex-col items-center">
                        <span>{currentQuestion.formulaDemo.step1}</span>
                        <span className="w-full h-0.5 bg-primary/30 my-0.5" />
                        <span>{currentQuestion.formulaDemo.step2}</span>
                      </div>
                      <span className="text-on-surface-variant text-sm font-sans">=</span>
                      <div className="flex flex-col items-center text-emerald-700 font-bold">
                        <span>{currentQuestion.formulaDemo.result}</span>
                      </div>
                    </div>
                  )}

                  {/* AI Tutor Diagnostic Integration */}
                  <div className="mt-4 pt-3 border-t border-outline-variant/30">
                    {!aiDiagnostic ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAskAiDiagnosis}
                          disabled={aiDiagnosticLoading}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-all shadow-2xs border border-primary/20 cursor-pointer disabled:opacity-60"
                        >
                          <span
                            className="material-symbols-outlined text-[18px] text-amber-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            auto_awesome
                          </span>
                          <span>
                            {aiDiagnosticLoading
                              ? 'Tutor IA analisando seu raciocínio...'
                              : 'Pedir diagnóstico pedagógico do Tutor IA'}
                          </span>
                        </button>
                        {onOpenAITutor && (
                          <button
                            type="button"
                            onClick={onOpenAITutor}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-on-surface-variant hover:text-primary text-xs font-semibold hover:bg-surface-container transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                            <span>Tirar dúvida no chat</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="bg-surface-container-lowest p-4 rounded-xl border border-primary/30 shadow-sm animate-in fade-in space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs">
                          <span
                            className="material-symbols-outlined text-[18px] text-amber-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            auto_awesome
                          </span>
                          <span>Diagnóstico Pedagógico do Tutor IA:</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {aiDiagnostic.analysis}
                        </p>
                        {aiDiagnostic.practicalTip && (
                          <div className="p-2.5 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold flex items-start gap-2 border border-outline-variant/20">
                            <span className="material-symbols-outlined text-[16px] text-secondary mt-0.5">
                              tips_and_updates
                            </span>
                            <span>Dica de Ouro: {aiDiagnostic.practicalTip}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Footer Navigation and Actions */}
            <footer className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-3 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isAnswered && (
                  <button
                    type="button"
                    onClick={handleResetQuestion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    <span>Refazer questão</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => alert(`Dica rápida: ${currentQuestion.tutorTip}`)}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                  title="Ver dica do tutor"
                >
                  <span className="material-symbols-outlined text-[18px]">help_outline</span>
                </button>
              </div>

              <button
                type="button"
                disabled={!isAnswered}
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <span>
                  {currentIndex === questions.length - 1
                    ? 'Finalizar módulo e ver resultado'
                    : `Próxima questão (${currentIndex + 2} de ${questions.length})`}
                </span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </footer>
          </article>

          {/* Student Encouragement Pill */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
              </span>
              <span className="text-xs sm:text-sm text-on-surface">
                Sequência diária de estudos: <strong className="text-secondary font-bold">4 dias seguidos!</strong>
              </span>
            </div>
            <span className="text-xs text-outline hidden md:inline font-medium">
              Mantenha a regularidade
            </span>
          </div>
        </div>

        {/* Right Column (Col 4): Visual Representation & Study Pad */}
        <aside className="lg:col-span-4 flex flex-col gap-5">
          {/* Fraction Visual Comparison Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  pie_chart
                </span>
                Visualizando a Equivalência
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                Interativo
              </span>
            </div>

            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
              Veja como a área coberta permanece proporcional nas figuras:
            </p>

            {/* Dynamic Comparison Visualizer */}
            {currentQuestion.visualData && (
              <FractionVisualizer
                numeratorA={currentQuestion.visualData.numeratorA}
                denominatorA={currentQuestion.visualData.denominatorA}
                numeratorB={currentQuestion.visualData.numeratorB}
                denominatorB={currentQuestion.visualData.denominatorB}
                interactive={true}
              />
            )}

            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-outline text-[11px]">
              <span className="inline-flex items-center gap-1 font-semibold text-tertiary">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                Proporção verificada
              </span>
              <span className="font-mono">{currentQuestion.bnccCode}</span>
            </div>
          </div>

          {/* Quick Concept Memory Anchor Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary mb-2">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              <h4 className="text-sm font-bold text-on-surface">Lembrete do Tutor</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
              {currentQuestion.tutorTip}
            </p>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container text-on-surface-variant text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                tips_and_updates
              </span>
              <span>Dica: Multiplicar ou dividir por fatores comuns mantém o equilíbrio.</span>
            </div>
          </div>

          {/* AI Infinite Practice Card */}
          <div className="bg-gradient-to-br from-primary-fixed/20 to-surface-container-lowest rounded-2xl p-5 shadow-sm border border-primary/20 flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-2xs">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">Modo Infinito com IA</h4>
                <p className="text-[10px] text-on-surface-variant">Questões pedagógicas personalizadas</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Quer praticar mais? O Gemini formula questões inéditas no seu nível exato.
            </p>
            <button
              type="button"
              onClick={handleGenerateAiQuiz}
              disabled={isGeneratingAiQuiz}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isGeneratingAiQuiz ? 'animate-spin' : ''
                }`}
              >
                {isGeneratingAiQuiz ? 'autorenew' : 'psychology'}
              </span>
              <span>{isGeneratingAiQuiz ? 'Gerando com IA...' : 'Gerar +3 Questões com IA'}</span>
            </button>
          </div>

          {/* Student Study Companion Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 relative group">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
              alt="Ambiente calmo de estudo"
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent flex items-end p-4">
              <p className="text-xs text-inverse-on-surface font-medium">
                Aprender com clareza é construir confiança passo a passo.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
