import React from 'react';
import { SAMPLE_IMPACT_METRICS } from '../data/programData';
import { Users, PackageCheck, CalendarHeart, FileSpreadsheet, Eye, Heart } from 'lucide-react';

export const ImpactReportPreview: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'PackageCheck':
        return PackageCheck;
      case 'CalendarHeart':
      default:
        return CalendarHeart;
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-100/70 border border-sky-200 px-3.5 py-1 rounded-full">
            Rendición de Cuentas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tu apoyo genera impacto
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-slate-600">
            Cada Empresa Padrino recibe periódicamente información clara y cercana sobre los resultados y testimonios impulsados por su aportación mensual.
          </p>
        </div>

        {/* Visual Mockup of Impact Report Document / Dashboard Card */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-900/5 overflow-hidden">
          {/* Mock Document Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Documento Simulado de Rendición de Cuentas
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-white">
                Reporte de impacto
              </h3>
              <p className="text-sm text-sky-200 font-medium">
                “Gracias por formar parte de FYEPUM.”
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs font-medium text-slate-300">
              <FileSpreadsheet className="w-4 h-4 text-sky-400" />
              <span>Ciclo Semestral Simulado</span>
            </div>
          </div>

          {/* Report Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Visual Disclaimer Pill */}
            <div className="bg-sky-50 border border-sky-200/80 rounded-xl p-3.5 flex items-center justify-center gap-2 text-center">
              <Eye className="w-4 h-4 text-sky-700 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-sky-900">
                Ejemplo de visualización para el prototipo académico. Los datos son ilustrativos y no corresponden a métricas oficiales históricas de FYEPUM.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SAMPLE_IMPACT_METRICS.map((metric) => {
                const Icon = getIcon(metric.iconName);
                return (
                  <div
                    key={metric.id}
                    className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 text-center flex flex-col items-center justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/70 text-sky-700 flex items-center justify-center shadow-2xs mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-sm font-bold text-slate-700 mt-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {metric.description}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 w-full text-[11px] font-semibold text-slate-400 uppercase">
                      Dato ilustrativo
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Testimonial / Story Box */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-800 shrink-0">
                <Heart className="w-5 h-5 fill-sky-600/20" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">
                  Nota humana del informe periódico (Ejemplo de formato)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  “Las Empresas Padrino reciben testimonios anónimos y cartas de agradecimiento de los familiares, permitiendo a sus equipos comprender el valor vital que tiene cada despensa y cada momento de contención.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
