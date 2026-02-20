// 환경변수를 구조화해서 앱 전체에서 타입 안전하게 사용
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  // db: {
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT, 10) || 3306,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   name: process.env.DB_NAME,
  // },
});
