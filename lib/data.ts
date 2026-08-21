import type {
  Grade, Subject, Chapter, Topic, Question, Video,
  LearningHistoryItem, Student, StudentProfile, TopicProgress,
} from './types';

export const grades: Grade[] = [
  { id: 'g10', title: 'پایه دهم', description: 'محتوای آموزشی پایه دهم متوسطه', status: 'active', sortOrder: 1 },
  { id: 'g11', title: 'پایه یازدهم', description: 'محتوای آموزشی پایه یازدهم متوسطه', status: 'active', sortOrder: 2 },
  { id: 'g12', title: 'پایه دوازدهم', description: 'محتوای آموزشی پایه دوازدهم متوسطه — آمادگی کنکور', status: 'active', sortOrder: 3 },
];

export const subjects: Subject[] = [
  { id: 's-bio12', gradeId: 'g12', title: 'زیست‌شناسی', description: 'زیست‌شناسی پایه دوازدهم', icon: 'biology', color: '#16a34a', status: 'active', sortOrder: 1 },
  { id: 's-chem12', gradeId: 'g12', title: 'شیمی', description: 'شیمی پایه دوازدهم', icon: 'chemistry', color: '#0891b2', status: 'active', sortOrder: 2 },
  { id: 's-phy12', gradeId: 'g12', title: 'فیزیک', description: 'فیزیک پایه دوازدهم', icon: 'physics', color: '#dc2626', status: 'active', sortOrder: 3 },
  { id: 's-math12', gradeId: 'g12', title: 'ریاضی', description: 'ریاضیات پایه دوازدهم', icon: 'math', color: '#7c3aed', status: 'active', sortOrder: 4 },
  { id: 's-bio11', gradeId: 'g11', title: 'زیست‌شناسی', description: 'زیست‌شناسی پایه یازدهم', icon: 'biology', color: '#16a34a', status: 'active', sortOrder: 1 },
  { id: 's-chem11', gradeId: 'g11', title: 'شیمی', description: 'شیمی پایه یازدهم', icon: 'chemistry', color: '#0891b2', status: 'active', sortOrder: 2 },
];

export const chapters: Chapter[] = [
  // Chemistry 12
  { id: 'c-chem12-1', subjectId: 's-chem12', title: 'فصل اول — کیهان زادگاه الفبای هستی', description: 'مفاهیم پایه‌ای اتم و ساختار ماده', status: 'active', sortOrder: 1 },
  { id: 'c-chem12-2', subjectId: 's-chem12', title: 'فصل دوم — ردپای گازها در زندگی', description: ' بررسی گازها و کاربردهای آن‌ها', status: 'active', sortOrder: 2 },
  { id: 'c-chem12-3', subjectId: 's-chem12', title: 'فصل سوم — آب آهنگ زندگی', description: 'آب، محلول‌ها و ویژگی‌های آن‌ها', status: 'active', sortOrder: 3 },
  // Biology 12
  { id: 'c-bio12-1', subjectId: 's-bio12', title: 'فصل اول — تنظیم عصبی', description: 'سیستم عصبی و عملکرد آن', status: 'active', sortOrder: 1 },
  { id: 'c-bio12-2', subjectId: 's-bio12', title: 'فصل دوم — تنظیم شیمیایی', description: 'هورمون‌ها و سیستم غدد درون‌ریز', status: 'active', sortOrder: 2 },
  // Physics 12
  { id: 'c-phy12-1', subjectId: 's-phy12', title: 'فصل اول — فیزیک و اندازه‌گیری', description: 'کمیت‌ها و اندازه‌گیری در فیزیک', status: 'active', sortOrder: 1 },
  // Math 12
  { id: 'c-math12-1', subjectId: 's-math12', title: 'فصل اول — حد و پیوستگی', description: 'مفهوم حد، حد یک تابع و پیوستگی', status: 'active', sortOrder: 1 },
];

