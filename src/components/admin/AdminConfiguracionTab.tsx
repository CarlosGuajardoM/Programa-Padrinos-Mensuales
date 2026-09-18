import React, { useState } from 'react';
import {
  Settings,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { SUPPORT_TIERS } from '../../data/programData';

interface AdminConfiguracionTabProps {
  onResetDemoData: () => void;
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
}

export const AdminConfiguracionTab: React.FC<AdminConfiguracionTabProps> = ({
  onResetDemoData,
  onNavigateHome,
  onNavigateRegister,
}) => {
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer los datos del prototipo a su estado inicial de demostración?')) {
      onResetDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Settings className="w-5 h-5 text-sky-700" />
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Configuración del Prototipo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Parámetros de demostración, directrices académicas y control de datos simulados.
            </p>
          </div>
        </div>

        {/* Academic Context Box */}
        <div className="mt-5 p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-sky-900 font-bold">
            <GraduationCap className="w-5 h-5 text-sky-700" />
            <span>Contexto de la Propuesta de Innovación Social</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Este panel administrativo y la plataforma web fueron diseñados como un <strong>prototipo académico funcional</strong> para la organización <strong>Fuerza y Esperanza por Uno Más (FYEPUM)</strong>, con el objetivo de demostrar el modelo de captación de fondos sostenibles a través del <strong>Programa de Empresas Padrino</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">
                Seguridad & Datos Ficticios
              </span>
              <p className="text-slate-600">
                No se solicitan tarjetas ni cuentas bancarias. Las empresas listadas son enteramente ficticias.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">
                Flujo Demostrativo
              </span>
              <p className="text-slate-600">
                Los formularios registran información en el navegador para permitir pruebas en vivo durante presentaciones universitarias.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiers Reference in Admin */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Niveles de Apoyo Parametrizados (MXN / mes)
        </h3>
        <p className="text-xs text-slate-500">
          Escalas de aportación recurrente configuradas para el programa:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPPORT_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900">{tier.name}</span>
                <span className="text-[10px] font-bold uppercase bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
                  {tier.popular ? 'Recomendado' : 'Aportación'}
                </span>
              </div>
              <div className="text-lg font-black text-sky-800">
                ${tier.monthlyAmount.toLocaleString('es-MX')} MXN
              </div>
              <div className="text-xs text-slate-500 font-medium line-clamp-2">
                {tier.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Reset Actions */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Restablecer Datos de Demostración
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
          Si realizaste pruebas de registro, aprobaciones o agregaste notas internas y deseas reiniciar el panel con las 7 empresas ficticias y 6 solicitudes predeterminadas para una nueva presentación, presiona el siguiente botón:
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Restablecer estado inicial demo</span>
          </button>

          {resetSuccess && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Datos demo restablecidos con éxito</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation Shortcuts */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Accesos Rápidos para la Presentación
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Alterna entre la experiencia pública de la landing y el panel de administración.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onNavigateRegister}
            className="px-4 py-2 rounded-xl text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors inline-flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Formulario público de registro</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ver Landing Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
