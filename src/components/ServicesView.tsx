import React from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ScopeType } from '../types';
import { Shield, Check, ArrowRight, Gauge, Layers, Wrench } from 'lucide-react';

interface ServicesViewProps {
  onSelectScopeForAudit: (scope: ScopeType) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onSelectScopeForAudit }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 text-left">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3 font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase">
          <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
          ENGINEERING CAPABILITIES MATRIX
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-slate-950 tracking-tight uppercase mb-4">
          TECHNICAL SERVICES & MECHANICAL ARCHITECTURE
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
          From extreme-pressure industrial chemical loops to multi-zone high-rise riser matrices and silent estate hydronics, Titan delivers engineered mechanical solutions built to ASME and IPC standards.
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-16">
        {SERVICES_DATA.map((service, index) => (
          <div
            key={service.id}
            id={`service-${service.id}`}
            className="bg-white border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative"
          >
            {/* Index badge */}
            <div className="absolute top-4 right-4 font-mono-tech text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1">
              0{index + 1} / SERVICE SPEC
            </div>

            {/* Left/Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase mb-2">
                  {service.category.replace('_', ' ')}
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-950 uppercase mb-3">
                  {service.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Capabilities list */}
                <div className="mb-8">
                  <h4 className="font-mono-tech text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    CORE TECHNICAL CAPABILITIES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#ff4b1f] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specs box */}
                <div className="bg-slate-50 border border-slate-200 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div>
                    <div className="font-mono-tech text-[10px] text-slate-600 uppercase">MAX TOLERANCE</div>
                    <div className="font-mono-tech text-xs font-bold text-slate-900 mt-0.5">{service.specs.maxPressure}</div>
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] text-slate-600 uppercase">PIPE RANGE</div>
                    <div className="font-mono-tech text-xs font-bold text-slate-900 mt-0.5">{service.specs.pipeDiameters}</div>
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] text-slate-600 uppercase">CODE CODES</div>
                    <div className="font-mono-tech text-xs font-bold text-slate-900 mt-0.5">{service.specs.certifications.join(', ')}</div>
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] text-slate-600 uppercase">BENCHMARK</div>
                    <div className="font-mono-tech text-xs font-bold text-emerald-600 mt-0.5">{service.specs.typicalDowntimeReduction}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectScopeForAudit(service.category)}
                  className="bg-slate-950 hover:bg-[#ff4b1f] text-white font-mono-tech text-xs font-bold tracking-wider py-3.5 px-6 uppercase transition-colors inline-flex items-center gap-3 cursor-pointer"
                >
                  <span>INITIATE {service.category.replace('_', ' ')} AUDIT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right/Visual Column */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[300px] lg:min-h-full">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm p-4 border border-white/10 text-white">
                  <div className="font-mono-tech text-[11px] text-[#ff4b1f] uppercase tracking-wider mb-1">
                    ENGINEERING BENCHMARK
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    {service.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
