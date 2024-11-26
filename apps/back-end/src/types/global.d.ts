export {};
declare global {
  interface Window {
    _env: {
      NX_BACK_END_SITE_NAME: string;
      NX_BACK_END_API_URL: string;
      NX_MANAGER_API_URL:string;
      NX_IS_SUPPORT_AGENT:string;
    };
  }
}
