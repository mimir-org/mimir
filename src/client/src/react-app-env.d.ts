/// <reference types="react-scripts" />

interface MimirEnv {
  API_BASE_URL: string;
  SOCKET_BASE_URL: string;
  APP_ID: string;
  CLIENT_ID: string;
  TENANT_ID: string;
  COMPANY: string;
  APP_INSIGHTS_CONNECTION_STRING: string;
  MIMIR_VERSION: string;
  SILENT: string;
}

// eslint-disable-next-line no-var
declare var __MIMIR_ENV: MimirEnv;
