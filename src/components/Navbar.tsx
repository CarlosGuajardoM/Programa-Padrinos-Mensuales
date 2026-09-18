import React, { useState } from 'react';
import { Heart, Menu, X, Building2, LayoutDashboard } from 'lucide-react';
import { PROGRAM_CONFIG } from '../data/programData';

interface NavbarProps {
  onOpenRegister: (tierId?: string) => void;
  currentView?: 'landing' | 'register' | 'admin';
  onNavigateHome?: (targetSection?: string) => void;
  onNavigateAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  currentView = 'landing',
  onNavigateHome,
  onNavigateAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'El programa', href: '#que-es' },
    { name: '¿A dónde va?', href: '#destino-apoyo' },
    { name: 'Niveles de apoyo', href: '#niveles' },
    { name: '¿Cómo funciona?', href: '#como-funciona' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Preguntas frecuentes', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'register' && onNavigateHome) {
      onNavigateHome(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      {/* Mini top bar for academic prototype transparency */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="truncate">{PROGRAM_CONFIG.generalPrototypeBadge}</span>
          </div>
          <span className="hidden sm:inline-block text-slate-400 font-normal">
            Sin cobros reales • Proyecto de vinculación social
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 to-slate-900 flex items-center justify-center text-white shadow-md shadow-sky-900/10 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-sky-200 fill-sky-200/30" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                FYEPUM
              </span>
              <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {PROGRAM_CONFIG.organizationSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-sky-800 hover:bg-sky-50/80 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {onNavigateAdmin && (
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-sky-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors"
                title="Acceder al Panel de Administración"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-sky-700" />
                <span>Panel FYEPUM</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenRegister()}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-sky-700 hover:bg-sky-800 active:bg-sky-900 shadow-sm shadow-sky-700/20 hover:shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              <Building2 className="w-4 h-4 text-sky-200" />
              <span>Quiero ser Empresa Padrino</span>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/98 px-4 pt-3 pb-6 shadow-xl transition-all">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-4 py-2.5 text-base font-medium text-slate-700 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white bg-sky-700 hover:bg-sky-800 shadow-sm"
              >
                <Building2 className="w-4 h-4" />
                <span>Quiero ser Empresa Padrino</span>
              </button>

              {onNavigateAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-700" />
                  <span>Acceso a Panel de Empresas Padrino (Admin)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
