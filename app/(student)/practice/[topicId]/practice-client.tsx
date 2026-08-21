'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, X, ChevronLeft, ChevronRight, RotateCcw, Trophy, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

const optionLabels = ['الف', 'ب', 'ج', 'د'];

export default function PracticeFlowClient({ topicId }: { topicId: string }) {
  const topic = api.getTopic(topicId);
  if (!topic) notFound();
  const questions = api.getQuestions(topicId);
  if (questions.length === 0) notFound();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const question = questions[currentIndex];
  const isCorrect = submitted && selectedOption === question.correctOption;
  const isFinished = currentIndex === questions.length - 1 && submitted;
  const correctCount = Object.entries(answers).filter(([qid, opt]) => {
    const q = questions.find((qq) => qq.id === qid);
    return q && opt === q.correctOption;
  }).length;
  const wrongCount = Object.entries(answers).filter(([qid, opt]) => {
    const q = questions.find((qq) => qq.id === qid);
    return q && opt !== null && opt !== q.correctOption;
  }).length;
  const skippedCount = Object.values(answers).filter((v) => v === null).length;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    setAnswers((prev) => ({ ...prev, [question.id]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const handleSkip = () => {
    setAnswers((prev) => ({ ...prev, [question.id]: null }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers({});
  };

  const progressPercent = Math.round(((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100);

  // Results screen
  if (isFinished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="p-8 text-center">
          <div className={cn('mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full', score >= 67 ? 'bg-success/10' : score >= 40 ? 'bg-warning/10' : 'bg-destructive/10')}>
            <Trophy className={cn('h-8 w-8', score >= 67 ? 'text-success' : score >= 40 ? 'text-warning' : 'text-destructive')} />
          </div>
          <h2 className="text-2xl font-bold">تمرین تمام شد!</h2>
          <p className="mt-1 text-muted-foreground">{topic.title}</p>
          <div className="my-6 flex items-center justify-center gap-8">
            <div>
              <p className="text-3xl font-bold text-primary">{toPersianDigits(score)}٪</p>
              <p className="text-xs text-muted-foreground">امتیاز</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold">{toPersianDigits(correctCount)}/{toPersianDigits(questions.length)}</p>
              <p className="text-xs text-muted-foreground">درست</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-success/10 p-4">
              <Check className="mx-auto mb-1 h-5 w-5 text-success" />
              <p className="text-lg font-bold text-success">{toPersianDigits(correctCount)}</p>
              <p className="text-xs text-muted-foreground">درست</p>
            </div>
            <div className="rounded-lg bg-destructive/10 p-4">
              <X className="mx-auto mb-1 h-5 w-5 text-destructive" />
              <p className="text-lg font-bold text-destructive">{toPersianDigits(wrongCount)}</p>
              <p className="text-xs text-muted-foreground">غلط</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <ChevronLeft className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
              <p className="text-lg font-bold">{toPersianDigits(skippedCount)}</p>
              <p className="text-xs text-muted-foreground">نزده</p>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleRestart} variant="outline" className="flex-1">
            <RotateCcw className="ml-2 h-4 w-4" />
            تمرین مجدد
          </Button>
          <Link href={`/topic/${topic.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="ml-2 h-4 w-4" />
              بازگشت به مبحث
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button className="w-full">داشبورد</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link href={`/topic/${topic.id}`}>
          <Button variant="ghost" size="sm">
            <ChevronRight className="ml-1 h-4 w-4" />
            خروج
          </Button>
        </Link>
        <div className="text-center">
          <p className="text-sm font-medium">سؤال {toPersianDigits(currentIndex + 1)} از {toPersianDigits(questions.length)}</p>
        </div>
        <div className="w-16" />
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question card */}
      <Card className="p-6">
        <p className="mb-6 text-lg font-medium leading-relaxed">{question.text}</p>

        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrectOption = i === question.correctOption;
            let stateClass = 'border-border hover:border-primary/40 hover:bg-primary/5';
            if (submitted) {
              if (isCorrectOption) {
                stateClass = 'border-success bg-success/5';
              } else if (isSelected && !isCorrectOption) {
                stateClass = 'border-destructive bg-destructive/5';
              } else {
                stateClass = 'border-border opacity-60';
              }
            } else if (isSelected) {
              stateClass = 'border-primary bg-primary/5';
            }

            return (
              <button
                key={i}
                disabled={submitted}
                onClick={() => setSelectedOption(i)}
                className={cn('flex w-full items-center gap-3 rounded-lg border-2 p-4 text-right transition-all', stateClass)}
              >
                <div className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors',
                  submitted && isCorrectOption ? 'border-success bg-success text-success-foreground' :
                  submitted && isSelected && !isCorrectOption ? 'border-destructive bg-destructive text-destructive-foreground' :
                  isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'
                )}>
                  {submitted && isCorrectOption ? <Check className="h-4 w-4" /> :
                   submitted && isSelected && !isCorrectOption ? <X className="h-4 w-4" /> :
                   optionLabels[i]}
                </div>
                <span className="text-sm font-medium">{opt}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Explanation after submit */}
      {submitted && (
        <Card className={cn('animate-scale-in border-2 p-5', isCorrect ? 'border-success/30 bg-success/5' : selectedOption === null ? 'border-warning/30 bg-warning/5' : 'border-destructive/30 bg-destructive/5')}>
          <div className="mb-2 flex items-center gap-2">
            {isCorrect ? (
              <>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-success-foreground"><Check className="h-4 w-4" /></div>
                <span className="font-semibold text-success">پاسخ صحیح!</span>
              </>
            ) : selectedOption === null ? (
              <span className="font-semibold text-warning">سؤال نزده شد</span>
            ) : (
              <>
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground"><X className="h-4 w-4" /></div>
                <span className="font-semibold text-destructive">پاسخ نادرست</span>
              </>
            )}
          </div>
          {!isCorrect && selectedOption !== null && (
            <p className="mb-2 text-sm">
              پاسخ صحیح: <span className="font-bold text-success">{optionLabels[question.correctOption]} — {question.options[question.correctOption]}</span>
            </p>
          )}
          <div className="rounded-lg bg-white/60 p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">توضیح:</p>
            <p className="text-sm leading-relaxed">{question.explanation}</p>
          </div>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <>
            <Button variant="ghost" onClick={handleSkip} className="shrink-0">
              پاسخ نده
            </Button>
            <Button onClick={handleSubmit} disabled={selectedOption === null} className="flex-1">
              ثبت پاسخ
            </Button>
          </>
        ) : (
          <Button onClick={handleNext} className="flex-1">
            {currentIndex < questions.length - 1 ? 'سؤال بعدی' : 'مشاهده نتایج'}
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
