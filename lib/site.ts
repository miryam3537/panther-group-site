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

/** תת-מחלקות לכל מחלקה */
export const serviceSubcategories: Record<string, string[]> = {
  branding:     ["מיתוג לעסקים", "מיתוג למוסדות"],
  promotions:   ["מתנות"],
  events:       [],
  print:        ["ניירת", "ספרים וחוברות", "משי", "סובלימציה", "רקמה"],
  digital:      ["דפי נחיתה", "אתרים", "באנרים מונפשים"],
  signage:      ["עסקים", "מוסדות", "בתי כנסת"],
  distribution: ["הפצה תיבות דואר", "הפצת תלי דלת"],
  posters:      ["לוחות פרסום בבית כנסת", "לוחות בבניינים", "לוחות במרחב העירוני"],
};
