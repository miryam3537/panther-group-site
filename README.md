<div dir="rtl">

# 🐆 PANTER | פנתר — מזניקים להצלחה

> אתר הנציגות הדיגיטלי של **פנתר פרסום** — סוכנות יצירה ישראלית פרמיום לתחומי מיתוג, פרסום, דיגיטל, הפקות ולוחות חוצות.

---

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)

---

## 📋 תוכן עניינים

- [סקירה עסקית](#-סקירה-עסקית)
- [ארכיטקטורה טכנית](#-ארכיטקטורה-טכנית)
- [עיצוב וחוויית משתמש](#-עיצוב-וחוויית-משתמש)
- [ביצועים ואופטימיזציה](#-ביצועים-ואופטימיזציה)
- [פאנל ניהול](#-פאנל-ניהול-admin)
- [מבנה הפרויקט](#-מבנה-הפרויקט)
- [הנחיות התקנה](#-הנחיות-התקנה)
- [עתיד ומפת דרכים](#-עתיד-ומפת-דרכים)
- [קרדיטים וטכנולוגיות](#-קרדיטים-וטכנולוגיות)

---

## 💼 סקירה עסקית

### הבעיה שפתרנו

**פנתר פרסום** היא סוכנות יצירה ישראלית ותיקה עם יותר מ-10 שנות ניסיון, מאות פרויקטים ולקוחות מכל הסקטורים — ממסעדות ועד מוסדות חינוך, מחברות הייטק ועד עסקים משפחתיים. למרות המוניטין המצוין, הסוכנות פעלה ללא נוכחות דיגיטלית שמשקפת את רמתה.

בעידן שבו **הרושם הראשוני הוא דיגיטלי**, לקוח פוטנציאלי שמחפש "סוכנות פרסום" נכנס לאתר עוד לפני שהוא מתקשר. אם האתר אינו עונה על הציפיות — הוא עוזב. זוהי הבעיה הבסיסית שהפרויקט הזה פותר.

### הפתרון

אתר **פנתר** תוכנן ונבנה מהיסוד כנכס עסקי, לא כרק "כרטיס ביקור דיגיטלי". כל החלטת עיצוב, כל בחירה טכנית, כל שורת קוד — נועדה להשיג מטרה אחת: **להפוך מבקרים ללקוחות.**

- **האתר הוא המוצר** — הוא חייב להעביר מיידית את מה שפנתר עושה ולמה כדאי לבחור בה.
- **מהימנות בדוגמה** — חברת פרסום שהאתר שלה נראה מקצועי, מוכיחה בעצמה שהיא יודעת מה היא עושה.
- **המרה ישירה** — כל עמוד מסתיים בטופס יצירת קשר, המנגנון שמביא לידים לסוכנות.

---

## 🏗️ ארכיטקטורה טכנית

### Next.js 16 App Router — Server Components מהדרגה הראשונה

הפרויקט בנוי על **App Router** של Next.js, תוך שימוש מקסימלי ב-**React Server Components (RSC)**:

- **שליפת נתונים בצד השרת** — עמודי השירותים והגלריה שולפים נתונים ישירות מ-Supabase על השרת, ללא API calls מהדפדפן (**אין client-side waterfalls**).
- **`force-dynamic`** — עמודי הגלריה הדינמיים (`gallery/[category]`) מסומנים עם `export const dynamic = "force-dynamic"` כדי לוודא שהתוכן תמיד טרי, גם כשיש CDN caching.
- **Parallel Data Fetching** — שליפות מ-Supabase מרובות רצות במקביל עם `Promise.all()` כדי לצמצם את זמן התגובה הכולל.
- **Dynamic Metadata** — כל עמוד מייצר `<title>` ותגיות Open Graph ייחודיות דרך `generateMetadata()`, עם template גלובלי `%s | פנתר`.

```typescript
// שליפה מקבילית — שני query's בו זמנית
const [{ data: services }, { data: galleryImages }] = await Promise.all([
  supabase.from("services").select("slug, title, description").order("sort_order"),
  supabase.from("gallery_images").select("id, url, category").limit(60),
]);
```

### Supabase — Backend As A Service ו-CMS גמיש

**Supabase** משמש כ-Backend מלא:

| טבלה | תפקיד |
|------|--------|
| `services` | תכנים של עמוד המחלקות — כותרת, תיאור, תמונה, סדר הצגה |
| `gallery_images` | תמונות גלריה מסווגות לפי `category` ו-`display_order` |
| `leads` | לידים מטופס יצירת קשר — שם, טלפון, אימייל, הודעה |

- **Supabase Storage** — כל תמונות האתר (לוגו, תמונת הצוות, תמונות שירותים) מאוחסנות ב-Supabase Storage עם CDN גלובלי.
- **Row-Level Security (RLS)** — הטבלאות מוגנות, עם מדיניות read-only ציבורית לשירותים ולגלריה.
- **SSR Client** — שימוש ב-`@supabase/ssr` ליצירת Supabase client שמתפקד נכון בסביבת Server Components.

### TypeScript — בטיחות טיפוסית מקצה לקצה

הפרויקט כתוב **כולו ב-TypeScript**:
- טיפוסים מוגדרים לכל ישות DB (`Service`, `GalleryImage`, `Lead`).
- ממשקי props מוגדרים לכל component.
- TypeScript מגן מפני שגיאות runtime כמו גישה לשדות שאינם קיימים.

### API Route — טיפול מאובטח בלידים

```
POST /api/contact
```

- **Honeypot anti-spam** — שדה נסתר `_honeypot` מזהה ומחסום בוטים בצורה שקטה.
- **ולידציה בסיסית** — שם וטלפון הם שדות חובה.
- **הכנסה ל-Supabase** — הליד נשמר בטבלת `leads` עם sanitization מלא.

---

## 🎨 עיצוב וחוויית משתמש

### RTL מהשורש

האתר תוכנן **מראש לעברית**. כל ממשק הוא RTL:
- `<html lang="he" dir="rtl">` ב-root layout.
- ניווט ה-Header מבוסס RTL — הלוגו מימין, CTA משמאל.
- כל עמוד משתמש ב-`dir="rtl"` ו-`text-right` בתאים הרלוונטיים.

### פונט — Heebo

שימוש בפונט **Heebo** של Google (תת-קבוצות `hebrew` + `latin`), עם משקלים 400, 500, 700, 800, 900 — מה שמאפשר היררכיה טיפוגרפית עשירה.

### אנימציות — Framer Motion

עמוד **אודות** מציג מגוון אנימציות:

| אנימציה | מיקום |
|---------|--------|
| `slideInRight` + `slideInLeft` | Hero — טקסט ותמונה נכנסים ממנגד |
| `scaleIn` | תמונת הצוות בתוך ה-Hero |
| `staggerContainer` + `staggerItem` | כרטיסי הערכים וסטטיסטיקות מופיעים בזה אחר זה |
| `CountUp` | מונה המספרים (10+, 500+, 200+) מתפעל כש-element נכנס ל-viewport |

```typescript
// CountUp — אנימציה עם requestAnimationFrame ו-easing
const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // ease-out expo
setCount(Math.floor(eased * end));
```

### גלריה — UX מושקע

- **Hero fullscreen** — כניסה לגלריה של קטגוריה עם תמונת hero מסך מלא + overlay gradients.
- **Featured image** — התמונה הראשונה תופסת 2×2 תאים בגריד — טכניקת masonry פשוטה ואפקטיבית.
- **GalleryCycler** — ב-homepage, קומפוננטה client-side שמחזירה תמונות מהגלריה ב-slot קבוע, עם מעבר חלק וtransitions מוגנים מגישה.
- **Scroll indicator** — חץ מונפש bouncing מוביל את המשתמש מה-Hero לגריד.

### שירותים — Visual Rhythm

שורות המחלקות מתחלפות בין **שחור ולבן** (אינדקס זוגי/אי-זוגי) ובין פריסה רגילה/הפוכה. זה יוצר קצב ויזואלי שמנחה את העין ומונע שעמום בדף ארוך.

### נגישות

- **UserWay Widget** — widget נגישות מסחרי מוטמע דרך `next/script` עם strategy `afterInteractive` (לא חוסם rendering).
- **HTML סמנטי** — שימוש ב-`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **ARIA Labels** — על לינקים, ניווט, ו-landmark regions.
- **עמוד נגישות** — עמוד ייעודי (`/accessibility`) המפרט את מדיניות הנגישות של הסוכנות.

### ניווט — Header ו-Mobile

- **Sticky Header** עם `backdrop-blur` שמשמר קריאות מעל כל background.
- **MobileNav** — hamburger menu ייעודי למובייל עם אנימציה.
- **CategoryNavBar** — navbar ייחודי ב-homepage שמאפשר קישור ישיר לכל מחלקה ב-`/services`.

---

## ⚡ ביצועים ואופטימיזציה

### next/image — Image Pipeline מלא

```typescript
// next.config.ts
images: {
  formats: ["image/avif", "image/webp"],  // AVIF ראשון, WebP כ-fallback
  minimumCacheTTL: 60 * 60 * 24 * 30,    // 30 יום cache
  remotePatterns: [/* Supabase Storage */]
}
```

- **AVIF/WebP** — Next.js ממיר תמונות לפורמטים המודרניים ביותר אוטומטית.
- **`priority`** — רק תמונות above-the-fold (לוגו, hero) מקבלות `priority={true}` ו-Preload header.
- **`sizes` prop** — כל `<Image>` מגדיר `sizes` מדויק שמאפשר ל-browser לבחור את הגרסה הנכונה לרזולוציית המסך.
- **Lazy loading** — כל שאר התמונות נטענות רק כשהן מתקרבות ל-viewport.

### Server Components

- רוב הקומפוננטות הן **Server Components** — הן לא שולחות JavaScript ל-browser.
- רק קומפוננטות עם אינטראקציה (אנימציות, GalleryCycler, ContactForm) מסומנות `"use client"`.
- **Client-side JS bundle קטן** = זמן אינטרקטיביות (TTI) נמוך יותר.

### Script Optimization

```typescript
// UserWay נטען אחרי שהדף כבר אינטרקטיבי
<Script
  src="https://cdn.userway.org/widget.js"
  strategy="afterInteractive"
/>
```

### שאר העדפות

- **`display: swap`** על פונט Heebo — מונע Flash of Invisible Text (FOIT).
- **`hover:scale-105`** ו-transition animations מוגנות CSS transforms — לא מפעילות reflow.

---

## 🔐 פאנל ניהול (Admin)

הפרויקט כולל **פאנל ניהול מאובטח** ב-`/admin`:

| מסך | תפקיד |
|-----|--------|
| `/admin/login` | כניסה עם אימייל וסיסמה דרך Supabase Auth |
| `/admin` | דשבורד ראשי |
| `/admin/leads` | צפייה בכל הלידים שנשלחו מהאתר |
| `/admin/gallery` | ניהול תמונות הגלריה |
| `/admin/reset-password` | שחזור סיסמה |
| `/admin/update-password` | עדכון סיסמה |

- **Admin Layout נפרד** (`app/admin/layout.tsx`) — ממשק שונה לחלוטין מה-site הציבורי.
- **Protected Routes** — הגישה לכל עמודי ה-admin מותנית ב-session פעיל.

---

## 📁 מבנה הפרויקט

```
panther-agency/
├── app/
│   ├── (site)/                        # קבוצת ה-routing הציבורית
│   │   ├── layout.tsx                 # Layout עם Header + Footer
│   │   ├── page.tsx                   # דף הבית
│   │   ├── about/
│   │   │   └── page.tsx               # עמוד אודות עם אנימציות Framer Motion
│   │   ├── services/
│   │   │   └── page.tsx               # עמוד מחלקות — שורות מתחלפות שחור/לבן
│   │   ├── gallery/
│   │   │   ├── page.tsx               # גלריה ראשית עם כל הקטגוריות
│   │   │   └── [category]/
│   │   │       └── page.tsx           # גלריה לפי קטגוריה (force-dynamic)
│   │   ├── contact/
│   │   │   └── page.tsx               # עמוד יצירת קשר
│   │   ├── blog/
│   │   │   ├── page.tsx               # רשימת מאמרים
│   │   │   └── [slug]/page.tsx        # מאמר בודד
│   │   ├── testimonials/
│   │   │   └── page.tsx               # עמוד המלצות
│   │   ├── methodology/
│   │   │   └── page.tsx               # שיטת העבודה של פנתר
│   │   ├── privacy/
│   │   │   └── page.tsx               # מדיניות פרטיות
│   │   └── accessibility/
│   │       └── page.tsx               # הצהרת נגישות
│   ├── admin/                         # פאנל ניהול פנימי
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── leads/                     # ניהול לידים
│   │   ├── gallery/                   # ניהול תמונות
│   │   ├── login/
│   │   ├── reset-password/
│   │   └── update-password/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts               # POST /api/contact — שמירת לידים
│   ├── layout.tsx                     # Root layout (lang="he", dir="rtl", Heebo font)
│   └── globals.css                    # משתני CSS גלובליים, Tailwind directives
├── components/
│   ├── layout/
│   │   ├── Header.tsx                 # Sticky header עם RTL navigation
│   │   ├── Footer.tsx                 # Footer עם לינקים ופרטי קשר
│   │   ├── MobileNav.tsx              # Hamburger menu למובייל
│   │   └── Container.tsx             # Wrapper לרוחב עמוד אחיד
│   ├── sections/
│   │   ├── Hero.tsx                   # Hero section של דף הבית
│   │   ├── CategoryNavBar.tsx         # ניווט מהיר לפי מחלקה
│   │   ├── ServicesPreview.tsx        # תצוגת מחלקות ב-homepage
│   │   ├── WhyPantherCards.tsx        # כרטיסי "למה פנתר"
│   │   ├── ContactForm.tsx            # טופס יצירת קשר (client component)
│   │   └── CTA.tsx                    # Call-to-action section
│   └── ui/
│       ├── GalleryCycler.tsx          # רכיב cycling לגלריית ה-homepage
│       ├── AutoScroll.tsx             # Smooth scroll behavior
│       ├── AnimatedSection.tsx        # Wrapper לאנימציות scroll-triggered
│       └── Button.tsx                 # כפתור מותאם אישית
└── lib/
    ├── supabase-server.ts             # יצירת Supabase client לצד שרת
    ├── animations.ts                  # הגדרות אנימציות Framer Motion
    └── site.ts                        # קונפיגורציה גלובלית (navItems, siteConfig)
```

---

## 🚀 הנחיות התקנה

### דרישות מוקדמות

- **Node.js** גרסה 18 ומעלה
- **npm** גרסה 9 ומעלה
- חשבון **Supabase** עם פרויקט פעיל

### שלב 1 — שכפול הפרויקט

```bash
git clone https://github.com/your-username/panther-agency.git
cd panther-agency
```

### שלב 2 — התקנת תלויות

```bash
npm install
```

### שלב 3 — משתני סביבה

צרו קובץ `.env.local` בשורש הפרויקט:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ניתן למצוא את הערכים האלה ב-Supabase Dashboard תחת **Project Settings → API**.

### שלב 4 — הרצת שרת פיתוח

```bash
npm run dev
```

האתר יהיה זמין בכתובת [http://localhost:3000](http://localhost:3000)

### שלב 5 — בנייה לייצור

```bash
npm run build
npm run start
```

### מבנה טבלאות Supabase

```sql
-- טבלת שירותים
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  image_url text,
  sort_order int default 0
);

-- טבלת תמונות גלריה
create table gallery_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text not null,
  display_order int default 0
);

-- טבלת לידים
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  created_at timestamptz default now()
);
```

---

## 🗺️ עתיד ומפת דרכים

הפרויקט הנוכחי מהווה **גרסה 1.0** של הנוכחות הדיגיטלית. הנה הצפי לגרסאות הבאות:

### גרסה 2.0 — ניהול תוכן עצמאי
- **פאנל CMS מלא** — ממשק admin מורחב לעריכת כל תכני האתר ללא צורך בקוד.
- **ניהול גלריה מתקדם** — גרירה ושחרור לסידור תמונות, מחיקה ועדכון מ-UI.
- **עורך שירותים** — עריכת כותרות, תיאורים ותמונות ישירות מהדשבורד.

### גרסה 2.5 — תוכן שיווקי
- **בלוג/מגזין** — מאמרים שיווקיים הניתנים לניהול דרך ה-CMS.
- **SEO מתקדם** — sitemap דינמי, structured data (Schema.org) לעסק מקומי.

### גרסה 3.0 — מערכת לקוחות
- **פורטל לקוחות** — כניסה מאובטחת ללקוחות לצפייה בסטטוס הפרויקט שלהם.
- **אינטגרציה עם CRM** — סנכרון לידים ופרויקטים עם מערכת CRM חיצונית.
- **מעקב ציר זמן** — לקוחות רואים התקדמות פרויקט בזמן אמת.

### גרסה 4.0 — גלובליות ואנליטיקס
- **תמיכה רב-לשונית** — ערבית ואנגלית לצד עברית עם i18n מלא.
- **אנליטיקס מותאם** — Dashboard פנימי עם נתוני ביקורים, המרות ולידים.
- **A/B Testing** — בדיקת גרסאות שונות של landing pages למיטוב המרות.

---

## 🙏 קרדיטים וטכנולוגיות

| טכנולוגיה | תפקיד |
|-----------|--------|
| [**Next.js 16**](https://nextjs.org) | React framework עם App Router, SSR, ו-API Routes |
| [**React 19**](https://react.dev) | UI library עם Server Components |
| [**TypeScript 5**](https://www.typescriptlang.org) | type safety ומניעת שגיאות runtime |
| [**Tailwind CSS 4**](https://tailwindcss.com) | utility-first CSS — עיצוב מהיר ועקבי |
| [**Supabase**](https://supabase.com) | PostgreSQL, Auth, Storage ו-Realtime |
| [**Framer Motion**](https://www.framer.com/motion/) | אנימציות React מקצועיות ונגישות |
| [**Lucide React**](https://lucide.dev) | ספריית אייקונים SVG מינימליסטית |
| [**Google Fonts — Heebo**](https://fonts.google.com/specimen/Heebo) | פונט עברי מקצועי ורב-משקלי |
| [**UserWay**](https://userway.org) | widget נגישות תואם WCAG 2.1 |
| [**Vercel**](https://vercel.com) | Deployment, Edge Network ו-CI/CD אוטומטי |

---

<div align="center">

**בנוי עם ❤️ עבור פנתר פרסום | Panther Group**

[🌐 panthergroup.co.il](https://www.panthergroup.co.il)

</div>

</div>
