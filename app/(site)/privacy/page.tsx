import type { Metadata } from "next";

export const metadata: Metadata = { title: "מדיניות פרטיות" };

const privacyStyles = `
.privacy-content { font-family: Arial, sans-serif; direction: rtl; text-align: right; line-height: 1.7; }
.privacy-content h2 { font-size: 19px; color: #000; margin: 1.5rem 0 0.5rem; font-weight: 700; }
.privacy-content h3 { font-size: 17px; color: #000; margin: 1.25rem 0 0.4rem; font-weight: 600; }
.privacy-content p { color: #595959; font-size: 14px; margin: 0.5rem 0; }
.privacy-content ul { list-style-type: square; padding-right: 1.5rem; margin: 0.5rem 0; }
.privacy-content ul li { color: #595959; font-size: 14px; margin: 0.25rem 0; }
.privacy-content a { color: #3030F1; word-break: break-word; }
`;

const privacyHtml = `
<p>הודעת פרטיות זו עבור "פנתר" (להלן: "אנחנו", "אותנו", או "שלנו"), מתארת כיצד ומדוע אנו עשויים לגשת, לאסוף, לאחסן, להשתמש, ו/או לשתף ("לעבד") את המידע האישי שלך כאשר אתה משתמש בשירותים שלנו ("שירותים"), כולל כאשר אתה:</p>

<ul>
  <li>מבקר באתר האינטרנט שלנו בכתובת <a href="https://panthergroup.co.il">https://panthergroup.co.il</a> או בכל אתר אחר שלנו המקושר להודעת פרטיות זו.</li>
  <li>משתמש בשירותי פרסום והדפסות.</li>
  <li>יוצר איתנו קשר בדרכים קשורות אחרות, כולל שיווק או אירועים.</li>
</ul>

<p><strong>שאלות או חששות?</strong> קריאת הודעת פרטיות זו תעזור לך להבין את זכויות הפרטיות והבחירות שלך. אם אינך מסכים למדיניות ולנהלים שלנו, אנא אל תשתמש בשירותים שלנו. אם יש לך שאלות או חששות נוספים, אנא צור איתנו קשר בכתובת <a href="mailto:A4183774@GMAIL.COM">A4183774@GMAIL.COM</a>.</p>

<h2>סיכום נקודות מפתח</h2>
<p>סיכום זה מספק נקודות מפתח מהודעת הפרטיות שלנו.</p>

<h3>1. איזה מידע אנו אוספים?</h3>
<p>אנו אוספים מידע אישי שאתה מספק לנו מרצונך כאשר אתה מביע עניין בקבלת מידע עלינו או על המוצרים והשירותים שלנו, כאשר אתה משתתף בפעילויות בשירותים, או כאשר אתה יוצר איתנו קשר. המידע עשוי לכלול:</p>
<ul>
  <li>שמות</li>
  <li>מספרי טלפון</li>
  <li>כתובות דואר אלקטרוני</li>
</ul>

<h3>2. כיצד אנו מעבדים את המידע שלך?</h3>
<p>אנו מעבדים את המידע שלך כדי לספק, לשפר ולנהל את השירותים שלנו, לתקשר איתך, לצורכי אבטחה ומניעת הונאות, וכדי לעמוד בדרישות החוק.</p>

<h3>3. מתי ועם מי אנו משתפים מידע אישי?</h3>
<p>אנו עשויים לשתף מידע במצבים ספציפיים ועם צדדים שלישיים כגון: ספקי שירותי ענן, שירותי ניתוח נתונים, ספקי שירותי אחסון נתונים וספקי אירוח אתרים.</p>
`;

export default function PrivacyPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-black py-16 lg:py-20">
        <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent/70">
            מסמך משפטי
          </p>
          <h1 className="mt-2 text-4xl font-black text-white sm:text-5xl">
            מדיניות פרטיות
          </h1>
          <p className="mt-3 text-sm text-white/40">
            עודכן לאחרונה: 16 ביולי 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <style dangerouslySetInnerHTML={{ __html: privacyStyles }} />
          <div
            className="privacy-content"
            dangerouslySetInnerHTML={{ __html: privacyHtml }}
          />
        </div>
      </section>
    </>
  );
}
