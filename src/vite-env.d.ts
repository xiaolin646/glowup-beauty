/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_ERROR_TRACKING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}