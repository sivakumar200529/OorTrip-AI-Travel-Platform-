import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, Map, User, Home, Award } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AIAssistantDrawer } from './components/common/AIAssistantDrawer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { SafetyModal } from './components/common/SafetyModal';

import { LandingPage } from './pages/LandingPage';
import { AITripPlannerPage } from './pages/AITripPlannerPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { SmartMapPage } from './pages/SmartMapPage';
import { TouristDashboardPage } from './pages/TouristDashboardPage';
import { SmartBudgetPage } from './pages/SmartBudgetPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DigitalPassPage } from './pages/DigitalPassPage';
import { MyJourneyPage } from './pages/MyJourneyPage';
import { BusinessDashboardPage } from './pages/BusinessDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { role } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [safetyOpen, setSafetyOpen] = useState(false);

  // Determine if on map page (which has full-height viewport)
  const isMap = location.pathname === '/map';

  return (
    <div className="min-h-screen bg-charcoal-950 text-warmwhite-100 flex flex-col font-sans selection:bg-terracotta-500 selection:text-white pb-16 lg:pb-0">
      
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSafety={() => setSafetyOpen(true)}
      />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/planner" element={<AITripPlannerPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/map" element={<SmartMapPage />} />
          <Route path="/dashboard" element={<TouristDashboardPage />} />
          <Route path="/budget" element={<SmartBudgetPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/pass" element={<DigitalPassPage />} />
          <Route path="/journey" element={<MyJourneyPage />} />
          <Route path="/business" element={<BusinessDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {/* Global Floating AI Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Global Safety SOS Modal */}
      <SafetyModal
        isOpen={safetyOpen}
        onClose={() => setSafetyOpen(false)}
      />

      {/* Footer (hidden on interactive map view for full screen immersion) */}
      {!isMap && <Footer />}

      {/* Mobile Bottom Navigation (Section 43) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal-950/95 backdrop-blur-xl border-t border-white/10 px-3 py-2 flex items-center justify-around text-[10px]">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === '/' ? 'text-terracotta-400 font-bold' : 'text-warmwhite-300/70 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <Link
          to="/destinations"
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname.startsWith('/destinations') ? 'text-terracotta-400 font-bold' : 'text-warmwhite-300/70 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Explore</span>
        </Link>

        <Link
          to="/planner"
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === '/planner' ? 'text-terracotta-400 font-bold' : 'text-warmwhite-300/70 hover:text-white'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-terracotta-500 text-white flex items-center justify-center -mt-3 shadow-md shadow-terracotta-500/40">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Plan Trip</span>
        </Link>

        <Link
          to="/map"
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === '/map' ? 'text-terracotta-400 font-bold' : 'text-warmwhite-300/70 hover:text-white'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Map</span>
        </Link>

        <Link
          to={role === 'admin' ? '/admin' : role === 'business' ? '/business' : '/dashboard'}
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === '/dashboard' || location.pathname === '/admin' || location.pathname === '/business'
              ? 'text-terracotta-400 font-bold'
              : 'text-warmwhite-300/70 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </Link>
      </nav>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};
export default App;
