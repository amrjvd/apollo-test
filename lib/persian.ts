const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

export function formatNumber(n: number): string {
  return toPersianDigits(n.toLocaleString('en-US'));
}

export function formatPercent(n: number): string {
  return toPersianDigits(`${Math.round(n)}٪`);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return toPersianDigits(`${m}:${s.toString().padStart(2, '0')}`);
}

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return toPersianDigits(`${d.getDate()} ${PERSIAN_MONTHS[d.getMonth()]} ${d.getFullYear()}`);
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${toPersianDigits(days)} روز پیش`;
  if (hours > 0) return `${toPersianDigits(hours)} ساعت پیش`;
  if (minutes > 0) return `${toPersianDigits(minutes)} دقیقه پیش`;
  return 'لحظاتی پیش';
}
