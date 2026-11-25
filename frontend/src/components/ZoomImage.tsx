"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

// 클릭하면 라이트박스로 확대되는 이미지 (ESC 또는 클릭으로 닫기)
export default function ZoomImage({ src, alt, width, height, className }: ZoomImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="lb open" onClick={() => setOpen(false)}>
          <button className="lb-close" onClick={() => setOpen(false)}>
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
        </div>
      )}
    </>
  );
}
