declare namespace NodeJS {
  interface ProcessEnv {
    DB_URI: string;
    DB_USER: string;
    DB_PASS: string;
    DB_CLUSTER: string;
    DB_SETTINGS: string;
    JWT_SECRET: string;
    SWAPI_BASE_URL: string;
    HASH_SALT: string;
    MOCK_JWT: string;
  }
}
