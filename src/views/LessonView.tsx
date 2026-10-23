import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface LessonViewProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ onNavigate }) => {
  const [selectedFractionDemo, setSelectedFractionDemo] = useState<'1/2' | '2/4' | '3/6' | '4/8'>('2/4');

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
        <button
          onClick={() => onNavigate('subject-math')}
          className="hover:text-primary transition-colors font-medium cursor-pointer"
        >
          Matemática
        </button>
        <span className="text-outline-variant font-normal">/</span>
        <span aria-current="page" className="text-on-surface font-bold">
          Frações e Equivalência
        </span>
      </nav>

      {/* Header Section with Metadata */}
      <header className="relative bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/30 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">calculate</span>
            <span>Aritmética Básica</span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-tertiary">timer</span>
            <span>Leitura de 4 minutos</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight font-sans">
            Frações e Equivalência
          </h1>
          <span className="text-xs font-bold text-on-surface-variant">
            Unidade 2 • Módulo 1
          </span>
        </div>

        <p className="text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
          Descubra como dividir o todo em pedaços justos e reconheça quando números distintos representam exatamente a mesma quantidade.
        </p>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Content Stream (8 cols desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Bloco 1: O que é uma fração? */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-7 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-sm">
                1
              </div>
              <h2 className="text-xl font-bold text-on-surface">O que é uma fração?</h2>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Uma fração representa uma parte de um todo que foi dividido em{' '}
              <strong className="text-on-surface font-semibold">partes iguais</strong>. O número de cima é o{' '}
              <span className="text-primary font-bold">numerador</span> (quantas partes temos) e o de baixo é o{' '}
              <span className="text-tertiary font-bold">denominador</span> (em quantas partes o todo foi dividido).
            </p>

            {/* Visual Anatomy Box */}
            <div className="bg-surface-container-low rounded-xl p-5 flex flex-col sm:flex-row items-center justify-around gap-6 border border-outline-variant/30">
              {/* Fraction Schema */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-primary">1</span>
                  <div className="w-10 h-1 bg-on-surface rounded-full my-1" />
                  <span className="text-3xl font-extrabold text-tertiary">4</span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-primary font-bold">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Numerador</span>{' '}
                    <span className="font-normal text-on-surface-variant">(partes que você pegou)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-tertiary font-bold">
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Denominador</span>{' '}
                    <span className="font-normal text-on-surface-variant">(total de partes iguais)</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-24 bg-surface-container-high" />

              {/* Visual Breakdown: Pie chart & Bar */}
              <div className="flex items-center gap-4">
                {/* Pizza diagram 1/4 vs 3/4 */}
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle (3/4 = 75%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#dce9ff"
                      strokeDasharray="75, 100"
                      strokeWidth="12"
                    />
                    {/* Highlighted slice (1/4 = 25%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563eb"
                      strokeDasharray="25, 100"
                      strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                    1/4
                  </div>
                </div>

                {/* Bar representation */}
                <div className="flex flex-col gap-1 w-28 text-left">
                  <span className="text-[11px] text-on-surface-variant font-semibold">
                    Barra dividida
                  </span>
                  <div className="grid grid-cols-4 h-6 w-full rounded-md overflow-hidden bg-surface-container-high gap-0.5 p-0.5">
                    <div className="bg-primary rounded-sm" title="1 parte considerada" />
                    <div className="bg-surface-container-lowest rounded-sm" />
                    <div className="bg-surface-container-lowest rounded-sm" />
                    <div className="bg-surface-container-lowest rounded-sm" />
                  </div>
                  <div className="flex justify-between text-[10px] text-outline font-medium">
                    <span>1 parte</span>
                    <span>3 restantes</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 2: O que são frações equivalentes? */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-7 shadow-sm border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-sm">
                2
              </div>
              <h2 className="text-xl font-bold text-on-surface">O que são frações equivalentes?</h2>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              São frações que representam a{' '}
              <strong className="text-on-surface font-semibold">mesma quantidade</strong>, mesmo que usem números diferentes. Por exemplo,{' '}
              <span className="font-bold text-primary">1/2</span> e{' '}
              <span className="font-bold text-primary">2/4</span> representam exatamente a metade de um elemento.
            </p>

            {/* Comparative visual stripes */}
            <div className="bg-surface-container-low rounded-xl p-5 flex flex-col gap-4 border border-outline-variant/30">
              <div className="text-center text-xs font-semibold text-on-surface-variant">
                Observe como a área preenchida é exatamente idêntica (50% do todo):
              </div>

              {/* Strip 1: 1/2 */}
              <div className="flex items-center gap-3">
                <span className="w-12 text-lg font-bold text-primary text-center">1/2</span>
                <div className="flex-1 grid grid-cols-2 h-9 rounded-lg overflow-hidden bg-surface-container-high gap-1 p-1">
                  <div className="bg-primary rounded flex items-center justify-center text-on-primary text-xs font-bold">
                    50%
                  </div>
                  <div className="bg-surface-container-lowest rounded" />
                </div>
              </div>

              {/* Strip 2: 2/4 */}
              <div className="flex items-center gap-3">
                <span className="w-12 text-lg font-bold text-primary text-center">2/4</span>
                <div className="flex-1 grid grid-cols-4 h-9 rounded-lg overflow-hidden bg-surface-container-high gap-1 p-1">
                  <div className="bg-primary rounded flex items-center justify-center text-on-primary text-xs font-bold">
                    25%
                  </div>
                  <div className="bg-primary rounded flex items-center justify-center text-on-primary text-xs font-bold">
                    25%
                  </div>
                  <div className="bg-surface-container-lowest rounded" />
                  <div className="bg-surface-container-lowest rounded" />
                </div>
              </div>

              {/* Strip 3: 4/8 */}
              <div className="flex items-center gap-3">
                <span className="w-12 text-lg font-bold text-primary text-center">4/8</span>
                <div className="flex-1 grid grid-cols-8 h-9 rounded-lg overflow-hidden bg-surface-container-high gap-0.5 p-1">
                  <div className="bg-primary rounded" />
                  <div className="bg-primary rounded" />
                  <div className="bg-primary rounded" />
                  <div className="bg-primary rounded" />
                  <div className="bg-surface-container-lowest rounded" />
                  <div className="bg-surface-container-lowest rounded" />
                  <div className="bg-surface-container-lowest rounded" />
                  <div className="bg-surface-container-lowest rounded" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-tertiary bg-surface-container-lowest py-2.5 px-3 rounded-lg text-center text-xs font-bold border border-tertiary/20">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Regra de ouro: Multiplique ou divida numerador e denominador pelo mesmo valor!</span>
              </div>
            </div>
          </section>

          {/* Bloco 3: Exemplo Resolvido 1 */}
          <section className="bg-surface-container-low rounded-2xl p-6 md:p-7 shadow-sm border-l-4 border-l-primary flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-surface-container px-2.5 py-0.5 rounded-full">
                Exemplo Prático 1
              </span>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">
                local_pizza
              </span>
            </div>

            <h3 className="text-lg font-bold text-on-surface">
              Se você comer 2 pedaços de uma pizza cortada em 8 fatias, que fração você comeu?
            </h3>

            <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-2 shadow-sm border border-outline-variant/20">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                  check_circle
                </span>
                <div className="text-xs sm:text-sm text-on-surface-variant flex flex-col gap-2 leading-relaxed">
                  <p>
                    Você comeu <strong className="text-on-surface">2 de 8</strong> fatias, ou seja, a fração inicial é{' '}
                    <strong className="text-primary font-bold">2/8</strong>.
                  </p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold">
                    <span>Simplificação:</span>
                    <span className="font-bold text-primary">(2 ÷ 2)</span>
                    <span>/</span>
                    <span className="font-bold text-primary">(8 ÷ 2)</span>
                    <span>=</span>
                    <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold">
                      1/4
                    </span>
                  </div>
                  <p className="text-on-surface font-medium">
                    Portanto, simplificando, você consumiu <strong className="text-primary">1/4</strong> de toda a pizza!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 4: Exemplo Resolvido 2 */}
          <section className="bg-surface-container-low rounded-2xl p-6 md:p-7 shadow-sm border-l-4 border-l-tertiary flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider bg-surface-container px-2.5 py-0.5 rounded-full">
                Exemplo Prático 2
              </span>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">
                help_center
              </span>
            </div>

            <h3 className="text-lg font-bold text-on-surface">
              Como saber se 3/6 é equivalente a 1/2?
            </h3>

            <div className="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-2 shadow-sm border border-outline-variant/20">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">
                  check_circle
                </span>
                <div className="text-xs sm:text-sm text-on-surface-variant flex flex-col gap-2 leading-relaxed">
                  <p>
                    Basta simplificar a fração dividindo ambos os termos pelo maior divisor comum (<strong className="text-on-surface">3</strong>):
                  </p>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low text-on-surface text-xs font-semibold">
                    <span>Dividindo 3 por 3 temos <strong className="text-tertiary">1</strong>; dividindo 6 por 3 temos <strong className="text-tertiary">2</strong>.</span>
                  </div>
                  <p className="text-on-surface font-bold text-tertiary">
                    Logo, 3/6 = 1/2. As duas frações são de fato equivalentes!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Supplementary Side Panel (4 cols desktop) */}
        <aside className="lg:col-span-4 flex flex-col gap-5 w-full">
          {/* Quick Concept Recap Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <h4 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container">lightbulb</span>
              Lembrete rápido
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                  arrow_right
                </span>
                <span>
                  <strong>Fração própria:</strong> Numerador menor que o denominador (ex: 2/5).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                  arrow_right
                </span>
                <span>
                  <strong>Fração imprópria:</strong> Numerador maior que o denominador (ex: 7/4).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                  arrow_right
                </span>
                <span>
                  <strong>Simplificar:</strong> Tornar os números menores mantendo o mesmo valor.
                </span>
              </li>
            </ul>
          </div>

          {/* Student Focus / Motivation Card */}
          <div className="bg-gradient-to-br from-surface-container-low to-surface-container-high rounded-2xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface block">Sem pressa</span>
                <span className="text-[11px] text-on-surface-variant">Concentre-se em um passo por vez</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Estudar frações com calma ajuda a dominar porcentagem e proporções com facilidade nas próximas etapas.
            </p>
          </div>

          {/* Module Index Mini-tracker */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col gap-2">
            <span className="text-[11px] text-outline font-bold uppercase tracking-wider">
              Trilha de Matemática
            </span>
            <div className="flex flex-col gap-2 mt-1 text-xs">
              <div className="flex items-center justify-between text-on-surface-variant opacity-60">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Introdução aos Números</span>
                </span>
                <span className="font-semibold">100%</span>
              </div>
              <div className="flex items-center justify-between text-primary font-bold bg-surface-container-low px-2.5 py-2 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">play_circle</span>
                  <span>Frações e Equivalência</span>
                </span>
                <span>Agora</span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant opacity-60">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Soma e Subtração de Frações</span>
                </span>
                <span>Próximo</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Action Footer */}
      <footer className="mt-10 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Secondary Back Link */}
        <button
          onClick={() => onNavigate('subject-math')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Voltar aos assuntos</span>
        </button>

        {/* Primary Exercise Launcher */}
        <button
          onClick={() => onNavigate('quiz-fractions')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-bold shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>Praticar exercícios (5 questões)</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};
