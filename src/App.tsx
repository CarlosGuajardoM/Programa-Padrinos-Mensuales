import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutProgram } from './components/AboutProgram';
import { WhereFundsGo } from './components/WhereFundsGo';
import { SupportTiers } from './components/SupportTiers';
import { HowItWorks } from './components/HowItWorks';
import { CompanyBenefits } from './components/CompanyBenefits';
import { ImpactReportPreview } from './components/ImpactReportPreview';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { RegistrationPage } from './components/RegistrationPage';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'register' | 'admin'>('landing');
  const [selectedTierId, setSelectedTierId] = useState<string | undefined>(undefined);

  // Sync with window pathname or hash
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path === '/admin' || hash === '#admin') {
        setCurrentView('admin');
      } else if (path === '/registro' || hash === '#registro') {
        setCurrentView('register');
      } else {
        // Only reset to landing if we were on one of the hash routes and it was cleared
        if (hash === '' && path !== '/admin' && path !== '/registro') {
          // If neither hash nor special path, keep landing
          if (currentView !== 'landing' && (hash === '' || hash === '#hero')) {
            setCurrentView('landing');
          }
        }
      }
    };

    handleNavigation();
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [currentView]);

  const handleOpenRegister = (tierId?: string) => {
    setSelectedTierId(tierId);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== '#registro') {
      window.history.pushState(null, '', '#registro');
    }
  };

  const handleOpenAdmin = () => {
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash !== '#admin') {
      window.history.pushState(null, '', '#admin');
    }
  };

  const handleBackToHome = (targetSection?: string) => {
    setCurrentView('landing');
    if (window.location.hash === '#registro' || window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname.replace('/admin', '/'));
    }
    setTimeout(() => {
      if (targetSection) {
        const element = document.querySelector(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const handleExploreProgram = () => {
    const element = document.querySelector('#que-es');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If in Admin Panel View
  if (currentView === 'admin') {
    return (
      <AdminPanel
        onNavigateHome={() => handleBackToHome()}
        onNavigateRegister={() => handleOpenRegister()}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Header with Navigation Awareness */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        currentView={currentView}
        onNavigateHome={(section) => handleBackToHome(section)}
        onNavigateAdmin={() => handleOpenAdmin()}
      />

      {/* Main Views */}
      <main className="flex-1">
        {currentView === 'register' ? (
          <RegistrationPage
            initialTierId={selectedTierId}
            onBackToHome={() => handleBackToHome()}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onOpenRegister={() => handleOpenRegister()}
              onExploreProgram={handleExploreProgram}
            />

            {/* Section: ¿Qué es una Empresa Padrino? */}
            <AboutProgram />

            {/* Section: ¿A dónde va tu apoyo? */}
            <WhereFundsGo />

            {/* Section: Elige tu nivel de apoyo */}
            <SupportTiers onSelectTier={(tierId) => handleOpenRegister(tierId)} />

            {/* Section: ¿Cómo funciona? */}
            <HowItWorks onOpenRegister={() => handleOpenRegister()} />

            {/* Section: Beneficios para la empresa */}
            <CompanyBenefits />

            {/* Section: Tu apoyo genera impacto (Muestra de reporte) */}
            <ImpactReportPreview />

            {/* Section: Preguntas frecuentes */}
            <FaqSection />

            {/* Final CTA Section */}
            <FinalCta onOpenRegister={() => handleOpenRegister()} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenRegister={() => handleOpenRegister()}
        onNavigateHome={(section) => handleBackToHome(section)}
        onNavigateAdmin={() => handleOpenAdmin()}
      />
    </div>
  );
}


