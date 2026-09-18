import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  Inbox,
  HeartHandshake,
  Settings,
  ArrowLeft,
  GraduationCap,
  Bell,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Search,
} from 'lucide-react';
import {
  CompanyRecord,
  AdminSolicitudRecord,
  CompanyRegistrationSubmission,
  SolicitudStatus,
} from '../types';
import {
  INITIAL_DEMO_COMPANIES,
  INITIAL_DEMO_SOLICITUDES,
} from '../data/adminDemoData';
import { AdminResumenTab } from './admin/AdminResumenTab';
import { AdminEmpresasTab } from './admin/AdminEmpresasTab';
import { AdminSolicitudesTab } from './admin/AdminSolicitudesTab';
import { AdminImpactoTab } from './admin/AdminImpactoTab';
import { AdminConfiguracionTab } from './admin/AdminConfiguracionTab';
import { AdminCompanyProfileModal } from './admin/AdminCompanyProfileModal';

interface AdminPanelProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
}

type AdminTab = 'resumen' | 'empresas' | 'solicitudes' | 'impacto' | 'configuracion';

const LOCAL_STORAGE_COMPANIES_KEY = 'fyepum_admin_companies_v1';
const LOCAL_STORAGE_SOLICITUDES_KEY = 'fyepum_admin_solicitudes_v1';
const PUBLIC_FORM_SUBMISSIONS_KEY = 'fyepum_empresa_padrino_registros';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onNavigateHome,
  onNavigateRegister,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('resumen');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCompanyModal, setSelectedCompanyModal] = useState<CompanyRecord | null>(null);

  // Companies state with localStorage persistence
  const [companies, setCompanies] = useState<CompanyRecord[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_COMPANIES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Could not read admin companies from localStorage:', err);
    }
    return INITIAL_DEMO_COMPANIES;
  });

  // Solicitudes state with localStorage persistence and public form merger
  const [solicitudes, setSolicitudes] = useState<AdminSolicitudRecord[]>(() => {
    let baseList: AdminSolicitudRecord[] = INITIAL_DEMO_SOLICITUDES;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_SOLICITUDES_KEY);
      if (stored) {
        baseList = JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Could not read admin solicitudes from localStorage:', err);
    }

    // Check if there are public submissions from RegistrationPage
    try {
      const publicSubmissionsRaw = localStorage.getItem(PUBLIC_FORM_SUBMISSIONS_KEY);
      if (publicSubmissionsRaw) {
        const publicList: CompanyRegistrationSubmission[] = JSON.parse(publicSubmissionsRaw);
        // Convert any that aren't already in baseList
        const existingIds = new Set(baseList.map((s) => s.id));
        const newFromPublic: AdminSolicitudRecord[] = publicList
          .filter((p) => !existingIds.has(p.id))
          .map((p) => ({
            id: p.id,
            companyName: p.companyName,
            contactPerson: p.contactName,
            position: p.position,
            email: p.email,
            phone: p.phone,
            interestTier: p.selectedTierLabel,
            registrationDate: new Date(p.submittedAt).toLocaleDateString('es-MX', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: 'Pendiente',
            motivation: p.motivation,
            preferredContact: p.preferredContact,
            source: 'formulario_web',
          }));

        return [...newFromPublic, ...baseList];
      }
    } catch (err) {
      console.warn('Could not merge public submissions:', err);
    }

    return baseList;
  });

  // Save companies changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMPANIES_KEY, JSON.stringify(companies));
    } catch (err) {
      console.warn('Could not save admin companies to localStorage:', err);
    }
  }, [companies]);

  // Save solicitudes changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SOLICITUDES_KEY, JSON.stringify(solicitudes));
    } catch (err) {
      console.warn('Could not save admin solicitudes to localStorage:', err);
    }
  }, [solicitudes]);

  // Update single solicitud status
  const handleUpdateSolicitudStatus = (id: string, newStatus: SolicitudStatus) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, status: newStatus } : sol))
    );
  };

  // Approve solicitud & create/update company in Empresas table
  const handleApproveAndCreateCompany = (solicitud: AdminSolicitudRecord) => {
    // 1. Mark solicitud as Aprobada
    handleUpdateSolicitudStatus(solicitud.id, 'Aprobada');

    // 2. Check if company already exists by name
    const existingIndex = companies.findIndex(
      (c) => c.name.toLowerCase() === solicitud.companyName.toLowerCase()
    );

    let monthlyAmount = 1000;
    let tierName: 'Aliado' | 'Padrino' | 'Padrino Plus' | 'Gran Aliado' | 'Por definir' = 'Padrino';

    if (solicitud.interestTier.includes('5,000') || solicitud.interestTier.includes('Gran Aliado')) {
      monthlyAmount = 5000;
      tierName = 'Gran Aliado';
    } else if (solicitud.interestTier.includes('2,500') || solicitud.interestTier.includes('Padrino Plus')) {
      monthlyAmount = 2500;
      tierName = 'Padrino Plus';
    } else if (solicitud.interestTier.includes('500') || solicitud.interestTier.includes('Aliado')) {
      monthlyAmount = 500;
      tierName = 'Aliado';
    }

    if (existingIndex >= 0) {
      // Update existing
      const updatedList = [...companies];
      updatedList[existingIndex] = {
        ...updatedList[existingIndex],
        status: 'Activa',
        monthlyAmount,
        tier: tierName,
        lastContactDate: 'Hoy (Aprobada en prototipo)',
      };
      setCompanies(updatedList);
    } else {
      // Create new company record
      const newCompany: CompanyRecord = {
        id: `comp-gen-${Date.now()}`,
        name: solicitud.companyName,
        contactPerson: solicitud.contactPerson,
        contactEmail: solicitud.email,
        contactPhone: solicitud.phone,
        contactPosition: solicitud.position || 'Representante',
        tier: tierName,
        monthlyAmount,
        status: 'Activa',
        incorporationDate: 'Agosto de 2026',
        incorporationMonth: 'Agosto 2026',
        lastContactDate: 'Hoy (Incorporada)',
        contactHistory: [
          {
            id: `ch-${Date.now()}`,
            date: 'Hoy',
            type: 'Correo electrónico',
            summary: 'Aprobación de incorporación al Programa de Empresas Padrino.',
            author: 'Coordinación FYEPUM (Demo)',
          },
        ],
        internalNotes: [
          {
            id: `note-${Date.now()}`,
            date: 'Hoy',
            text: `Incorporación aprobada desde solicitud de registro web. Motivación inicial: "${
              solicitud.motivation || 'Compromiso social con FYEPUM'
            }".`,
            author: 'Dirección FYEPUM',
          },
        ],
        communicatedReports: [],
      };
      setCompanies((prev) => [newCompany, ...prev]);
    }
  };

  // Update existing company
  const handleUpdateCompany = (updated: CompanyRecord) => {
    setCompanies((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSelectedCompanyModal(updated);
  };

  // Reset to initial defaults
  const handleResetDemoData = () => {
    setCompanies(INITIAL_DEMO_COMPANIES);
    setSolicitudes(INITIAL_DEMO_SOLICITUDES);
    try {
      localStorage.removeItem(LOCAL_STORAGE_COMPANIES_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SOLICITUDES_KEY);
      localStorage.removeItem(PUBLIC_FORM_SUBMISSIONS_KEY);
    } catch (err) {
      console.warn('Error clearing localStorage:', err);
    }
  };

  const pendingCount = solicitudes.filter((s) => s.status === 'Pendiente').length;

  const sidebarItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'resumen',
      label: 'Resumen',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'empresas',
      label: 'Empresas',
      icon: <Building2 className="w-4 h-4" />,
      badge: companies.length,
    },
    {
      id: 'solicitudes',
      label: 'Solicitudes',
      icon: <Inbox className="w-4 h-4" />,
      badge: pendingCount > 0 ? pendingCount : undefined,
    },
    {
      id: 'impacto',
      label: 'Impacto',
      icon: <HeartHandshake className="w-4 h-4" />,
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      {/* Top Academic Banner (Fixed at the very top of admin panel) */}
      <header className="bg-slate-900 text-white text-xs px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-800 z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="font-extrabold tracking-wide uppercase text-[11px] text-slate-200">
            FYEPUM • Panel de Empresas Padrino
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden sm:inline-block text-[11px] font-medium text-amber-300">
            Prototipo para Innovación Social (No real)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la landing</span>
          </button>
        </div>
      </header>

      {/* Main Admin Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================== */}
        {/* SUBMENÚ LATERAL (Sidebar) - Desktop */}
        {/* ========================================== */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 shrink-0">
          {/* Sidebar Top branding */}
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-700 text-white flex items-center justify-center font-black text-sm shadow-sm">
              FP
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">
                Panel de Empresas Padrino
              </h1>
              <p className="text-[11px] font-medium text-slate-500">
                FYEPUM A.C.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1">
              Menú Principal
            </div>

            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-left ${
                    isActive
                      ? 'bg-sky-700 text-white shadow-sm shadow-sky-800/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.id === 'solicitudes'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Footer note */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Entorno de Simulación</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Sin conexión a pasarelas bancarias ni cobros reales.
            </p>
          </div>
        </aside>

        {/* Mobile Header & Hamburger Bar */}
        <div className="md:hidden flex flex-col w-full">
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-sm font-black text-slate-900">
                Panel de Empresas Padrino
              </h1>
            </div>

            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              DEMO
            </span>
          </div>

          {/* Mobile Drawer */}
          {isMobileSidebarOpen && (
            <div className="bg-white border-b border-slate-200 p-3 space-y-1 animate-in slide-in-from-top-2">
              {sidebarItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                      isActive
                        ? 'bg-sky-700 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Submenu Header title bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                FYEPUM • Gestión de Padrinazgo
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight capitalize">
                {activeTab}
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onNavigateRegister}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Building2 className="w-3.5 h-3.5 text-sky-700" />
                <span>Simular registro público</span>
              </button>
            </div>
          </div>

          {/* Render Active Tab */}
          {activeTab === 'resumen' && (
            <AdminResumenTab
              companies={companies}
              solicitudes={solicitudes}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectCompany={(c) => setSelectedCompanyModal(c)}
            />
          )}

          {activeTab === 'empresas' && (
            <AdminEmpresasTab
              companies={companies}
              onSelectCompany={(c) => setSelectedCompanyModal(c)}
            />
          )}

          {activeTab === 'solicitudes' && (
            <AdminSolicitudesTab
              solicitudes={solicitudes}
              onUpdateSolicitudStatus={handleUpdateSolicitudStatus}
              onApproveAndCreateCompany={handleApproveAndCreateCompany}
            />
          )}

          {activeTab === 'impacto' && (
            <AdminImpactoTab companies={companies} />
          )}

          {activeTab === 'configuracion' && (
            <AdminConfiguracionTab
              onResetDemoData={handleResetDemoData}
              onNavigateHome={onNavigateHome}
              onNavigateRegister={onNavigateRegister}
            />
          )}
        </main>
      </div>

      {/* Profile Detail Modal */}
      <AdminCompanyProfileModal
        company={selectedCompanyModal}
        onClose={() => setSelectedCompanyModal(null)}
        onUpdateCompany={handleUpdateCompany}
        onGenerateReportForCompany={(company) => {
          setSelectedCompanyModal(null);
          setActiveTab('impacto');
        }}
      />
    </div>
  );
};
