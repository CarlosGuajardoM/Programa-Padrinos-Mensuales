export interface SupportTier {
  id: string;
  name: string;
  monthlyAmount: number;
  currency: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type PreferredContactMethod = 'email' | 'phone' | 'virtual_meeting' | 'in_person_meeting';

export type CompanySizeOption = '1-10' | '11-50' | '51-250' | '250+' | 'not_specified';

export interface CompanyRegistrationSubmission {
  id: string;
  submittedAt: string;
  // Section 1: Company details
  companyName: string;
  industry?: string;
  website?: string;
  city?: string;
  companySize?: string;
  // Section 2: Contact person
  contactName: string;
  position?: string;
  email: string;
  phone: string;
  // Section 3: Interest tier
  selectedTier: string;
  selectedTierLabel: string;
  // Section 4: Motivation
  motivation?: string;
  // Section 5: Availability / Contact Preference
  preferredContact: PreferredContactMethod;
  // Consent
  authorizedConsent: boolean;
}

export type CompanyStatus = 'Interesada' | 'En contacto' | 'Activa' | 'Pausada';

export type SolicitudStatus = 'Pendiente' | 'En contacto' | 'Aprobada' | 'Rechazada';

export interface ContactHistoryEntry {
  id: string;
  date: string;
  type: 'Llamada telefónica' | 'Correo electrónico' | 'Reunión virtual' | 'Reunión presencial' | 'Mensaje de seguimiento';
  summary: string;
  author: string;
}

export interface InternalNote {
  id: string;
  date: string;
  text: string;
  author: string;
}

export interface CommunicatedReportItem {
  id: string;
  period: string;
  title: string;
  sentDate: string;
  familiesSupportedDemo: number;
  deliveryMethod: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  contactPosition?: string;
  industry?: string;
  city?: string;
  tier: 'Aliado' | 'Padrino' | 'Padrino Plus' | 'Gran Aliado' | 'Por definir';
  monthlyAmount: number;
  status: CompanyStatus;
  incorporationDate: string;
  incorporationMonth: string; // e.g. "Agosto 2026", "Julio 2026", etc.
  lastContactDate: string;
  contactHistory: ContactHistoryEntry[];
  internalNotes: InternalNote[];
  communicatedReports: CommunicatedReportItem[];
}

export interface AdminSolicitudRecord {
  id: string;
  companyName: string;
  contactPerson: string;
  position?: string;
  email: string;
  phone: string;
  interestTier: string;
  registrationDate: string;
  status: SolicitudStatus;
  motivation?: string;
  preferredContact?: string;
  notes?: string;
  source: 'formulario_web' | 'demo';
}

