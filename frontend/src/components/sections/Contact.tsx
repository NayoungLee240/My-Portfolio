'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import styles from './Contact.module.css';

// 문의 폼 - 클라이언트 컴포넌트 (useState, 이벤트 핸들러 사용)
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.contact.send(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="홍길동"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="문의 내용을 입력해주세요."
              />
            </div>

            {status === 'success' && (
              <p className={styles.successMsg}>메시지가 전송되었습니다!</p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>전송에 실패했습니다. 다시 시도해주세요.</p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '전송 중...' : '전송하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
