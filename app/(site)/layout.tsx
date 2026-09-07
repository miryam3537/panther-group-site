import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollUtils } from "@/components/ui/ScrollUtils";
import { ToastProvider } from "@/components/ui/Toast";
import { KeyboardShortcuts } from "@/components/ui/KeyboardShortcuts";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ToastProvider>
      <ScrollUtils />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <KeyboardShortcuts />
    </ToastProvider>
  );
}
