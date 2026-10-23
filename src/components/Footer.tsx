import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-sm text-on-surface-variant">
          Estudaí • Reforço escolar focado, acolhedor e no seu ritmo.
        </p>
        <p className="text-xs text-outline font-medium">
          Feito para aprender com tranquilidade
        </p>
      </div>
    </footer>
  );
};
