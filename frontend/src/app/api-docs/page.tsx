import dynamic from 'next/dynamic';

// SSR을 비활성화해 하이드레이션 오류 방지
// (<link>, <style> 태그가 body에 있으면 브라우저가 <head>로 이동시켜 DOM 불일치 발생)
const ApiDocsClient = dynamic(() => import('./ApiDocsClient'), { ssr: false });

export default function ApiDocsPage() {
  return <ApiDocsClient />;
}
