import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.panthergroup.co.il"),
  title: {
    default: "פנתר | מזניקים להצלחה — מיתוג, פרסום ודיגיטל",
    template: "%s | פנתר",
  },
  description:
    "פנתר פרסום — מזניקים את העסק שלך קדימה. מיתוג, עיצוב, דיגיטל, הפקות אירועים ולוחות פרסום.",
  icons: {
    icon: "/FAVICON.png",
    apple: "/FAVICON.png",
  },
  openGraph: {
    siteName: "Panther Group",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="kQmVdcgsos"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
