interface ImportMetaEnv {
  readonly SMTP_HOST: string
  readonly SMTP_PORT: string
  readonly SMTP_SECURE: string
  readonly SMTP_USER: string
  readonly SMTP_PASS: string
  readonly SMTP_FROM_NAME: string
  readonly SMTP_FROM_EMAIL: string
  readonly APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
