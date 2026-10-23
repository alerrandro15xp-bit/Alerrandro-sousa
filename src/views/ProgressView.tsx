import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface ProgressViewProps {
  onNavigate: (screen: ActiveScreen) => void;
  onStartTopic?: (topicTitle: string, subjectId?: 'matematica' | 'portugues' | 'ciencias' | 'historia') => void;
  onStartExercises?: (topicTitle: string, difficulty?: string, adaptiveGoal?: 'reforço' | 'desafio') => void;
}

interface TopicProgress {
  id: string;
  subject: 'matematica' | 'portugues' | 'ciencias' | 'historia';
  title: string;
  subtitle: string;
  icon: string;
  status: 'completed' | 'in_progress' | 'not_started';
  scoreText: string;
  percentage: number;
  actionText: string;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigate, onStartTopic, onStartExercises }) => {
  const [filter, setFilter] = useState<'all' | 'matematica' | 'portugues' | 'ciencias' | 'historia'>('all');

  const topics: TopicProgress[] = [
    // Matemática
    {
      id: 'operacoes-basicas',
      subject: 'matematica',
      title: 'Operações Básicas',
      subtitle: 'Matemática Fundamental • Adição, subtração, multiplicação e divisão',
      icon: 'calculate',
      status: 'completed',
      scoreText: 'Acertos: 10/10',
      percentage: 100,
      actionText: 'Revisar',
    },
    {
      id: 'fracoes-equivalencia',
      subject: 'matematica',
      title: 'Frações e Equivalência',
      subtitle: 'Matemática • Representação visual, frações próprias e simplificação',
      icon: 'pie_chart',
      status: 'completed',
      scoreText: 'Acertos: 4/5',
      percentage: 80,
      actionText: 'Praticar novamente',
    },
    {
      id: 'porcentagem-cotidiano',
      subject: 'matematica',
      title: 'Porcentagem no Cotidiano',
      subtitle: 'Matemática • Descontos, juros simples e taxas do dia a dia',
      icon: 'percent',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },
    {
      id: 'equacoes-1-grau',
      subject: 'matematica',
      title: 'Equações de 1º Grau',
      subtitle: 'Matemática • Equilíbrio de equações e incógnitas sem decoreba',
      icon: 'balance',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },

    // Português
    {
      id: 'interpretacao-texto',
      subject: 'portugues',
      title: 'Interpretação de Texto',
      subtitle: 'Língua Portuguesa • Ideias centrais, inferência e gêneros textuais',
      icon: 'article',
      status: 'completed',
      scoreText: 'Acertos: 9/10',
      percentage: 90,
      actionText: 'Revisar',
    },
    {
      id: 'ortografia-pontuacao',
      subject: 'portugues',
      title: 'Ortografia e Pontuação',
      subtitle: 'Língua Portuguesa • Uso da vírgula, crase e acentuação gráfica',
      icon: 'spellcheck',
      status: 'in_progress',
      scoreText: 'Acertos: 6/10',
      percentage: 60,
      actionText: 'Continuar',
    },
    {
      id: 'concordancia-verbal',
      subject: 'portugues',
      title: 'Concordância Verbal e Nominal',
      subtitle: 'Língua Portuguesa • Harmonia entre sujeito e verbo sem armadilhas',
      icon: 'rule',
      status: 'in_progress',
      scoreText: 'Acertos: 9/12',
      percentage: 75,
      actionText: 'Continuar',
    },
    {
      id: 'generos-textuais',
      subject: 'portugues',
      title: 'Gêneros Textuais e Figuras de Linguagem',
      subtitle: 'Língua Portuguesa • Metáforas, notícias e crônicas',
      icon: 'auto_stories',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },

    // Ciências Naturais
    {
      id: 'celulas-fotossintese',
      subject: 'ciencias',
      title: 'Células e Fotossíntese',
      subtitle: 'Ciências Naturais • Como as plantas e células geram energia',
      icon: 'psychology',
      status: 'in_progress',
      scoreText: 'Acertos: 4/5',
      percentage: 80,
      actionText: 'Continuar',
    },
    {
      id: 'corpo-humano-sistemas',
      subject: 'ciencias',
      title: 'Sistemas do Corpo Humano',
      subtitle: 'Ciências Naturais • Circulação, digestão e harmonia dos órgãos',
      icon: 'favorite',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },
    {
      id: 'ecologia-sustentabilidade',
      subject: 'ciencias',
      title: 'Cadeias Alimentares e Ecossistemas',
      subtitle: 'Ciências Naturais • Produtores, consumidores e biomas brasileiros',
      icon: 'eco',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },

    // História do Brasil
    {
      id: 'brasil-colonia',
      subject: 'historia',
      title: 'Brasil Colonial e Ciclos Econômicos',
      subtitle: 'História do Brasil • Cana-de-açúcar, mineração e vida social',
      icon: 'castle',
      status: 'in_progress',
      scoreText: 'Acertos: 6/8',
      percentage: 75,
      actionText: 'Continuar',
    },
    {
      id: 'independencia-imperio',
      subject: 'historia',
      title: 'Independência e o Primeiro Reinado',
      subtitle: 'História do Brasil • Da Família Real à soberania nacional',
      icon: 'flag',
      status: 'completed',
      scoreText: 'Acertos: 5/5',
      percentage: 100,
      actionText: 'Revisar',
    },
    {
      id: 'proclamacao-republica',
      subject: 'historia',
      title: 'A Proclamação da República',
      subtitle: 'História do Brasil • O fim da monarquia e novos rumos do país',
      icon: 'account_balance',
      status: 'not_started',
      scoreText: '0 exercícios',
      percentage: 0,
      actionText: 'Começar',
    },
  ];

  const filteredTopics = topics.filter((t) => {
    if (filter === 'all') return true;
    return t.subject === filter;
  });

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Title & Streak Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary text-xs font-bold uppercase tracking-wider mb-1 border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Relatório Individual</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight font-sans">
            Meu Progresso de Estudos
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
            Acompanhe a sua evolução por disciplina e veja o quanto você já aprendeu.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto bg-surface-container-lowest px-4 py-3 rounded-2xl shadow-sm border border-outline-variant/30">
          <span
            className="material-symbols-outlined text-secondary-container text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant font-medium leading-none">
              Sequência ativa
            </span>
            <span className="text-base font-extrabold text-on-surface leading-tight">
              5 dias seguidos
            </span>
          </div>
        </div>
      </div>

      {/* Adaptive AI Recommendation Banner */}
      <section className="bg-gradient-to-r from-primary-fixed/30 via-surface-container-lowest to-tertiary-fixed/25 rounded-2xl p-6 border border-primary/25 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-container/10 px-2.5 py-0.5 rounded-full">
                Recomendação da IA em Tempo Real
              </span>
              <span className="text-xs text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                Foco no seu ritmo
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              Ortografia e Pontuação • Reforço Recomendado
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Você alcançou 60% neste módulo. Uma sessão rápida de 5 minutos com exemplos acolhedores e contextualizados pelo Tutor IA garantirá domínio antes dos próximos passos.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={() => onStartTopic ? onStartTopic('Ortografia e Pontuação', 'portugues') : onNavigate('subject-portuguese')}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Estudar Aula com IA</span>
          </button>
          <button
            onClick={() => onStartExercises ? onStartExercises('Ortografia e Pontuação', 'médio', 'reforço') : onNavigate('subject-portuguese')}
            className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-all flex items-center justify-center gap-2 border border-outline-variant/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Exercícios Adaptados</span>
          </button>
        </div>
      </section>

      {/* Resumo por disciplina (Todas as 4 matérias) */}
      <section aria-label="Resumo por disciplina" className="space-y-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Desempenho por Matéria</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Acompanhe o ritmo de absorção e exercícios concluídos em cada disciplina.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Língua Portuguesa Card */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <span className="text-2xl font-extrabold text-tertiary">65%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Linguagens</span>
              <h3 className="text-base font-bold text-on-surface mb-2">Português</h3>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-2">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">85% precisão • 28 exercícios</p>
            </div>
          </div>

          {/* Matemática Card */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">calculate</span>
              </div>
              <span className="text-2xl font-extrabold text-primary">75%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Exatas</span>
              <h3 className="text-base font-bold text-on-surface mb-2">Matemática</h3>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">88% precisão • 25 exercícios</p>
            </div>
          </div>

          {/* Ciências Card */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">science</span>
              </div>
              <span className="text-2xl font-extrabold text-secondary">40%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Biológicas</span>
              <h3 className="text-base font-bold text-on-surface mb-2">Ciências Naturais</h3>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-2">
                <div className="h-full bg-secondary rounded-full" style={{ width: '40%' }} />
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">80% precisão • 8 exercícios</p>
            </div>
          </div>

          {/* História Card */}
          <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">history_edu</span>
              </div>
              <span className="text-2xl font-extrabold text-tertiary">55%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">Humanas</span>
              <h3 className="text-base font-bold text-on-surface mb-2">História do Brasil</h3>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-2">
                <div className="h-full bg-tertiary-container rounded-full" style={{ width: '55%' }} />
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">82% precisão • 11 exercícios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalhes dos Conteúdos */}
      <section aria-label="Módulos e tópicos de estudo" className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">Detalhes dos Conteúdos</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Veja a precisão das suas respostas e revise quando quiser.
            </p>
          </div>

          {/* Filter Tabs para todas as 4 matérias */}
          <div className="inline-flex p-1 bg-surface-container rounded-xl border border-outline-variant/30 flex-wrap gap-1 self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('matematica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'matematica'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Matemática
            </button>
            <button
              onClick={() => setFilter('portugues')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'portugues'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Português
            </button>
            <button
              onClick={() => setFilter('ciencias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'ciencias'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Ciências
            </button>
            <button
              onClick={() => setFilter('historia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === 'historia'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              História
            </button>
          </div>
        </div>

        {/* Topics List */}
        <div className="flex flex-col gap-3">
          {filteredTopics.map((topic) => (
            <article
              key={topic.id}
              className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/30 transition-all"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    topic.subject === 'matematica'
                      ? 'bg-surface-container-high text-primary'
                      : 'bg-tertiary-fixed/40 text-tertiary'
                  }`}
                >
                  <span className="material-symbols-outlined">{topic.icon}</span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-on-surface truncate">
                      {topic.title}
                    </h3>
                    {topic.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-[#166534] text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Concluído
                      </span>
                    )}
                    {topic.status === 'in_progress' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-[#854D0E] text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                        Em andamento
                      </span>
                    )}
                    {topic.status === 'not_started' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold">
                        Não iniciado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-on-surface-variant">{topic.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                <div className="w-full sm:w-48 flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">{topic.scoreText}</span>
                    <span className="text-on-surface font-bold">{topic.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        topic.percentage === 100
                          ? 'bg-[#16A34A]'
                          : topic.percentage >= 80
                          ? 'bg-primary-container'
                          : topic.percentage > 0
                          ? 'bg-secondary-container'
                          : 'bg-outline-variant/40'
                      }`}
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onStartTopic) {
                      onStartTopic(topic.title, topic.subject);
                    } else if (topic.id === 'fracoes-equivalencia') {
                      onNavigate('quiz-fractions');
                    } else if (topic.subject === 'matematica') {
                      onNavigate('subject-math');
                    } else if (topic.subject === 'portugues') {
                      onNavigate('subject-portuguese');
                    } else if (topic.subject === 'ciencias') {
                      onNavigate('subject-ciencias');
                    } else {
                      onNavigate('subject-historia');
                    }
                  }}
                  className={`inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    topic.actionText === 'Continuar'
                      ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                      : topic.actionText === 'Começar'
                      ? 'bg-secondary-container text-on-surface hover:bg-secondary-fixed shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {topic.actionText === 'Revisar'
                      ? 'history'
                      : topic.actionText === 'Praticar novamente'
                      ? 'replay'
                      : topic.actionText === 'Continuar'
                      ? 'play_arrow'
                      : 'play_circle'}
                  </span>
                  <span>{topic.actionText}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Dica do Orientador Estudaí Banner */}
      <div className="relative overflow-hidden bg-surface-container-low rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5 border border-outline-variant/30">
        <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-[36px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sentiment_very_satisfied
          </span>
        </div>
        <div className="flex flex-col text-center sm:text-left gap-1">
          <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
            Dica do Orientador Estudaí
          </span>
          <p className="text-base font-bold text-on-surface">
            Lembre-se: errar faz parte de aprender. O importante é a constância!
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Cada tentativa ajuda o cérebro a fixar os padrões. Revise seus pontos com calma quando sentir necessidade.
          </p>
        </div>
      </div>
    </div>
  );
};
