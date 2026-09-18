import React, { useState } from 'react';
import {
  Inbox,
  Eye,
  PhoneCall,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  User,
  AlertCircle,
  Calendar,
  Sparkles,
  HeartHandshake,
  MessageSquare,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { AdminSolicitudRecord, SolicitudStatus, CompanyRecord } from '../../types';

interface AdminSolicitudesTabProps {
  solicitudes: AdminSolicitudRecord[];
  onUpdateSolicitudStatus: (id: string, newStatus: SolicitudStatus) => void;
  onApproveAndCreateCompany: (solicitud: AdminSolicitudRecord) => void;
}

export const AdminSolicitudesTab: React.FC<AdminSolicitudesTabProps> = ({
  solicitudes,
  onUpdateSolicitudStatus,
  onApproveAndCreateCompany,
}) => {
  // Modal states
  const [selectedSolicitud, setSelectedSolicitud] = useState<AdminSolicitudRecord | null>(null);
  const [contactModalSolicitud, setContactModalSolicitud] = useState<AdminSolicitudRecord | null>(null);
  const [contactActionFeedback, setContactActionFeedback] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Interactive contact action simulator
  const handleSimulateContact = (method: string) => {
    if (!contactModalSolicitud) return;
    onUpdateSolicitudStatus(contactModalSolicitud.id, 'En contacto');
    setContactActionFeedback(
      `Acción de prototipo registrada: Contacto vía ${method} simulado para ${contactModalSolicitud.companyName}. Estado actualizado a "En contacto".`
    );
    setTimeout(() => {
      setContactActionFeedback(null);
      setContactModalSolicitud(null);
    }, 2500);
  };

  const handleApprove = (solicitud: AdminSolicitudRecord) => {
    onApproveAndCreateCompany(solicitud);
  };

  const handleReject = (solicitud: AdminSolicitudRecord) => {
    onUpdateSolicitudStatus(solicitud.id, 'Rechazada');
  };

  const filteredSolicitudes = solicitudes.filter((s) => {
    if (filterStatus === 'all') return true;
    return s.status === filterStatus;
  });

  const getStatusBadge = (status: SolicitudStatus) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'En contacto':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Aprobada':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rechazada':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Block */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-sky-700" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Solicitudes de Registro
              </h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                {solicitudes.length} recibidas
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Registro de empresas que han completado el formulario de interés en la plataforma pública para unirse al Programa de Empresas Padrino.
            </p>
          </div>

          {/* Filter by status */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Estado:
            </span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Todas ({solicitudes.length})</option>
              <option value="Pendiente">Pendientes</option>
              <option value="En contacto">En contacto</option>
              <option value="Aprobada">Aprobadas</option>
              <option value="Rechazada">Rechazadas</option>
            </select>
          </div>
        </div>

        {/* Prototype notice */}
        <div className="mt-4 flex items-center gap-2 text-xs text-amber-900 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Simulación interactiva:</strong> Las acciones de contactar, aprobar y rechazar cambian el estado y reflejan la incorporación sin enviar correos reales.
          </span>
        </div>
      </div>

      {/* Solicitudes List / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Empresa
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Persona de contacto
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Nivel de interés
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Fecha de registro
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Estado
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSolicitudes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No hay solicitudes registradas con este estado.
                  </td>
                </tr>
              ) : (
                filteredSolicitudes.map((sol) => (
                  <tr
                    key={sol.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Empresa */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-sky-800 transition-colors flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sol.companyName}</span>
                      </div>
                      {sol.source === 'formulario_web' && (
                        <span className="inline-block mt-0.5 text-[10px] font-bold bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded border border-sky-200">
                          Reciente desde formulario web
                        </span>
                      )}
                    </td>

                    {/* Persona de contacto */}
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-800">
                        {sol.contactPerson}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {sol.email} • {sol.phone}
                      </div>
                    </td>

                    {/* Nivel de interés */}
                    <td className="px-4 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50 text-sky-900 border border-sky-200">
                        {sol.interestTier}
                      </span>
                    </td>

                    {/* Fecha de registro */}
                    <td className="px-4 py-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{sol.registrationDate}</span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                          sol.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{sol.status}</span>
                      </span>
                    </td>

                    {/* Botones: Ver | Contactar | Aprobar | Rechazar */}
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Botón Ver */}
                        <button
                          type="button"
                          onClick={() => setSelectedSolicitud(sol)}
                          title="Ver detalle de la solicitud"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver</span>
                        </button>

                        {/* Botón Contactar */}
                        <button
                          type="button"
                          onClick={() => setContactModalSolicitud(sol)}
                          title="Simular contacto con la empresa"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Contactar</span>
                        </button>

                        {/* Botón Aprobar */}
                        <button
                          type="button"
                          onClick={() => handleApprove(sol)}
                          disabled={sol.status === 'Aprobada'}
                          title="Aprobar solicitud e incorporar"
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                            sol.status === 'Aprobada'
                              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 opacity-60 cursor-not-allowed'
                              : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{sol.status === 'Aprobada' ? 'Aprobada' : 'Aprobar'}</span>
                        </button>

                        {/* Botón Rechazar */}
                        <button
                          type="button"
                          onClick={() => handleReject(sol)}
                          disabled={sol.status === 'Rechazada'}
                          title="Descartar solicitud"
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            sol.status === 'Rechazada'
                              ? 'text-rose-400 bg-rose-50 cursor-not-allowed'
                              : 'text-rose-600 hover:bg-rose-50 border border-rose-200'
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL 1: VER DETALLE DE SOLICITUD */}
      {/* ========================================== */}
      {selectedSolicitud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  Solicitud de Registro
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedSolicitud.companyName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSolicitud(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    Contacto:
                  </span>
                  <span className="font-bold text-slate-900">
                    {selectedSolicitud.contactPerson}
                  </span>
                  {selectedSolicitud.position && (
                    <span className="text-slate-500 block text-xs">
                      {selectedSolicitud.position}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    Estado:
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                      selectedSolicitud.status
                    )}`}
                  >
                    {selectedSolicitud.status}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    Correo electrónico:
                  </span>
                  <span className="text-slate-800 font-medium">
                    {selectedSolicitud.email}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    Teléfono:
                  </span>
                  <span className="text-slate-800 font-medium">
                    {selectedSolicitud.phone}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-200">
                <span className="text-[11px] font-bold text-sky-900 uppercase block">
                  Nivel de interés seleccionado:
                </span>
                <span className="text-sm font-black text-sky-950 mt-0.5 block">
                  {selectedSolicitud.interestTier}
                </span>
                {selectedSolicitud.preferredContact && (
                  <span className="text-xs text-sky-800 block mt-1">
                    Preferencia de contacto: <strong>{selectedSolicitud.preferredContact}</strong>
                  </span>
                )}
              </div>

              {selectedSolicitud.motivation && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Motivación declarada:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    “{selectedSolicitud.motivation}”
                  </p>
                </div>
              )}

              <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-between">
                <span>Registrado el: {selectedSolicitud.registrationDate}</span>
                <span className="italic">Prototipo FYEPUM</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedSolicitud(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  const s = selectedSolicitud;
                  setSelectedSolicitud(null);
                  handleApprove(s);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Aprobar incorporación</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 2: CONTACTAR EMPRESA (Simulación) */}
      {/* ========================================== */}
      {contactModalSolicitud && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Gestión de Vinculación FYEPUM
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Contactar a {contactModalSolicitud.companyName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setContactModalSolicitud(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Selecciona el medio de contacto realizado para actualizar el historial de vinculación del prototipo:
            </p>

            {contactActionFeedback ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{contactActionFeedback}</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSimulateContact('Llamada telefónica')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    Llamada de vinculación
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {contactModalSolicitud.phone}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateContact('Correo de bienvenida')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs text-slate-900">
                    Correo informativo
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {contactModalSolicitud.email}
                  </div>
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Modo Prototipo — No envía mensajes externos</span>
              <button
                type="button"
                onClick={() => setContactModalSolicitud(null)}
                className="font-semibold text-slate-700 hover:underline"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
