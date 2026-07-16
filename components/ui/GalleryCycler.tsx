"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryImg = { id: string; url: string; category: string };

const LABELS: Record<string, string> = {
  branding: "מיתוג ופרסום",
  promotions: 'הפקות וקד"מ',
  events: "הפקות אירועים",
  signage: "שילוט למוסדות",
  digital: "מדיה ודיגיטל",
  boards: "לוחות פרסום",
};

// Total number of visible slots in the grid (4 cols × 2 rows on desktop)
const SLOT_COUNT = 8;

export function GalleryCycler({ images }: { images: GalleryImg[] }) {
  const count = Math.min(SLOT_COUNT, images.length);

  // Each slot holds: the current image + a version key so React re-mounts the <img> for the fade
  const [slots, setSlots] = useState<GalleryImg[]>(() =>
    Array.from({ length: count }, (_, i) => images[i])
  );
  const [keys, setKeys] = useState<number[]>(() => Array(count).fill(0));

  // cursor tracks which image comes next (after the initial fill)
  const cursor = useRef(count);

  useEffect(() => {
    if (images.length <= 1) return;

    const tick = setInterval(() => {
      const slot = Math.floor(Math.random() * count);
      const next = images[cursor.current % images.length];
      cursor.current++;

      setSlots((prev) => {
        const s = [...prev];
        s[slot] = next;
        return s;
      });
      setKeys((prev) => {
        const k = [...prev];
        k[slot] = k[slot] + 1;
        return k;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [images, count]);

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {slots.map((img, i) => (
        <Link
          key={i}
          href={`/gallery/${img.category}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900"
        >
          <Image
            key={keys[i]}
            src={img.url}
            alt={LABELS[img.category] ?? img.category}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={i === 0}
            className="gallery-fade-in object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Permanent subtle bottom tint so images always look polished */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Hover reveal */}
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              {LABELS[img.category] ?? img.category}
            </span>
            <p className="mt-0.5 text-xs font-semibold text-white/90">צפייה בפרויקט ←</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
