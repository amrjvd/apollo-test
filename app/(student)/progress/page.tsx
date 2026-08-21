import { TrendingUp, Target, Flame, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/apollo/progress-ring';
import { StatCard } from '@/components/apollo/stat-card';
import { PageHeader } from '@/components/apollo/page-header';
import { SubjectIcon } from '@/components/apollo/subject-icon';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts';

export default function ProgressPage() {
  const student = api.getCurrentStudent();
  const subjects = api.getSubjects(student.gradeId);
  const allProgress = api.getAllProgress();
  const history = api.getLearningHistory();

  const totalAnswered = allProgress.reduce((s, p) => s + p.answered, 0);
  const totalCorrect = allProgress.reduce((s, p) => s + p.correct, 0);
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Subject performance
  const subjectPerformance = subjects.map((s) => {
    const chapters = api.getChapters(s.id);
    const topics = chapters.flatMap((c) => api.getTopics(c.id));
    const prog = topics.map((t) => api.getTopicProgress(t.id)).filter(Boolean);
    const answered = prog.reduce((sum, p) => sum + (p?.answered ?? 0), 0);
    const correct = prog.reduce((sum, p) => sum + (p?.correct ?? 0), 0);
    const totalQs = topics.flatMap((t) => api.getQuestions(t.id)).length;
    return {
      name: s.title,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
      answered,
      totalQs,
      color: s.color,
    };
  }).filter((s) => s.answered > 0);

  // Weak/strong topics
  const topicStats = allProgress
    .map((p) => {
      const topic = api.getTopic(p.topicId);
      return topic ? { topic, accuracy: p.answered > 0 ? Math.round((p.correct / p.answered) * 100) : 0, answered: p.answered } : null;
    })
    .filter(Boolean) as { topic: NonNullable<ReturnType<typeof api.getTopic>>; accuracy: number; answered: number }[];

  const weakTopics = [...topicStats].sort((a, b) => a.accuracy - b.accuracy).slice(0, 4);
  const strongTopics = [...topicStats].sort((a, b) => b.accuracy - a.accuracy).slice(0, 4);

  // Weekly activity chart
  const weekData = [
    { day: 'شنبه', value: 12 },
    { day: 'یکشنبه', value: 18 },
    { day: 'دوشنبه', value: 25 },
    { day: 'سه‌شنبه', value: 15 },
    { day: 'چهارشنبه', value: 30 },
    { day: 'پنجشنبه', value: 22 },
    { day: 'جمعه', value: 20 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="پیشرفت" description="تحلیل عملکرد یادگیری شما" />

      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="درصد صحیح کلی" value={`${toPersianDigits(overallAccuracy)}٪`} icon={TrendingUp} accent="success" />
        <StatCard label="سؤالات پاسخ‌شده" value={toPersianDigits(1240)} icon={Target} accent="primary" />
        <StatCard label="استک مطالعه" value={`${toPersianDigits(7)} روز`} icon={Flame} accent="warning" />
        <StatCard label="مباحث فعال" value={toPersianDigits(allProgress.length)} icon={BookOpen} accent="primary" />
      </div>

      {/* Overall accuracy ring + weekly chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-6">
          <h2 className="mb-4 self-start font-semibold">عملکرد کلی</h2>
          <ProgressRing value={overallAccuracy} size={140} strokeWidth={12} label={`${toPersianDigits(overallAccuracy)}٪`} />
          <p className="mt-4 text-sm text-muted-foreground">درصد پاسخ‌های صحیح</p>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 font-semibold">فعالیت هفته</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => toPersianDigits(v)} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid hsl(var(--border))', fontSize: 12 }}
                formatter={(v: number) => [toPersianDigits(v), 'سؤال']}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Subject performance */}
      <Card className="p-6">
        <h2 className="mb-4 font-semibold">عملکرد درس‌ها</h2>
        {subjectPerformance.length > 0 ? (
          <div className="space-y-4">
            {subjectPerformance.map((s) => (
              <div key={s.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{toPersianDigits(s.answered)} از {toPersianDigits(s.totalQs)} سؤال · {toPersianDigits(s.accuracy)}٪</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${s.accuracy}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">هنوز داده‌ای موجود نیست.</p>
        )}
      </Card>

      {/* Weak/strong topics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10 text-destructive">!</span>
            مباحث ضعیف
          </h2>
          <div className="space-y-3">
            {weakTopics.map((t) => (
              <div key={t.topic.id} className="flex items-center gap-3">
                <span className="flex-1 truncate text-sm font-medium">{t.topic.title}</span>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-destructive" style={{ width: `${t.accuracy}%` }} />
                </div>
                <span className="w-10 text-sm font-medium text-destructive">{toPersianDigits(t.accuracy)}٪</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success">✓</span>
            مباحث قوی
          </h2>
          <div className="space-y-3">
            {strongTopics.map((t) => (
              <div key={t.topic.id} className="flex items-center gap-3">
                <span className="flex-1 truncate text-sm font-medium">{t.topic.title}</span>
                <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-success" style={{ width: `${t.accuracy}%` }} />
                </div>
                <span className="w-10 text-sm font-medium text-success">{toPersianDigits(t.accuracy)}٪</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
