declare namespace NodeJS {
  interface ProcessEnv {
    DB_URI: string;
    DB_USER: string;
    DB_PASS: string;
    DB_CLUSTER: string;
    DB_SETTINGS: string;
    JWT_SECRET: string;
  }
}
