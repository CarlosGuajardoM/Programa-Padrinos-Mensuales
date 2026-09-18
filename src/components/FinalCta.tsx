import React from 'react';
import { Building2, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenRegister: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white">
      {/* Decorative ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/60 border border-sky-700/60 text-sky-200 text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Alianza de Responsabilidad Social</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          ¿Quieres formar parte?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Conoce cómo tu empresa puede convertirse en Empresa Padrino FYEPUM.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenRegister}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-slate-900 bg-white hover:bg-sky-50 active:bg-sky-100 shadow-xl shadow-black/20 hover:scale-[1.02] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Building2 className="w-5 h-5 text-sky-700" />
            <span>Quiero ser Empresa Padrino</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 pt-3">
          Registro demostrativo para el prototipo académico. Sin cobros ni compromisos financieros reales.
        </p>
      </div>
    </section>
  );
};
