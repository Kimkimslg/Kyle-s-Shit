export type Industry = 'defense' | 'mobility' | 'electronics' | 'energy' | 'cosmetics' | 'finance';

export type ProblemType = 'Structural' | 'Market' | 'Financial' | 'Organizational' | 'Technical' | 'Logistics';

export type DiscussionType = 'Agree' | 'Counter' | 'Evidence' | 'Suggestion' | 'Question';

export interface Author {
  id: string;
  name: string;
  role?: string;
}

export interface Metrics {
  discussionCount: number;
  agreeCount: number;
  counterCount: number;
  bookmarkCount: number;
}

export interface Analysis {
  id: string;
  title: string;
  industry: Industry;
  company: string;
  topic: string;
  problemType: ProblemType;
  oneLineSummary: string;
  problemDefinition: string;
  background: string;
  causeAnalysis: string;
  currentResponseEvaluation: string;
  proposedStrategy: string;
  risksLimitations: string;
  counterarguments: string;
  references: string[];
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  author: Author;
  metrics: Metrics;
}

export interface Discussion {
  id: string;
  analysisId: string;
  sectionKey: keyof Analysis | 'general';
  type: DiscussionType;
  author: Author;
  content: string;
  createdAt: any; // Firestore Timestamp
}
