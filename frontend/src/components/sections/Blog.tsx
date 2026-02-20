'use client';

import { useEffect, useState } from 'react';

interface BlogPost {
  title: string;
  link: string;
  date: string;
  desc: string;
}

// 티스토리 RSS를 allorigins 프록시로 불러오는 클라이언트 컴포넌트
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    const rssUrl = 'https://lyeo-code.tistory.com/rss';
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

    fetch(proxy)
      .then((r) => r.json())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'text/xml');
        const items = Array.from(xml.querySelectorAll('item')).slice(0, 6);
        if (!items.length) throw new Error('no items');

        setPosts(
          items.map((item) => {
            const title = item.querySelector('title')?.textContent || '제목 없음';
            const link = item.querySelector('link')?.textContent || '#';
            const pub = item.querySelector('pubDate')?.textContent || '';
            const rawDesc = item.querySelector('description')?.textContent || '';
            const desc = rawDesc.replace(/<[^>]*>/g, '').trim().slice(0, 90);
            const date = pub
              ? new Date(pub).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
              : '';
            return { title, link, date, desc };
          }),
        );
        setStatus('done');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section id="blog">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 06</div>
          <div className="sec-title">DEV BLOG</div>
          <div className="sec-line" />
        </div>
        <div className="blog-header fi">
          <p className="blog-intro">기술 블로그에서 개발 경험과 문제 해결 과정을 기록합니다.</p>
          <a
            href="https://lyeo-code.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ fontSize: '0.62rem', padding: '0.6rem 1.1rem' }}
          >
            전체 포스팅 보기 ↗
          </a>
        </div>

        {status === 'loading' && (
          <div className="blog-loading">
            <div className="blog-spinner" />
            <span>블로그 포스팅 불러오는 중...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="blog-error">
            블로그 포스팅을 자동으로 불러올 수 없습니다.<br />
            <a href="https://lyeo-code.tistory.com/" target="_blank" rel="noopener noreferrer">
              lyeo-code.tistory.com
            </a> 에서 직접 확인해주세요.
          </div>
        )}

        {status === 'done' && (
          <div className="blog-grid">
            {posts.map((post) => (
              <a key={post.link} href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card">
                <div className="blog-card-date">{post.date}</div>
                <div className="blog-card-title">{post.title}</div>
                <div className="blog-card-desc">{post.desc}{post.desc.length >= 90 ? '...' : ''}</div>
                <div className="blog-card-link">READ MORE →</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
