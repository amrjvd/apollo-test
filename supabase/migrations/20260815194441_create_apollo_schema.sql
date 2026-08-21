/*
# Apollo — Educational Platform Database Schema

## Overview
Creates the complete database schema for Apollo, a Persian educational platform for Iranian Konkur students.
The schema follows the content hierarchy: Grade → Subject → Chapter → Topic → Questions, plus student tracking tables.

## New Tables

1. **grades** — Educational levels (e.g., پایه دهم, پایه دوازدهم)
   - id (text, PK), title, description, status, sort_order

2. **subjects** — Subjects within a grade (e.g., شیمی, زیست‌شناسی)
   - id (text, PK), grade_id (FK→grades), title, description, icon, color, status, sort_order

3. **chapters** — Chapters within a subject (e.g., فصل اول)
   - id (text, PK), subject_id (FK→subjects), title, description, status, sort_order

4. **topics** — Topics within a chapter (e.g., ساختار اتم)
   - id (text, PK), chapter_id (FK→chapters), title, description, has_video, status, sort_order

5. **questions** — Multiple-choice questions within a topic
   - id (text, PK), topic_id (FK→topics), text, options (text[4]), correct_option (0-3), explanation, status, sort_order

6. **videos** — Educational videos attached to topics
   - id (text, PK), topic_id (FK→topics), title, url, thumbnail, duration_sec, status

7. **student_profiles** — Extended student info linked to auth.users
   - id (uuid, PK), user_id (uuid, FK→auth.users), first_name, last_name, mobile, grade_id (FK→grades), target_exam, email, avatar_url

8. **question_answers** — Individual student answers to questions
   - id (uuid, PK), user_id (uuid, defaults to auth.uid()), question_id (FK→questions), selected_option, is_correct, skipped, answered_at

9. **learning_history** — Practice session summaries per student
   - id (uuid, PK), user_id (uuid, defaults to auth.uid()), topic_id (FK→topics), total, correct, wrong, unanswered, score, practiced_at

10. **student_progress** — Aggregated progress per topic per student
    - id (uuid, PK), user_id (uuid, defaults to auth.uid()), topic_id (FK→topics), answered, correct, total, last_practiced

## Security
- RLS enabled on ALL tables.
- Content tables (grades, subjects, chapters, topics, questions, videos): public read + authenticated write (educational content is shared).
- Student data tables (student_profiles, question_answers, learning_history, student_progress): owner-scoped via user_id with DEFAULT auth.uid().
  Note: auth UI is planned but not yet connected. Student tables use authenticated-only policies — they will become functional when auth is implemented.
- All policies use auth.uid(), never current_user.

## Seed Data
All content tables are seeded with realistic Persian educational data:
- 3 grades, 6 subjects, 7 chapters, 13 topics, 24 questions, 5 videos
*/

