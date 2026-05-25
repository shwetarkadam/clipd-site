/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Form POST URL (e.g. Formspree) for the E2E sync waitlist form. */
  readonly PUBLIC_SYNC_WAITLIST_FORM_ACTION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
