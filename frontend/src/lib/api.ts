// 백엔드 API 호출 유틸리티
// next.config.ts의 rewrites 덕분에 /api/... 로 호출하면 백엔드로 자동 전달됨

const BASE_URL = '/api';

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '요청에 실패했습니다.');
  }

  const json = await res.json();
  // 백엔드 응답 형식: { success: true, data: ... }
  return json.data;
}

export const api = {
  about: {
    get: () => fetcher('/about'),
  },
  skills: {
    get: () => fetcher('/skills'),
  },
  projects: {
    getAll: () => fetcher('/projects'),
    getById: (id: number) => fetcher(`/projects/${id}`),
  },
  contact: {
    send: (body: { name: string; email: string; message: string }) =>
      fetcher('/contact', { method: 'POST', body: JSON.stringify(body) }),
  },
};
