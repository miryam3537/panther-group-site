"use client";

import { useEffect, useState } from "react";

/**
 * Counts page views using localStorage.
 * Each unique `id` gets its own counter. First visit picks a random
 * base (50–300) so it never starts from zero — gives a "popular" feel.
 */
export function ViewCounter({ id }: { id: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = `panter_views_${id}`;
    const raw = localStorage.getItem(key);

    let current: number;
    if (raw === null) {
      // First visit: random realistic base
      current = Math.floor(Math.random() * 251) + 50; // 50–300
    } else {
      current = parseInt(raw, 10) + 1;
    }

    localStorage.setItem(key, String(current));
    setCount(current);
  }, [id]);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
      <svg
        className="h-3.5 w-3.5 text-white/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <span className="text-[11px] font-semibold tabular-nums text-white/40">
        {count.toLocaleString("he-IL")} צפו
      </span>
    </div>
  );
}
