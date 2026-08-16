import React from 'react';
import { AuditFormData } from '../types';
import { ShieldCheck, Check, Calendar, MapPin, Download, Printer, X, FileText, UserCheck, AlertTriangle } from 'lucide-react';

interface AuditConfirmationModalProps {
  auditData: AuditFormData | null;
  protocolId: string;
  onClose: () => void;
}

export const AuditConfirmationModal: React.FC<AuditConfirmationModalProps> = ({
  auditData,
  protocolId,
  onClose,
}) => {
  if (!auditData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border-2 border-slate-900 shadow-2xl max-w-2xl w-full my-8 text-left relative animate-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="font-mono-tech text-xs font-bold tracking-widest text-[#ff4b1f] uppercase">
              TECHNICAL AUDIT PROTOCOL INITIATED
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Ticket */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Status Banner */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-mono-tech text-xs font-bold uppercase text-emerald-950">
                AUDIT DISPATCH CONFIRMED — PROTOCOL #{protocolId}
              </h3>
              <p className="text-xs text-emerald-800 font-sans mt-0.5">
                Our mechanical engineering team has received your technical baseline request and dispatched documentation review.
              </p>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="border border-slate-200 p-6 bg-slate-50/50 space-y-4 font-mono-tech text-xs">
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500">PROJECT SCOPE:</span>
              <span className="font-bold text-slate-900 uppercase">
                {auditData.scope.replace('_', ' ')}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500">PRIMARY SYSTEM DOMAIN:</span>
              <span className="font-bold text-slate-900">
                {auditData.primarySystem || 'High-Pressure Hydraulic Systems'}
              </span>
            </div>

            {auditData.secondarySystem && (
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">SECONDARY SYSTEM:</span>
                <span className="font-bold text-slate-800">
                  {auditData.secondarySystem}
                </span>
              </div>
            )}

            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500">SCHEDULED AUDIT DATE:</span>
              <span className="font-bold text-slate-900">
                {auditData.preferredDate || 'TBD (Earliest Engineer Slot)'}
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500">SITE JURISDICTION / ZIP:</span>
              <span className="font-bold text-slate-900">
                {auditData.zipCode} (Zone Verified)
              </span>
            </div>

            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500">ASSIGNED LEAD ENGINEER:</span>
              <span className="font-bold text-[#ff4b1f] flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" />
                MARCUS VANCE, PE #49201
              </span>
            </div>

            {auditData.clientName && (
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">SITE CONTACT / CLIENT:</span>
                <span className="font-bold text-slate-900">
                  {auditData.clientName} {auditData.organizationName ? `(${auditData.organizationName})` : ''}
                </span>
              </div>
            )}

            {auditData.projectNotes && (
              <div className="pt-2 text-slate-700">
                <span className="text-slate-500 block mb-1">CLIENT NOTES:</span>
                <p className="font-sans text-xs bg-white p-2.5 border border-slate-200 rounded-none italic">
                  &ldquo;{auditData.projectNotes}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Audit Protocol Guarantee */}
          <div className="grid grid-cols-3 gap-3 text-center font-mono-tech text-[10px] text-slate-600 bg-slate-100 p-3 border border-slate-200">
            <div>
              <div className="font-bold text-slate-900">2-HOUR ON-SITE</div>
              <div>Ultrasonic Telemetry</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">BLUEPRINT REVIEW</div>
              <div>CAD / MEP Schematics</div>
            </div>
            <div>
              <div className="font-bold text-slate-900">DIAGNOSTIC REPORT</div>
              <div>ASME B31.3 Certified</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="flex items-center gap-2 font-mono-tech text-xs text-slate-500">
            <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
            TITAN PLUMBING ENGINEERING DISPATCH
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 hover:border-slate-800 text-slate-800 font-mono-tech text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              PRINT RECEIPT
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2 bg-slate-950 hover:bg-[#ff4b1f] text-white font-mono-tech text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
