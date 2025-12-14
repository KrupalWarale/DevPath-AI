export interface RepoMetadata {
  owner: string;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  updatedAt: string;
  languages: Record<string, number>;
  fileStructure: string; // Simplified string representation
  readmeContent: string;
}

export interface AnalysisDimension {
  name: string;
  score: number; // 0-100
  feedback: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  overallScore: number;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  dimensions: AnalysisDimension[];
  roadmap: RoadmapStep[];
  strengths: string[];
  weaknesses: string[];
}