export const topics: Topic[] = [
  // Chemistry 12 - Chapter 1
  { id: 't-chem12-1-1', chapterId: 'c-chem12-1', title: 'ساختار اتم', description: 'آشنایی با ساختار اتم، ذرات بنیادی و مدل‌های اتمی', hasVideo: true, status: 'active', sortOrder: 1 },
  { id: 't-chem12-1-2', chapterId: 'c-chem12-1', title: 'آرایش الکترونی', description: 'چینش الکترون‌ها در ترازهای انرژی و قواعد پر شدن', hasVideo: true, status: 'active', sortOrder: 2 },
  { id: 't-chem12-1-3', chapterId: 'c-chem12-1', title: 'جدول تناوبی', description: 'ساختار جدول تناوبی و دسته‌بندی عناصر', hasVideo: false, status: 'active', sortOrder: 3 },
  { id: 't-chem12-1-4', chapterId: 'c-chem12-1', title: 'خواص تناوبی عناصر', description: 'روند تغییر شعاع اتمی، انرژی یونش و الکترونگاتیوی', hasVideo: true, status: 'active', sortOrder: 4 },
  // Chemistry 12 - Chapter 2
  { id: 't-chem12-2-1', chapterId: 'c-chem12-2', title: 'گازها و قوانین آن‌ها', description: 'قانون بویل، شارل و معادله حالت گازها', hasVideo: true, status: 'active', sortOrder: 1 },
  { id: 't-chem12-2-2', chapterId: 'c-chem12-2', title: 'نظریه جنبشی مولکولی', description: 'مدل جنبشی گازها و سرعت متوسط مولکول‌ها', hasVideo: false, status: 'active', sortOrder: 2 },
  // Chemistry 12 - Chapter 3
  { id: 't-chem12-3-1', chapterId: 'c-chem12-3', title: 'آب و ویژگی‌های آن', description: 'ساختار مولکول آب، پیوند هیدروژنی و ویژگی‌های ویژه', hasVideo: true, status: 'active', sortOrder: 1 },
  // Biology 12 - Chapter 1
  { id: 't-bio12-1-1', chapterId: 'c-bio12-1', title: 'ساختمان نورون', description: 'ساختار نورون، دندریت، آکسون و سیناپس', hasVideo: true, status: 'active', sortOrder: 1 },
  { id: 't-bio12-1-2', chapterId: 'c-bio12-1', title: 'پتانسیل عمل', description: 'مکانیزم ایجاد و انتقال پتانسیل عمل', hasVideo: true, status: 'active', sortOrder: 2 },
  // Biology 12 - Chapter 2
  { id: 't-bio12-2-1', chapterId: 'c-bio12-2', title: 'غدد درون‌ریز', description: ' ساختار و عملکرد غدد درون‌ریز', hasVideo: false, status: 'active', sortOrder: 1 },
  // Physics 12
  { id: 't-phy12-1-1', chapterId: 'c-phy12-1', title: 'کمیت‌ها و یکاها', description: 'کمیت‌های پایه و مشتق، سیستم یکایی SI', hasVideo: true, status: 'active', sortOrder: 1 },
  // Math 12
  { id: 't-math12-1-1', chapterId: 'c-math12-1', title: 'حد یک تابع', description: 'تعریف حد، حد در بی‌نهایت و حد در یک نقطه', hasVideo: true, status: 'active', sortOrder: 1 },
  { id: 't-math12-1-2', chapterId: 'c-math12-1', title: 'قواعد محاسبه حد', description: 'قواعد جمع، ضرب و حد توابع ترکیبی', hasVideo: false, status: 'active', sortOrder: 2 },
];

