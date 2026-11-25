"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface SliderProps {
  images: { src: string; alt: string }[];
}

// 이미지 슬라이더 + 라이트박스 (클라이언트 컴포넌트)
export default function Slider({ images }: SliderProps) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") setLightbox(null);
  }, []);

  return (
    <>
      <div className="showcase-slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {images.map((img, i) => (
            <Image
              key={i}
              src={img.src}
              alt={img.alt}
              width={1200}
              height={440}
              className="slide-img"
              onClick={() => setLightbox(img.src)}
              priority={i === 0}
            />
          ))}
        </div>
        <button className="slider-btn prev" onClick={prev}>
          ‹
        </button>
        <button className="slider-btn next" onClick={next}>
          ›
        </button>
        <div className="slider-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`sdot${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      </div>

      {/* 라이트박스 */}
      {lightbox && (
        <div
          className="lb open"
          onClick={() => setLightbox(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button className="lb-close" onClick={() => setLightbox(null)}>
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="확대 이미지" />
        </div>
      )}
    </>
  );
}
