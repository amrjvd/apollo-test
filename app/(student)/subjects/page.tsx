import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { SubjectIcon } from '@/components/apollo/subject-icon';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function SubjectsPage() {
  const student = api.getCurrentStudent();
  const subjects = api.getSubjects(student.gradeId);
  const grade = api.getGrade(student.gradeId);

  return (
    <div>
      <PageHeader title="درس‌ها" description={grade?.title} />
      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((subject) => {
          const chapters = api.getChapters(subject.id);
          const allTopics = chapters.flatMap((c) => api.getTopics(c.id));
          const allQuestions = allTopics.flatMap((t) => api.getQuestions(t.id));
          const topicProgress = allTopics.map((t) => api.getTopicProgress(t.id)).filter(Boolean);
          const answeredCount = topicProgress.reduce((sum, p) => sum + (p?.answered ?? 0), 0);
          const totalQuestions = allQuestions.length;
          const percent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

          return (
            <Card key={subject.id} className="p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${subject.color}15`, color: subject.color }}>
                  <SubjectIcon icon={subject.icon} className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{subject.title}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{subject.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {toPersianDigits(allTopics.length)} مبحث</span>
                <span>{toPersianDigits(totalQuestions)} سؤال</span>
                <span className="font-medium text-foreground">{toPersianDigits(percent)}٪</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
              </div>
              <Link href={`/subjects/${subject.id}`} className="mt-4 block">
                <Button variant="outline" className="w-full">
                  ادامه
                  <ChevronLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
