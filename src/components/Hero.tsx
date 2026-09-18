import React from 'react';
import { Building2, ArrowRight, HeartHandshake, Shield, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
  onExploreProgram: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onExploreProgram }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-200/60"
    >
      {/* Subtle background decorative shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-900 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Programa de Empresas Padrino FYEPUM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Tu empresa también <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-sky-800 to-slate-900">
                puede sumar
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Conviértete en <strong className="text-slate-800 font-semibold">Empresa Padrino FYEPUM</strong> y
              contribuye mensualmente a que pacientes y familias continúen recibiendo apoyo.
            </p>

            {/* Value highlights pill tags */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 bg-white border border-slate-200/90 shadow-2xs px-3 py-1 rounded-lg">
                <HeartHandshake className="w-4 h-4 text-sky-600" />
                Acompañamiento pediátrico digno
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-slate-200/90 shadow-2xs px-3 py-1 rounded-lg">
                <Shield className="w-4 h-4 text-sky-600" />
                Transparencia y vinculación ética
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 shadow-md shadow-sky-800/15 hover:shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <Building2 className="w-5 h-5 text-sky-200" />
                <span>Quiero ser Empresa Padrino</span>
              </button>

              <button
                type="button"
                onClick={onExploreProgram}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 hover:border-slate-400 active:bg-slate-100 shadow-2xs transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <span>Conocer el programa</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-500 italic pt-1">
              * Prototipo universitario de innovación social para FYEPUM. No procesa pagos bancarios directos.
            </p>
          </div>

          {/* Visual Hero Image & Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sky-950/10 border border-slate-200/90 bg-white p-2 sm:p-3">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <img
                    src="/src/assets/images/alianza_social_1789704981647.jpg"
                    alt="Alianza entre empresas y la organización FYEPUM"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold text-sky-200 uppercase tracking-wider">
                      Fuerza y Esperanza por Uno Más
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white drop-shadow-xs">
                      Alianzas empresariales con propósito y esperanza
                    </p>
                  </div>
                </div>

                {/* Micro floating badge on bottom right */}
                <div className="mt-3 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Compromiso Solidario</div>
                      <div className="text-[11px] text-slate-500">Acompañamiento continuo a pacientes</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-800 bg-sky-100/80 px-2.5 py-1 rounded-md">
                    Alianza Mensual
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
