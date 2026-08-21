import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Check, X, Minus, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits, formatDate } from '@/lib/persian';

const optionLabels = ['الف', 'ب', 'ج', 'د'];

export default function HistoryDetailPage({ params }: { params: { id: string } }) {
  const item = api.getHistoryItem(params.id);
  if (!item) notFound();

  const questions = item.answers.map((a) => {
    const q = api.getQuestion(a.questionId);
    return { question: q!, answer: a };
  }).filter((x) => x.question);

  return (
    <div className="space-y-6">
      <Link href="/history">
        <Button variant="ghost" size="sm">
          <ChevronRight className="ml-1 h-4 w-4" />
          بازگشت به تاریخچه
        </Button>
      </Link>

      <PageHeader title={item.topicTitle} description={`${item.subjectTitle} · ${formatDate(item.date)}`} />

      {/* Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{toPersianDigits(item.total)}</p>
            <p className="text-xs text-muted-foreground">کل سؤالات</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">{toPersianDigits(item.correct)}</p>
            <p className="text-xs text-muted-foreground">درست</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-destructive">{toPersianDigits(item.wrong)}</p>
            <p className="text-xs text-muted-foreground">غلط</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{toPersianDigits(item.unanswered)}</p>
            <p className="text-xs text-muted-foreground">نزده</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 border-t border-border pt-4">
          <span className="text-sm text-muted-foreground">امتیاز:</span>
          <span className={`text-lg font-bold ${item.score >= 67 ? 'text-success' : item.score >= 40 ? 'text-warning' : 'text-destructive'}`}>{toPersianDigits(item.score)}٪</span>
        </div>
      </Card>

      {/* Question review */}
      <div className="space-y-4">
        <h2 className="font-semibold">مرور سؤالات</h2>
        {questions.map(({ question, answer }, i) => (
          <Card key={question.id} className="p-5">
            <div className="mb-3 flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold">{toPersianDigits(i + 1)}</span>
              <p className="font-medium leading-relaxed">{question.text}</p>
            </div>
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isCorrect = idx === question.correctOption;
                const isSelected = idx === answer.selectedOption;
                let cls = 'border-border opacity-70';
                if (isCorrect) cls = 'border-success bg-success/5';
                else if (isSelected && !isCorrect) cls = 'border-destructive bg-destructive/5';

                return (
                  <div key={idx} className={`flex items-center gap-3 rounded-lg border p-3 text-sm ${cls}`}>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold border-current">
                      {optionLabels[idx]}
                    </span>
                    {opt}
                    {isCorrect && <Check className="mr-auto h-4 w-4 text-success" />}
                    {isSelected && !isCorrect && <X className="mr-auto h-4 w-4 text-destructive" />}
                  </div>
                );
              })}
            </div>
            {answer.skipped && (
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <Minus className="h-3 w-3" /> این سؤال پاسخ داده نشد
              </p>
            )}
            <div className="mt-3 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-muted-foreground">توضیح:</p>
              <p className="mt-1 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          </Card>
        ))}
      </div>

      <Link href={`/practice/${item.topicId}`}>
        <Button>
          <RotateCcw className="ml-2 h-4 w-4" />
          تمرین مجدد این مبحث
        </Button>
      </Link>
    </div>
  );
}
