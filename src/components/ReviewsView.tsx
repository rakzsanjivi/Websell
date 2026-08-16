import React from 'react';
import { REVIEWS_DATA } from '../data/mockData';
import { Star, ShieldCheck, CheckCircle2, Building, ArrowRight } from 'lucide-react';

interface ReviewsViewProps {
  onScheduleAudit: () => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ onScheduleAudit }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 text-left">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3 font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase">
          <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
          ENTERPRISE VALIDATION & AUDIT LOGS
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-slate-950 tracking-tight uppercase mb-4">
          CLIENT VERIFICATION & ENGINEERING REVIEWS
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
          Trusted by Fortune 500 manufacturing plants, world-renowned architecture firms, and luxury commercial real estate groups for unmatched hydraulic accuracy.
        </p>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="bg-white border border-slate-200/90 p-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div>
          <div className="font-heading font-black text-3xl sm:text-4xl text-slate-950">99.98%</div>
          <div className="font-mono-tech text-xs text-slate-500 uppercase mt-1">FIRST-PASS CODE COMPLIANCE</div>
        </div>
        <div>
          <div className="font-heading font-black text-3xl sm:text-4xl text-slate-950">4,200+</div>
          <div className="font-mono-tech text-xs text-slate-500 uppercase mt-1">TECHNICAL AUDITS COMPLETED</div>
        </div>
        <div>
          <div className="font-heading font-black text-3xl sm:text-4xl text-slate-950">0</div>
          <div className="font-mono-tech text-xs text-slate-500 uppercase mt-1">STRUCTURAL HYDRAULIC FAILURES</div>
        </div>
        <div>
          <div className="font-heading font-black text-3xl sm:text-4xl text-[#ff4b1f]">100%</div>
          <div className="font-mono-tech text-xs text-slate-500 uppercase mt-1">LICENSED PE ENGINEERS</div>
        </div>
      </div>

      {/* Reviews Cards */}
      <div className="space-y-6 mb-12">
        {REVIEWS_DATA.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between relative overflow-hidden"
          >
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-mono-tech text-xs text-slate-400">|</span>
                <span className="font-mono-tech text-xs font-bold text-[#ff4b1f] uppercase">
                  {rev.projectScope}
                </span>
              </div>

              <blockquote className="text-slate-800 text-base sm:text-lg italic font-serif leading-relaxed">
                &ldquo;{rev.feedback}&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-600">
                <span className="font-bold text-slate-950">{rev.clientName}</span>
                <span>•</span>
                <span>{rev.role}</span>
                <span>•</span>
                <span className="text-slate-900 font-semibold">{rev.company}</span>
                <span>•</span>
                <span>{rev.location}</span>
              </div>
            </div>

            {/* Verification badge */}
            <div className="shrink-0 flex md:flex-col justify-between items-end md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 text-right font-mono-tech">
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                VERIFIED AUDIT
              </div>
              <div className="text-[11px] text-slate-400">
                PROTOCOL ID:
                <br />
                <span className="font-bold text-slate-800">{rev.verifiedAuditId}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                {rev.reviewDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-[#0b1220] text-white p-8 sm:p-12 border border-slate-800 text-center flex flex-col items-center">
        <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase mb-3 text-white">
          READY FOR A PROFESSIONAL SYSTEM ASSESSMENT?
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mb-8 font-sans">
          Schedule an audit with our licensed master engineers. We provide comprehensive on-site telemetry, documentation reviews, and code certification.
        </p>
        <button
          onClick={onScheduleAudit}
          className="bg-[#ff4b1f] hover:bg-[#e03a10] text-white font-mono-tech text-xs sm:text-sm font-bold tracking-wider py-4 px-8 uppercase transition-colors flex items-center gap-3 cursor-pointer shadow-lg"
        >
          <span>INITIATE AUDIT DISPATCH NOW</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
