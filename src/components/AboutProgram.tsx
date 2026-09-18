import React from 'react';
import { CalendarHeart, Handshake, LineChart, CheckCircle2 } from 'lucide-react';

export const AboutProgram: React.FC = () => {
  const corePillars = [
    {
      title: 'Apoyo constante',
      tagline: 'Sostenibilidad para la causa',
      description:
        'Tu aportación mensual recurrente brinda la certeza financiera indispensable para sostener tratamientos y programas continuos sin interrupciones.',
      icon: CalendarHeart,
      color: 'from-sky-500 to-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
    {
      title: 'Vinculación con FYEPUM',
      tagline: 'Una alianza humana y cercana',
      description:
        'Construye un vínculo directo con la organización a través de canales institucionales, actividades conjuntas y espacios de voluntariado con sentido.',
      icon: Handshake,
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Conocimiento del impacto',
      tagline: 'Transparencia de principio a fin',
      description:
        'Acceso a reportes de avance e información clara sobre cómo cada peso aportado se traduce en beneficios directos para pacientes pediátricos y familias.',
      icon: LineChart,
      color: 'from-teal-600 to-emerald-700',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
  ];

  return (
    <section id="que-es" className="py-20 lg:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-sky-700 uppercase bg-sky-50 border border-sky-200/70 px-3.5 py-1 rounded-full">
            El Corazón del Programa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Qué es una Empresa Padrino?
          </h2>
          <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
          <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed pt-2">
            “Una Empresa Padrino es una empresa que decide apoyar de manera mensual a FYEPUM para contribuir a la continuidad de sus programas y servicios.”
          </p>
        </div>

        {/* 3 Core Benefits Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {corePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl ${pillar.bgColor} border ${pillar.borderColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-7 h-7 text-sky-800" />
                  </div>
                  <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">
                    {pillar.tagline}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>Beneficio esencial del programa</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
