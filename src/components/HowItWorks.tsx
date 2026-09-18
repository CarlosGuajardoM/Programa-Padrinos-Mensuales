import React from 'react';
import { PROGRAM_STEPS } from '../data/programData';
import { BookOpen, Sliders, ClipboardCheck, Award } from 'lucide-react';

interface HowItWorksProps {
  onOpenRegister: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenRegister }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return BookOpen;
      case 1:
        return Sliders;
      case 2:
        return ClipboardCheck;
      case 3:
      default:
        return Award;
    }
  };

  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-100/70 border border-sky-200 px-3.5 py-1 rounded-full">
            Paso a Paso
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Un proceso ágil, transparente y con acompañamiento personalizado para sumar a tu empresa a nuestra causa.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROGRAM_STEPS.map((step, idx) => {
            const Icon = getStepIcon(idx);
            return (
              <div
                key={step.stepNumber}
                className="relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-sky-200/90 tracking-tighter">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    Etapa {idx + 1} de 4
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button inside steps section */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenRegister}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-sky-800 bg-sky-100/90 hover:bg-sky-200 border border-sky-300 transition-colors"
          >
            <span>Inicia con el paso 03: Registra tu empresa</span>
          </button>
        </div>
      </div>
    </section>
  );
};
