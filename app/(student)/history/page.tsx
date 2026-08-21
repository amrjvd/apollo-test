import Link from 'next/link';
import { History, ChevronLeft, Check, X, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/apollo/page-header';
import { EmptyState } from '@/components/apollo/empty-state';
import { api } from '@/lib/api';
import { toPersianDigits, formatDate } from '@/lib/persian';

export default function HistoryPage() {
  const history = api.getLearningHistory();

  return (
    <div>
      <PageHeader title="تاریخچه یادگیری" description="مرور تمرین‌های گذشته" />

      {history.length === 0 ? (
        <EmptyState
          icon={History}
          title="هنوز تمرینی ثبت نشده"
          description="بعد از اولین تمرین، نتایج اینجا نمایش داده می‌شود."
          action={<Link href="/practice"><span className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">شروع تمرین</span></Link>}
        />
      ) : (
        <div className="space-y-3">
          {history.map((h) => (
            <Link key={h.id} href={`/history/${h.id}`}>
              <Card className="p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{h.topicTitle}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{h.subjectTitle} · {formatDate(h.date)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                        <Check className="h-3 w-3" /> {toPersianDigits(h.correct)} درست
                      </span>
                      <span className="flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
                        <X className="h-3 w-3" /> {toPersianDigits(h.wrong)} غلط
                      </span>
                      {h.unanswered > 0 && (
                        <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                          <Minus className="h-3 w-3" /> {toPersianDigits(h.unanswered)} نزده
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${h.score >= 67 ? 'text-success' : h.score >= 40 ? 'text-warning' : 'text-destructive'}`}>{toPersianDigits(h.score)}٪</p>
                      <p className="text-xs text-muted-foreground">{toPersianDigits(h.total)} سؤال</p>
                    </div>
                    <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
