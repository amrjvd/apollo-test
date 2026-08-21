import Link from 'next/link';
import { Rocket, BookOpen, PencilRuler, TrendingUp, Sparkles, PlayCircle, ArrowLeft, Check, Brain, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">آپولو</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">ورود</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">ثبت‌نام</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                پلتفرم هوشمند کنکور
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-5xl">
                با آپولو، مسیر کنکور را
                <span className="text-primary"> هوشمندانه </span>
                طی کن
              </h1>
              <p className="mx-auto max-w-md text-base text-muted-foreground lg:mx-0 lg:text-lg">
                درس‌بازی ساختاریافته، تمرین هدفمند، ویدیوهای آموزشی و پیگیری لحظه‌ای پیشرفت — همه در یک پلتفرم.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    شروع رایگان
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <PlayCircle className="ml-2 h-5 w-5" />
                    مشاهده پلتفرم
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" />
                  بیش از ۱۰٬۰۰۰ دانش‌آموز
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-success" />
                  محتوای کامل
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">ام</div>
                    <div>
                      <p className="text-sm font-semibold">امیر محمدی</p>
                      <p className="text-xs text-muted-foreground">پایه دوازدهم</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">۷ روز پیاپی</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">سؤالات امروز</p>
                    <p className="text-lg font-bold">۲۰</p>
                  </div>
                  <div className="rounded-lg bg-success/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">درست</p>
                    <p className="text-lg font-bold text-success">۱۵</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">درصد</p>
                    <p className="text-lg font-bold">۷۵٪</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">پیشرفت امروز</span>
                    <span className="font-medium">۶۰٪</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {['ساختار اتم', 'آرایش الکترونی', 'جدول تناوبی'].map((t, i) => (
                    <div key={t} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">{i + 1}</div>
                      <span className="text-sm font-medium">{t}</span>
                      <span className="mr-auto text-xs text-muted-foreground">شیمی</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Apollo does */}
      <section className="border-b border-border py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">آپولو چه می‌کند؟</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">همه ابزاری که برای موفقیت در کنکور نیاز داری، در یک پلتفرم ساده و سریع.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: 'محتوای ساختاریافته', desc: 'درس‌ها به‌صورت پایه، درس، فصل و مبحث سازمان‌دهی شده‌اند.' },
              { icon: PencilRuler, title: 'تمرین هدفمند', desc: 'سؤالات چهارگزینه‌ای با پاسخ‌نامه و توضیح کامل برای هر مبحث.' },
              { icon: TrendingUp, title: 'پیگیری پیشرفت', desc: 'درصد درست، غلط و نزده، استک مطالعه و تحلیل ضعف‌ها.' },
              { icon: PlayCircle, title: 'ویدیوهای آموزشی', desc: 'درس‌های تصویری برای مباحث کلیدی هر فصل.' },
              { icon: Brain, title: 'آموزش هوشمند', desc: 'معرفی مبحث ضعیف و پیشنهاد تمرین بر اساس عملکرد تو.' },
              { icon: Target, title: 'هدف‌گذاری کنکور', desc: 'مسیر مطالعه متناسب با کنکور هدف تو.' },
            ].map((f) => (
              <Card key={f.title} className="p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning process */}
      <section className="border-b border-border bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">فرایند یادگیری</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">چهار گام ساده تا تسلط بر هر مبحث.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {[
              { step: '۱', title: 'درس را انتخاب کن', desc: 'از میان درس‌ها و فصل‌ها، مبحث موردنظرت را پیدا کن.' },
              { step: '۲', title: 'ویدیو را ببین', desc: 'درس را تصویری یاد بگیر تا بهتر در ذهن بماند.' },
              { step: '۳', title: 'تمرین کن', desc: 'سؤالات چهارگزینه‌ای را پاسخ بده و پاسخ‌نامه ببین.' },
              { step: '۴', title: 'پیشرفتت را ببین', desc: 'عملکردت را پیگیری کن و نقاط ضعف را برطرف کن.' },
            ].map((s) => (
              <div key={s.step} className="relative">
                <Card className="h-full p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {s.step}
                  </div>
                  <h3 className="mb-2 font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Question practice */}
      <section className="border-b border-border py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">تمرین سؤال، دقیقاً مثل کنکور</h2>
              <p className="text-muted-foreground">هر سؤال با چهار گزینه، پاسخ‌نامه و توضیح کامل. بعد از ثبت پاسخ، فوراً می‌فهمی درست جواب دادی یا نه — و چرا.</p>
              <ul className="space-y-3">
                {['بازخورد فوری درست یا غلط', 'توضیح کامل برای هر سؤال', 'پیگیری تعداد درست، غلط و نزده', 'محیط تمرین بدون حواس‌پرتی'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/practice"><Button size="lg">شروع تمرین</Button></Link>
            </div>
            <Card className="p-6 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">سؤال ۳ از ۲۰</span>
                <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: '15%' }} />
                </div>
              </div>
              <p className="mb-5 font-medium leading-relaxed">در مدل اتمی بور، الکترون‌ها در کدام قسمت قرار دارند؟</p>
              <div className="space-y-2.5">
                {['هسته', 'ترازهای انرژی مشخص', 'پرتوی کاتدی', 'به‌صورت ابری پیوسته'].map((opt, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-lg border p-3 text-sm ${i === 1 ? 'border-success bg-success/5' : 'border-border'}`}>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${i === 1 ? 'border-success bg-success text-success-foreground' : 'border-border'}`}>
                      {['الف', 'ب', 'ج', 'د'][i]}
                    </div>
                    {opt}
                    {i === 1 && <Check className="mr-auto h-4 w-4 text-success" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-primary-foreground lg:text-3xl">همین امروز شروع کن</h2>
          <p className="mt-3 text-primary-foreground/80">ثبت‌نام رایگان است. در کمتر از یک دقیقه حسابت را بساز و اولین تمرینت را شروع کن.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">ثبت‌نام رایگان</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto">
                ورود به پلتفرم
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="font-bold">آپولو</span>
          </div>
          <p className="text-sm text-muted-foreground">© ۱۴۰۴ آپولو — پلتفرم آموزشی کنکور</p>
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">پنل مدیریت</Link>
        </div>
      </footer>
    </div>
  );
}
