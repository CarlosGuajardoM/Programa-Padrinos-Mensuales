import React from 'react';
import { Heart, Building2, ExternalLink, LayoutDashboard } from 'lucide-react';
import { PROGRAM_CONFIG } from '../data/programData';

interface FooterProps {
  onOpenRegister: () => void;
  onNavigateHome?: (targetSection?: string) => void;
  onNavigateAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onNavigateHome, onNavigateAdmin }) => {
  const scrollTo = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome(id);
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-700 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 text-sky-200 fill-sky-200/30" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  FYEPUM
                </span>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {PROGRAM_CONFIG.organizationSubtitle}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Organización dedicada al apoyo y acompañamiento de pacientes pediátricos con enfermedades terminales o crónico-degenerativas y a sus familias.
            </p>
            <div className="inline-block bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300">
              <span className="font-semibold text-sky-400">Iniciativa:</span> {PROGRAM_CONFIG.programName}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#hero')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#que-es')}
                  className="hover:text-white transition-colors"
                >
                  El programa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#niveles')}
                  className="hover:text-white transition-colors"
                >
                  Niveles de apoyo
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#faq')}
                  className="hover:text-white transition-colors"
                >
                  Preguntas frecuentes
                </button>
              </li>
              {onNavigateAdmin && (
                <li className="pt-1 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    className="text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Panel de Empresas Padrino</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact / Registration Trigger */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contacto
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              El proceso de vinculación y contacto se gestiona a través del registro de interés empresarial del programa.
            </p>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 transition-colors text-xs font-semibold"
            >
              <Building2 className="w-4 h-4" />
              <span>Contactar vía Registro</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Academic Prototype Transparency Footer Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} FYEPUM — Fuerza y Esperanza por Uno Más. Prototipo académico de innovación social.
          </p>
          <p className="text-center md:text-right text-slate-400">
            Montos y métricas ilustrativos para fines pedagógicos universitarios.
          </p>
        </div>
      </div>
    </footer>
  );
};
