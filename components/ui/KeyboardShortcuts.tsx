"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const shortcuts = [
  { key: "h", label: "דף הבית", href: "/" },
  { key: "g", label: "גלריה", href: "/gallery" },
  { key: "c", label: "צור קשר", href: "/contact" },
  { key: "?", label: "הצג קיצורי מקלדת", href: null },
];

export function KeyboardShortcuts() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Do nothing if typing in an input / textarea / contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "h":
          router.push("/");
          break;
        case "g":
          router.push("/gallery");
          break;
        case "c":
          router.push("/contact");
          break;
        case "?":
          setShowModal((prev) => !prev);
          break;
        case "Escape":
          setShowModal(false);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-lg font-bold text-white">
          ⌨️ קיצורי מקלדת
        </h2>
        <table className="w-full text-sm">
          <tbody>
            {shortcuts.map(({ key, label }) => (
              <tr key={key} className="border-b border-white/5 last:border-0">
                <td className="py-2.5 pr-4 text-right text-white/60">{label}</td>
                <td className="py-2.5 pl-4 text-left">
                  <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-white">
                    {key}
                  </kbd>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-center text-xs text-white/30">
          לחץ Escape או לחץ מחוץ לחלון לסגירה
        </p>
      </div>
    </div>
  );
}
