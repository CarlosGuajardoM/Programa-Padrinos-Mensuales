import React, { useState, useEffect } from 'react';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  HeartHandshake,
  Send,
  Video,
  ShieldCheck,
  Sparkles,
  Info,
  CalendarCheck,
  Eye,
  Trash2
} from 'lucide-react';
import {
  REGISTRATION_TIER_OPTIONS,
  CONTACT_PREFERENCE_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  PROGRAM_CONFIG
} from '../data/programData';
import { CompanyRegistrationSubmission, PreferredContactMethod } from '../types';

interface RegistrationPageProps {
  initialTierId?: string;
  onBackToHome: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  initialTierId,
  onBackToHome,
}) => {
  // Form State
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('');
  const [companySize, setCompanySize] = useState('11-50');

  const [contactName, setContactName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedTier, setSelectedTier] = useState<string>(() => {
    if (initialTierId && REGISTRATION_TIER_OPTIONS.some((t) => t.id === initialTierId)) {
      return initialTierId;
    }
    return 'padrino'; // default prototype selection
  });

  const [motivation, setMotivation] = useState('');
  const [preferredContact, setPreferredContact] = useState<PreferredContactMethod>('email');
  const [authorizedConsent, setAuthorizedConsent] = useState(false);

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<CompanyRegistrationSubmission | null>(null);

  // Local storage prototype records
  const [storedSubmissions, setStoredSubmissions] = useState<CompanyRegistrationSubmission[]>([]);
  const [showDemoRecords, setShowDemoRecords] = useState(false);

  // Sync initial tier if changed from outside
  useEffect(() => {
    if (initialTierId && REGISTRATION_TIER_OPTIONS.some((t) => t.id === initialTierId)) {
      setSelectedTier(initialTierId);
    }
  }, [initialTierId]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fyepum_empresa_padrino_registros');
      if (saved) {
        setStoredSubmissions(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Validation helper
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. Nombre de la empresa *
    if (!companyName.trim()) {
      newErrors.companyName = 'El nombre de la empresa es obligatorio.';
    } else if (companyName.trim().length < 2) {
      newErrors.companyName = 'Ingresa un nombre de empresa válido.';
    }

    // 2. Persona de contacto: Nombre completo *
    if (!contactName.trim()) {
      newErrors.contactName = 'El nombre de la persona de contacto es obligatorio.';
    } else if (contactName.trim().length < 3) {
      newErrors.contactName = 'Ingresa el nombre y apellido del contacto.';
    }

    // Correo electrónico *
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Por favor ingresa un formato de correo electrónico válido (ej. nombre@empresa.com).';
    }

    // Teléfono *
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'El teléfono de contacto es obligatorio.';
    } else if (cleanPhone.length < 8 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      newErrors.phone = 'Ingresa un número telefónico válido (mínimo 8 a 10 dígitos numéricos).';
    }

    // Checkbox de consentimiento *
    if (!authorizedConsent) {
      newErrors.authorizedConsent = 'Debes autorizar el uso de estos datos para que el equipo de FYEPUM pueda contactarte.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorEl = document.querySelector('[data-error="true"]');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const tierObj = REGISTRATION_TIER_OPTIONS.find((t) => t.id === selectedTier);
    const selectedTierLabel = tierObj ? tierObj.fullLabel : selectedTier;

    const submission: CompanyRegistrationSubmission = {
      id: `reg-${Date.now()}`,
      submittedAt: new Date().toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      companyName: companyName.trim(),
      industry: industry.trim() || undefined,
      website: website.trim() || undefined,
      city: city.trim() || undefined,
      companySize,
      contactName: contactName.trim(),
      position: position.trim() || undefined,
      email: email.trim(),
      phone: phone.trim(),
      selectedTier,
      selectedTierLabel,
      motivation: motivation.trim() || undefined,
      preferredContact,
      authorizedConsent,
    };

    // Save in localStorage for academic prototype evaluation
    try {
      const existing = localStorage.getItem('fyepum_empresa_padrino_registros');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [submission, ...list];
      localStorage.setItem('fyepum_empresa_padrino_registros', JSON.stringify(updated));
      setStoredSubmissions(updated);
    } catch {
      // ignore
    }

    setLastSubmission(submission);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPrototypeRecords = () => {
    localStorage.removeItem('fyepum_empresa_padrino_registros');
    setStoredSubmissions([]);
  };

  const selectedTierObj = REGISTRATION_TIER_OPTIONS.find((t) => t.id === selectedTier);

  // ==========================================
  // VIEW: CONFIRMATION SCREEN (When submitted)
  // ==========================================
  if (isSubmitted && lastSubmission) {
    return (
      <div className="py-12 sm:py-20 bg-slate-50 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden p-8 sm:p-12 text-center">
            {/* Success icon badge */}
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-3xl mx-auto flex items-center justify-center shadow-sm mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {/* Exact required title & subtitle */}
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              ¡Gracias por tu interés!
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              Tu registro ha sido recibido. El equipo de FYEPUM podrá ponerse en contacto contigo para continuar el proceso de incorporación al Programa de Empresas Padrino.
            </p>

            {/* Exact required highlight of selected tier */}
            <div className="bg-sky-50/90 border border-sky-200 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-sky-600" />
                <span>Resumen de la solicitud</span>
              </div>
              <div className="text-base font-bold text-slate-900">
                Empresa interesada en: <span className="text-sky-800 underline decoration-sky-300 underline-offset-2">{lastSubmission.selectedTierLabel}</span>
              </div>
              <div className="text-xs text-slate-600 pt-1 border-t border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <div><span className="font-semibold text-slate-700">Empresa:</span> {lastSubmission.companyName}</div>
                <div><span className="font-semibold text-slate-700">Contacto:</span> {lastSubmission.contactName}</div>
                <div><span className="font-semibold text-slate-700">Correo:</span> {lastSubmission.email}</div>
                <div><span className="font-semibold text-slate-700">Teléfono:</span> {lastSubmission.phone}</div>
              </div>
            </div>

            {/* Prototype academic reminder */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 mb-8 text-xs text-amber-900 max-w-lg mx-auto flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Modo Prototipo:</strong> No se realizó ningún cargo ni solicitud bancaria. Registro guardado en memoria local.
              </span>
            </div>

            {/* Back to Home Button */}
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-base text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 shadow-md shadow-sky-800/15 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al inicio</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: REGISTRATION FORM
  // ==========================================
  return (
    <div className="py-10 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Return */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-800 transition-colors p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la página principal</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">
            Paso de Incorporación
          </span>
        </div>

        {/* Header Block */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Programa de Empresas Padrino FYEPUM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Registra tu empresa
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Déjanos tus datos y el equipo de FYEPUM podrá ponerse en contacto contigo para conocer más sobre el programa.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Los campos marcados con asterisco (<span className="text-rose-600 font-bold">*</span>) son obligatorios para el contacto.</span>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* ========================================== */}
          {/* SECCIÓN 1 — DATOS DE LA EMPRESA */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Datos de la empresa
                </h2>
                <p className="text-xs text-slate-500">
                  Información general de la organización u operación comercial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nombre de la empresa * */}
              <div className="md:col-span-2" data-error={!!errors.companyName}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre de la empresa <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: '' }));
                    }}
                    placeholder="Ej. Soluciones Logísticas del Norte S.A. de C.V."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                      errors.companyName
                        ? 'border-rose-300 bg-rose-50/40 focus:ring-rose-400 focus:border-rose-400'
                        : 'border-slate-300 bg-white focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              {/* Giro o industria */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Giro o industria
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Ej. Alimentos, Tecnología, Construcción, Servicios..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Sitio web */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sitio web
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.tuempresa.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Ciudad */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Ciudad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Monterrey, N.L. / Ciudad de México..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Tamaño de la empresa */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tamaño de la empresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 cursor-pointer"
                  >
                    {COMPANY_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECCIÓN 2 — PERSONA DE CONTACTO */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Persona de contacto
                </h2>
                <p className="text-xs text-slate-500">
                  Representante o enlace responsable para coordinar la alianza.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nombre completo * */}
              <div data-error={!!errors.contactName}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre completo <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (errors.contactName) setErrors((prev) => ({ ...prev, contactName: '' }));
                    }}
                    placeholder="Ej. Lic. Andrea Martínez Garza"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                      errors.contactName
                        ? 'border-rose-300 bg-rose-50/40 focus:ring-rose-400 focus:border-rose-400'
                        : 'border-slate-300 bg-white focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  />
                </div>
                {errors.contactName && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contactName}</span>
                  </p>
                )}
              </div>

              {/* Puesto / cargo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Puesto / cargo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Ej. Directora de Vinculación / Gerente General"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Correo electrónico * */}
              <div data-error={!!errors.email}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo electrónico <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="correo@empresa.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-300 bg-rose-50/40 focus:ring-rose-400 focus:border-rose-400'
                        : 'border-slate-300 bg-white focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Teléfono * */}
              <div data-error={!!errors.phone}>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Teléfono de contacto <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    placeholder="Ej. 81 1234 5678"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-300 bg-rose-50/40 focus:ring-rose-400 focus:border-rose-400'
                        : 'border-slate-300 bg-white focus:ring-sky-500 focus:border-sky-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECCIÓN 3 — INTERÉS EN EL PROGRAMA */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Interés en el programa
                </h2>
                <p className="text-xs text-slate-500">
                  Selecciona el nivel de aportación mensual de interés para tu empresa.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Nivel de apoyo de interés
              </label>

              {/* 5 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {REGISTRATION_TIER_OPTIONS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/70 shadow-sm ring-1 ring-sky-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-bold text-slate-900 text-base">
                          {tier.name}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-sky-700 bg-sky-700 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-sky-800 bg-white border border-sky-200/80 px-2.5 py-1 rounded-lg inline-block w-fit">
                        {tier.amountText}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Tier Summary */}
              {selectedTierObj && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs text-slate-700">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>
                    Selección actual: <strong className="text-slate-900 font-bold">{selectedTierObj.fullLabel}</strong>
                  </span>
                </div>
              )}

              {/* Mandatory prototype disclaimer */}
              <div className="mt-4 flex items-start gap-2.5 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Nota:</strong> Los montos son ejemplos utilizados para este prototipo y están sujetos a validación con FYEPUM.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECCIÓN 4 — MOTIVACIÓN */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Motivación
                </h2>
                <p className="text-xs text-slate-500">
                  Comparte qué impulsa a tu organización a acercarse a FYEPUM.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                ¿Por qué te interesa formar parte del programa?
              </label>
              <textarea
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Cuéntanos brevemente sobre los valores sociales de tu empresa, tu interés en el apoyo a pacientes pediátricos o cómo imaginas esta colaboración..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 leading-relaxed"
              />
            </div>
          </div>

          {/* ========================================== */}
          {/* SECCIÓN 5 — DISPONIBILIDAD Y AUTORIZACIÓN */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Disponibilidad y contacto
                </h2>
                <p className="text-xs text-slate-500">
                  Canal de comunicación preferido para coordinar el acercamiento.
                </p>
              </div>
            </div>

            {/* ¿Cómo prefieres que FYEPUM se ponga en contacto contigo? */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                ¿Cómo prefieres que FYEPUM se ponga en contacto contigo?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CONTACT_PREFERENCE_OPTIONS.map((opt) => {
                  const isChecked = preferredContact === opt.id;
                  const Icon =
                    opt.id === 'email'
                      ? Mail
                      : opt.id === 'phone'
                      ? Phone
                      : opt.id === 'virtual_meeting'
                      ? Video
                      : Users;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPreferredContact(opt.id as PreferredContactMethod)}
                      className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        isChecked
                          ? 'border-sky-600 bg-sky-50/70 text-sky-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isChecked ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkbox de autorización * */}
            <div className="pt-3 border-t border-slate-100" data-error={!!errors.authorizedConsent}>
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={authorizedConsent}
                  onChange={(e) => {
                    setAuthorizedConsent(e.target.checked);
                    if (errors.authorizedConsent) {
                      setErrors((prev) => ({ ...prev, authorizedConsent: '' }));
                    }
                  }}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">
                  Autorizo a FYEPUM a utilizar estos datos para ponerse en contacto conmigo respecto al Programa de Empresas Padrino. <span className="text-rose-600 font-bold">*</span>
                </span>
              </label>

              {errors.authorizedConsent && (
                <p className="mt-2 text-xs text-rose-600 flex items-center gap-1 font-medium pl-7">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.authorizedConsent}</span>
                </p>
              )}
            </div>
          </div>

          {/* Submission Action Bar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span className="font-semibold text-slate-800">Prototipo académico:</span> Al hacer clic no se realizará ningún cobro ni compromiso financiero.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors text-center"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 shadow-md shadow-sky-800/20 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar registro</span>
              </button>
            </div>
          </div>
        </form>

        {/* ============================================================== */}
        {/* DEMONSTRATION TOOL FOR UNIVERSITY CLASS (Academic Records Log) */}
        {/* ============================================================== */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowDemoRecords(!showDemoRecords)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Eye className="w-4 h-4 text-sky-600" />
              <span>
                {showDemoRecords
                  ? 'Ocultar registros almacenados del prototipo'
                  : `Ver registros guardados en memoria local (${storedSubmissions.length})`}
              </span>
            </button>

            {storedSubmissions.length > 0 && showDemoRecords && (
              <button
                type="button"
                onClick={handleClearPrototypeRecords}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Limpiar registros</span>
              </button>
            )}
          </div>

          {showDemoRecords && (
            <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-sky-700" />
                <span>Registros simulados guardados (localStorage):</span>
              </div>

              {storedSubmissions.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Aún no hay registros guardados en esta sesión. Completa y envía el formulario para ver cómo se almacena aquí.
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {storedSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{sub.companyName}</span>
                        <span className="text-[11px] font-normal text-slate-500">{sub.submittedAt}</span>
                      </div>
                      <div className="text-slate-600">
                        <span className="font-semibold text-sky-800">{sub.selectedTierLabel}</span> • Contacto: {sub.contactName} ({sub.email} / {sub.phone})
                      </div>
                      {sub.motivation && (
                        <div className="text-slate-500 italic line-clamp-1">
                          Motivación: “{sub.motivation}”
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
