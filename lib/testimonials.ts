export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  body: string;
  rating: number;
  display_order: number;
};

/** Shown until the Supabase table exists and has rows loaded successfully. */
export const fallbackTestimonials: Testimonial[] = [
  {
    id: "fallback-1",
    name: "המכון למצוות התלויות בארץ",
    role: "",
    body: "נהנינו מאוד מהשירות, האיכות, הדייקנות של פנתר. החל משלב השליחה לדפוס ועד לתוצר המוגמר של הגליונות וכן של שאר הדפסות מודעות רחוב וכו'. יישר כח לר' אריאל על השירות הנפלא!",
    rating: 5,
    display_order: 1,
  },
  {
    id: "fallback-2",
    name: "מרכז זרעים",
    role: "",
    body: "יש לציין שגם בזמני לחץ החברה שלכם עמדה להביא את המוצר האיכותי בזמן, ולאורך כל הדרך לתת ייעוץ ועזרה שהלקוח יקבל את המיטב. תודה לכם!",
    rating: 5,
    display_order: 2,
  },
  {
    id: "fallback-3",
    name: "שושנה עטיה",
    role: "איגוד עמלי תורה",
    body: "ברצוננו להמליץ על פנתר — שירות ואכפתיות לאורך כל הדרך. דאגה כאילו אנחנו הלקוחות היחידים. תודה על שירות נפלא ועל יחס אישי!!",
    rating: 5,
    display_order: 3,
  },
  {
    id: "fallback-4",
    name: "נחמה פרסום",
    role: "",
    body: "אנחנו מאד מרוצים מהעבודה המדויקת והאכפתית של דפוס פנתר. בכל פעם מחדש ביצעו את העבודה על הצד הטוב ביותר במקצועיות ובאדיבות. יישר כוח!",
    rating: 5,
    display_order: 4,
  },
  {
    id: "fallback-5",
    name: "שלמה",
    role: "מנהל MAYCAR השכרת רכבים",
    body: "ברצוננו להמליץ בחום על הטיפול המסור, המהיר והאדיב של חברת פנתר. רצינו להדגיש שהמחירים מאוד הוגנים. השתמשנו במספר שירותים שונים, ושמחנו מאוד לאורך כל הדרך.",
    rating: 5,
    display_order: 5,
  },
  {
    id: "fallback-6",
    name: "חברת חכמני 26 בע\"מ",
    role: "",
    body: "אני ממליץ בחום על פנתר — קיבלתי שירות אישי מהיר ומקצועי, בנוסף למחיר ללא תחרות!! רוצו לקבל הצעת מחיר — לא תתחרטו!",
    rating: 5,
    display_order: 6,
  },
];
