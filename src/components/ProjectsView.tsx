import React, { useState } from 'react';
import { PROJECT_CASE_STUDIES } from '../data/mockData';
import { ScopeType } from '../types';
import { FileText, Cpu, CheckCircle2, ArrowUpRight, Compass, ShieldAlert } from 'lucide-react';

interface ProjectsViewProps {
  onScheduleAudit: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onScheduleAudit }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ScopeType>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(PROJECT_CASE_STUDIES[0]);

  const filteredProjects = activeFilter === 'all'
    ? PROJECT_CASE_STUDIES
    : PROJECT_CASE_STUDIES.filter((p) => p.scope === activeFilter);

  return (
    <div className="max-w-7xl mx-auto py-8 text-left">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3 font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase">
            <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
            TECHNICAL CASE ARCHIVE
          </div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-slate-950 tracking-tight uppercase">
            ENGINEERING SCHEMATICS & CASE STUDIES
          </h1>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 font-mono-tech text-xs">
          {(['all', 'industrial', 'commercial', 'luxury_residential'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 border transition-all cursor-pointer uppercase ${
                activeFilter === filter
                  ? 'bg-slate-950 text-white border-slate-950 font-bold'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-800'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Deep Dive Schematic Card */}
      <div className="bg-[#0c121e] text-white border border-slate-800 p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 blueprint-dark-grid opacity-30 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
              <span className="bg-[#ff4b1f] text-white px-2.5 py-1 font-bold uppercase">
                FEATURED AUDIT CASE
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">{selectedCaseStudy.blueprintSchematic}</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400">YEAR: {selectedCaseStudy.year}</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
              {selectedCaseStudy.title}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech text-slate-300 border-y border-slate-800 py-3">
              <div>
                <span className="text-slate-400 block">CLIENT / FACILITY:</span>
                <span className="text-white font-bold">{selectedCaseStudy.client}</span>
              </div>
              <div>
                <span className="text-slate-400 block">LOCATION:</span>
                <span className="text-white font-bold">{selectedCaseStudy.location}</span>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-mono-tech text-xs font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  THE HYDRAULIC CHALLENGE
                </h4>
                <p className="text-slate-300 font-sans text-xs sm:text-sm">
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-mono-tech text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  THE TITAN RE-ENGINEERED SOLUTION
                </h4>
                <p className="text-slate-300 font-sans text-xs sm:text-sm">
                  {selectedCaseStudy.solution}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {selectedCaseStudy.metrics.map((metric, i) => (
                <div key={i} className="bg-slate-900/90 border border-slate-700/60 p-3 text-center">
                  <div className="font-heading font-black text-lg sm:text-xl text-[#ff4b1f]">
                    {metric.value}
                  </div>
                  <div className="font-mono-tech text-[10px] text-slate-400 uppercase mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image / CAD Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative border border-slate-700 bg-slate-950 aspect-[4/3] overflow-hidden mb-4">
              <img
                src={selectedCaseStudy.imageUrl}
                alt={selectedCaseStudy.title}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              {/* CAD Crosshairs overlay */}
              <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#ff4b1f]"></div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 font-mono-tech text-[10px] bg-black/80 px-2 py-0.5 text-slate-300 border border-white/10">
                CAD SCHEMATIC REF: {selectedCaseStudy.id.toUpperCase()}
              </div>
            </div>

            <button
              onClick={onScheduleAudit}
              className="w-full bg-[#ff4b1f] hover:bg-[#e03a10] text-white font-mono-tech text-xs font-bold tracking-wider py-3.5 uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>REQUEST TECHNICAL AUDIT FOR SIMILAR SYSTEM</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of all case studies */}
      <h3 className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
        DOCUMENTED PROJECT LOGS ({filteredProjects.length})
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedCaseStudy(proj)}
            className={`bg-white border p-6 cursor-pointer transition-all duration-150 flex flex-col justify-between group ${
              selectedCaseStudy.id === proj.id
                ? 'border-slate-950 ring-2 ring-slate-950 shadow-md'
                : 'border-slate-200 hover:border-slate-400 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-tech text-slate-400 mb-3">
                <span className="text-[#ff4b1f] font-bold uppercase">{proj.scope.replace('_', ' ')}</span>
                <span>{proj.year}</span>
              </div>
              <h4 className="font-heading font-black text-lg text-slate-950 uppercase mb-2 group-hover:text-[#ff4b1f] transition-colors">
                {proj.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 mb-4 font-sans">
                {proj.challenge}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-mono-tech text-xs">
              <span className="text-slate-700 font-semibold">{proj.location}</span>
              <span className="text-slate-900 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
