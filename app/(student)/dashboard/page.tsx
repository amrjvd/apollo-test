import Link from 'next/link';
import { Check, X, Minus, Flame, ArrowLeft, PlayCircle, BookOpen, TrendingUp, PencilRuler, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/apollo/progress-ring';
import { StatCard } from '@/components/apollo/stat-card';
import { SubjectIcon } from '@/components/apollo/subject-icon';
import { api } from '@/lib/api';
import { toPersianDigits, relativeTime } from '@/lib/persian';

export default function DashboardPage() {
  const student = api.getCurrentStudent();
  const subjects = api.getSubjects(student.gradeId);
  const history = api.getLearningHistory();
  const recentHistory = history.slice(0, 4);
  const progress = api.getAllProgress();
  const videos = api.getVideos();

  const questionsToday = 20;
  const correctToday = 15;
  const wrongToday = 4;
  const unansweredToday = 1;
  const dailyGoal = 20;
  const todayPercent = Math.round((correctToday / questionsToday) * 100);

  const recommendedTopics = [
    { id: 't-chem12-1-3', title: 'جدول تناوبی', subject: 'شیمی', reason: 'پیشرفت پایین' },
    { id: 't-chem12-1-4', title: 'خواص تناوبی عناصر', subject: 'شیمی', reason: 'نیاز به مرور' },
    { id: 't-math12-1-2', title: 'قواعد محاسبه حد', subject: 'ریاضی', reason: 'مبحث جدید' },
  ];

  const weakAreas = progress
    .filter((p) => p.answered > 0 && p.correct / p.answered < 0.5)
    .map((p) => ({
      topic: api.getTopic(p.topicId),
      ratio: p.correct / p.answered,
    }))
    .filter((w) => w.topic)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">سلام {student.firstName} 👋</h1>
        <p className="text-muted-foreground">امروز چقدر پیش رفتی؟</p>
      </div>

      {/* Today's progress hero */}
      <Card className="overflow-hidden p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">پیشرفت امروز</p>
              <p className="text-3xl font-bold tracking-tight">
                {toPersianDigits(questionsToday)} از {toPersianDigits(dailyGoal)} سؤال
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-40 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(questionsToday / dailyGoal) * 100}%` }} />
              </div>
              <span className="text-sm font-medium text-primary">{toPersianDigits(Math.round((questionsToday / dailyGoal) * 100))}٪</span>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">{toPersianDigits(correctToday)} درست</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2">
                <X className="h-4 w-4 text-destructive" />
                <span className="text-sm font-semibold text-destructive">{toPersianDigits(wrongToday)} غلط</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2">
                <Minus className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">{toPersianDigits(unansweredToday)} نزده</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <ProgressRing value={correctToday} max={questionsToday} size={96} label={`${toPersianDigits(todayPercent)}٪`} />
            <div className="flex flex-col items-center gap-1 rounded-xl bg-warning/10 px-4 py-3">
              <Flame className="h-6 w-6 text-warning" />
              <span className="text-xl font-bold">{toPersianDigits(7)}</span>
              <span className="text-xs text-muted-foreground">روز پیاپی</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
          <Link href="/practice" className="flex-1">
            <Button className="w-full">
              ادامه یادگیری
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/subjects" className="flex-1">
            <Button variant="outline" className="w-full">مرور درس‌ها</Button>
          </Link>
        </div>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="سؤالات امروز" value={toPersianDigits(questionsToday)} icon={PencilRuler} accent="primary" />
        <StatCard label="درصد پاسخ صحیح" value={`${toPersianDigits(todayPercent)}٪`} icon={TrendingUp} accent="success" />
        <StatCard label="استک مطالعه" value={`${toPersianDigits(7)} روز`} icon={Flame} accent="warning" />
        <StatCard label="کل سؤالات" value={toPersianDigits(1240)} icon={BookOpen} accent="primary" />
      </div>

      {/* Recent activity + recommended */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">فعالیت اخیر</h2>
            <Link href="/history" className="text-sm text-primary hover:underline">همه</Link>
          </div>
          <div className="space-y-3">
            {recentHistory.map((h) => (
              <Link key={h.id} href={`/history/${h.id}`} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <PencilRuler className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{h.topicTitle}</p>
                  <p className="text-xs text-muted-foreground">{h.subjectTitle} · {relativeTime(h.date)}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${h.score >= 67 ? 'bg-success/10 text-success' : h.score >= 40 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>
                  {toPersianDigits(h.score)}٪
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Recommended topics */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">مباحث پیشنهادی</h2>
            <Link href="/subjects" className="text-sm text-primary hover:underline">همه درس‌ها</Link>
          </div>
          <div className="space-y-3">
            {recommendedTopics.map((t) => (
              <Link key={t.id} href={`/practice/${t.id}`} className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{t.reason}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Weak areas */}
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-semibold">نقاط ضعف</h2>
          <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">نیاز به تمرین</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {weakAreas.length > 0 ? weakAreas.map((w) => (
            <Link key={w.topic!.id} href={`/practice/${w.topic!.id}`} className="rounded-lg border border-border p-4 transition-colors hover:bg-accent">
              <p className="mb-2 text-sm font-medium">{w.topic!.title}</p>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-destructive" style={{ width: `${w.ratio * 100}%` }} />
                </div>
                <span className="text-xs font-medium text-destructive">{toPersianDigits(Math.round(w.ratio * 100))}٪</span>
              </div>
              <p className="text-xs text-muted-foreground">تمرین بیشتر نیاز است</p>
            </Link>
          )) : (
            <p className="col-span-full text-sm text-muted-foreground">هنوز نقطه ضعفی شناسایی نشده است.</p>
          )}
        </div>
      </Card>

      {/* Videos */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">ویدیوهای آموزشی</h2>
          <Link href="/subjects" className="text-sm text-primary hover:underline">همه</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((v) => {
            const topic = api.getTopic(v.topicId);
            return (
              <Link key={v.id} href={`/topic/${v.topicId}`} className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md">
                <div className="relative aspect-video bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">{toPersianDigits(Math.floor(v.durationSec / 60))}:{toPersianDigits(Math.floor(v.durationSec % 60).toString().padStart(2, '0'))}</span>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium">{v.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{topic?.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
