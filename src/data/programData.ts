import { SupportTier, ImpactMetric, FaqItem } from '../types';

/**
 * DATOS DE CONFIGURACIÓN DEL PROTOTIPO FYEPUM
 * Los montos y descripciones son ejemplos para el prototipo académico
 * y pueden modificarse fácilmente en este archivo.
 */

export const PROGRAM_CONFIG = {
  organizationName: 'FYEPUM',
  organizationSubtitle: 'Fuerza y Esperanza por Uno Más',
  programName: 'Programa de Empresas Padrino FYEPUM',
  prototypeNotice: 'Montos mostrados como ejemplo para el prototipo. Sujetos a validación con FYEPUM.',
  generalPrototypeBadge: 'Prototipo de Innovación Social — Proyecto Académico',
};

export const REGISTRATION_TIER_OPTIONS = [
  {
    id: 'aliado',
    name: 'Aliado',
    amountText: '$500 MXN / mes',
    fullLabel: 'Aliado — $500 MXN / mes',
    monthlyAmount: 500,
  },
  {
    id: 'padrino',
    name: 'Padrino',
    amountText: '$1,000 MXN / mes',
    fullLabel: 'Padrino — $1,000 MXN / mes',
    monthlyAmount: 1000,
  },
  {
    id: 'padrino-plus',
    name: 'Padrino Plus',
    amountText: '$2,500 MXN / mes',
    fullLabel: 'Padrino Plus — $2,500 MXN / mes',
    monthlyAmount: 2500,
  },
  {
    id: 'gran-aliado',
    name: 'Gran Aliado',
    amountText: '$5,000 MXN / mes',
    fullLabel: 'Gran Aliado — $5,000 MXN / mes',
    monthlyAmount: 5000,
  },
  {
    id: 'conocer-opciones',
    name: 'Quiero conocer las opciones',
    amountText: 'Asesoría personalizada',
    fullLabel: 'Quiero conocer las opciones',
    monthlyAmount: 0,
  },
];

export const CONTACT_PREFERENCE_OPTIONS = [
  { id: 'email', label: 'Correo electrónico', iconName: 'Mail' },
  { id: 'phone', label: 'Teléfono', iconName: 'Phone' },
  { id: 'virtual_meeting', label: 'Reunión virtual', iconName: 'Video' },
  { id: 'in_person_meeting', label: 'Reunión presencial', iconName: 'Users' },
];

export const COMPANY_SIZE_OPTIONS = [
  { id: '1-10', label: '1 - 10 colaboradores (Microempresa)' },
  { id: '11-50', label: '11 - 50 colaboradores (Pequeña)' },
  { id: '51-250', label: '51 - 250 colaboradores (Mediana)' },
  { id: '250+', label: 'Más de 250 colaboradores (Grande)' },
  { id: 'not_specified', label: 'Prefiero no especificar por ahora' },
];

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: 'aliado',
    name: 'Aliado',
    monthlyAmount: 500,
    currency: 'MXN',
    description: 'Punto de partida ideal para pequeñas empresas y emprendimientos que desean iniciar su compromiso social.',
    features: [
      'Aportación mensual constante',
      'Distintivo digital de Empresa Padrino FYEPUM',
      'Recepción de informe de impacto periódico',
      'Mención en agradecimientos anuales',
    ],
  },
  {
    id: 'padrino',
    name: 'Padrino',
    monthlyAmount: 1000,
    currency: 'MXN',
    popular: true,
    description: 'Contribución clave que impulsa la continuidad operativa en la atención de pacientes pediátricos y sus familias.',
    features: [
      'Todos los beneficios de nivel Aliado',
      'Kit de comunicación interna para colaboradores de la empresa',
      'Presencia institucional en materiales informativos seleccionados',
      'Reporte semestral detallado de impacto comunitario',
    ],
  },
  {
    id: 'padrino-plus',
    name: 'Padrino Plus',
    monthlyAmount: 2500,
    currency: 'MXN',
    description: 'Alianza estratégica con respaldo ampliado para programas integrales de acompañamiento y asistencia.',
    features: [
      'Todos los beneficios de nivel Padrino',
      'Reconocimiento institucional en eventos y asambleas de FYEPUM',
      'Sesión de sensibilización o voluntariado para el equipo de la empresa',
      'Reconocimiento preferente como Empresa Padrino Plus',
    ],
  },
  {
    id: 'gran-aliado',
    name: 'Gran Aliado',
    monthlyAmount: 5000,
    currency: 'MXN',
    description: 'Compromiso de alto impacto para organizaciones comprometidas con la sostenibilidad integral de la misión de FYEPUM.',
    features: [
      'Todos los beneficios de nivel Padrino Plus',
      'Acompañamiento directo con la coordinación directiva de FYEPUM',
      'Constancia física de alianza con impacto social',
      'Participación destacada en iniciativas de innovación comunitaria',
    ],
  },
];

