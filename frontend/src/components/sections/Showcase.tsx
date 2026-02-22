"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import NextConfig from "../../../next.config.mjs";

const basePath = NextConfig.basePath;

interface SliderProps {
  trackId: string;
  images: { src: string; alt: string }[];
}

// 이미지 슬라이더 + 라이트박스 (클라이언트 컴포넌트)
function Slider({ trackId, images }: SliderProps) {
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

// 게임 프로젝트 쇼케이스 섹션
export default function Showcase() {
  return (
    <section id="showcase" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 03</div>
          <div className="sec-title">PROJECT SHOWCASE</div>
          <div className="sec-line" />
        </div>

        <div className="showcase-block fi">
          <div className="showcase-meta">
            <div className="showcase-badge zwg">ZEROWAKE GATES</div>
            <div className="showcase-sub">
              2025.11 글로벌 런칭 · RPG · 상시 6만 / 최대 20만 동접
            </div>
            <a
              href="https://zerowakegates.com/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: "0.6rem", padding: "0.6rem 1.1rem" }}
            >
              공식 사이트 ↗
            </a>
          </div>
          <Slider
            trackId="zwg"
            images={[
              {
                src: basePath + "/game1.webp",
                alt: "Zerowake Gates 메인 아트",
              },
              {
                src: basePath + "/game2.webp",
                alt: "Zerowake Gates 편성 화면",
              },
              {
                src: basePath + "/game3.webp",
                alt: "Zerowake Gates 칩셋 시스템",
              },
            ]}
          />
        </div>

        <div className="showcase-block fi" style={{ marginTop: "3rem" }}>
          <div className="showcase-meta">
            <div className="showcase-badge cc">COVENANT CHILD</div>
            <div className="showcase-sub">
              2024.07 정식 오픈 · NFT 방치형 RPG
            </div>
          </div>
          <Slider
            trackId="cc"
            images={[
              {
                src: basePath + "/game4.webp",
                alt: "Covenant Child 타운 빌딩",
              },
              {
                src: basePath + "/game5.webp",
                alt: "Covenant Child 방어 전투",
              },
              { src: basePath + "/game6.webp", alt: "Covenant Child 모험 맵" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
