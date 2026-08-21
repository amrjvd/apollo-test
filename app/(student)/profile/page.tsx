'use client';

import { useState } from 'react';
import { User, Phone, GraduationCap, Target, Mail, Save, LogOut, Settings, Bell, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PageHeader } from '@/components/apollo/page-header';
import { api } from '@/lib/api';
import { toPersianDigits } from '@/lib/persian';

export default function ProfilePage() {
  const student = api.getCurrentStudent();
  const grades = api.getGrades();
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [mobile, setMobile] = useState(student.mobile);
  const [gradeId, setGradeId] = useState(student.gradeId);
  const [targetExam, setTargetExam] = useState(student.targetExam);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const grade = grades.find((g) => g.id === gradeId);

  return (
    <div className="space-y-6">
      <PageHeader title="پروفایل" />

      {/* Profile header */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-l from-primary to-primary/70" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-primary text-2xl font-bold text-primary-foreground">
              {toPersianDigits(student.firstName[0])}
            </div>
            <div className="pb-2">
              <h2 className="text-lg font-bold">{student.firstName} {student.lastName}</h2>
              <p className="text-sm text-muted-foreground">{grade?.title} · {student.targetExam}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal info */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">اطلاعات شخصی</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>نام</Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pr-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>نام خانوادگی</Label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="pr-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>شماره موبایل</Label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={mobile} onChange={(e) => setMobile(e.target.value)} className="pr-10" dir="ltr" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>ایمیل</Label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={student.email} disabled className="pr-10 opacity-60" dir="ltr" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>پایه تحصیلی</Label>
            <Select value={gradeId} onValueChange={setGradeId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {grades.map((g) => (
                  <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>کنکور هدف</Label>
            <div className="relative">
              <Target className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={targetExam} onChange={(e) => setTargetExam(e.target.value)} className="pr-10" />
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button onClick={handleSave}>
            <Save className="ml-2 h-4 w-4" />
            ذخیره تغییرات
          </Button>
          {saved && <span className="text-sm text-success">تغییرات ذخیره شد</span>}
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <Settings className="h-5 w-5 text-muted-foreground" />
          تنظیمات
        </h3>
        <div className="space-y-1">
          {[
            { icon: Bell, label: 'اعلان‌های تمرین', desc: 'یادآوری تمرین روزانه', defaultOn: true },
            { icon: Globe, label: 'زبان', desc: 'فارسی', defaultOn: false, isText: true },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                  <s.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              {s.isText ? (
                <span className="text-sm font-medium">فارسی</span>
              ) : (
                <Switch defaultChecked={s.defaultOn} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">خروج از حساب</p>
            <p className="text-sm text-muted-foreground">از حساب کاربری خود خارج شو</p>
          </div>
          <Button variant="outline" className="text-destructive hover:text-destructive">
            <LogOut className="ml-2 h-4 w-4" />
            خروج
          </Button>
        </div>
      </Card>
    </div>
  );
}
