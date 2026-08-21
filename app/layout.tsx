import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Vazirmatn } from 'next/font/google';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'آپولو — پلتفرم آموزشی کنکور',
  description: 'پلتفرم آموزشی هوشمند برای دانش‌آموزان کنکور ایران — درس‌بازی، تمرین سؤال، ویدیوهای آموزشی و پیگیری پیشرفت',
};

export const viewport: Viewport = {
  themeColor: '#4179FF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`}>{children}</body>
    </html>
  );
}
