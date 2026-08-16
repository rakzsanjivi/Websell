import React, { useState } from 'react';
import { ActiveTab, AuditFormData, ScopeType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuditProtocolForm } from './components/AuditProtocolForm';
import { RightSidebarCards } from './components/RightSidebarCards';
import { ServicesView } from './components/ServicesView';
import { ProjectsView } from './components/ProjectsView';
import { TechnicalView } from './components/TechnicalView';
import { ReviewsView } from './components/ReviewsView';
import { AuditConfirmationModal } from './components/AuditConfirmationModal';
import { InfoModal } from './components/InfoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('audit');
  
  // Audit Form State
  const [formData, setFormData] = useState<AuditFormData>({
    scope: 'industrial',
    primarySystem: '',
    secondarySystem: '',
    preferredDate: '',
    preferredTimeSlot: '09:00 AM',
    zipCode: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    organizationName: '',
    projectNotes: '',
    urgencyLevel: 'standard',
  });

  // Modal states
  const [submittedAudit, setSubmittedAudit] = useState<AuditFormData | null>(null);
  const [protocolId, setProtocolId] = useState<string>('');
  const [infoModalType, setInfoModalType] = useState<'privacy' | 'terms' | 'specs' | 'careers' | null>(null);

  const handleSubmitAudit = (data: AuditFormData) => {
    // Generate realistic Protocol ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const scopePrefix = data.scope === 'industrial' ? 'IND' : data.scope === 'commercial' ? 'COM' : 'RES';
    const id = `TITAN-AUD-${randomSuffix}-${scopePrefix}`;
    
    setProtocolId(id);
    setSubmittedAudit(data);
  };

  const handleSelectScopeFromServices = (scope: ScopeType) => {
    setFormData((prev) => ({ ...prev, scope }));
    setActiveTab('audit');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col blueprint-bg text-slate-900 selection:bg-[#ff4b1f] selection:text-white">
      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'audit' && (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between items-start">
            {/* Left Main Column: Form & Hero */}
            <AuditProtocolForm
              formData={formData}
              setFormData={setFormData}
              onSubmitAudit={handleSubmitAudit}
            />

            {/* Right Column: 3 Architectural Cards */}
            <RightSidebarCards
              selectedScope={formData.scope}
              primarySystem={formData.primarySystem}
              secondarySystem={formData.secondarySystem}
              zipCode={formData.zipCode}
              preferredDate={formData.preferredDate}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <ServicesView onSelectScopeForAudit={handleSelectScopeFromServices} />
        )}

        {activeTab === 'projects' && (
          <ProjectsView onScheduleAudit={() => setActiveTab('audit')} />
        )}

        {activeTab === 'technical' && <TechnicalView />}

        {activeTab === 'reviews' && (
          <ReviewsView onScheduleAudit={() => setActiveTab('audit')} />
        )}
      </main>

      {/* Confirmation Modal */}
      {submittedAudit && (
        <AuditConfirmationModal
          auditData={submittedAudit}
          protocolId={protocolId}
          onClose={() => setSubmittedAudit(null)}
        />
      )}

      {/* Info Modals (Privacy, Terms, Specs, Careers) */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Persistent Technical Footer matching the screenshot */}
      <Footer
        onOpenPrivacy={() => setInfoModalType('privacy')}
        onOpenTerms={() => setInfoModalType('terms')}
        onOpenSpecs={() => setInfoModalType('specs')}
        onOpenCareers={() => setInfoModalType('careers')}
      />
    </div>
  );
}
