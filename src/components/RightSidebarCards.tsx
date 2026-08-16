import React from 'react';
import { ScopeType } from '../types';
import { Activity, Gauge, FileCheck2, Cpu, Wrench } from 'lucide-react';

interface RightSidebarCardsProps {
  selectedScope: ScopeType;
  primarySystem: string;
  secondarySystem: string;
  zipCode: string;
  preferredDate: string;
}

export const RightSidebarCards: React.FC<RightSidebarCardsProps> = ({
  selectedScope,
  primarySystem,
  secondarySystem,
  zipCode,
  preferredDate,
}) => {
  const hasInput = primarySystem !== '' || zipCode !== '' || preferredDate !== '';

  return (
    <aside className="space-y-6 lg:w-80 xl:w-96 shrink-0">
      {/* 1. Top Card: System Analysis Required (Matching Screenshot) */}
      <div 
        id="system-analysis-card"
        className="bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-sm p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[220px]"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 blueprint-bg-fine opacity-60 pointer-events-none"></div>

        {/* Technical Corner Accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-400"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-400"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-400"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-400"></div>

        {/* Icon & Status */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-800 border border-slate-300/80 group-hover:scale-105 group-hover:border-[#ff4b1f] transition-all">
            {/* Custom Drafting / Architect Caliper Lamp SVG */}
            <svg 
              className="w-7 h-7 text-slate-900" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 4h6v6" />
              <path d="M4 14v6h6" />
              <path d="M10 20l10-10" />
              <circle cx="14" cy="14" r="3" />
              <path d="m3 3 7 7" />
            </svg>
          </div>

          <span className="font-mono-tech text-xs font-bold tracking-[0.18em] text-slate-900 uppercase">
            SYSTEM ANALYSIS REQUIRED
          </span>

          {hasInput ? (
            <div className="mt-3 pt-3 border-t border-slate-200/80 w-full text-left space-y-1.5 font-mono-tech text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>ESTIMATED DURATION:</span>
                <span className="font-bold text-slate-900">2.0 - 3.5 HRS</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>DISPATCH DIVISION:</span>
                <span className="font-bold text-[#ff4b1f] uppercase">{selectedScope.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ACOUSTIC SCAN:</span>
                <span className="text-emerald-600 font-bold">READY</span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] font-mono-tech text-slate-600 mt-2 max-w-[200px] leading-relaxed">
              INITIALIZE PROJECT SCOPE & DOMAIN MATRIX BELOW TO CONFIGURE AUDIT PARAMETERS.
            </p>
          )}
        </div>
      </div>

      {/* 2. Middle Card: Dark Navy Technical Protocol Card (Matching Screenshot) */}
      <div 
        id="protocol-details-card"
        className="bg-[#0b1220] text-white p-7 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden"
      >
        {/* Subtle dark matrix accent lines */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4b1f]/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Title matching screenshot */}
        <h3 className="font-mono-tech text-[13px] font-bold tracking-widest text-[#ff4b1f] uppercase mb-6 flex items-center gap-2">
          AUDIT PROTOCOL DETAILS
        </h3>

        <div className="space-y-6 text-left">
          {/* Bullet 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-100 font-mono-tech text-xs font-bold tracking-wide uppercase">
              <span className="inline-block w-2 h-2 bg-[#ff4b1f] shrink-0"></span>
              INITIAL ASSESSMENT
            </div>
            <p className="text-xs text-slate-300 pl-4 leading-relaxed font-sans">
              A 2-hour on-site evaluation by a certified technical engineer.
            </p>
          </div>

          {/* Bullet 2 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-100 font-mono-tech text-xs font-bold tracking-wide uppercase">
              <span className="inline-block w-2 h-2 bg-[#ff4b1f] shrink-0"></span>
              DOCUMENTATION REVIEW
            </div>
            <p className="text-xs text-slate-300 pl-4 leading-relaxed font-sans">
              Analysis of existing blueprints and structural schematics.
            </p>
          </div>

          {/* Bullet 3 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-100 font-mono-tech text-xs font-bold tracking-wide uppercase">
              <span className="inline-block w-2 h-2 bg-[#ff4b1f] shrink-0"></span>
              DELIVERABLES
            </div>
            <p className="text-xs text-slate-300 pl-4 leading-relaxed font-sans">
              Comprehensive diagnostic report with structural recommendations.
            </p>
          </div>
        </div>

        {/* Audit Guarantee Seal */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-tech text-slate-300">
          <span>CODE: ISO/ASME B31.3</span>
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            PE CERTIFIED
          </span>
        </div>
      </div>

      {/* 3. Bottom Card: Precision Engineering Machined Fitting Photo (Matching Screenshot) */}
      <div 
        id="precision-engineering-card"
        className="relative overflow-hidden border border-slate-300 shadow-md group bg-slate-900 aspect-[4/3] flex flex-col justify-end"
      >
        {/* Stainless Steel Machined Valve Fitting Image */}
        <img
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
          alt="Precision Engineering Stainless Steel Valve Manifold"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Soft dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* High precision crosshair overlay */}
        <div className="absolute top-4 right-4 font-mono-tech text-[9px] text-white/80 bg-black/60 px-2 py-0.5 backdrop-blur-sm border border-white/20">
          TOLERANCE ±0.005mm
        </div>

        {/* White Bar Label matching screenshot */}
        <div className="relative z-10 m-4 bg-white/95 backdrop-blur-md px-4 py-3 text-center border border-slate-200/80 shadow-md">
          <span className="font-mono-tech text-xs font-black tracking-[0.2em] text-slate-900 uppercase">
            PRECISION ENGINEERING
          </span>
        </div>
      </div>
    </aside>
  );
};
