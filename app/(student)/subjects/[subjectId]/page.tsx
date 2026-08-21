import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, BookOpen, FileQuestion } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function ChaptersPage({ params }: { params: { subjectId: string } }) {
  const subject = api.getSubject(params.subjectId);
  if (!subject) notFound();

  const chapters = api.getChapters(subject.id);

  return (
    <div>
      <PageHeader title={subject.title} description={subject.description} />
      <div className="space-y-3">
        {chapters.map((chapter, idx) => {
          const topics = api.getTopics(chapter.id);
          const allQuestions = topics.flatMap((t) => api.getQuestions(t.id));
          const topicProgress = topics.map((t) => api.getTopicProgress(t.id)).filter(Boolean);
          const completedTopics = topicProgress.filter((p) => p && p.answered >= p.total).length;
          const answeredCount = topicProgress.reduce((sum, p) => sum + (p?.answered ?? 0), 0);
          const totalQuestions = allQuestions.length;
          const percent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

          return (
            <Link key={chapter.id} href={`/subjects/${subject.id}/${chapter.id}`}>
              <Card className="p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                    {toPersianDigits(idx + 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{chapter.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{chapter.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {toPersianDigits(topics.length)} مبحث</span>
                      <span className="flex items-center gap-1.5"><FileQuestion className="h-4 w-4" /> {toPersianDigits(totalQuestions)} سؤال</span>
                      {completedTopics > 0 && <span className="text-success">{toPersianDigits(completedTopics)} مبحث تکمیل‌شده</span>}
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-sm font-medium">{toPersianDigits(percent)}٪</span>
                    </div>
                  </div>
                  <ChevronLeft className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
      <Link href="/subjects">
        <Button variant="ghost" className="mt-6">
          <ChevronRight className="ml-2 h-4 w-4" />
          بازگشت به درس‌ها
        </Button>
      </Link>
    </div>
  );
}
