import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PlayCircle, FileQuestion, TrendingUp, ArrowLeft, Clock, History } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/apollo/progress-ring';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits, relativeTime } from '@/lib/persian';

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  const topic = api.getTopic(params.topicId);
  if (!topic) notFound();

  const chapter = api.getChapter(topic.chapterId);
  const subject = chapter ? api.getSubject(chapter.subjectId) : undefined;
  const questions = api.getQuestions(topic.id);
  const videos = api.getVideos(topic.id);
  const progress = api.getTopicProgress(topic.id);
  const topicHistory = api.getLearningHistory().filter((h) => h.topicId === topic.id);

  const answered = progress?.answered ?? 0;
  const correct = progress?.correct ?? 0;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const completionPercent = questions.length > 0 ? Math.round((answered / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/subjects" className="hover:text-foreground">درس‌ها</Link>
        <span>/</span>
        {subject && <Link href={`/subjects/${subject.id}`} className="hover:text-foreground">{subject.title}</Link>}
        <span>/</span>
        {chapter && <Link href={`/subjects/${subject?.id}/${chapter.id}`} className="hover:text-foreground">{chapter.title}</Link>}
      </nav>

      <PageHeader title={topic.title} description={topic.description} />

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4 p-5">
          <ProgressRing value={answered} max={questions.length} size={64} label={`${toPersianDigits(completionPercent)}٪`} />
          <div>
            <p className="text-sm text-muted-foreground">پیشرفت مبحث</p>
            <p className="font-semibold">{toPersianDigits(answered)} از {toPersianDigits(questions.length)} سؤال</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileQuestion className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">سؤالات</p>
            <p className="font-semibold">{toPersianDigits(questions.length)} سؤال</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-success/10 text-success">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">عملکرد قبلی</p>
            <p className="font-semibold">{answered > 0 ? `${toPersianDigits(accuracy)}٪` : 'بدون داده'}</p>
          </div>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={`/practice/${topic.id}`}>
          <Button size="lg" className="w-full">
            شروع تمرین
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </Link>
        {topic.hasVideo && videos.length > 0 ? (
          <Link href={`/topic/${topic.id}/video`}>
            <Button variant="outline" size="lg" className="w-full">
              <PlayCircle className="ml-2 h-5 w-5" />
              مشاهده درس
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="lg" className="w-full" disabled>
            <PlayCircle className="ml-2 h-5 w-5" />
            ویدیو موجود نیست
          </Button>
        )}
      </div>

      {/* Videos */}
      {videos.length > 0 && (
        <Card className="p-6">
          <h2 className="mb-4 font-semibold">ویدیوهای آموزشی</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {videos.map((v) => (
              <Link key={v.id} href={`/topic/${topic.id}/video`} className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md">
                <div className="relative aspect-video bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{v.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {toPersianDigits(Math.floor(v.durationSec / 60))}:{toPersianDigits(Math.floor(v.durationSec % 60).toString().padStart(2, '0'))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Recent activity */}
      <Card className="p-6">
        <h2 className="mb-4 flex items-center gap-2 font-semibold">
          <History className="h-5 w-5 text-muted-foreground" />
          فعالیت اخیر این مبحث
        </h2>
        {topicHistory.length > 0 ? (
          <div className="space-y-3">
            {topicHistory.map((h) => (
              <Link key={h.id} href={`/history/${h.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent">
                <div>
                  <p className="text-sm font-medium">{toPersianDigits(h.total)} سؤال · {relativeTime(h.date)}</p>
                  <p className="text-xs text-muted-foreground">{toPersianDigits(h.correct)} درست · {toPersianDigits(h.wrong)} غلط</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${h.score >= 67 ? 'bg-success/10 text-success' : h.score >= 40 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>
                  {toPersianDigits(h.score)}٪
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">هنوز تمرینی برای این مبحث ثبت نشده است.</p>
        )}
      </Card>
    </div>
  );
}
