import React, { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  DollarSign,
  Calendar,
  AlertCircle,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { CompanyRecord, CompanyStatus } from '../../types';

interface AdminEmpresasTabProps {
  companies: CompanyRecord[];
  onSelectCompany: (company: CompanyRecord) => void;
  onAddNewCompanyClick?: () => void;
}

export const AdminEmpresasTab: React.FC<AdminEmpresasTabProps> = ({
  companies,
  onSelectCompany,
}) => {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Available unique months from companies
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    companies.forEach((c) => {
      if (c.incorporationMonth && c.incorporationMonth !== 'Por definir') {
        months.add(c.incorporationMonth);
      }
    });
    return Array.from(months);
  }, [companies]);

  // Filtered dataset
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Status filter
      if (statusFilter !== 'all' && company.status !== statusFilter) {
        return false;
      }
      // Tier filter
      if (tierFilter !== 'all' && company.tier !== tierFilter) {
        return false;
      }
      // Month filter
      if (monthFilter !== 'all' && company.incorporationMonth !== monthFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(query);
        const matchesContact = company.contactPerson.toLowerCase().includes(query);
        const matchesCity = company.city?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesContact && !matchesCity) {
          return false;
        }
      }
      return true;
    });
  }, [companies, statusFilter, tierFilter, monthFilter, searchQuery]);

  // Status badge styling helper
  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case 'Activa':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'En contacto':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Interesada':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Pausada':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Tier badge styling helper
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Gran Aliado':
        return 'bg-purple-100 text-purple-900 border-purple-200';
      case 'Padrino Plus':
        return 'bg-sky-100 text-sky-900 border-sky-200';
      case 'Padrino':
        return 'bg-teal-100 text-teal-900 border-teal-200';
      case 'Aliado':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('all');
    setTierFilter('all');
    setMonthFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters = statusFilter !== 'all' || tierFilter !== 'all' || monthFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Header & Subtitle */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-700" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Empresas Padrino
              </h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                {filteredCompanies.length} de {companies.length} empresas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Catálogo de empresas aliadas ficticias para la gestión de relaciones, niveles de apoyo y seguimiento de padrinazgo.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Nombres y datos demostrativos para evaluación</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por empresa o contacto..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Filter 1: Estado */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Estado
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="Activa">Activa</option>
              <option value="En contacto">En contacto</option>
              <option value="Interesada">Interesada</option>
              <option value="Pausada">Pausada</option>
            </select>
          </div>

          {/* Filter 2: Nivel */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Nivel
            </label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todos los niveles</option>
              <option value="Gran Aliado">Gran Aliado ($5,000)</option>
              <option value="Padrino Plus">Padrino Plus ($2,500)</option>
              <option value="Padrino">Padrino ($1,000)</option>
              <option value="Aliado">Aliado ($500)</option>
              <option value="Por definir">Por definir</option>
            </select>
          </div>

          {/* Filter 3: Mes */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Mes de incorporación
            </label>
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todos los meses</option>
              {availableMonths.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Clear indicator */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Mostrando <strong>{filteredCompanies.length}</strong> resultados filtrados.
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>

      {/* Empresas Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Empresa
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Contacto
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Nivel
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Aportación
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Estado
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Último contacto
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">
                      No se encontraron empresas con los filtros aplicados.
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Intenta modificar el estado, nivel o criterio de búsqueda.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 underline"
                    >
                      Restablecer filtros
                    </button>
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Empresa */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-sky-800 transition-colors flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{company.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {company.industry || 'Empresa Aliada'} • {company.city || 'Nuevo León'}
                      </div>
                    </td>

                    {/* Contacto */}
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-800">
                        {company.contactPerson}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {company.contactEmail}
                      </div>
                    </td>

                    {/* Nivel */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${getTierBadge(
                          company.tier
                        )}`}
                      >
                        {company.tier}
                      </span>
                    </td>

                    {/* Aportación */}
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-900">
                        {company.monthlyAmount > 0
                          ? `$${company.monthlyAmount.toLocaleString('es-MX')} MXN`
                          : 'Por definir'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        mensual (DEMO)
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                          company.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{company.status}</span>
                      </span>
                    </td>

                    {/* Último contacto */}
                    <td className="px-4 py-4">
                      <div className="text-xs text-slate-700 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{company.lastContactDate}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Inc: {company.incorporationMonth || '2026'}
                      </div>
                    </td>

                    {/* Acción */}
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onSelectCompany(company)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver perfil</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer with counter */}
        <div className="bg-slate-50/70 border-t border-slate-200 px-5 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando <strong>{filteredCompanies.length}</strong> de <strong>{companies.length}</strong> empresas en catálogo.
          </span>
          <span className="text-[11px] italic">
            Datos simulados para el prototipo académico FYEPUM.
          </span>
        </div>
      </div>
    </div>
  );
};
