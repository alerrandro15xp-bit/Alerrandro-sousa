export interface UserProfile {
  name: string;
  email: string;
  streakDays: number;
  avatarUrl: string;
}

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanationTitle: string;
  explanationBody: string;
  formulaDemo?: {
    step1: string;
    operator: string;
    step2: string;
    result: string;
  };
  tutorTip: string;
  bnccCode: string;
  visualData?: {
    numeratorA: number;
    denominatorA: number;
    numeratorB: number;
    denominatorB: number;
    labelA: string;
    labelB: string;
    percentage: string;
  };
}

export interface StudyModule {
  id: string;
  subjectId: 'matematica' | 'portugues' | 'ciencias' | 'historia';
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  badgeLabel?: string;
  completedQuestions: number;
  totalQuestions: number;
  accuracyPercentage?: number;
  estimatedMinutes?: number;
  lastStudied?: string;
  icon: string;
}

export interface SubjectData {
  id: 'matematica' | 'portugues' | 'ciencias' | 'historia';
  name: string;
  categoryName: string;
  description: string;
  icon: string;
  colorClass: string;
  progressPercentage: number;
  modulesCount: number;
  questionsAnswered: number;
  totalQuestions: number;
  streakDays: number;
  accuracyPercentage: number;
  modules: StudyModule[];
}

export interface DynamicLessonData {
  topicId: string;
  title: string;
  subtitle: string;
  readingTime: string;
  unitBadge: string;
  blocks: Array<{
    stepNumber: number;
    title: string;
    explanation: string;
    visualHint?: string;
    practicalExample?: {
      question: string;
      answer: string;
      stepByStep: string;
    };
  }>;
  quickRecap: string[];
}

export interface AdaptiveRecommendation {
  recommendedTopic: string;
  subjectId: 'matematica' | 'portugues' | 'ciencias' | 'historia';
  reason: string;
  studyTip: string;
  difficulty: 'reforço' | 'prática' | 'desafio';
}

export type ActiveScreen = 
  | 'auth'
  | 'dashboard'
  | 'subject-math'
  | 'subject-portuguese'
  | 'subject-ciencias'
  | 'subject-historia'
  | 'lesson-fractions'
  | 'dynamic-lesson'
  | 'quiz-fractions'
  | 'quiz-result'
  | 'progress';
