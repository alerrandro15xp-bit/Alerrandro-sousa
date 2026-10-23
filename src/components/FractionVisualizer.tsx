import React, { useState } from 'react';

interface FractionVisualizerProps {
  numeratorA?: number;
  denominatorA?: number;
  numeratorB?: number;
  denominatorB?: number;
  interactive?: boolean;
}

export const FractionVisualizer: React.FC<FractionVisualizerProps> = ({
  numeratorA = 2,
  denominatorA = 3,
  numeratorB = 4,
  denominatorB = 6,
  interactive = false,
}) => {
  const [activeNum, setActiveNum] = useState<number>(numeratorA);
  const [activeDen, setActiveDen] = useState<number>(denominatorA);

  const percentA = Math.round((activeNum / activeDen) * 100);
  const percentB = Math.round((numeratorB / denominatorB) * 100);

  return (
    <div className="w-full bg-surface-container-low p-4 rounded-xl flex flex-col gap-4">
      {/* Visual comparison bar 1 */}
      <div>
        <div className="flex justify-between text-xs font-semibold mb-1 text-on-surface">
          <span>{activeNum} de {activeDen} partes ({activeNum}/{activeDen})</span>
          <span className="text-primary font-bold">{percentA}%</span>
        </div>
        <div
          className="grid gap-1 h-7 rounded-lg overflow-hidden bg-surface-container-highest p-0.5 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${activeDen}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: activeDen }).map((_, index) => (
            <div
              key={index}
              className={`rounded-md h-full transition-all duration-300 ${
                index < activeNum ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Visual comparison bar 2 */}
      <div>
        <div className="flex justify-between text-xs font-semibold mb-1 text-on-surface">
          <span className="text-tertiary font-bold">{numeratorB} de {denominatorB} partes ({numeratorB}/{denominatorB})</span>
          <span className="text-tertiary font-bold">{percentB}%</span>
        </div>
        <div
          className="grid gap-1 h-7 rounded-lg overflow-hidden bg-surface-container-highest p-0.5 shadow-inner"
          style={{ gridTemplateColumns: `repeat(${denominatorB}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: denominatorB }).map((_, index) => (
            <div
              key={index}
              className={`rounded-sm h-full transition-all duration-300 ${
                index < numeratorB ? 'bg-tertiary' : 'bg-surface-container-highest'
              }`}
            />
          ))}
        </div>
      </div>

      {interactive && (
        <div className="pt-2 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-on-surface-variant font-medium">Ajuste as fatias:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveNum((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container font-bold"
              title="Diminuir numerador"
            >
              -
            </button>
            <span className="font-bold text-primary">{activeNum}/{activeDen}</span>
            <button
              onClick={() => setActiveNum((prev) => Math.min(activeDen, prev + 1))}
              className="px-2 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container font-bold"
              title="Aumentar numerador"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
