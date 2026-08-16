import React, { useState } from 'react';
import { Calculator, Gauge, Cpu, Sliders, ShieldCheck, Zap, Info } from 'lucide-react';

export const TechnicalView: React.FC = () => {
  // Calculator state
  const [flowRateGPM, setFlowRateGPM] = useState<number>(45);
  const [pipeDiameterInches, setPipeDiameterInches] = useState<number>(2.0);
  const [pipeLengthFeet, setPipeLengthFeet] = useState<number>(120);
  const [pipeMaterial, setPipeMaterial] = useState<'copper' | 'stainless_316' | 'pvc_sch80' | 'cast_iron'>('stainless_316');

  // Roughness values (Hazen-Williams C coefficient)
  const cFactors: Record<string, number> = {
    copper: 150,
    stainless_316: 150,
    pvc_sch80: 140,
    cast_iron: 100,
  };

  // Calculations:
  // Fluid velocity (ft/s) = (0.4085 * GPM) / (d^2)
  const velocity = (0.4085 * flowRateGPM) / Math.pow(pipeDiameterInches, 2);
  
  // Hazen-Williams Head Loss: h_f (feet of head per 100 ft) = 0.2083 * (100 / C)^1.852 * (GPM^1.852 / d^4.8655)
  const c = cFactors[pipeMaterial] || 140;
  const headLossPer100 = 0.2083 * Math.pow(100 / c, 1.852) * (Math.pow(flowRateGPM, 1.852) / Math.pow(pipeDiameterInches, 4.8655));
  const totalHeadLossFeet = (headLossPer100 * pipeLengthFeet) / 100;
  const pressureDropPSI = totalHeadLossFeet * 0.4335; // 1 ft head = 0.4335 psi water

  // Velocity status
  let velocityStatus = 'OPTIMAL';
  let velocityColor = 'text-emerald-600';
  if (velocity < 2.0) {
    velocityStatus = 'LOW VELOCITY (Risk of Sedimentation)';
    velocityColor = 'text-amber-600';
  } else if (velocity > 8.0) {
    velocityStatus = 'CRITICAL (High Erosion & Water Hammer Risk)';
    velocityColor = 'text-red-600';
  } else if (velocity > 5.0) {
    velocityStatus = 'MODERATE (Design Limit for Domestic Water)';
    velocityColor = 'text-blue-600';
  }

  return (
    <div className="max-w-7xl mx-auto py-8 text-left">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3 font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase">
          <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
          HYDRAULIC COMPUTATION SUITE
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-slate-950 tracking-tight uppercase mb-4">
          TECHNICAL METROLOGY & HYDRAULIC SIZING
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
          Interactive engineering models for fluid flow velocities, Hazen-Williams dynamic pressure loss, and ASME/IPC regulatory tolerances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Calculator Inputs (Left) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <h3 className="font-heading font-black text-xl text-slate-950 uppercase flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#ff4b1f]" />
              HAZEN-WILLIAMS PRESSURE DROP MODEL
            </h3>
            <span className="font-mono-tech text-xs text-slate-400">STD: AWWA/ASME</span>
          </div>

          <div className="space-y-6">
            {/* Flow Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono-tech text-xs font-bold uppercase text-slate-800">
                  DESIGN FLOW RATE (GPM):
                </label>
                <span className="font-mono-tech text-sm font-black text-slate-950 bg-slate-100 px-3 py-1 border border-slate-200">
                  {flowRateGPM} GPM
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="300"
                step="5"
                value={flowRateGPM}
                onChange={(e) => setFlowRateGPM(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff4b1f]"
              />
              <div className="flex justify-between text-[10px] font-mono-tech text-slate-400 mt-1">
                <span>5 GPM (Fixture Branch)</span>
                <span>150 GPM (Commercial Riser)</span>
                <span>300 GPM (Industrial Header)</span>
              </div>
            </div>

            {/* Pipe Diameter Selector */}
            <div>
              <label className="block font-mono-tech text-xs font-bold uppercase text-slate-800 mb-2">
                INTERNAL PIPE DIAMETER (INCHES):
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 font-mono-tech text-xs">
                {[0.75, 1.0, 1.25, 1.5, 2.0, 2.5, 3.0, 4.0, 6.0].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPipeDiameterInches(d)}
                    className={`py-2 border text-center transition-all cursor-pointer font-bold ${
                      pipeDiameterInches === d
                        ? 'bg-slate-950 text-white border-slate-950'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {d}&quot;
                  </button>
                ))}
              </div>
            </div>

            {/* Pipe Length Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-mono-tech text-xs font-bold uppercase text-slate-800">
                  EQUIVALENT RUN LENGTH (FEET):
                </label>
                <span className="font-mono-tech text-sm font-black text-slate-950 bg-slate-100 px-3 py-1 border border-slate-200">
                  {pipeLengthFeet} FT
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={pipeLengthFeet}
                onChange={(e) => setPipeLengthFeet(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff4b1f]"
              />
            </div>

            {/* Pipe Material Selector */}
            <div>
              <label className="block font-mono-tech text-xs font-bold uppercase text-slate-800 mb-2">
                METALLURGY & MATERIAL SPEC:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'stainless_316', label: '316L SS', desc: 'C = 150' },
                  { id: 'copper', label: 'Type L Copper', desc: 'C = 150' },
                  { id: 'pvc_sch80', label: 'CPVC Sch 80', desc: 'C = 140' },
                  { id: 'cast_iron', label: 'Ductile Iron', desc: 'C = 100' },
                ].map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setPipeMaterial(mat.id as any)}
                    className={`p-2.5 border text-left cursor-pointer transition-all ${
                      pipeMaterial === mat.id
                        ? 'border-slate-950 bg-slate-50 ring-1 ring-slate-950'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="font-mono-tech text-xs font-bold text-slate-950">{mat.label}</div>
                    <div className="font-mono-tech text-[10px] text-slate-500">{mat.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Computed Outputs (Right) */}
        <div className="lg:col-span-5 bg-[#0b1220] text-white p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <h4 className="font-mono-tech text-xs font-bold tracking-widest text-[#ff4b1f] uppercase">
                HYDRAULIC TELEMETRY OUTPUT
              </h4>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <div className="space-y-6">
              {/* Pressure Drop Display */}
              <div className="bg-slate-900/90 border border-slate-700/80 p-5">
                <div className="font-mono-tech text-[11px] text-slate-400 uppercase mb-1">
                  TOTAL DELTA-P LOSS
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-4xl sm:text-5xl text-white">
                    {pressureDropPSI.toFixed(2)}
                  </span>
                  <span className="font-mono-tech text-base text-[#ff4b1f] font-bold">PSI</span>
                </div>
                <div className="font-mono-tech text-xs text-slate-400 mt-1">
                  = {totalHeadLossFeet.toFixed(2)} FT OF WATER HEAD
                </div>
              </div>

              {/* Fluid Velocity */}
              <div className="bg-slate-900/90 border border-slate-700/80 p-5">
                <div className="font-mono-tech text-[11px] text-slate-400 uppercase mb-1">
                  CALCULATED FLUID VELOCITY
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-white">
                    {velocity.toFixed(2)}
                  </span>
                  <span className="font-mono-tech text-sm text-slate-400">FT / SEC</span>
                </div>
                <div className={`font-mono-tech text-xs font-bold mt-2 ${velocityColor}`}>
                  ● {velocityStatus}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="border-t border-slate-800 pt-4 font-mono-tech text-xs text-slate-400 space-y-1.5">
                <div className="flex justify-between">
                  <span>PIPE FRICTION HEAD/100FT:</span>
                  <span className="text-white font-bold">{headLossPer100.toFixed(2)} FT</span>
                </div>
                <div className="flex justify-between">
                  <span>DESIGN STANDARD:</span>
                  <span className="text-white font-bold">IPC 604.4</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono-tech text-slate-400">
            ENGINEERING NOTE: Calibrated for potable water at 68°F (20°C). For chemical slurries or steam, a comprehensive on-site technical audit is required.
          </div>
        </div>
      </div>

      {/* Code Compliance & Standard Reference Matrix */}
      <div>
        <h3 className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
          ENGINEERING CODE STANDARDS REPOSITORY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6">
            <div className="font-mono-tech text-xs font-bold text-[#ff4b1f] uppercase mb-1">ASME B31.3</div>
            <h4 className="font-heading font-black text-lg text-slate-950 uppercase mb-2">PROCESS PIPING CODE</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Prescribes rules for piping typically found in petroleum refineries, chemical, pharmaceutical, textile, paper, and cryogenic plants.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6">
            <div className="font-mono-tech text-xs font-bold text-[#ff4b1f] uppercase mb-1">IPC 2024 / UPC</div>
            <h4 className="font-heading font-black text-lg text-slate-950 uppercase mb-2">INTERNATIONAL PLUMBING CODE</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Mandatory standards for water supply sizing, fixture unit load calculation, backflow prevention, and venting configurations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6">
            <div className="font-mono-tech text-xs font-bold text-[#ff4b1f] uppercase mb-1">NFPA 99</div>
            <h4 className="font-heading font-black text-lg text-slate-950 uppercase mb-2">HEALTH CARE FACILITIES</h4>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Standard for medical gas and vacuum systems, Category 1-3 piping, pressure testing, and certified sensor telemetry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
