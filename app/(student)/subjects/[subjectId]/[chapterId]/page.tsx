import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight, PlayCircle, FileQuestion, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function TopicsPage({ params }: { params: { subjectId: string; chapterId: string } }) {
  const subject = api.getSubject(params.subjectId);
  const chapter = api.getChapter(params.chapterId);
  if (!subject || !chapter) notFound();

  const topics = api.getTopics(chapter.id);

  return (
    <div>
      <PageHeader title={chapter.title} description={chapter.description} />
      <div className="space-y-3">
        {topics.map((topic) => {
          const questions = api.getQuestions(topic.id);
          const progress = api.getTopicProgress(topic.id);
          const answered = progress?.answered ?? 0;
          const correct = progress?.correct ?? 0;
          const percent = progress && progress.total > 0 ? Math.round((answered / questions.length) * 100) : 0;
          const isComplete = progress && answered >= questions.length && questions.length > 0;

          return (
            <Card key={topic.id} className="p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{topic.title}</h3>
                    {isComplete && <CheckCircle2 className="h-4 w-4 text-success" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{topic.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><FileQuestion className="h-4 w-4" /> {toPersianDigits(questions.length)} سؤال</span>
                    {topic.hasVideo && (
                      <span className="flex items-center gap-1.5 text-primary"><PlayCircle className="h-4 w-4" /> ویدیو دارد</span>
                    )}
                    {answered > 0 && <span>{toPersianDigits(answered)} از {toPersianDigits(questions.length)} پاسخ‌شده</span>}
                  </div>
                  {percent > 0 && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-sm font-medium">{toPersianDigits(percent)}٪</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/topic/${topic.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">مشاهده مبحث</Button>
                </Link>
                <Link href={`/practice/${topic.id}`} className="flex-1">
                  <Button className="w-full">
                    شروع تمرین
                    <ChevronLeft className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
      <Link href={`/subjects/${subject.id}`}>
        <Button variant="ghost" className="mt-6">
          <ChevronRight className="ml-2 h-4 w-4" />
          بازگشت به فصل‌ها
        </Button>
      </Link>
    </div>
  );
}
