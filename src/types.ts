export type AudienceTarget = 'all' | 'high_school' | 'university';

export type SectionId = 
  | 'academic'
  | 'career'
  | 'wellness'
  | 'finance'
  | 'productivity';

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  sectionId: SectionId;
  targetAudience: AudienceTarget[];
  description: string;
  format: 'Template' | 'Guide' | 'Tool' | 'Cheatsheet' | 'Directory' | 'Checklist';
  badgeLabel?: string;
  contentSnippet?: string;
  downloadableText?: string;
  externalUrl?: string;
  isBookmarked?: boolean;
}

export interface WireframeBreakdown {
  sectionTitle: string;
  pedagogicalRationale: string;
  uxLayoutArchitecture: {
    zone: string;
    description: string;
    visualPriority: string;
  }[];
  keyActionableResources: string[];
  suggestedInteractiveComponents: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  targetLevel: 'High School' | 'Undergraduate' | 'Graduate' | 'All';
  category: 'STEM' | 'Need-Based' | 'Merit' | 'First-Gen' | 'Creative' | 'Diversity';
  description: string;
  eligibility: string;
  link: string;
}

export interface StudentDiscount {
  id: string;
  service: string;
  category: 'Software & Tech' | 'Entertainment & Audio' | 'Retail & Hardware' | 'Transit & Travel';
  discountOffer: string;
  regularPrice: string;
  studentPrice: string;
  verificationMethod: string;
  link: string;
  highlightNotes: string;
}

export interface TaskItem {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category: 'Assignment' | 'Exam' | 'Reading' | 'Project' | 'Administrative';
}