-- ===== GRADES =====
CREATE TABLE IF NOT EXISTS grades (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "grades_select" ON grades;
CREATE POLICY "grades_select" ON grades FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "grades_insert" ON grades;
CREATE POLICY "grades_insert" ON grades FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "grades_update" ON grades;
CREATE POLICY "grades_update" ON grades FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "grades_delete" ON grades;
CREATE POLICY "grades_delete" ON grades FOR DELETE TO authenticated USING (true);

-- ===== SUBJECTS =====
CREATE TABLE IF NOT EXISTS subjects (
  id text PRIMARY KEY,
  grade_id text NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'book' CHECK (icon IN ('biology', 'chemistry', 'physics', 'math', 'geology', 'literature')),
  color text NOT NULL DEFAULT '#4179FF',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subjects_select" ON subjects;
CREATE POLICY "subjects_select" ON subjects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "subjects_insert" ON subjects;
CREATE POLICY "subjects_insert" ON subjects FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "subjects_update" ON subjects;
CREATE POLICY "subjects_update" ON subjects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "subjects_delete" ON subjects;
CREATE POLICY "subjects_delete" ON subjects FOR DELETE TO authenticated USING (true);

-- ===== CHAPTERS =====
CREATE TABLE IF NOT EXISTS chapters (
  id text PRIMARY KEY,
  subject_id text NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "chapters_select" ON chapters;
CREATE POLICY "chapters_select" ON chapters FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "chapters_insert" ON chapters;
CREATE POLICY "chapters_insert" ON chapters FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "chapters_update" ON chapters;
CREATE POLICY "chapters_update" ON chapters FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "chapters_delete" ON chapters;
CREATE POLICY "chapters_delete" ON chapters FOR DELETE TO authenticated USING (true);

-- ===== TOPICS =====
CREATE TABLE IF NOT EXISTS topics (
  id text PRIMARY KEY,
  chapter_id text NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  has_video boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "topics_select" ON topics;
CREATE POLICY "topics_select" ON topics FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "topics_insert" ON topics;
CREATE POLICY "topics_insert" ON topics FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "topics_update" ON topics;
CREATE POLICY "topics_update" ON topics FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "topics_delete" ON topics;
CREATE POLICY "topics_delete" ON topics FOR DELETE TO authenticated USING (true);

-- ===== QUESTIONS =====
CREATE TABLE IF NOT EXISTS questions (
  id text PRIMARY KEY,
  topic_id text NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  text text NOT NULL,
  options text[4] NOT NULL,
  correct_option smallint NOT NULL CHECK (correct_option >= 0 AND correct_option <= 3),
  explanation text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "questions_select" ON questions;
CREATE POLICY "questions_select" ON questions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "questions_insert" ON questions;
CREATE POLICY "questions_insert" ON questions FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "questions_update" ON questions;
CREATE POLICY "questions_update" ON questions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "questions_delete" ON questions;
CREATE POLICY "questions_delete" ON questions FOR DELETE TO authenticated USING (true);

-- ===== VIDEOS =====
CREATE TABLE IF NOT EXISTS videos (
  id text PRIMARY KEY,
  topic_id text NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  thumbnail text NOT NULL DEFAULT '',
  duration_sec integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "videos_select" ON videos;
CREATE POLICY "videos_select" ON videos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "videos_insert" ON videos;
CREATE POLICY "videos_insert" ON videos FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "videos_update" ON videos;
CREATE POLICY "videos_update" ON videos FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "videos_delete" ON videos;
CREATE POLICY "videos_delete" ON videos FOR DELETE TO authenticated USING (true);

-- ===== STUDENT PROFILES =====
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  mobile text NOT NULL DEFAULT '',
  grade_id text REFERENCES grades(id) ON DELETE SET NULL,
  target_exam text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "student_profiles_select_own" ON student_profiles;
CREATE POLICY "student_profiles_select_own" ON student_profiles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_profiles_insert_own" ON student_profiles;
CREATE POLICY "student_profiles_insert_own" ON student_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_profiles_update_own" ON student_profiles;
CREATE POLICY "student_profiles_update_own" ON student_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_profiles_delete_own" ON student_profiles;
CREATE POLICY "student_profiles_delete_own" ON student_profiles FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== QUESTION ANSWERS =====
CREATE TABLE IF NOT EXISTS question_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id text NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option smallint,
  is_correct boolean NOT NULL DEFAULT false,
  skipped boolean NOT NULL DEFAULT false,
  answered_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE question_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "question_answers_select_own" ON question_answers;
CREATE POLICY "question_answers_select_own" ON question_answers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "question_answers_insert_own" ON question_answers;
CREATE POLICY "question_answers_insert_own" ON question_answers FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "question_answers_update_own" ON question_answers;
CREATE POLICY "question_answers_update_own" ON question_answers FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "question_answers_delete_own" ON question_answers;
CREATE POLICY "question_answers_delete_own" ON question_answers FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== LEARNING HISTORY =====
CREATE TABLE IF NOT EXISTS learning_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  total integer NOT NULL DEFAULT 0,
  correct integer NOT NULL DEFAULT 0,
  wrong integer NOT NULL DEFAULT 0,
  unanswered integer NOT NULL DEFAULT 0,
  score integer NOT NULL DEFAULT 0,
  practiced_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE learning_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "learning_history_select_own" ON learning_history;
CREATE POLICY "learning_history_select_own" ON learning_history FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "learning_history_insert_own" ON learning_history;
CREATE POLICY "learning_history_insert_own" ON learning_history FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "learning_history_update_own" ON learning_history;
CREATE POLICY "learning_history_update_own" ON learning_history FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "learning_history_delete_own" ON learning_history;
CREATE POLICY "learning_history_delete_own" ON learning_history FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== STUDENT PROGRESS =====
CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  answered integer NOT NULL DEFAULT 0,
  correct integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  last_practiced timestamptz,
  UNIQUE(user_id, topic_id)
);
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "student_progress_select_own" ON student_progress;
CREATE POLICY "student_progress_select_own" ON student_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_progress_insert_own" ON student_progress;
CREATE POLICY "student_progress_insert_own" ON student_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_progress_update_own" ON student_progress;
CREATE POLICY "student_progress_update_own" ON student_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "student_progress_delete_own" ON student_progress;
CREATE POLICY "student_progress_delete_own" ON student_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_subjects_grade ON subjects(grade_id);
CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_chapter ON topics(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_videos_topic ON videos(topic_id);
CREATE INDEX IF NOT EXISTS idx_question_answers_user ON question_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_question_answers_question ON question_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_learning_history_user ON learning_history(user_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_user_topic ON student_progress(user_id, topic_id);

-- ===== SEED DATA =====
INSERT INTO grades (id, title, description, status, sort_order) VALUES
  ('g10', 'پایه دهم', 'محتوای آموزشی پایه دهم متوسطه', 'active', 1),
  ('g11', 'پایه یازدهم', 'محتوای آموزشی پایه یازدهم متوسطه', 'active', 2),
  ('g12', 'پایه دوازدهم', 'محتوای آموزشی پایه دوازدهم متوسطه — آمادگی کنکور', 'active', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO subjects (id, grade_id, title, description, icon, color, status, sort_order) VALUES
  ('s-bio12', 'g12', 'زیست‌شناسی', 'زیست‌شناسی پایه دوازدهم', 'biology', '#16a34a', 'active', 1),
  ('s-chem12', 'g12', 'شیمی', 'شیمی پایه دوازدهم', 'chemistry', '#0891b2', 'active', 2),
  ('s-phy12', 'g12', 'فیزیک', 'فیزیک پایه دوازدهم', 'physics', '#dc2626', 'active', 3),
  ('s-math12', 'g12', 'ریاضی', 'ریاضیات پایه دوازدهم', 'math', '#7c3aed', 'active', 4),
  ('s-bio11', 'g11', 'زیست‌شناسی', 'زیست‌شناسی پایه یازدهم', 'biology', '#16a34a', 'active', 1),
  ('s-chem11', 'g11', 'شیمی', 'شیمی پایه یازدهم', 'chemistry', '#0891b2', 'active', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO chapters (id, subject_id, title, description, status, sort_order) VALUES
  ('c-chem12-1', 's-chem12', 'فصل اول — کیهان زادگاه الفبای هستی', 'مفاهیم پایه‌ای اتم و ساختار ماده', 'active', 1),
  ('c-chem12-2', 's-chem12', 'فصل دوم — ردپای گازها در زندگی', 'بررسی گازها و کاربردهای آن‌ها', 'active', 2),
  ('c-chem12-3', 's-chem12', 'فصل سوم — آب آهنگ زندگی', 'آب، محلول‌ها و ویژگی‌های آن‌ها', 'active', 3),
  ('c-bio12-1', 's-bio12', 'فصل اول — تنظیم عصبی', 'سیستم عصبی و عملکرد آن', 'active', 1),
  ('c-bio12-2', 's-bio12', 'فصل دوم — تنظیم شیمیایی', 'هورمون‌ها و سیستم غدد درون‌ریز', 'active', 2),
  ('c-phy12-1', 's-phy12', 'فصل اول — فیزیک و اندازه‌گیری', 'کمیت‌ها و اندازه‌گیری در فیزیک', 'active', 1),
  ('c-math12-1', 's-math12', 'فصل اول — حد و پیوستگی', 'مفهوم حد، حد یک تابع و پیوستگی', 'active', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO topics (id, chapter_id, title, description, has_video, status, sort_order) VALUES
  ('t-chem12-1-1', 'c-chem12-1', 'ساختار اتم', 'آشنایی با ساختار اتم، ذرات بنیادی و مدل‌های اتمی', true, 'active', 1),
  ('t-chem12-1-2', 'c-chem12-1', 'آرایش الکترونی', 'چینش الکترون‌ها در ترازهای انرژی و قواعد پر شدن', true, 'active', 2),
  ('t-chem12-1-3', 'c-chem12-1', 'جدول تناوبی', 'ساختار جدول تناوبی و دسته‌بندی عناصر', false, 'active', 3),
  ('t-chem12-1-4', 'c-chem12-1', 'خواص تناوبی عناصر', 'روند تغییر شعاع اتمی، انرژی یونش و الکترونگاتیوی', true, 'active', 4),
  ('t-chem12-2-1', 'c-chem12-2', 'گازها و قوانین آن‌ها', 'قانون بویل، شارل و معادله حالت گازها', true, 'active', 1),
  ('t-chem12-2-2', 'c-chem12-2', 'نظریه جنبشی مولکولی', 'مدل جنبشی گازها و سرعت متوسط مولکول‌ها', false, 'active', 2),
  ('t-chem12-3-1', 'c-chem12-3', 'آب و ویژگی‌های آن', 'ساختار مولکول آب، پیوند هیدروژنی و ویژگی‌های ویژه', true, 'active', 1),
  ('t-bio12-1-1', 'c-bio12-1', 'ساختمان نورون', 'ساختار نورون، دندریت، آکسون و سیناپس', true, 'active', 1),
  ('t-bio12-1-2', 'c-bio12-1', 'پتانسیل عمل', 'مکانیزم ایجاد و انتقال پتانسیل عمل', true, 'active', 2),
  ('t-bio12-2-1', 'c-bio12-2', 'غدد درون‌ریز', 'ساختار و عملکرد غدد درون‌ریز', false, 'active', 1),
  ('t-phy12-1-1', 'c-phy12-1', 'کمیت‌ها و یکاها', 'کمیت‌های پایه و مشتق، سیستم یکایی SI', true, 'active', 1),
  ('t-math12-1-1', 'c-math12-1', 'حد یک تابع', 'تعریف حد، حد در بی‌نهایت و حد در یک نقطه', true, 'active', 1),
  ('t-math12-1-2', 'c-math12-1', 'قواعد محاسبه حد', 'قواعد جمع، ضرب و حد توابع ترکیبی', false, 'active', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (id, topic_id, text, options, correct_option, explanation, status, sort_order) VALUES
  ('q1', 't-chem12-1-1', 'تعداد پروتون‌های اتم نئون با عدد اتمی ۱۰ و عدد جرمی ۲۰ چقدر است؟', ARRAY['۱۰','۲۰','۳۰','۱۵'], 0, 'عدد اتمی برابر با تعداد پروتون‌ها است. نئون با عدد اتمی ۱۰ دارای ۱۰ پروتون است.', 'active', 1),
  ('q2', 't-chem12-1-1', 'کدام ذره باری الکتریکی ندارد؟', ARRAY['پروتون','نوترون','الکترون','پوزیترون'], 1, 'نوترون ذره‌ای خنثی و بدون بار الکتریکی است که در هسته اتم قرار دارد.', 'active', 2),
  ('q3', 't-chem12-1-1', 'در مدل اتمی بور، الکترون‌ها در کدام قسمت قرار دارند؟', ARRAY['هسته','ترازهای انرژی مشخص','پرتوی کاتدی','به‌صورت ابری پیوسته'], 1, 'در مدل بور، الکترون‌ها در ترازهای انرژی مشخص و گسسته به دور هسته می‌چرخند.', 'active', 3),
  ('q4', 't-chem12-1-1', 'عدد جرمی اتم برابر است با مجموع تعداد...', ARRAY['پروتون و الکترون','نوترون و الکترون','پروتون و نوترون','پروتون، نوترون و الکترون'], 2, 'عدد جرمی برابر با مجموع تعداد پروتون‌ها و نوترون‌های هسته است.', 'active', 4),
  ('q5', 't-chem12-1-2', 'آرایش الکترونی اتم سدیم (Na، عدد اتمی ۱۱) کدام است؟', ARRAY['۲،۸،۱','۲،۹','۱،۸،۲','۲،۸،۲'], 0, 'سدیم با ۱۱ الکترون: ۲ الکترون در تراز اول، ۸ الکترون در تراز دوم و ۱ الکترون در تراز سوم.', 'active', 1),
  ('q6', 't-chem12-1-2', 'حداکثر ظرفیت الکترونی تراز سوم چقدر است؟', ARRAY['۸','۱۸','۳۲','۲'], 1, 'ظرفیت تراز n برابر با ۲n² است. تراز سوم: ۲×۹ = ۱۸ الکترون.', 'active', 2),
  ('q7', 't-chem12-1-2', 'قاعده هوند می‌گوید الکترون‌ها در ترازهای هم‌انرژی چگونه پر می‌شوند؟', ARRAY['جفت‌شکن قبل از تک‌نشینی','همگی با اسپین مخالف','ابتدا به‌صورت تک‌نشین با اسپین موازی','به‌صورت تصادفی'], 2, 'قاعده هوند: الکترون‌ها ابتدا به‌صورت تک‌نشین و با اسپین موازی در اوربیتال‌های هم‌انرژی پر می‌شوند.', 'active', 3),
  ('q8', 't-chem12-1-3', 'عناصر گروه ۱۸ جدول تناوبی چه نامیده می‌شوند؟', ARRAY['فلزات قلیایی','هالوژن‌ها','گازهای نجیب','فلزات قلیایی خاکی'], 2, 'گازهای نجیب یا گازهای بی‌اثر در گروه ۱۸ قرار دارند و لایه ظرفیت آن‌ها کامل است.', 'active', 1),
  ('q9', 't-chem12-1-3', 'دوره در جدول تناوبی نشان‌دهنده چیست؟', ARRAY['ستون افقی','ردیف عمودی','تعداد گروه‌ها','تعداد لایه‌های الکترونی'], 3, 'دوره نشان‌دهنده تعداد لایه‌های الکترونی پر شده در اتم عناصر آن دوره است.', 'active', 2),
  ('q10', 't-chem12-1-4', 'با حرکت از چپ به راست در یک دوره، شعاع اتمی چگونه تغییر می‌کند؟', ARRAY['افزایش می‌یابد','کاهش می‌یابد','ثابت می‌ماند','ابتدا افزایش سپس کاهش'], 1, 'با حرکت از چپ به راست، بار هسته افزایش می‌یابد و الکترون‌ها محکم‌تر جذب می‌شوند، در نتیجه شعاع کاهش می‌یابد.', 'active', 1),
  ('q11', 't-chem12-1-4', 'انرژی یونش با حرکت از پایین به بالا در یک گروه چگونه تغییر می‌کند؟', ARRAY['کاهش','افزایش','بدون تغییر','نامنظم'], 1, 'با حرکت به سمت بالای گروه، شعاع کاهش می‌یابد و الکترون‌ها محکم‌تر نگه‌داری می‌شوند، پس انرژی یونش افزایش می‌یابد.', 'active', 2),
  ('q12', 't-chem12-2-1', 'قانون بویل رابطه بین کدام کمیت‌ها را بیان می‌کند؟', ARRAY['فشار و دما','حجم و دما','فشار و حجم','حجم و مول'], 2, 'قانون بویل: در دمای ثابت، فشار و حجم گاز نسبت عکس دارند. PV = ثابت.', 'active', 1),
  ('q13', 't-chem12-2-1', 'معادله حالت گاز ایده‌آل کدام است؟', ARRAY['PV = nRT','P = nRT','V = nRT','PV = T/nR'], 0, 'معادله حالت گاز ایده‌آل: PV = nRT که در آن P فشار، V حجم، n مول، R ثابت گاز و T دما است.', 'active', 2),
  ('q14', 't-chem12-3-1', 'بالاترین چگالی آب در چه دمایی است؟', ARRAY['۰ درجه','۴ درجه','۱۰ درجه','۱۰۰ درجه'], 1, 'آب در دمای ۴ درجه سانتی‌گراد بیشترین چگالی را دارد.', 'active', 1),
  ('q15', 't-bio12-1-1', 'بخشی از نورون که پیام عصبی را دریافت می‌کند کدام است؟', ARRAY['آکسون','دندریت','میلین','گره رانویه'], 1, 'دندریت‌ها پیام‌های عصبی را از نورون‌های دیگر دریافت کرده و به جسم سلولی منتقل می‌کنند.', 'active', 1),
  ('q16', 't-bio12-1-1', 'غلاف میلین توسط کدام سلول در سیستم عصبی محیطی ساخته می‌شود؟', ARRAY['سلول‌های اشوان','سلول‌های estrellas','میکروگلیا','نورون'], 0, 'در سیستم عصبی محیطی، سلول‌های اشوان غلاف میلین را می‌سازند.', 'active', 2),
  ('q17', 't-bio12-1-2', 'در حالت استراحت، پتانسیل غشای نورون حدود چقدر است؟', ARRAY['+۳۰ میلی‌ولت','۰ میلی‌ولت','۷۰- میلی‌ولت','+۹۰ میلی‌ولت'], 2, 'پتانسیل استراحت غشای نورون حدود ۷۰- میلی‌ولت است که ناشی از توزیع یون‌ها است.', 'active', 1),
  ('q18', 't-phy12-1-1', 'کدام‌یک از کمیت‌های زیر کمیت پایه است؟', ARRAY['سرعت','نیرو','جرم','انرژی'], 2, 'جرم یکی از هفت کمیت پایه در سیستم SI است. سرعت، نیرو و انرژی کمیت‌های مشتق هستند.', 'active', 1),
  ('q19', 't-math12-1-1', 'حد تابع f(x) = 3x + 1 هنگامی که x به ۲ میل می‌کند چقدر است؟', ARRAY['۵','۶','۷','۴'], 2, 'f(2) = 3(2) + 1 = 7. چون تابع پیوسته است، حد برابر مقدار تابع در آن نقطه است.', 'active', 1),
  ('q20', 't-math12-1-2', 'حد lim(x→0) sin(x)/x برابر با چیست؟', ARRAY['۰','۱','∞','تعریف‌نشده'], 1, 'این حد معروف برابر با ۱ است و یکی از مهم‌ترین حدهای پایه در حساب دیفرانسیل محسوب می‌شود.', 'active', 1),
  ('q21', 't-math12-1-2', 'اگر lim f(x) = 4 و lim g(x) = 2، آنگاه lim[f(x)×g(x)] برابر است با:', ARRAY['۲','۶','۸','۴'], 2, 'حد ضرب برابر ضرب حدود است: ۴ × ۲ = ۸.', 'active', 2),
  ('q22', 't-chem12-2-2', 'طبق نظریه جنبشی، انرژی جنبشی متوسط مولکول‌های گاز به چه چیزی بستگی دارد؟', ARRAY['حجم گاز','فشار گاز','دما','تعداد مول'], 2, 'انرژی جنبکی متوسط مولکول‌های گاز فقط به دما بستگی دارد و مستقل از جرم و نوع گاز است.', 'active', 1),
  ('q23', 't-bio12-2-1', 'هورمون انسولین توسط کدام غده ترشح می‌شود؟', ARRAY['تیروئید','پانکراس','کلیه','غده فوق کلیوی'], 1, 'انسولین توسط سلول‌های بتای جزایر لانگرهانس در پانکراس ترشح می‌شود و قند خون را کاهش می‌دهد.', 'active', 1),
  ('q24', 't-chem12-1-1', 'ایزوتوپ‌های یک عنصر تعداد پروتون‌های یکسان اما تعداد ... متفاوت دارند.', ARRAY['الکترون','نوترون','پروتون','بار'], 1, 'ایزوتوپ‌ها عدد اتمی یکسان (پروتون) و عدد جرمی متفاوت (نوترون) دارند.', 'active', 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO videos (id, topic_id, title, url, thumbnail, duration_sec, status) VALUES
  ('v1', 't-chem12-1-1', 'ساختار اتم — از دموکریت تا بور', 'https://www.youtube.com/embed/Rd4a1X3ZJiU', 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=600', 842, 'active'),
  ('v2', 't-chem12-1-2', 'آرایش الکترونی به‌زبان ساده', 'https://www.youtube.com/embed/Rd4a1X3ZJiU', 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600', 615, 'active'),
  ('v3', 't-chem12-1-4', 'خواص تناوبی عناصر', 'https://www.youtube.com/embed/Rd4a1X3ZJiU', 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=600', 720, 'active'),
  ('v4', 't-bio12-1-1', 'ساختمان نورون و سیناپس', 'https://www.youtube.com/embed/Rd4a1X3ZJiU', 'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=600', 530, 'active'),
  ('v5', 't-phy12-1-1', 'کمیت‌ها و یکاها در فیزیک', 'https://www.youtube.com/embed/Rd4a1X3ZJiU', 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=600', 480, 'active')
ON CONFLICT (id) DO NOTHING;
