"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface GalleryLightboxProps {
  images: string[];
  folder: string;
  sizes?: string;
}

export default function GalleryLightbox({ images, folder, sizes }: GalleryLightboxProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") setSelected(i => i !== null ? Math.min(i + 1, images.length - 1) : null);
      if (e.key === "ArrowLeft") setSelected(i => i !== null ? Math.max(i - 1, 0) : null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, images.length]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className="aspect-square relative overflow-hidden cursor-zoom-in"
          >
            <Image
              src={`/${folder}/${image}`}
              alt={`Tattoo - ${image.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/-/g, ' ')}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes={sizes ?? "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"}
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) setSelected(i => i !== null ? Math.min(i + 1, images.length - 1) : null);
              else setSelected(i => i !== null ? Math.max(i - 1, 0) : null);
            }
            touchStartX.current = null;
          }}
        >
          <button
            className="absolute top-6 right-6 text-[#888888] hover:text-[#e8e4dc] text-sm tracking-widest uppercase"
            onClick={() => setSelected(null)}
          >
            Close
          </button>

          {selected > 0 && (
            <button
              className="absolute left-6 text-[#888888] hover:text-[#e8e4dc] text-2xl px-4 py-8"
              onClick={e => { e.stopPropagation(); setSelected(selected - 1); }}
            >
              ←
            </button>
          )}

          <div
            className="relative max-h-[90vh] max-w-[90vw] w-full h-full"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={`/${folder}/${images[selected]}`}
              alt={`Tattoo`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {selected < images.length - 1 && (
            <button
              className="absolute right-6 text-[#888888] hover:text-[#e8e4dc] text-2xl px-4 py-8"
              onClick={e => { e.stopPropagation(); setSelected(selected + 1); }}
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
