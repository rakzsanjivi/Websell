import React from 'react';
import { Shield, Award, Cpu, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenSpecs?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenCareers?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSpecs,
  onOpenPrivacy,
  onOpenTerms,
  onOpenCareers,
}) => {
  return (
    <footer id="main-footer" className="bg-[#05070c] text-white border-t border-slate-800">
      {/* Upper technical badge bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#ff4b1f] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-200">ASME B31.3 CERTIFIED</div>
              <div className="text-xs text-slate-300 mt-0.5">High-Pressure Chemical & Process Fluidics</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#ff4b1f] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-200">MASTER HYDRAULIC PE</div>
              <div className="text-xs text-slate-300 mt-0.5">Licensed Mechanical Engineers on Every Audit</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-[#ff4b1f] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-200">ULTRASONIC TELEMETRY</div>
              <div className="text-xs text-slate-300 mt-0.5">Non-Invasive Acoustic & Delta-P Sensors</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#ff4b1f] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono-tech text-xs font-bold uppercase tracking-wider text-slate-200">GUARANTEED CODE APPROVAL</div>
              <div className="text-xs text-slate-300 mt-0.5">100% Pass Rate Across Municipal Jurisdictions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main bottom footer matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Logo & Headline */}
          <div className="space-y-1">
            <div className="font-heading font-black text-2xl tracking-tight text-white">
              TITAN
              <br className="sm:hidden" /> PLUMBING
            </div>
            <p className="font-mono-tech text-[10px] text-slate-300 tracking-widest uppercase">
              INDUSTRIAL & ARCHITECTURAL FLUIDIC ENGINEERING
            </p>
          </div>

          {/* Center Links matching screenshot */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono-tech text-xs text-slate-300">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              TERMS OF SERVICE
            </button>
            <button
              onClick={onOpenSpecs}
              className="hover:text-white transition-colors cursor-pointer"
            >
              TECHNICAL SPECS
            </button>
            <button
              onClick={onOpenCareers}
              className="hover:text-white transition-colors cursor-pointer"
            >
              CAREERS
            </button>
          </div>

          {/* Right Copyright matching screenshot */}
          <div className="font-mono-tech text-[11px] text-slate-300 text-left lg:text-right leading-relaxed max-w-sm">
            © 2024 TITAN INDUSTRIAL PLUMBING. ARCHITECTURAL PRECISION GUARANTEED.
          </div>
        </div>
      </div>
    </footer>
  );
};
