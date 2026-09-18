import React from 'react';
import { Utensils, Package, Users, HeartHandshake, Info } from 'lucide-react';
import { WHERE_FUNDS_GO } from '../data/programData';

export const WhereFundsGo: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return Utensils;
      case 'Package':
        return Package;
      case 'Users':
        return Users;
      case 'HeartHandshake':
      default:
        return HeartHandshake;
    }
  };

  return (
    <section id="destino-apoyo" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-100/70 border border-sky-200 px-3.5 py-1 rounded-full">
            Destino del Apoyo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿A dónde va tu apoyo?
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Cada aportación mensual se canaliza hacia áreas prioritarias que inciden directamente en la calidad de vida de los pacientes pediátricos y sus familias.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHERE_FUNDS_GO.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100/80 text-sky-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">
                    Atención prioritaria
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit required note */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex items-start gap-3.5 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs">
            <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong className="font-semibold text-slate-900">Nota de transparencia:</strong> Los recursos se destinan de acuerdo con las necesidades y prioridades de la organización.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