export const WHERE_FUNDS_GO = [
  {
    id: 'alimentacion',
    title: 'Alimentación',
    description: 'Apoyo nutricional adaptado y paquetes alimentarios indispensables durante los periodos de tratamiento médico.',
    iconName: 'Utensils',
  },
  {
    id: 'necesidades-basicas',
    title: 'Necesidades básicas',
    description: 'Insumos esenciales, traslados hospitalarios urgentes y artículos de higiene e hidratación para pacientes pediátricos.',
    iconName: 'Package',
  },
  {
    id: 'apoyo-familias',
    title: 'Apoyo a familias',
    description: 'Respaldo solidario a los cuidadores y núcleos familiares que enfrentan altos costos emocionales y logísticos.',
    iconName: 'Users',
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento',
    description: 'Presencia humana, contención emocional y actividades recreativas que dignifican cada etapa del camino.',
    iconName: 'HeartHandshake',
  },
];

export const PROGRAM_STEPS = [
  {
    stepNumber: '01',
    title: 'Conoce el programa',
    description: 'Explora la misión de FYEPUM y comprende cómo la aportación mensual de tu empresa transforma vidas.',
  },
  {
    stepNumber: '02',
    title: 'Elige tu nivel de apoyo',
    description: 'Selecciona el nivel de alianza que mejor se adapte a la visión de responsabilidad y capacidad de tu empresa.',
  },
  {
    stepNumber: '03',
    title: 'Registra tu empresa',
    description: 'Completa el formulario de contacto para que el equipo de vinculación de FYEPUM se comunique contigo.',
  },
  {
    stepNumber: '04',
    title: 'Forma parte de la red de Empresas Padrino',
    description: 'Consolida una alianza con propósito, recibe tu distintivo y acompaña de cerca el impacto que generan juntos.',
  },
];

export const COMPANY_BENEFITS = [
  {
    title: 'Reconocimiento como Empresa Padrino FYEPUM',
    description: 'Visibiliza el compromiso ético y la sensibilidad humana de tu organización ante la sociedad.',
    iconName: 'Award',
  },
  {
    title: 'Distintivo digital de Empresa Padrino',
    description: 'Insignia oficial para integrar en el sitio web de tu empresa, firmas corporativas e informes anuales.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Reconocimiento en determinados materiales o eventos',
    description: 'Mención institucional respetuosa en espacios seleccionados de la vida comunitaria de la asociación.',
    iconName: 'Sparkles',
  },
  {
    title: 'Información sobre el impacto de su apoyo',
    description: 'Reportes periódicos transparentes sobre cómo las aportaciones fortalecen la atención a pacientes y familias.',
    iconName: 'FileText',
  },
  {
    title: 'Oportunidades de vinculación con FYEPUM',
    description: 'Espacios de diálogo, voluntariado corporativo y sensibilización con causa para el equipo de colaboradores.',
    iconName: 'Handshake',
  },
];

export const SAMPLE_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'familias',
    label: 'Familias apoyadas',
    value: '45+',
    description: 'Núcleos familiares con acompañamiento integral en el último ciclo',
    iconName: 'Users',
  },
  {
    id: 'apoyos',
    label: 'Apoyos entregados',
    value: '380+',
    description: 'Despensas, insumos y apoyos prioritarios otorgados',
    iconName: 'PackageCheck',
  },
  {
    id: 'actividades',
    label: 'Actividades realizadas',
    value: '120+',
    description: 'Jornadas de acompañamiento, talleres y actividades de contención',
    iconName: 'CalendarHeart',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Por qué se llama Empresa Padrino y no una suscripción comercial?',
    answer: 'En FYEPUM no ofrecemos un servicio comercial ni una suscripción tradicional de consumo. El concepto de Empresa Padrino representa una alianza social solidaria basada en el acompañamiento y la empatía, donde la empresa asume un compromiso mensual recurrente para darle sostenibilidad a las vidas de los pacientes pediátricos.',
  },
  {
    id: 'faq-2',
    question: '¿Cómo se formaliza la alianza como Empresa Padrino?',
    answer: 'Al registrar tus datos en esta plataforma de demostración, el equipo de vinculación de FYEPUM programa una breve reunión con los representantes de tu empresa para presentar formalmente el convenio de colaboración, acordar el método administrativo preferido y coordinar la entrega de distintivos.',
  },
  {
    id: 'faq-3',
    question: '¿El apoyo garantiza publicidad o beneficios comerciales para la empresa?',
    answer: 'No. En coherencia con la ética de FYEPUM, la aportación mensual no se comercializa como un servicio publicitario. La empresa recibe reconocimiento institucional, distintivos de responsabilidad social e informes de impacto, pero no se garantizan resultados comerciales ni espacios publicitarios masivos.',
  },
  {
    id: 'faq-4',
    question: '¿Cómo recibe la empresa los informes de impacto periódico?',
    answer: 'Las Empresas Padrino reciben de manera cuatrimestral o semestral un compendio visual y transparente donde se detalla el destino general de los recursos y los testimonios de los avances de los programas de atención a familias y pacientes.',
  },
  {
    id: 'faq-5',
    question: '¿Por qué los montos mostrados son de carácter ilustrativo?',
    answer: 'Este sitio web es un prototipo desarrollado para un proyecto de innovación social en un contexto universitario. Los montos de $500, $1,000, $2,500 y $5,000 MXN sirven como ejemplos funcionales para demostrar la arquitectura del programa, y están sujetos a validación directa por la dirección de FYEPUM.',
  },
];
