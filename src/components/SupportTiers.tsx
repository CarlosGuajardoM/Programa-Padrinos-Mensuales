import React from 'react';
import { Check, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { SUPPORT_TIERS, PROGRAM_CONFIG } from '../data/programData';
import { SupportTier } from '../types';

interface SupportTiersProps {
  onSelectTier: (tierId: string) => void;
}

export const SupportTiers: React.FC<SupportTiersProps> = ({ onSelectTier }) => {
  return (
    <section id="niveles" className="py-20 lg:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Niveles de Alianza
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Elige tu nivel de apoyo
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Diferentes modalidades de aportación mensual para que cada empresa participe según su capacidad y visión social.
          </p>
        </div>

        {/* Prototype Warning Banner */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 sm:p-4 flex items-center justify-center gap-2.5 text-center shadow-2xs">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-amber-900">
              {PROGRAM_CONFIG.prototypeNotice}
            </span>
          </div>
        </div>

        {/* Cards Grid: 4 Tiers */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SUPPORT_TIERS.map((tier: SupportTier) => {
            const isPopular = tier.popular;
            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 border ${
                  isPopular
                    ? 'border-sky-500 shadow-lg shadow-sky-100 ring-1 ring-sky-500'
                    : 'border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Popular / Recommended Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-700 text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Más Elegido</span>
                  </div>
                )}

                <div>
                  {/* Tier Title & Description */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[34px] leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Monthly Contribution Amount */}
                  <div className="py-4 my-2 border-y border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                        ${tier.monthlyAmount.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase">
                        {tier.currency}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded mt-1.5 inline-block">
                      Aportación mensual
                    </span>
                  </div>

                  {/* Recognition & Benefits */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Beneficios incluidos:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-normal">
                          <Check className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tier Selection Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectTier(tier.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isPopular
                        ? 'bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-900 border border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    <span>Elegir este nivel</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Ejemplo de aportación mensual
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prototype Footer Disclaimer */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-xl mx-auto">
          <p>
            * Los montos presentados son hipotéticos para fines de demostración académica en aula universitaria. La formalización definitiva de aportaciones se define en conjunto con la mesa directiva de FYEPUM.
          </p>
        </div>
      </div>
    </section>
  );
};
