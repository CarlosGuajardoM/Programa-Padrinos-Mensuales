import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Users,
  PackageCheck,
  CalendarHeart,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Eye,
  Printer,
  X,
  Building2,
  Send,
  Download,
  Share2
} from 'lucide-react';
import { DEMO_IMPACT_REPORT_TEMPLATE } from '../../data/adminDemoData';
import { CompanyRecord } from '../../types';

interface AdminImpactoTabProps {
  companies: CompanyRecord[];
}

export const AdminImpactoTab: React.FC<AdminImpactoTabProps> = ({ companies }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Agosto 2026');
  const [selectedCompanyId, setSelectedCompanyId] = useState('all');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [simulatedSentSuccess, setSimulatedSentSuccess] = useState(false);

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const handleGenerateReport = () => {
    setIsPreviewOpen(true);
    setSimulatedSentSuccess(false);
  };

  const handleSimulateDispatch = () => {
    setSimulatedSentSuccess(true);
    setTimeout(() => {
      setSimulatedSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Block */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-700" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Comunicación de Impacto
              </h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Rendición de cuentas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Visualiza y genera los reportes de impacto que se comparten periódicamente con las Empresas Padrino para demostrar la transparencia y el destino de su apoyo.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateReport}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-sky-700 hover:bg-sky-800 shadow-md shadow-sky-800/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generar reporte</span>
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Periodo del reporte
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="Agosto 2026">Agosto 2026 (Mes corriente)</option>
              <option value="Julio 2026">Julio 2026</option>
              <option value="Bimestre Junio - Julio 2026">Bimestre Junio - Julio 2026</option>
              <option value="Primer Semestre 2026">Primer Semestre 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Destinatario
            </label>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todas las Empresas Padrino (Plantilla general)</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tier})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Report Card Preview (Exactly as requested) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Report Heading */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2 border border-sky-200">
              <HeartHandshake className="w-3.5 h-3.5 text-sky-600" />
              <span>FYEPUM • Programa de Empresas Padrino</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              REPORTE DE IMPACTO
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Periodo: <span className="text-sky-800 font-bold">{selectedPeriod}</span>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Fecha de emisión:</span>
            <span className="text-xs font-bold text-slate-700">
              {DEMO_IMPACT_REPORT_TEMPLATE.publishedDate}
            </span>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
              DATOS DEMO
            </span>
          </div>
        </div>

        {/* The 3 Core Metric Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Metric 1: Familias apoyadas */}
          <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
              Familias apoyadas
            </span>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              DEMO
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-sky-100">
              {DEMO_IMPACT_REPORT_TEMPLATE.familiesSupportedDetail}
            </p>
          </div>

          {/* Metric 2: Apoyos entregados */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
              Apoyos entregados
            </span>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              DEMO
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-emerald-100">
              {DEMO_IMPACT_REPORT_TEMPLATE.supportsDeliveredDetail}
            </p>
          </div>

          {/* Metric 3: Actividades realizadas */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <CalendarHeart className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Actividades realizadas
            </span>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              DEMO
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-amber-100">
              {DEMO_IMPACT_REPORT_TEMPLATE.activitiesCompletedDetail}
            </p>
          </div>
        </div>

        {/* Highlight Message (As requested: "Gracias por formar parte de FYEPUM.") */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/90 text-center space-y-3 max-w-2xl mx-auto">
          <HeartHandshake className="w-8 h-8 text-sky-700 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            “Gracias por formar parte de FYEPUM.”
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tu respaldo solidario recurrente hace posible que las familias en tratamiento pediátrico no se sientan solas en el camino hacia la salud.
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <strong>Prototipo:</strong> Haz clic en “Generar reporte” para abrir la vista previa institucional.
          </div>

          <button
            type="button"
            onClick={handleGenerateReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-sm text-white bg-sky-700 hover:bg-sky-800 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Generar reporte</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: VISTA PREVIA DEL REPORTE */}
      {/* ========================================== */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full my-8 max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-700" />
                <span className="font-bold text-slate-900 text-sm">
                  Vista Previa de Reporte de Impacto (Prototipo)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Document Preview */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800">
              {/* Document Header */}
              <div className="text-center pb-5 border-b border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-widest block">
                  FUERZA Y ESPERANZA POR UNO MÁS, A.C.
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  REPORTE DE IMPACTO — EMPRESAS PADRINO
                </h2>
                <p className="text-xs text-slate-500">
                  Periodo informado: <strong>{selectedPeriod}</strong>
                </p>
                {selectedCompany && (
                  <div className="mt-2 inline-block px-3 py-1 bg-sky-50 border border-sky-200 rounded-lg text-xs font-bold text-sky-900">
                    Personalizado para: {selectedCompany.name} ({selectedCompany.tier})
                  </div>
                )}
              </div>

              {/* Document Body */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <p className="text-slate-700">
                  Estimados aliados:
                </p>
                <p className="text-slate-600">
                  A través de este informe compartimos los resultados generales del acompañamiento integral brindado a pacientes pediátricos y sus familias gracias al respaldo constante de las Empresas Padrino durante el periodo de <strong>{selectedPeriod}</strong>.
                </p>

                {/* Metrics Table inside Document */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200 font-bold text-slate-800">
                    <span>Familias apoyadas</span>
                    <span className="text-sky-800">DEMO</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 font-bold text-slate-800">
                    <span>Apoyos entregados (medicamentos, despensas)</span>
                    <span className="text-emerald-800">DEMO</span>
                  </div>
                  <div className="flex justify-between py-1 font-bold text-slate-800">
                    <span>Actividades y traslados realizados</span>
                    <span className="text-amber-800">DEMO</span>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 text-center space-y-1">
                  <p className="font-bold text-slate-900 text-base">
                    “Gracias por formar parte de FYEPUM.”
                  </p>
                  <p className="text-xs text-sky-900">
                    Juntos hacemos posible una atención más humana, cercana y oportuna para cada niña y niño.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Coordinación de Alianzas e Innovación Social</span>
                  <span>Prototipo Académico FYEPUM</span>
                </div>
              </div>

              {simulatedSentSuccess && (
                <div className="p-3.5 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-950 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Simulación completada: Reporte preparado para distribución a las empresas aliadas.
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cerrar vista previa
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateDispatch}
                  className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simular envío a empresas</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
