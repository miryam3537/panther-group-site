import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

// Minimal static data — will be replaced with Supabase query
const posts: Record<
  string,
  { title: string; date: string; content: string }
> = {
  "branding-tips": {
    title: "5 טיפים לשיפור מיתוג העסק שלך",
    date: "15 בינואר 2026",
    content: `מיתוג חזק הוא הבסיס לכל עסק מצליח. בין אם אתם עסק חדש או ותיק, זהות מותג ברורה היא מה שמבדיל אתכם מהמתחרים.

## 1. הגדירו את ה-DNA של המותג
לפני כל דבר — מי אתם? מה הערכים שלכם? מה ההבטחה שלכם ללקוחות? כתבו זאת בשפה פשוטה.

## 2. לוגו שמתאים לכל מדיה
לוגו טוב עובד בשחור-לבן, בגדלים קטנים ובגדלים גדולים. בדקו שהלוגו שלכם קריא ומזוהה בכל פורמט.

## 3. עקביות צבעים ופונטים
בחרו פלטת צבעים של 2-3 צבעים ופונט אחד-שניים. עקביות יוצרת זיהוי מיידי.

## 4. שפה אחידה בכל הפלטפורמות
מהפייסבוק ועד כרטיס הביקור — אותה שפה, אותו טון, אותה אישיות.

## 5. עדכנו את המיתוג כל 3-5 שנים
מיתוג הוא לא פעולה חד-פעמית. שוק משתנה, קהל יעד משתנה — וגם המותג חייב להתעדכן.`,
  },
};

const fallbackPost = {
  title: "מאמר בלוג",
  date: "2026",
  content: "תוכן המאמר יופיע כאן לאחר חיבור למסד הנתונים.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug] ?? fallbackPost;
  return { title: post.title };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug] ?? fallbackPost;

  // Render markdown-like content (paragraphs + h2)
  const paragraphs = post.content.split("\n\n");

  return (
    <article className="bg-background py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted" aria-label="breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">בית</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-accent transition-colors">בלוג</Link>
            <span>/</span>
            <span className="text-foreground truncate">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="text-right">
            <time className="text-sm text-muted">{post.date}</time>
            <h1 className="mt-3 text-3xl font-black text-foreground leading-tight sm:text-4xl">
              {post.title}
            </h1>
          </header>

          {/* Cover placeholder */}
          <div className="my-8 aspect-video overflow-hidden rounded-2xl bg-card border border-border" />

          {/* Content */}
          <div className="text-right">
            {paragraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-8 mb-3 text-xl font-black text-foreground"
                  >
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="mb-4 leading-relaxed text-muted">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Back link */}
          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            &#8594; חזרה לכל המאמרים
          </Link>
        </div>
      </Container>
    </article>
  );
}
