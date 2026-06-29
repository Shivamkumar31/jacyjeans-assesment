export interface QuizData {
  height?: string;
  weight?: string;
  waist?: string;
  hip?: string;
  waistFit?: 'snug' | 'slightly-relaxed' | 'relaxed';
  rise?: 'high-rise' | 'mid-rise' | 'low-rise';
  thigh?: 'fitted' | 'relaxed' | 'loose';
  brands?: string[];
  brandSizes?: {
    [key: string]: string;
  };
  biggestIssue?: string;
}

export interface Question {
  id: string;
  label: string;
  type: 'dropdown' | 'input' | 'radio' | 'multi-select' | 'dependent';
  options?: string[];
  optional?: boolean;
  depends?: {
    question: string;
    values: string[];
  };
}
