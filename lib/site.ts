export const siteConfig = {
  name: "פנתר",
  nameEn: "Panther Group",
  tagline: "מזניקים להצלחה",
  description:
    "פנתר פרסום שמזניק את העסק שלך חזק — מיתוג, עיצוב, דיגיטל ופרסום ממוחן.",
  url: "https://www.panthergroup.co.il",
  email: "panther4183774@gmail.com",
  phone: "052-718-0241",
} as const;

export const navItems = [
  { label: "בית", href: "/" },
  { label: "מחלקות", href: "/services" },
  { label: "גלריה", href: "/gallery" },
  { label: "אודות", href: "/about" },
  { label: "המלצות", href: "/testimonials" },
  { label: "צור קשר", href: "/contact" },
] as const;

export const services = [
  { id: "branding",     title: "מיתוג ופרסום",    slug: "branding" },
  { id: "promotions",   title: 'הפקות וקד"מ',      slug: "promotions" },
  { id: "events",       title: "הפקות אירועים",    slug: "events" },
  { id: "print",        title: "דפוס",             slug: "print" },
  { id: "digital",      title: "מדיה ודיגיטל",     slug: "digital" },
  { id: "signage",      title: "שילוט",            slug: "signage" },
  { id: "distribution", title: "הפצה",             slug: "distribution" },
  { id: "posters",      title: "הדבקת מודעות",     slug: "posters" },
] as const;

export type Service = (typeof services)[number];

export type Subcategory = { slug: string; title: string };

export const serviceSubcategories: Record<string, Subcategory[]> = {
  branding:     [{ slug: "branding-business", title: "מיתוג לעסקים" }, { slug: "branding-institutions", title: "מיתוג למוסדות" }],
  promotions:   [{ slug: "gifts", title: "מתנות" }],
  events:       [],
  print:        [
    { slug: "stationery",  title: "ניירת" },
    { slug: "books",       title: "ספרים וחוברות" },
    { slug: "silk",        title: "משי" },
    { slug: "sublimation", title: "סובלימציה" },
    { slug: "embroidery",  title: "רקמה" },
  ],
  digital:      [
    { slug: "landing-pages",    title: "דפי נחיתה" },
    { slug: "websites",         title: "אתרים" },
    { slug: "animated-banners", title: "באנרים מונפשים" },
  ],
  signage:      [
    { slug: "signage-business",     title: "עסקים" },
    { slug: "signage-institutions", title: "מוסדות" },
    { slug: "synagogues",           title: "בתי כנסת" },
  ],
  distribution: [
    { slug: "mailbox",      title: "הפצה תיבות דואר" },
    { slug: "door-hangers", title: "הפצת תלי דלת" },
  ],
  posters:      [
    { slug: "synagogue-boards", title: "לוחות פרסום בבית כנסת" },
    { slug: "building-boards",  title: "לוחות בבניינים" },
    { slug: "urban-boards",     title: "לוחות במרחב העירוני" },
  ],
};