export const questions: Question[] = [
  // ساختار اتم
  { id: 'q1', topicId: 't-chem12-1-1', text: 'تعداد پروتون‌های اتم نئون با عدد اتمی ۱۰ و عدد جرمی ۲۰ چقدر است؟', options: ['۱۰', '۲۰', '۳۰', '۱۵'], correctOption: 0, explanation: 'عدد اتمی برابر با تعداد پروتون‌ها است. نئون با عدد اتمی ۱۰ دارای ۱۰ پروتون است.', status: 'active', sortOrder: 1 },
  { id: 'q2', topicId: 't-chem12-1-1', text: 'کدام ذره باری الکتریکی ندارد؟', options: ['پروتون', 'نوترون', 'الکترون', 'پوزیترون'], correctOption: 1, explanation: 'نوترون ذره‌ای خنثی و بدون بار الکتریکی است که در هسته اتم قرار دارد.', status: 'active', sortOrder: 2 },
  { id: 'q3', topicId: 't-chem12-1-1', text: 'در مدل اتمی بور، الکترون‌ها در کدام قسمت قرار دارند؟', options: ['هسته', 'ترازهای انرژی مشخص', 'پرتوی کاتدی', 'به‌صورت ابری پیوسته'], correctOption: 1, explanation: 'در مدل بور، الکترون‌ها در ترازهای انرژی مشخص و گسسته به دور هسته می‌چرخند.', status: 'active', sortOrder: 3 },
  { id: 'q4', topicId: 't-chem12-1-1', text: 'عدد جرمی اتم برابر است با مجموع تعداد...', options: ['پروتون و الکترون', 'نوترون و الکترون', 'پروتون و نوترون', 'پروتون، نوترون و الکترون'], correctOption: 2, explanation: 'عدد جرمی برابر با مجموع تعداد پروتون‌ها و نوترون‌های هسته است.', status: 'active', sortOrder: 4 },
  // آرایش الکترونی
  { id: 'q5', topicId: 't-chem12-1-2', text: 'آرایش الکترونی اتم سدیم (Na، عدد اتمی ۱۱) کدام است؟', options: ['۲،۸،۱', '۲،۹', '۱،۸،۲', '۲،۸،۲'], correctOption: 0, explanation: 'سدیم با ۱۱ الکترون: ۲ الکترون در تراز اول، ۸ الکترون در تراز دوم و ۱ الکترون در تراز سوم.', status: 'active', sortOrder: 1 },
  { id: 'q6', topicId: 't-chem12-1-2', text: 'حداکثر ظرفیت الکترونی تراز سوم چقدر است؟', options: ['۸', '۱۸', '۳۲', '۲'], correctOption: 1, explanation: 'ظرفیت تراز n برابر با ۲n² است. تراز سوم: ۲×۹ = ۱۸ الکترون.', status: 'active', sortOrder: 2 },
  { id: 'q7', topicId: 't-chem12-1-2', text: 'قاعده هوند می‌گوید الکترون‌ها در ترازهای هم‌انرژی چگونه پر می‌شوند؟', options: ['جفت‌شکن قبل از تک‌نشینی', 'همگی با اسپین مخالف', 'ابتدا به‌صورت تک‌نشین با اسپین موازی', 'به‌صورت تصادفی'], correctOption: 2, explanation: 'قاعده هوند: الکترون‌ها ابتدا به‌صورت تک‌نشین و با اسپین موازی در اوربیتال‌های هم‌انرژی پر می‌شوند.', status: 'active', sortOrder: 3 },
  // جدول تناوبی
  { id: 'q8', topicId: 't-chem12-1-3', text: 'عناصر گروه ۱۸ جدول تناوبی چه نامیده می‌شوند؟', options: ['فلزات قلیایی', 'هالوژن‌ها', 'گازهای نجیب', 'فلزات قلیایی خاکی'], correctOption: 2, explanation: 'گازهای نجیب یا گازهای بی‌اثر در گروه ۱۸ قرار دارند و لایه ظرفیت آن‌ها کامل است.', status: 'active', sortOrder: 1 },
  { id: 'q9', topicId: 't-chem12-1-3', text: 'دوره در جدول تناوبی نشان‌دهنده چیست؟', options: ['ستون افقی', 'ردیف عمودی', 'تعداد گروه‌ها', 'تعداد لایه‌های الکترونی'], correctOption: 3, explanation: 'دوره نشان‌دهنده تعداد لایه‌های الکترونی پر شده در اتم عناصر آن دوره است.', status: 'active', sortOrder: 2 },
  // خواص تناوبی
  { id: 'q10', topicId: 't-chem12-1-4', text: 'با حرکت از چپ به راست در یک دوره، شعاع اتمی چگونه تغییر می‌کند؟', options: ['افزایش می‌یابد', 'کاهش می‌یابد', 'ثابت می‌ماند', 'ابتدا افزایش سپس کاهش'], correctOption: 1, explanation: 'با حرکت از چپ به راست، بار هسته افزایش می‌یابد و الکترون‌ها محکم‌تر جذب می‌شوند، در نتیجه شعاع کاهش می‌یابد.', status: 'active', sortOrder: 1 },
  { id: 'q11', topicId: 't-chem12-1-4', text: 'انرژی یونش با حرکت از پایین به بالا در یک گروه چگونه تغییر می‌کند؟', options: ['کاهش', 'افزایش', 'بدون تغییر', 'نامنظم'], correctOption: 1, explanation: 'با حرکت به سمت بالای گروه، شعاع کاهش می‌یابد و الکترون‌ها محکم‌تر نگه‌داری می‌شوند، پس انرژی یونش افزایش می‌یابد.', status: 'active', sortOrder: 2 },
  // گازها
  { id: 'q12', topicId: 't-chem12-2-1', text: 'قانون بویل رابطه بین کدام کمیت‌ها را بیان می‌کند؟', options: ['فشار و دما', 'حجم و دما', 'فشار و حجم', 'حجم و مول'], correctOption: 2, explanation: 'قانون بویل: در دمای ثابت، فشار و حجم گاز نسبت عکس دارند. PV = ثابت.', status: 'active', sortOrder: 1 },
  { id: 'q13', topicId: 't-chem12-2-1', text: 'معادله حالت گاز ایده‌آل کدام است؟', options: ['PV = nRT', 'P = nRT', 'V = nRT', 'PV = T/nR'], correctOption: 0, explanation: 'معادله حالت گاز ایده‌آل: PV = nRT که در آن P فشار، V حجم، n مول، R ثابت گاز و T دما است.', status: 'active', sortOrder: 2 },
  // آب
  { id: 'q14', topicId: 't-chem12-3-1', text: 'بالاترین چگالی آب در چه دمایی است؟', options: ['۰ درجه', '۴ درجه', '۱۰ درجه', '۱۰۰ درجه'], correctOption: 1, explanation: 'آب در دمای ۴ درجه سانتی‌گراد بیشترین چگالی را دارد.', status: 'active', sortOrder: 1 },
  // زیست - نورون
  { id: 'q15', topicId: 't-bio12-1-1', text: 'بخشی از نورون که پیام عصبی را دریافت می‌کند کدام است؟', options: ['آکسون', 'دندریت', 'میلین', 'گره رانویه'], correctOption: 1, explanation: 'دندریت‌ها پیام‌های عصبی را از نورون‌های دیگر دریافت کرده و به جسم سلولی منتقل می‌کنند.', status: 'active', sortOrder: 1 },
  { id: 'q16', topicId: 't-bio12-1-1', text: 'غلاف میلین توسط کدام سلول در سیستم عصبی محیطی ساخته می‌شود؟', options: ['سلول‌های اشوان', 'سلول‌های estrellas', 'میکروگلیا', 'نورون'], correctOption: 0, explanation: 'در سیستم عصبی محیطی، سلول‌های اشوان غلاف میلین را می‌سازند.', status: 'active', sortOrder: 2 },
  // پتانسیل عمل
  { id: 'q17', topicId: 't-bio12-1-2', text: 'در حالت استراحت، پتانسیل غشای نورون حدود چقدر است؟', options: ['+۳۰ میلی‌ولت', '۰ میلی‌ولت', '۷۰- میلی‌ولت', '+۹۰ میلی‌ولت'], correctOption: 2, explanation: 'پتانسیل استراحت غشای نورون حدود ۷۰- میلی‌ولت است که ناشی از توزیع یون‌ها است.', status: 'active', sortOrder: 1 },
  // فیزیک
  { id: 'q18', topicId: 't-phy12-1-1', text: 'کدام‌یک از کمیت‌های زیر کمیت پایه است؟', options: ['سرعت', 'نیرو', 'جرم', 'انرژی'], correctOption: 2, explanation: 'جرم یکی از هفت کمیت پایه در سیستم SI است. سرعت، نیرو و انرژی کمیت‌های مشتق هستند.', status: 'active', sortOrder: 1 },
  // ریاضی
  { id: 'q19', topicId: 't-math12-1-1', text: 'حد تابع f(x) = 3x + 1 هنگامی که x به ۲ میل می‌کند چقدر است؟', options: ['۵', '۶', '۷', '۴'], correctOption: 2, explanation: 'f(2) = 3(2) + 1 = 7. چون تابع پیوسته است، حد برابر مقدار تابع در آن نقطه است.', status: 'active', sortOrder: 1 },
  { id: 'q20', topicId: 't-math12-1-2', text: 'حد lim(x→0) sin(x)/x برابر با چیست؟', options: ['۰', '۱', '∞', 'تعریف‌نشده'], correctOption: 1, explanation: 'این حد معروف برابر با ۱ است و یکی از مهم‌ترین حدهای پایه در حساب دیفرانسیل محسوب می‌شود.', status: 'active', sortOrder: 1 },
  { id: 'q21', topicId: 't-math12-1-2', text: 'اگر lim f(x) = 4 و lim g(x) = 2، آنگاه lim[f(x)×g(x)] برابر است با:', options: ['۲', '۶', '۸', '۴'], correctOption: 2, explanation: 'حد ضرب برابر ضرب حدود است: ۴ × ۲ = ۸.', status: 'active', sortOrder: 2 },
  { id: 'q22', topicId: 't-chem12-2-2', text: 'طبق نظریه جنبشی، انرژی جنبشی متوسط مولکول‌های گاز به چه چیزی بستگی دارد؟', options: ['حجم گاز', 'فشار گاز', 'دما', 'تعداد مول'], correctOption: 2, explanation: 'انرژی جنبکی متوسط مولکول‌های گاز فقط به دما بستگی دارد و مستقل از جرم و نوع گاز است.', status: 'active', sortOrder: 1 },
  { id: 'q23', topicId: 't-bio12-2-1', text: 'هورمون انسولین توسط کدام غده ترشح می‌شود؟', options: ['تیروئید', 'پانکراس', 'کلیه', 'غده فوق کلیوی'], correctOption: 1, explanation: 'انسولین توسط سلول‌های بتای جزایر لانگرهانس در پانکراس ترشح می‌شود و قند خون را کاهش می‌دهد.', status: 'active', sortOrder: 1 },
  { id: 'q24', topicId: 't-chem12-1-1', text: 'ایزوتوپ‌های یک عنصر تعداد پروتون‌های یکسان اما تعداد ... متفاوت دارند.', options: ['الکترون', 'نوترون', 'پروتون', 'بار'], correctOption: 1, explanation: 'ایزوتوپ‌ها عدد اتمی یکسان (پروتون) و عدد جرمی متفاوت (نوترون) دارند.', status: 'active', sortOrder: 5 },
];

