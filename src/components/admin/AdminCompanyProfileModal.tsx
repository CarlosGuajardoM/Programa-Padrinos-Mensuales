import React, { useState } from 'react';
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  HeartHandshake,
  Clock,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { CompanyRecord, CompanyStatus, InternalNote, ContactHistoryEntry } from '../../types';

interface AdminCompanyProfileModalProps {
  company: CompanyRecord | null;
  onClose: () => void;
  onUpdateCompany: (updated: CompanyRecord) => void;
  onGenerateReportForCompany?: (company: CompanyRecord) => void;
}

export const AdminCompanyProfileModal: React.FC<AdminCompanyProfileModalProps> = ({
  company,
  onClose,
  onUpdateCompany,
  onGenerateReportForCompany,
}) => {
  if (!company) return null;

  // Local state for adding a note
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [statusState, setStatusState] = useState<CompanyStatus>(company.status);
  const [statusSavedFeedback, setStatusSavedFeedback] = useState(false);

  const handleStatusChange = (newStatus: CompanyStatus) => {
    setStatusState(newStatus);
    const updated: CompanyRecord = {
      ...company,
      status: newStatus,
      lastContactDate: 'Hoy (Actualizado en prototipo)',
    };
    onUpdateCompany(updated);
    setStatusSavedFeedback(true);
    setTimeout(() => setStatusSavedFeedback(false), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      text: newNoteText.trim(),
      author: 'Coordinación FYEPUM (Demo)',
    };

    const updatedNotes = [newNote, ...company.internalNotes];
    const updated: CompanyRecord = {
      ...company,
      internalNotes: updatedNotes,
    };

    onUpdateCompany(updated);
    setNewNoteText('');
    setIsAddingNote(false);
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full my-8 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full">
                Perfil de Empresa Padrino
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                ID: {company.id}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-sky-700" />
              <span>{company.name}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {company.industry || 'Organización Aliada'} • {company.city || 'Nuevo León, México'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 text-xs sm:text-sm">
          {/* Section: Overview Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Contact Person Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-sky-700" />
                <span>Contacto</span>
              </span>
              <div className="font-bold text-slate-900 pt-1">
                {company.contactPerson}
              </div>
              {company.contactPosition && (
                <div className="text-[11px] text-slate-500">
                  {company.contactPosition}
                </div>
              )}
              <div className="text-xs text-slate-600 pt-1 flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span className="truncate">{company.contactEmail}</span>
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{company.contactPhone}</span>
              </div>
            </div>

            {/* Support Tier & Monthly Amount */}
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1">
              <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-sky-700" />
                <span>Nivel de apoyo</span>
              </span>
              <div className="text-base font-black text-sky-950 pt-1">
                {company.tier}
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-baseline gap-1 pt-1">
                <span>
                  {company.monthlyAmount > 0
                    ? `$${company.monthlyAmount.toLocaleString('es-MX')} MXN`
                    : 'Por definir'}
                </span>
                <span className="text-[11px] font-normal text-slate-500">
                  / mes (DEMO)
                </span>
              </div>
              <div className="text-[11px] text-sky-800 pt-1">
                Aportación solidaria recurrente
              </div>
            </div>

            {/* State & Dates */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Estado actual
                </span>
                <div className="flex items-center gap-2">
                  <select
                    value={statusState}
                    onChange={(e) => handleStatusChange(e.target.value as CompanyStatus)}
                    className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                  >
                    <option value="Activa">Activa</option>
                    <option value="En contacto">En contacto</option>
                    <option value="Interesada">Interesada</option>
                    <option value="Pausada">Pausada</option>
                  </select>
                </div>
                {statusSavedFeedback && (
                  <span className="text-[10px] text-emerald-700 font-bold block mt-1 animate-pulse">
                    ✓ Estado actualizado
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-0.5">
                <div>
                  <span className="font-semibold text-slate-700">Incorporación:</span> {company.incorporationDate}
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Último contacto:</span> {company.lastContactDate}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Historial de Contacto */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Historial de contacto
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {company.contactHistory.length} interacciones registradas
              </span>
            </div>

            {company.contactHistory.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                Aún no hay interacciones registradas en este prototipo.
              </p>
            ) : (
              <div className="space-y-2">
                {company.contactHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-xs">
                          {item.type}
                        </span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[11px] text-slate-500">{item.author}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0 self-start">
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Notas de FYEPUM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Notas de FYEPUM
                </h3>
              </div>
              {!isAddingNote && (
                <button
                  type="button"
                  onClick={() => setIsAddingNote(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar nota</span>
                </button>
              )}
            </div>

            {/* Add note inline form */}
            {isAddingNote && (
              <form onSubmit={handleAddNote} className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-200 space-y-2.5">
                <label className="block text-[11px] font-bold text-sky-950 uppercase tracking-wider">
                  Nueva nota interna (Prototipo)
                </label>
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Escribe comentarios sobre acuerdos, requerimientos de voluntariado o seguimiento..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNoteText('');
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold"
                  >
                    Guardar nota
                  </button>
                </div>
              </form>
            )}

            {company.internalNotes.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl">
                Sin notas internas registradas.
              </p>
            ) : (
              <div className="space-y-2">
                {company.internalNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-900">{note.author}</span>
                      <span className="text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: IMPACTO COMUNICADO */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Impacto comunicado
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Ejemplos de reportes enviados a esta empresa
              </span>
            </div>

            {company.communicatedReports.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                <p className="text-xs text-slate-500 italic">
                  Aún no se han enviado reportes de impacto a esta empresa.
                </p>
                {onGenerateReportForCompany && (
                  <button
                    type="button"
                    onClick={() => onGenerateReportForCompany(company)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Preparar reporte de impacto para esta empresa</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2.5">
                {company.communicatedReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {report.title}
                        </span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Enviado
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Periodo: <strong className="text-slate-800">{report.period}</strong> • {report.deliveryMethod}
                      </div>
                      <div className="text-[11px] text-emerald-800 font-semibold">
                        Impacto reflejado: {report.familiesSupportedDemo} familias acompañadas (DEMO)
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block">
                        Fecha: {report.sentDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Registro interno del Programa de Empresas Padrino (Prototipo)
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-900 transition-colors"
          >
            Cerrar perfil
          </button>
        </div>
      </div>
    </div>
  );
};
