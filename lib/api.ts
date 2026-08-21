import {
  grades, subjects, chapters, topics, questions, videos,
  students, learningHistory, topicProgress, currentStudent,
} from './data';
import type {
  Grade, Subject, Chapter, Topic, Question, Video,
  Student, LearningHistoryItem, TopicProgress, StudentProfile,
} from './types';

// Service abstraction layer.
// Today this reads from in-memory mock data. Later this can be swapped
// to Supabase queries without changing any UI code.

export const api = {
  // ---- Grades ----
  getGrades(): Grade[] { return grades; },
  getGrade(id: string): Grade | undefined { return grades.find((g) => g.id === id); },

  // ---- Subjects ----
  getSubjects(gradeId?: string): Subject[] {
    return subjects.filter((s) => !gradeId || s.gradeId === gradeId);
  },
  getSubject(id: string): Subject | undefined { return subjects.find((s) => s.id === id); },

  // ---- Chapters ----
  getChapters(subjectId: string): Chapter[] {
    return chapters.filter((c) => c.subjectId === subjectId);
  },
  getChapter(id: string): Chapter | undefined { return chapters.find((c) => c.id === id); },

  // ---- Topics ----
  getTopics(chapterId: string): Topic[] {
    return topics.filter((t) => t.chapterId === chapterId);
  },
  getTopic(id: string): Topic | undefined { return topics.find((t) => t.id === id); },
  getAllTopics(): Topic[] { return topics; },

  // ---- Questions ----
  getQuestions(topicId: string): Question[] {
    return questions.filter((q) => q.topicId === topicId).sort((a, b) => a.sortOrder - b.sortOrder);
  },
  getQuestion(id: string): Question | undefined { return questions.find((q) => q.id === id); },
  getAllQuestions(): Question[] { return questions; },

  // ---- Videos ----
  getVideos(topicId?: string): Video[] {
    return videos.filter((v) => !topicId || v.topicId === topicId);
  },
  getVideo(id: string): Video | undefined { return videos.find((v) => v.id === id); },

  // ---- Student ----
  getCurrentStudent(): StudentProfile { return currentStudent; },
  getStudents(): Student[] { return students; },
  getStudent(id: string): Student | undefined { return students.find((s) => s.id === id); },

  // ---- Progress ----
  getTopicProgress(topicId: string): TopicProgress | undefined {
    return topicProgress.find((p) => p.topicId === topicId);
  },
  getAllProgress(): TopicProgress[] { return topicProgress; },

  // ---- History ----
  getLearningHistory(): LearningHistoryItem[] {
    return [...learningHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  getHistoryItem(id: string): LearningHistoryItem | undefined {
    return learningHistory.find((h) => h.id === id);
  },
};
