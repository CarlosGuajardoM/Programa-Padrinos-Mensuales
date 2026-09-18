import React from 'react';
import { Award, ShieldCheck, Sparkles, FileText, Handshake, ShieldAlert } from 'lucide-react';
import { COMPANY_BENEFITS } from '../data/programData';

export const CompanyBenefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return Award;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Sparkles':
        return Sparkles;
      case 'FileText':
        return FileText;
      case 'Handshake':
      default:
        return Handshake;
    }
  };

  return (
    <section id="beneficios" className="py-20 lg:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-50 border border-sky-200 px-3.5 py-1 rounded-full">
            Valor Compartido
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Beneficios para la Empresa
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Sumar a tu organización al programa fortalece la identidad social corporativa y la conexión genuina con la comunidad.
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_BENEFITS.map((benefit, idx) => {
            const Icon = getIcon(benefit.iconName);
            return (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-7 hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Ethical Clarification Card (Important mandate from prompt) */}
          <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-7 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-amber-950 mb-2 leading-snug">
                Compromiso ético y social
              </h3>
              <p className="text-sm text-amber-900/80 leading-relaxed">
                El Programa de Empresas Padrino es una alianza de impacto social sin fines de lucro. FYEPUM no garantiza publicidad masiva, ventas ni resultados comerciales a cambio de la aportación mensual.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-amber-200/60 text-xs font-semibold text-amber-900">
              Alianza solidaria con transparencia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
