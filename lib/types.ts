export type Status = 'active' | 'draft';

export interface Grade {
  id: string;
  title: string;
  description: string;
  status: Status;
  sortOrder: number;
}

export interface Subject {
  id: string;
  gradeId: string;
  title: string;
  description: string;
  icon: SubjectIcon;
  color: string;
  status: Status;
  sortOrder: number;
}

export type SubjectIcon = 'biology' | 'chemistry' | 'physics' | 'math' | 'geology' | 'literature';

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  status: Status;
  sortOrder: number;
}

export interface Topic {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  hasVideo: boolean;
  status: Status;
  sortOrder: number;
}

export interface Question {
  id: string;
  topicId: string;
  text: string;
  options: [string, string, string, string];
  correctOption: 0 | 1 | 2 | 3;
  explanation: string;
  status: Status;
  sortOrder: number;
}

export interface Video {
  id: string;
  topicId: string;
  title: string;
  url: string;
  thumbnail: string;
  durationSec: number;
  status: Status;
}

export interface QuestionAnswer {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean;
  skipped: boolean;
}

export interface LearningHistoryItem {
  id: string;
  date: string;
  topicId: string;
  topicTitle: string;
  subjectTitle: string;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  answers: QuestionAnswer[];
}

export interface TopicProgress {
  topicId: string;
  answered: number;
  correct: number;
  total: number;
  lastPracticed: string | null;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  gradeId: string;
  targetExam: string;
  joinedAt: string;
  lastActive: string;
  questionsToday: number;
  totalQuestions: number;
  avgScore: number;
  streak: number;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
  mobile: string;
  gradeId: string;
  targetExam: string;
  email: string;
  avatar?: string;
}
