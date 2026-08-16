import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { ShieldCheck, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'services', label: 'SERVICES' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'technical', label: 'TECHNICAL' },
    { id: 'reviews', label: 'REVIEWS' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#f8fafc]/95 backdrop-blur-md border-b border-slate-200/80">
      {/* Top micro-bar for technical credentials */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-1 bg-slate-900 text-slate-400 text-[11px] font-mono-tech tracking-wider border-b border-slate-800">
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            DISPATCH ACTIVE: ZONE 01 - METRO & INDUSTRIAL CORRIDOR
          </span>
          <span className="text-slate-500">|</span>
          <span>ASME B31.3 & IPC 2024 CERTIFIED</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 flex items-center gap-1.5">
            <PhoneCall className="w-3 h-3 text-[#ff4b1f]" />
            ENGINEERING HOTLINE: (800) 848-2675
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => onSelectTab('audit')}
          className="text-left group flex items-center gap-3 cursor-pointer focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl sm:text-[28px] tracking-tight text-slate-950 leading-none group-hover:text-[#ff4b1f] transition-colors">
              TITAN PLUMBING
            </span>
            <span className="font-mono-tech text-[9px] tracking-[0.25em] text-slate-600 font-semibold uppercase mt-1">
              ARCHITECTURAL & INDUSTRIAL SYSTEMS
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`font-mono-tech text-[13px] font-bold tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#0f172a] border-b-2 border-slate-900 pb-1'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: SCHEDULE NOW with exact orange underline from screenshot */}
        <div className="hidden md:flex items-center">
          <button
            id="header-schedule-now-btn"
            onClick={() => onSelectTab('audit')}
            className="group relative cursor-pointer py-1.5 focus:outline-none"
          >
            <span className={`font-mono-tech text-[13px] font-bold tracking-wider transition-colors ${
              activeTab === 'audit' ? 'text-[#ff4b1f]' : 'text-[#ff4b1f] hover:text-[#e03a10]'
            }`}>
              SCHEDULE NOW
            </span>
            {/* Orange underline matching the screenshot */}
            <span className="block h-[2px] w-full bg-[#ff4b1f] mt-0.5 group-hover:h-[2.5px] transition-all"></span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            id="mobile-schedule-btn"
            onClick={() => onSelectTab('audit')}
            className="font-mono-tech text-[11px] font-bold text-[#ff4b1f] border-b border-[#ff4b1f] pb-0.5"
          >
            SCHEDULE
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-mono-tech text-sm py-2 px-3 rounded ${
                activeTab === item.id
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onSelectTab('audit');
              setMobileMenuOpen(false);
            }}
            className="w-full text-center py-2.5 mt-2 bg-[#ff4b1f] text-white font-mono-tech text-xs font-bold tracking-wider"
          >
            SCHEDULE TECHNICAL AUDIT →
          </button>
        </div>
      )}
    </header>
  );
};
