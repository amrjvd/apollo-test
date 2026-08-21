import Link from 'next/link';
import { ChevronLeft, PencilRuler, FileQuestion } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { SubjectIcon } from '@/components/apollo/subject-icon';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function PracticePage() {
  const student = api.getCurrentStudent();
  const subjects = api.getSubjects(student.gradeId);
  const allTopics = subjects.flatMap((s) =>
    api.getChapters(s.id).flatMap((c) => api.getTopics(c.id).map((t) => ({ ...t, subject: s })))
  );

  return (
    <div>
      <PageHeader title="تمرین" description="مبحثی را برای شروع تمرین انتخاب کن" />
      <div className="space-y-6">
        {subjects.map((subject) => {
          const topics = api.getChapters(subject.id).flatMap((c) => api.getTopics(c.id));
          if (topics.length === 0) return null;
          return (
            <div key={subject.id}>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${subject.color}15`, color: subject.color }}>
                  <SubjectIcon icon={subject.icon} className="h-4 w-4" />
                </div>
                <h2 className="font-semibold">{subject.title}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {topics.map((topic) => {
                  const questions = api.getQuestions(topic.id);
                  const progress = api.getTopicProgress(topic.id);
                  const answered = progress?.answered ?? 0;
                  const percent = questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0;
                  return (
                    <Link key={topic.id} href={`/practice/${topic.id}`}>
                      <Card className="p-4 transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{topic.title}</p>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <FileQuestion className="h-3.5 w-3.5" /> {toPersianDigits(questions.length)} سؤال
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {percent > 0 && <span className="text-sm font-medium text-primary">{toPersianDigits(percent)}٪</span>}
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                              <PencilRuler className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
