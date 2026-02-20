'use client';

import { useEffect, useState } from 'react';

// 로컬스토리지에서 테마를 읽어 html[data-theme] 을 전환하는 클라이언트 컴포넌트
export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // 마운트 시점에 실제 적용된 테마를 읽어옴 (layout의 인라인 스크립트가 먼저 실행됨)
    const current = document.documentElement.dataset.theme || 'dark';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ny_theme', next);
  };

  return (
    <div className="tt" onClick={toggle}>
      <span className="tt-lbl">{theme === 'dark' ? 'DARK' : 'LITE'}</span>
      <div className="tt-track">
        <div className="tt-thumb" />
      </div>
      <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
    </div>
  );
}