export const videos: Video[] = [
  { id: 'v1', topicId: 't-chem12-1-1', title: 'ساختار اتم — از دموکریت تا بور', url: 'https://www.youtube.com/embed/Rd4a1X3ZJiU', thumbnail: 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=600', durationSec: 842, status: 'active' },
  { id: 'v2', topicId: 't-chem12-1-2', title: 'آرایش الکترونی به‌زبان ساده', url: 'https://www.youtube.com/embed/Rd4a1X3ZJiU', thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600', durationSec: 615, status: 'active' },
  { id: 'v3', topicId: 't-chem12-1-4', title: 'خواص تناوبی عناصر', url: 'https://www.youtube.com/embed/Rd4a1X3ZJiU', thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600', durationSec: 720, status: 'active' },
  { id: 'v4', topicId: 't-bio12-1-1', title: 'ساختمان نورون و سیناپس', url: 'https://www.youtube.com/embed/Rd4a1X3ZJiU', thumbnail: 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=600', durationSec: 530, status: 'active' },
  { id: 'v5', topicId: 't-phy12-1-1', title: 'کمیت‌ها و یکاها در فیزیک', url: 'https://www.youtube.com/embed/Rd4a1X3ZJiU', thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600', durationSec: 480, status: 'active' },
];

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString();
const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString();

export const students: Student[] = [
  { id: 'st1', firstName: 'امیر', lastName: 'محمدی', mobile: '09120000001', gradeId: 'g12', targetExam: 'کنکور تجربی ۱۴۰۵', joinedAt: daysAgo(120), lastActive: hoursAgo(2), questionsToday: 20, totalQuestions: 1240, avgScore: 72, streak: 7 },
  { id: 'st2', firstName: 'سارا', lastName: 'احمدی', mobile: '09120000002', gradeId: 'g12', targetExam: 'کنکور تجربی ۱۴۰۵', joinedAt: daysAgo(90), lastActive: hoursAgo(5), questionsToday: 15, totalQuestions: 890, avgScore: 81, streak: 12 },
  { id: 'st3', firstName: 'رضا', lastName: 'کریمی', mobile: '09120000003', gradeId: 'g11', targetExam: 'کنکور ریاضی ۱۴۰۶', joinedAt: daysAgo(60), lastActive: hoursAgo(1), questionsToday: 30, totalQuestions: 520, avgScore: 65, streak: 3 },
  { id: 'st4', firstName: 'مریم', lastName: 'حسینی', mobile: '09120000004', gradeId: 'g12', targetExam: 'کنکور انسانی ۱۴۰۵', joinedAt: daysAgo(200), lastActive: hoursAgo(24), questionsToday: 0, totalQuestions: 2100, avgScore: 88, streak: 0 },
  { id: 'st5', firstName: 'نیما', lastName: 'رستمی', mobile: '09120000005', gradeId: 'g10', targetExam: 'کنکور تجربی ۱۴۰۷', joinedAt: daysAgo(30), lastActive: hoursAgo(8), questionsToday: 10, totalQuestions: 180, avgScore: 55, streak: 2 },
  { id: 'st6', firstName: 'الناز', lastName: 'صادقی', mobile: '09120000006', gradeId: 'g12', targetExam: 'کنکور تجربی ۱۴۰۵', joinedAt: daysAgo(150), lastActive: hoursAgo(3), questionsToday: 25, totalQuestions: 1600, avgScore: 79, streak: 15 },
];

export const currentStudent: StudentProfile = {
  firstName: 'امیر',
  lastName: 'محمدی',
  mobile: '09120000001',
  gradeId: 'g12',
  targetExam: 'کنکور تجربی ۱۴۰۵',
  email: 'amir.mohammadi@example.com',
};

export const topicProgress: TopicProgress[] = [
  { topicId: 't-chem12-1-1', answered: 4, correct: 3, total: 5, lastPracticed: hoursAgo(2) },
  { topicId: 't-chem12-1-2', answered: 3, correct: 2, total: 3, lastPracticed: daysAgo(1) },
  { topicId: 't-chem12-1-3', answered: 2, correct: 1, total: 2, lastPracticed: daysAgo(2) },
  { topicId: 't-chem12-1-4', answered: 1, correct: 0, total: 2, lastPracticed: daysAgo(3) },
  { topicId: 't-bio12-1-1', answered: 2, correct: 2, total: 2, lastPracticed: daysAgo(1) },
  { topicId: 't-math12-1-1', answered: 1, correct: 1, total: 1, lastPracticed: hoursAgo(5) },
];

export const learningHistory: LearningHistoryItem[] = [
  {
    id: 'h1', date: hoursAgo(2), topicId: 't-chem12-1-1', topicTitle: 'ساختار اتم', subjectTitle: 'شیمی',
    total: 5, correct: 3, wrong: 1, unanswered: 1, score: 60,
    answers: [
      { questionId: 'q1', selectedOption: 0, isCorrect: true, skipped: false },
      { questionId: 'q2', selectedOption: 1, isCorrect: true, skipped: false },
      { questionId: 'q3', selectedOption: 1, isCorrect: false, skipped: false },
      { questionId: 'q4', selectedOption: 2, isCorrect: true, skipped: false },
      { questionId: 'q24', selectedOption: null, isCorrect: false, skipped: true },
    ],
  },
  {
    id: 'h2', date: daysAgo(1), topicId: 't-bio12-1-1', topicTitle: 'ساختمان نورون', subjectTitle: 'زیست‌شناسی',
    total: 2, correct: 2, wrong: 0, unanswered: 0, score: 100,
    answers: [
      { questionId: 'q15', selectedOption: 1, isCorrect: true, skipped: false },
      { questionId: 'q16', selectedOption: 0, isCorrect: true, skipped: false },
    ],
  },
  {
    id: 'h3', date: daysAgo(2), topicId: 't-chem12-1-2', topicTitle: 'آرایش الکترونی', subjectTitle: 'شیمی',
    total: 3, correct: 2, wrong: 1, unanswered: 0, score: 67,
    answers: [
      { questionId: 'q5', selectedOption: 0, isCorrect: true, skipped: false },
      { questionId: 'q6', selectedOption: 0, isCorrect: false, skipped: false },
      { questionId: 'q7', selectedOption: 2, isCorrect: true, skipped: false },
    ],
  },
  {
    id: 'h4', date: daysAgo(3), topicId: 't-chem12-1-4', topicTitle: 'خواص تناوبی عناصر', subjectTitle: 'شیمی',
    total: 2, correct: 0, wrong: 2, unanswered: 0, score: 0,
    answers: [
      { questionId: 'q10', selectedOption: 0, isCorrect: false, skipped: false },
      { questionId: 'q11', selectedOption: 0, isCorrect: false, skipped: false },
    ],
  },
  {
    id: 'h5', date: daysAgo(4), topicId: 't-math12-1-1', topicTitle: 'حد یک تابع', subjectTitle: 'ریاضی',
    total: 1, correct: 1, wrong: 0, unanswered: 0, score: 100,
    answers: [
      { questionId: 'q19', selectedOption: 2, isCorrect: true, skipped: false },
    ],
  },
];
