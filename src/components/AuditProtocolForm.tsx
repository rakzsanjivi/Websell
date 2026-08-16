import React, { useState } from 'react';
import { ScopeType, AuditFormData } from '../types';
import { TECHNICAL_DOMAINS } from '../data/mockData';
import { Factory, Building2, Home, Calendar, MapPin, ChevronDown, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuditProtocolFormProps {
  formData: AuditFormData;
  setFormData: React.Dispatch<React.SetStateAction<AuditFormData>>;
  onSubmitAudit: (data: AuditFormData) => void;
}

export const AuditProtocolForm: React.FC<AuditProtocolFormProps> = ({
  formData,
  setFormData,
  onSubmitAudit,
}) => {
  const [showContactFields, setShowContactFields] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scopeOptions: {
    id: ScopeType;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'industrial',
      title: 'INDUSTRIAL',
      description: 'Manufacturing & Processing Facilities',
      icon: <Factory className="w-5 h-5 text-[#ff4b1f]" />,
    },
    {
      id: 'commercial',
      title: 'COMMERCIAL',
      description: 'Office & Retail Structures',
      icon: <Building2 className="w-5 h-5 text-[#ff4b1f]" />,
    },
    {
      id: 'luxury_residential',
      title: 'LUXURY RESIDENTIAL',
      description: 'Custom Estates & Multi-Unit',
      icon: <Home className="w-5 h-5 text-[#ff4b1f]" />,
    },
  ];

  const handleScopeSelect = (scope: ScopeType) => {
    setFormData((prev) => ({ ...prev, scope }));
    if (errors.scope) {
      setErrors((prev) => ({ ...prev, scope: '' }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.primarySystem) {
      newErrors.primarySystem = 'Please select a primary technical domain.';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred audit date.';
    }
    if (!formData.zipCode || formData.zipCode.trim().length < 5) {
      newErrors.zipCode = 'Please enter a valid 5-digit site zip code.';
    }
    if (showContactFields) {
      if (!formData.clientName) newErrors.clientName = 'Contact name is required.';
      if (!formData.clientEmail || !formData.clientEmail.includes('@')) {
        newErrors.clientEmail = 'Valid email is required for dispatch confirmation.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showContactFields) {
      // Prompt user to fill contact info or submit directly
      setShowContactFields(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff4b1f', '#0f172a', '#38bdf8'],
        });
      } catch (err) {
        // ignore confetti errors
      }
      onSubmitAudit(formData);
    }, 600);
  };

  return (
    <div className="flex-1 max-w-3xl">
      {/* Hero Header matching the screenshot */}
      <div className="mb-10 text-left">
        {/* Monospace orange bullet tag */}
        <div className="flex items-center gap-2 mb-4 font-mono-tech text-xs font-bold text-[#ff4b1f] tracking-widest uppercase">
          <span className="inline-block w-2 h-2 bg-[#ff4b1f]"></span>
          TECHNICAL AUDIT PROTOCOL
        </div>

        {/* Big Bold Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight uppercase leading-[0.95] mb-5">
          INITIATE
          <br />
          TECHNICAL AUDIT
        </h1>

        {/* Subtitle paragraph */}
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-sans font-normal">
          Schedule a comprehensive assessment for industrial, commercial, or high-end residential plumbing systems. Precision engineering begins with an accurate baseline.
        </p>
      </div>

      {/* Main White Card Form matching the screenshot */}
      <form
        id="audit-protocol-form"
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200/90 shadow-sm p-6 sm:p-10 text-left relative"
      >
        {/* Subtle Tech Watermark in corner */}
        <div className="absolute top-4 right-4 font-mono-tech text-[10px] text-slate-300 pointer-events-none hidden sm:block">
          DOC. ID: TP-AUD-2025/REV.9
        </div>

        {/* ========================================================
            01. PROJECT SCOPE
        ======================================================== */}
        <section className="mb-10">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-950 tracking-tight uppercase">
              01. PROJECT SCOPE
            </h2>
            <span className="font-mono-tech text-xs font-semibold text-slate-600 uppercase tracking-wider">
              REQUIRED
            </span>
          </div>

          {/* 3 Scope Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {scopeOptions.map((opt) => {
              const isSelected = formData.scope === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  id={`scope-select-${opt.id}`}
                  onClick={() => handleScopeSelect(opt.id)}
                  className={`p-5 text-left border transition-all duration-150 relative cursor-pointer group flex flex-col justify-between min-h-[140px] ${
                    isSelected
                      ? 'border-slate-950 bg-slate-50/70 shadow-sm ring-1 ring-slate-950'
                      : 'border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50/40'
                  }`}
                >
                  {/* Top: Icon and Selection Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-1 rounded bg-orange-50 border border-orange-100">
                      {opt.icon}
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <div className="font-heading font-black text-sm tracking-wide text-slate-950 uppercase mb-1">
                      {opt.title}
                    </div>
                    <p className="text-xs text-slate-500 leading-snug font-sans">
                      {opt.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            02. SYSTEM FOCUS
        ======================================================== */}
        <section className="mb-10">
          <div className="pb-4 mb-6 border-b border-slate-100">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-950 tracking-tight uppercase">
              02. SYSTEM FOCUS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Primary System Dropdown */}
            <div>
              <label 
                htmlFor="primarySystem"
                className="block font-mono-tech text-xs font-bold uppercase text-slate-800 tracking-wider mb-2"
              >
                PRIMARY SYSTEM
              </label>
              <div className="relative">
                <select
                  id="primarySystem"
                  name="primarySystem"
                  value={formData.primarySystem}
                  onChange={handleInputChange}
                  className="w-full bg-white border-b-2 border-slate-300 hover:border-slate-600 focus:border-slate-950 py-3 pr-10 pl-1 text-sm font-sans text-slate-900 focus:outline-none appearance-none cursor-pointer rounded-none transition-colors"
                >
                  <option value="">Select Technical Domain</option>
                  {TECHNICAL_DOMAINS.map((domain) => (
                    <option key={domain.id} value={domain.name}>
                      {domain.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-3.5 pointer-events-none" />
              </div>
              {errors.primarySystem && (
                <p className="font-mono-tech text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.primarySystem}
                </p>
              )}
            </div>

            {/* Secondary System (Optional) Dropdown */}
            <div>
              <label 
                htmlFor="secondarySystem"
                className="block font-mono-tech text-xs font-bold uppercase text-slate-800 tracking-wider mb-2"
              >
                SECONDARY SYSTEM (OPTIONAL)
              </label>
              <div className="relative">
                <select
                  id="secondarySystem"
                  name="secondarySystem"
                  value={formData.secondarySystem}
                  onChange={handleInputChange}
                  className="w-full bg-white border-b-2 border-slate-300 hover:border-slate-600 focus:border-slate-950 py-3 pr-10 pl-1 text-sm font-sans text-slate-900 focus:outline-none appearance-none cursor-pointer rounded-none transition-colors"
                >
                  <option value="">Select Additional Domain</option>
                  <option value="None / Single Dedicated Domain">None / Dedicated Single Domain</option>
                  {TECHNICAL_DOMAINS.map((domain) => (
                    <option key={`sec-${domain.id}`} value={domain.name}>
                      {domain.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            03. AUDIT SCHEDULING
        ======================================================== */}
        <section className="mb-8">
          <div className="pb-4 mb-6 border-b border-slate-100">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-slate-950 tracking-tight uppercase">
              03. AUDIT SCHEDULING
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Preferred Date */}
            <div>
              <label 
                htmlFor="preferredDate"
                className="block font-mono-tech text-xs font-bold uppercase text-slate-800 tracking-wider mb-2"
              >
                PREFERRED DATE
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white border-b-2 border-slate-300 hover:border-slate-600 focus:border-slate-950 py-2.5 pr-10 pl-1 text-sm font-sans text-slate-900 focus:outline-none rounded-none transition-colors"
                />
                <Calendar className="w-4 h-4 text-slate-500 absolute right-2 top-3 pointer-events-none" />
              </div>
              {errors.preferredDate && (
                <p className="font-mono-tech text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Site Location Zip Code */}
            <div>
              <label 
                htmlFor="zipCode"
                className="block font-mono-tech text-xs font-bold uppercase text-slate-800 tracking-wider mb-2"
              >
                SITE LOCATION ZIP CODE
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="e.g. 90210"
                  maxLength={10}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full bg-white border-b-2 border-slate-300 hover:border-slate-600 focus:border-slate-950 py-2.5 pr-10 pl-1 text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-none transition-colors"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute right-2 top-3 pointer-events-none" />
              </div>
              {errors.zipCode && (
                <p className="font-mono-tech text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          {/* Project Notes */}
          <div className="mb-6">
            <label 
              htmlFor="projectNotes"
              className="block font-mono-tech text-xs font-bold uppercase text-slate-800 tracking-wider mb-2"
            >
              PROJECT NOTES
            </label>
            <textarea
              id="projectNotes"
              name="projectNotes"
              rows={3}
              placeholder="Provide brief context regarding current system status or specific concerns."
              value={formData.projectNotes}
              onChange={handleInputChange}
              className="w-full bg-white border-b-2 border-slate-300 hover:border-slate-600 focus:border-slate-950 py-2 pl-1 text-sm font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none transition-colors"
            ></textarea>
          </div>

          {/* Expandable Contact & Dispatch Details */}
          {showContactFields ? (
            <div className="bg-slate-50 p-5 border border-slate-200 mb-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-mono-tech text-xs font-bold uppercase text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  DISPATCH RECIPIENT & SITE CONTACT
                </span>
                <span className="font-mono-tech text-[10px] text-slate-500">
                  ENCRYPTED TRANSMISSION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-[11px] font-semibold text-slate-700 mb-1">
                    CLIENT / CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jonathan Mercer"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                  {errors.clientName && (
                    <p className="text-[10px] text-red-600 font-mono-tech mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] font-semibold text-slate-700 mb-1">
                    ORGANIZATION / FACILITY
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Bio-Tech Ltd."
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] font-semibold text-slate-700 mb-1">
                    OFFICIAL EMAIL FOR AUDIT REPORT *
                  </label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. jmercer@apexbiotech.com"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                  {errors.clientEmail && (
                    <p className="text-[10px] text-red-600 font-mono-tech mt-1">{errors.clientEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block font-mono-tech text-[11px] font-semibold text-slate-700 mb-1">
                    DIRECT PHONE / MOBILE
                  </label>
                  <input
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. (555) 392-8190"
                    className="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 mb-6 text-xs text-slate-600 font-mono-tech">
              <span>AUTOMATIC DISPATCH CALIBRATION READY</span>
              <button
                type="button"
                onClick={() => setShowContactFields(true)}
                className="text-slate-900 underline font-bold hover:text-[#ff4b1f] cursor-pointer"
              >
                ADD CONTACT INFO +
              </button>
            </div>
          )}
        </section>

        {/* ========================================================
            ACTION BUTTON: CONFIRM AUDIT REQUEST → (Orange matching screenshot)
        ======================================================== */}
        <div>
          <button
            type="submit"
            id="confirm-audit-btn"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#ff4b1f] hover:bg-[#e03a10] active:bg-[#c9300b] text-white font-mono-tech text-xs sm:text-sm font-bold tracking-wider py-4 px-8 uppercase transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg focus:outline-none disabled:opacity-75"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                TRANSMITTING PROTOCOL...
              </span>
            ) : (
              <>
                <span>CONFIRM AUDIT REQUEST</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
