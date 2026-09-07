import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollUtils } from "@/components/ui/ScrollUtils";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollUtils />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
