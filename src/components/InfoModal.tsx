import React from 'react';
import { X, ShieldCheck, FileCode2, Users, FileText } from 'lucide-react';

interface InfoModalProps {
  type: 'privacy' | 'terms' | 'specs' | 'careers' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'PRIVACY POLICY & DATA SECURITY',
      icon: <ShieldCheck className="w-5 h-5 text-[#ff4b1f]" />,
      text: (
        <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
          <p>
            Titan Industrial Plumbing adheres to strict NDA and industrial security standards. All facility schematics, architectural CAD files, and hydraulic telemetry data gathered during technical audits remain the proprietary property of the facility owner.
          </p>
          <p>
            We do not share, sell, or disclose proprietary process piping layouts, biological cleanroom designs, or municipal compliance audit logs to any third-party entities.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'TERMS OF TECHNICAL SERVICE',
      icon: <FileText className="w-5 h-5 text-[#ff4b1f]" />,
      text: (
        <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
          <p>
            1. <strong>Scope of Evaluation</strong>: All technical audits performed by Titan Plumbing engineers are non-invasive diagnostic baseline inspections governed by ASME B31.3 and IPC standards.
          </p>
          <p>
            2. <strong>Engineering Guarantee</strong>: Diagnostic findings and structural recommendations are sealed by a licensed Professional Engineer (PE).
          </p>
        </div>
      ),
    },
    specs: {
      title: 'TECHNICAL SPECIFICATIONS & CODE MATRIX',
      icon: <FileCode2 className="w-5 h-5 text-[#ff4b1f]" />,
      text: (
        <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
          <div className="bg-slate-100 p-3 font-mono-tech text-[11px] space-y-1">
            <div>• ASME B31.3: Process Piping Standard</div>
            <div>• ASME Section IV: Heating Boilers</div>
            <div>• AWWA C502: Fire Protection Dry-Barrel Hydrants</div>
            <div>• NSF/ANSI 61: Drinking Water System Components</div>
            <div>• NFPA 99: Health Care Facilities Code</div>
          </div>
          <p>
            All pipe installations utilize Type L/K copper, 316L orbital welded stainless steel, or Schedule 80 industrial CPVC with hydro-tested joints up to 150% working pressure.
          </p>
        </div>
      ),
    },
    careers: {
      title: 'ENGINEERING CAREERS @ TITAN',
      icon: <Users className="w-5 h-5 text-[#ff4b1f]" />,
      text: (
        <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
          <p>
            We are actively hiring licensed Mechanical Engineers (PE), ASME Section IX Certified Pipefitters & Orbital Welders, and Hydraulic Commissioning Technicians.
          </p>
          <div className="bg-slate-100 p-3 font-mono-tech text-[11px]">
            <div>OPEN ROLES:</div>
            <div className="text-slate-900 font-bold">• Lead MEP Audit Engineer (High-Rise & Industrial)</div>
            <div className="text-slate-900 font-bold">• ASME Cleanroom Piping Specialist</div>
            <div className="text-slate-900 font-bold">• Hydraulic Scada Controls Programmer</div>
          </div>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="bg-white border border-slate-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 text-left relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            {current.icon}
            <h3 className="font-heading font-black text-lg text-slate-950 uppercase">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 p-1 cursor-pointer focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">{current.text}</div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-950 hover:bg-[#ff4b1f] text-white font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
