"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type GalleryImg = { id: string; url: string };

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImg[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onPrev(); // RTL: right = previous visually for Hebrew
      if (e.key === "ArrowLeft") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="תצוגה מוגדלת של תמונה"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-accent hover:text-accent"
        aria-label="סגור"
      >
        ✕
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:border-accent hover:text-accent sm:right-8"
            aria-label="תמונה הבאה"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-white transition-colors hover:border-accent hover:text-accent sm:left-8"
            aria-label="תמונה קודמת"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative max-h-[88vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt=""
          className="mx-auto max-h-[88vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        <p className="mt-3 text-center text-xs text-white/40">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

/** Alternating landscape / portrait for branding masonry */
function brandingTileClass(i: number): string {
  // Pattern: wide, tall, wide, tall, extra-wide, tall...
  const pattern = i % 5;
  if (pattern === 0) return "aspect-[4/3] sm:col-span-2";
  if (pattern === 1) return "aspect-[3/4]";
  if (pattern === 2) return "aspect-[16/10]";
  if (pattern === 3) return "aspect-[3/4]";
  return "aspect-[5/3] sm:col-span-2";
}

export function CategoryGalleryGrid({
  images,
  isBranding,
}: {
  images: GalleryImg[];
  isBranding: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  if (images.length === 0) return null;

  const radius = isBranding ? "rounded-md" : "rounded-xl";
  const featuredRadius = isBranding ? "rounded-md" : "rounded-2xl";

  return (
    <>
      {isBranding ? (
        /* Branding — modern mixed rectangles */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative overflow-hidden ${radius} bg-zinc-900 ${brandingTileClass(i)} focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-white/40 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  הגדל
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Other departments — square grid with featured first image */
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {images[0] && (
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              className={`group relative col-span-2 row-span-2 aspect-square overflow-hidden ${featuredRadius} bg-zinc-900 sm:aspect-auto sm:h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
            >
              <Image
                src={images[0].url}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div
                className={`absolute inset-0 border-2 border-transparent transition-all duration-300 group-hover:border-accent/30 ${featuredRadius}`}
              />
            </button>
          )}

          {images.slice(1).map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setOpenIndex(i + 1)}
              className={`group relative aspect-square overflow-hidden ${radius} bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-400 group-hover:bg-accent/8" />
              <div
                className={`absolute inset-0 border border-transparent transition-all duration-300 group-hover:border-accent/25 ${radius}`}
              />
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
