import React, { useState } from 'react';
import {
  Building2,
  Users2,
  Inbox,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { CompanyRecord, AdminSolicitudRecord } from '../../types';
import { MONTHLY_COMPANIES_GROWTH, ADMIN_STATS_DEMO } from '../../data/adminDemoData';

interface AdminResumenTabProps {
  companies: CompanyRecord[];
  solicitudes: AdminSolicitudRecord[];
  onNavigateTab: (tab: 'resumen' | 'empresas' | 'solicitudes' | 'impacto' | 'configuracion') => void;
  onSelectCompany: (company: CompanyRecord) => void;
}

export const AdminResumenTab: React.FC<AdminResumenTabProps> = ({
  companies,
  solicitudes,
  onNavigateTab,
  onSelectCompany,
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Computed demo stats based on state or defaults
  const totalRegisteredCount = ADMIN_STATS_DEMO.totalRegistered;
  const activeCompaniesCount = companies.filter((c) => c.status === 'Activa').length || ADMIN_STATS_DEMO.totalActive;
  const pendingSolicitudesCount = solicitudes.filter((s) => s.status === 'Pendiente').length || ADMIN_STATS_DEMO.totalPending;

  // Calculate estimated monthly income from active companies
  const calculatedMonthly = companies
    .filter((c) => c.status === 'Activa')
    .reduce((acc, c) => acc + c.monthlyAmount, 0);
  const displayMonthlyIncome = calculatedMonthly > 0 ? calculatedMonthly : ADMIN_STATS_DEMO.estimatedMonthlyIncome;

  const maxGrowthValue = Math.max(...MONTHLY_COMPANIES_GROWTH.map((m) => m.count));

  return (
    <div className="space-y-8">
      {/* Top Prototype Warning Banner */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full">
                MODO PROTOTIPO ACADÉMICO
              </span>
              <span className="text-xs text-amber-800 font-semibold">
                Datos demostrativos
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
              Todos los números, empresas y montos presentados en este panel son simulados para ilustrar el funcionamiento administrativo y <strong>no representan información contable, financiera ni alianzas oficiales reales de FYEPUM</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Empresas registradas */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Empresas registradas
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {totalRegisteredCount}
            </span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
              DEMO
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500"></span>
            <span>Histórico acumulado en el programa</span>
          </div>
        </div>

        {/* Card 2: Empresas activas */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Empresas activas
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              {activeCompaniesCount}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              DEMO
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Alianzas con aportación vigente</span>
          </div>
        </div>

        {/* Card 3: Solicitudes pendientes */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Solicitudes pendientes
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
              {pendingSolicitudesCount}
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              DEMO
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Por revisar por el equipo</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigateTab('solicitudes')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 underline"
            >
              Atender
            </button>
          </div>
        </div>

        {/* Card 4: Aportación mensual estimada */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Aportación mensual estimada
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ${displayMonthlyIncome.toLocaleString('es-MX')}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              MXN
            </span>
            <span className="ml-auto text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
              DEMO
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Compromiso solidario recurrente</span>
          </div>
        </div>
      </div>

      {/* Main Section: Chart + Program Lifecycle Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Simple Chart "Empresas Padrino por mes" */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Empresas Padrino por mes
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                  DEMO / PROTOTIPO
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Progresión del crecimiento de empresas que respaldan el programa durante 2026.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-600">
                Periodo: <strong className="text-slate-900 font-bold">Ene - Ago 2026</strong>
              </span>
            </div>
          </div>

          {/* SVG & Bar Chart Visualizer */}
          <div className="mt-6">
            <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
              {MONTHLY_COMPANIES_GROWTH.map((item, idx) => {
                const heightPercent = Math.round((item.count / (maxGrowthValue + 2)) * 100);
                const isHovered = hoveredBar === idx;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-10 z-20 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in">
                        {item.label}: {item.count} empresas (DEMO)
                      </div>
                    )}

                    {/* Value on top of bar */}
                    <span className="text-xs font-bold text-slate-600 mb-1.5 transition-colors group-hover:text-sky-800">
                      {item.count}
                    </span>

                    {/* Bar visual with gradient/color */}
                    <div className="w-full max-w-[48px] bg-slate-100 rounded-t-xl overflow-hidden flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          idx === MONTHLY_COMPANIES_GROWTH.length - 1
                            ? 'bg-gradient-to-t from-sky-700 to-sky-500 shadow-sm'
                            : 'bg-gradient-to-t from-sky-800/80 to-sky-600/70 group-hover:from-sky-700 group-hover:to-sky-500'
                        }`}
                      />
                    </div>

                    {/* Month Label */}
                    <span className="text-xs font-semibold text-slate-600 mt-2.5">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footnote of Chart */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-700"></span>
                <span>Alianzas activas registradas por mes (Datos ilustrativos)</span>
              </span>
              <span className="italic text-[11px]">
                Tendencia positiva demostrativa (+14 alianzas acumuladas)
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Lifecycle Flow & Quick Actions */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <HeartHandshake className="w-5 h-5 text-sky-700" />
              <h3 className="text-base font-bold text-slate-900">
                Flujo del Programa
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Ruta integral demostrada en este prototipo desde el descubrimiento hasta la rendición de cuentas:
            </p>

            <div className="mt-4 space-y-2.5">
              {[
                { step: '1', title: 'Empresa descubre el programa', desc: 'Explora la landing y niveles de apoyo' },
                { step: '2', title: 'Empresa se registra', desc: 'Envía formulario con datos de contacto' },
                { step: '3', title: 'Solicitud en el panel', desc: 'Equipo FYEPUM recibe notificación' },
                { step: '4', title: 'FYEPUM revisa y contacta', desc: 'Se agenda reunión o llamada' },
                { step: '5', title: 'Empresa se incorpora', desc: 'Pasa a estado activo y se asigna nivel' },
                { step: '6', title: 'Empresa recibe impacto', desc: 'Se genera y comparte informe periódico' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-2.5 text-xs">
                  <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">{s.title}</span>
                    <p className="text-[11px] text-slate-500 leading-tight">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onNavigateTab('solicitudes')}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-700 hover:bg-sky-800 transition-colors shadow-sm"
            >
              <Inbox className="w-4 h-4" />
              <span>Ver {pendingSolicitudesCount} solicitudes entrantes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Companies & Recent Solicitudes Quick Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-700" />
              <h4 className="text-sm font-bold text-slate-900">
                Empresas Padrino activas (Muestra)
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('empresas')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {companies.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCompany(c)}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-800">
                      {c.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === 'Activa'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'En contacto'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {c.contactPerson} • {c.tier} (${c.monthlyAmount.toLocaleString('es-MX')} MXN)
                  </div>
                </div>

                <div className="text-right shrink-0 ml-3">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 group-hover:translate-x-0.5 transition-transform">
                    <span>Perfil</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Solicitudes */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Últimas solicitudes recibidas
              </h4>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('solicitudes')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              <span>Gestionar todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {solicitudes.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {s.companyName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.status === 'Pendiente'
                          ? 'bg-amber-100 text-amber-800'
                          : s.status === 'En contacto'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {s.contactPerson} • {s.interestTier.split('—')[0]}
                  </div>
                </div>

                <div className="text-right shrink-0 ml-3">
                  <span className="text-[11px] text-slate-500 block">
                    {s.registrationDate.split(',')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
