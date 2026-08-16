export type ScopeType = 'industrial' | 'commercial' | 'luxury_residential';

export type ActiveTab = 'audit' | 'services' | 'projects' | 'technical' | 'reviews';

export interface AuditFormData {
  scope: ScopeType;
  primarySystem: string;
  secondarySystem: string;
  preferredDate: string;
  preferredTimeSlot?: string;
  zipCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  organizationName: string;
  projectNotes: string;
  urgencyLevel: 'standard' | 'priority' | 'emergency';
}

export interface TechnicalDomain {
  id: string;
  name: string;
  category: 'hydraulic' | 'thermal' | 'containment' | 'process' | 'sanitary';
  description: string;
  standardCompliance: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: ScopeType;
  tagline: string;
  description: string;
  capabilities: string[];
  specs: {
    maxPressure: string;
    pipeDiameters: string;
    certifications: string[];
    typicalDowntimeReduction: string;
  };
  imageUrl: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  location: string;
  scope: ScopeType;
  year: number;
  systemType: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  blueprintSchematic: string;
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  projectScope: string;
  rating: number;
  reviewDate: string;
  feedback: string;
  verifiedAuditId: string;
}
