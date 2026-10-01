import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, Map, Sparkles, ShieldAlert, Bell, Globe, 
  Search, User as UserIcon, Menu, X, Wallet, Award,
  ChevronDown, CheckCircle2, Building2, ShieldCheck, Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { TamilNaduLogo } from './TamilNaduLogo';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenSafety: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenSafety }) => {
  const { user, role, loginAs, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navPlanner'), path: '/planner', icon: Sparkles, highlight: true },
    { name: t('navDestinations'), path: '/destinations' },
    { name: t('navMap'), path: '/map', icon: Map },
    { name: t('navExperiences'), path: '/experiences' },
    { name: 'Events', path: '/#events', icon: Calendar },
    { name: t('navBudget'), path: '/budget', icon: Wallet },
    { name: t('navPass'), path: '/pass', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-charcoal-950/85 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Official Tamil Nadu Seal */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <TamilNaduLogo size={42} showText={false} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-terracotta-400 transition-colors">
                OORTRIP<span className="text-terracotta-500 ml-1">AI</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-terracotta-500/20 text-terracotta-400 border border-terracotta-500/30">
                TN
              </span>
            </div>
            <p className="text-[11px] text-warmwhite-300/70 hidden sm:block tracking-wide font-normal">
              {t('tagline')}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  active
                    ? 'text-white bg-charcoal-800/90 shadow-sm border border-white/10'
                    : link.highlight
                    ? 'text-terracotta-400 hover:text-white hover:bg-terracotta-500/15'
                    : 'text-warmwhite-300 hover:text-white hover:bg-charcoal-800/50'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${link.highlight ? 'text-terracotta-400 animate-pulse' : ''}`} />}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors flex items-center gap-1.5 border border-white/5"
            title="Global Search"
          >
            <Search className="w-4 h-4" />
            <span className="hidden xl:inline text-xs text-warmwhite-300/60 font-mono bg-charcoal-900 px-1.5 py-0.5 rounded border border-white/10">⌘K</span>
          </button>

          {/* Safety SOS Quick Action */}
          <button
            onClick={onOpenSafety}
            className="px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-red-900/30"
            title="Emergency Safety & SOS"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 animate-bounce" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 rounded-lg text-warmwhite-300 hover:text-white hover:bg-charcoal-800 transition-colors flex items-center gap-1 border border-white/5"
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-warmwhite-300" />
              <span className="text-xs uppercase font-medium">{language}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-44 rounded-xl bg-charcoal-900/95 backdrop-blur-xl border border-white/15 shadow-depth-md p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setLangMenuOpen(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold text-warmwhite-300/60 border-b border-white/10 uppercase tracking-wider">
                  Select Language
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      language === lang.code
                        ? 'bg-terracotta-500/20 text-terracotta-400 font-semibold'
                        : 'text-warmwhite-200 hover:bg-charcoal-800'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-warmwhite-300/50 uppercase font-mono">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher & Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg bg-charcoal-850 hover:bg-charcoal-800 border border-white/10 text-xs text-white transition-all"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-terracotta-500/20 border border-terracotta-500/40 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-terracotta-400" />
                )}
              </div>
              <div className="text-left hidden md:block">
                <p className="font-semibold leading-none text-white text-[12px]">{user?.name || 'Guest'}</p>
                <p className="text-[10px] text-terracotta-400 capitalize leading-none mt-0.5">{role}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-warmwhite-300/60" />
            </button>

            {roleMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-xl bg-charcoal-900/95 backdrop-blur-xl border border-white/15 shadow-depth-lg p-2 z-50"
                onMouseLeave={() => setRoleMenuOpen(false)}
              >
                <div className="px-2.5 py-2 border-b border-white/10 mb-1.5">
                  <p className="text-xs text-warmwhite-300/60 font-semibold uppercase tracking-wider">Fast Role Switcher</p>
                  <p className="text-[11px] text-warmwhite-300/80 mt-0.5">Switch perspective instantly for demo:</p>
                </div>

                {/* 1-Click Role Switch Options */}
                <button
                  onClick={() => { loginAs('tourist'); setRoleMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    role === 'tourist' ? 'bg-terracotta-500/20 text-terracotta-400 font-semibold' : 'text-warmwhite-100 hover:bg-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-terracotta-400" />
                    <div>
                      <p className="font-medium leading-none">Tourist Demo</p>
                      <p className="text-[10px] text-warmwhite-300/60">Siva (1,250 Pts)</p>
                    </div>
                  </div>
                  {role === 'tourist' && <CheckCircle2 className="w-4 h-4 text-terracotta-400" />}
                </button>

                <button
                  onClick={() => { loginAs('business'); setRoleMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    role === 'business' ? 'bg-terracotta-500/20 text-terracotta-400 font-semibold' : 'text-warmwhite-100 hover:bg-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-oceanblue-400" />
                    <div>
                      <p className="font-medium leading-none">Local Business Demo</p>
                      <p className="text-[10px] text-warmwhite-300/60">Meenakshi Chettinad</p>
                    </div>
                  </div>
                  {role === 'business' && <CheckCircle2 className="w-4 h-4 text-oceanblue-400" />}
                </button>

                <button
                  onClick={() => { loginAs('admin'); setRoleMenuOpen(false); }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    role === 'admin' ? 'bg-terracotta-500/20 text-terracotta-400 font-semibold' : 'text-warmwhite-100 hover:bg-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-templegreen-400" />
                    <div>
                      <p className="font-medium leading-none">Tourism Admin Demo</p>
                      <p className="text-[10px] text-warmwhite-300/60">TN Dept of Tourism</p>
                    </div>
                  </div>
                  {role === 'admin' && <CheckCircle2 className="w-4 h-4 text-templegreen-400" />}
                </button>

                <div className="border-t border-white/10 mt-2 pt-2 flex flex-col gap-1">
                  <Link
                    to={role === 'admin' ? '/admin' : role === 'business' ? '/business' : '/dashboard'}
                    onClick={() => setRoleMenuOpen(false)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-white hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <span>Go to {role === 'admin' ? 'Admin Dashboard' : role === 'business' ? 'Business Portal' : 'Tourist Dashboard'}</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setRoleMenuOpen(false)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-warmwhite-300 hover:bg-charcoal-800 flex items-center gap-2"
                  >
                    <span>Login / Switch Account</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Plan My Journey CTA Button */}
          <Link
            to="/planner"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-xs tracking-wider uppercase shadow-depth-sm hover:shadow-glow-terracotta transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan My Journey</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-warmwhite-300 hover:text-white hover:bg-charcoal-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-charcoal-900 border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-charcoal-800 text-white font-semibold'
                  : 'text-warmwhite-300 hover:bg-charcoal-800 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <Link
              to={role === 'admin' ? '/admin' : role === 'business' ? '/business' : '/dashboard'}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-terracotta-400 font-semibold bg-terracotta-500/10"
            >
              Open {role.toUpperCase()} Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
