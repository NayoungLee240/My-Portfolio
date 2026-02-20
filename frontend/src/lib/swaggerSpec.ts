// 게임 백엔드 API 샘플 명세 (실제 설계 경험 기반)
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: '이나영 · Game Backend API',
    version: '1.0.0',
    description: [
      '## 게임 서버 백엔드 샘플 API',
      '',
      '실제 설계 경험을 기반으로 작성된 게임 백엔드 API 명세입니다.',
      '',
      '### 주요 아키텍처',
      '- **JWT Access/Refresh Token** 이중 인증 (Access: 10min, Refresh: 15min)',
      '- **Redis** 기반 세션 단일 저장 — 중복 로그인 방지',
      '- **로그인 / 대기 / 게임 / 운영툴** 서버 역할 분리',
      '- **Firebase, Steam, EroLabs** 멀티 플랫폼 로그인 통합',
      '- **InfluxDB** 기반 5분 단위 CCU 모니터링',
      '',
      '### 서비스 규모',
      '- 상시 동접자: **6만 명**',
      '- 최대 동접자: **20만 명**',
    ].join('\n'),
  },
  servers: [
    { url: 'https://api.game.example.com/v1', description: 'Production (Global)' },
    { url: 'https://api-dev.game.example.com/v1', description: 'Development' },
  ],
  components: {
    securitySchemes: {
      BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Access Token (유효: 10분)' },
      CookieAuth: { type: 'apiKey', in: 'cookie', name: 'refresh_token', description: 'Refresh Token (유효: 15분, HttpOnly Cookie)' },
    },
    schemas: {
      LoginRequest: {
        type: 'object', required: ['platform', 'platform_token'],
        properties: {
          platform: { type: 'string', enum: ['firebase', 'steam', 'erolabs'], example: 'firebase' },
          platform_token: { type: 'string', example: 'eyJhbGciOiJSUzI1NiIsImtpZCI...' },
          device_id: { type: 'string', example: 'device-uuid-abcd-1234' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/UserInfo' },
        },
      },
      UserInfo: {
        type: 'object',
        properties: {
          user_id: { type: 'integer', example: 100023 },
          nickname: { type: 'string', example: '테스트유저' },
          level: { type: 'integer', example: 42 },
          platform: { type: 'string', example: 'firebase' },
          created_at: { type: 'string', format: 'date-time', example: '2025-11-26T00:00:00Z' },
        },
      },
      TokenRefreshResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        },
      },
      ServerStatus: {
        type: 'object',
        properties: {
          ccu: { type: 'integer', example: 62500 },
          status: { type: 'string', enum: ['normal', 'maintenance', 'high_load'], example: 'normal' },
          server_time_utc: { type: 'string', format: 'date-time' },
          queue_size: { type: 'integer', example: 0 },
        },
      },
      ShopItem: {
        type: 'object',
        properties: {
          item_id: { type: 'integer', example: 1001 },
          name: { type: 'string', example: '다이아몬드 패키지' },
          price: { type: 'integer', example: 9900 },
          currency: { type: 'string', example: 'KRW' },
          platform: { type: 'string', enum: ['ios', 'android', 'steam', 'all'], example: 'all' },
        },
      },
      Mission: {
        type: 'object',
        properties: {
          mission_id: { type: 'integer', example: 301 },
          title: { type: 'string', example: '몬스터 100마리 처치' },
          type: { type: 'string', enum: ['daily', 'weekly', 'achievement', 'event'], example: 'daily' },
          current: { type: 'integer', example: 45 },
          target: { type: 'integer', example: 100 },
          is_completed: { type: 'boolean', example: false },
        },
      },
      MailSendRequest: {
        type: 'object', required: ['target', 'title', 'content'],
        properties: {
          target: { type: 'string', enum: ['all', 'specific'], example: 'specific' },
          user_ids: { type: 'array', items: { type: 'integer' }, example: [100023, 100025] },
          title: { type: 'string', example: '서버 점검 보상 지급' },
          content: { type: 'string', example: '서비스 이용에 불편을 드려 죄송합니다.' },
          items: { type: 'array', items: { type: 'object' }, example: [{ item_id: 1, count: 300 }] },
          expire_days: { type: 'integer', example: 7 },
        },
      },
      CcuMetrics: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { type: 'object', properties: { timestamp: { type: 'string' }, ccu: { type: 'integer' } } } },
          peak_ccu: { type: 'integer', example: 200000 },
          avg_ccu: { type: 'integer', example: 62000 },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error_code: { type: 'string', example: 'INVALID_TOKEN' },
          message: { type: 'string', example: '인증 토큰이 유효하지 않습니다.' },
        },
      },
    },
  },
  tags: [
    { name: 'Auth', description: 'JWT 기반 인증 API — Access/Refresh Token 이중 설계, 중복 로그인 방지' },
    { name: 'Server', description: '서버 상태 및 접속 대기열 API — Redis CCU 산정' },
    { name: 'User', description: '유저 정보 조회 API' },
    { name: 'Game Content', description: '게임 콘텐츠 API — 상점, 미션·업적, 우편함' },
    { name: 'Admin (운영툴)', description: '운영툴 API — 유저 관리, 우편 발송, 점검 제어, CCU 모니터링' },
  ],
  paths: {
    '/auth/login': { post: { tags: ['Auth'], summary: '플랫폼 로그인', description: 'Firebase(iOS/AOS), Steam, EroLabs 플랫폼 토큰으로 로그인합니다.\n\n- Access Token 반환 (JSON Body)\n- Refresh Token은 HttpOnly Cookie 자동 세팅\n- 기존 세션 폐기로 **중복 로그인 방지**', requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } }, responses: { 200: { description: '로그인 성공', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } }, 401: { description: '플랫폼 인증 실패', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } } } } },
    '/auth/refresh': { post: { tags: ['Auth'], summary: 'Access Token 갱신', description: 'Cookie의 Refresh Token으로 새 Access Token을 발급합니다.', security: [{ CookieAuth: [] }], responses: { 200: { description: '토큰 갱신 성공', content: { 'application/json': { schema: { $ref: '#/components/schemas/TokenRefreshResponse' } } } }, 401: { description: 'Refresh Token 만료/무효', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } } } } },
    '/auth/logout': { post: { tags: ['Auth'], summary: '로그아웃', description: 'Redis에서 Refresh Token을 삭제하고 Cookie를 만료시킵니다.', security: [{ BearerAuth: [] }], responses: { 200: { description: '로그아웃 성공' } } } },
    '/server/status': { get: { tags: ['Server'], summary: '서버 상태 조회', description: '현재 CCU, 서버 상태, 대기열 크기를 반환합니다.\n\n**CCU 산정**: Redis에 저장된 Refresh Token 수 기반', responses: { 200: { description: '서버 상태', content: { 'application/json': { schema: { $ref: '#/components/schemas/ServerStatus' } } } } } } },
    '/server/queue': { get: { tags: ['Server'], summary: '접속 대기열 조회', responses: { 200: { description: '대기열 정보' } } } },
    '/users/me': { get: { tags: ['User'], summary: '내 유저 정보 조회', security: [{ BearerAuth: [] }], responses: { 200: { description: '유저 정보', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserInfo' } } } }, 401: { description: '인증 실패' } } } },
    '/game/shop/items': { get: { tags: ['Game Content'], summary: '상점 아이템 목록', description: '플랫폼(iOS/AOS/Steam)별 분기된 상점 아이템을 반환합니다.', security: [{ BearerAuth: [] }], parameters: [{ name: 'platform', in: 'query', schema: { type: 'string', enum: ['ios', 'android', 'steam'] } }], responses: { 200: { description: '아이템 목록' } } } },
    '/game/shop/purchase': { post: { tags: ['Game Content'], summary: '아이템 구매', description: '플랫폼 영수증 검증 후 아이템을 지급합니다. 서버 사이드 검증 원칙 적용.', security: [{ BearerAuth: [] }], responses: { 200: { description: '구매 성공' }, 400: { description: '영수증 검증 실패' } } } },
    '/game/missions': { get: { tags: ['Game Content'], summary: '미션 목록 및 진행도', description: 'EventEmitter 기반 이벤트 주도 미션·업적 시스템의 현재 목록을 반환합니다.', security: [{ BearerAuth: [] }], parameters: [{ name: 'type', in: 'query', schema: { type: 'string', enum: ['daily', 'weekly', 'achievement', 'event'] } }], responses: { 200: { description: '미션 목록' } } } },
    '/game/missions/{mission_id}/claim': { post: { tags: ['Game Content'], summary: '미션 보상 수령', security: [{ BearerAuth: [] }], parameters: [{ name: 'mission_id', in: 'path', required: true, schema: { type: 'integer' }, example: 301 }], responses: { 200: { description: '보상 수령 성공' }, 400: { description: '미션 미완료 또는 이미 수령' } } } },
    '/game/mailbox': { get: { tags: ['Game Content'], summary: '우편함 목록', security: [{ BearerAuth: [] }], responses: { 200: { description: '우편 목록' } } } },
    '/game/mailbox/claim-all': { post: { tags: ['Game Content'], summary: '우편함 전체 수령', security: [{ BearerAuth: [] }], responses: { 200: { description: '전체 수령 성공' } } } },
    '/admin/users/{user_id}': { get: { tags: ['Admin (운영툴)'], summary: '유저 상세 정보', description: '권한별 접근 제어 적용', security: [{ BearerAuth: [] }], parameters: [{ name: 'user_id', in: 'path', required: true, schema: { type: 'integer' }, example: 100023 }], responses: { 200: { description: '유저 상세 정보' }, 403: { description: '권한 없음' } } } },
    '/admin/users/{user_id}/ban': { post: { tags: ['Admin (운영툴)'], summary: '유저 제재', security: [{ BearerAuth: [] }], parameters: [{ name: 'user_id', in: 'path', required: true, schema: { type: 'integer' }, example: 100023 }], responses: { 200: { description: '제재 처리 완료' } } } },
    '/admin/mail/send': { post: { tags: ['Admin (운영툴)'], summary: '운영자 우편 발송', description: '특정 유저 또는 전체 유저에게 운영자 우편을 발송합니다.', security: [{ BearerAuth: [] }], requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/MailSendRequest' } } } }, responses: { 200: { description: '우편 발송 완료' }, 403: { description: '권한 없음' } } } },
    '/admin/server/maintenance': { post: { tags: ['Admin (운영툴)'], summary: '점검 모드 On/Off', security: [{ BearerAuth: [] }], responses: { 200: { description: '점검 모드 설정 완료' } } } },
    '/admin/metrics/ccu': { get: { tags: ['Admin (운영툴)'], summary: 'CCU 추이 (InfluxDB)', description: 'InfluxDB에 5분 단위로 저장된 동접자 추이 데이터를 반환합니다.', security: [{ BearerAuth: [] }], parameters: [{ name: 'from', in: 'query', schema: { type: 'string', format: 'date-time' } }, { name: 'interval', in: 'query', schema: { type: 'string', enum: ['5m', '30m', '1h', '1d'], default: '5m' } }], responses: { 200: { description: 'CCU 시계열 데이터', content: { 'application/json': { schema: { $ref: '#/components/schemas/CcuMetrics' } } } } } } },
  },
};
