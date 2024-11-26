let config: {
  siteName: string;
  apiUrl: string;
  apiManagerUrl : string;
  isSupportAgent:boolean;
} = {
  siteName: '',
  apiUrl: '',
  apiManagerUrl: '',
  isSupportAgent:false

};

if (process.env?.['NODE_ENV'] === 'development') {
  console.log("process.env", process.env)

  config = {
    siteName: process.env?.['NX_BACK_END_SITE_NAME'] || '',
    apiUrl: process.env?.['NX_BACK_END_API_URL'] || '',
    apiManagerUrl: process.env?.['NX_MANAGER_API_URL'] || '',
    isSupportAgent: process.env?.['NX_IS_SUPPORT_AGENT']==='Y' ? true :false || false,
  };
} else if (typeof window?._env !== 'undefined') {
  config = {
    siteName: window?._env?.NX_BACK_END_SITE_NAME || '',
    apiUrl: window?._env?.NX_BACK_END_API_URL || '',
    apiManagerUrl: window?._env?.NX_MANAGER_API_URL || '',
    isSupportAgent: window?._env?.NX_IS_SUPPORT_AGENT ==='Y' ? true :false || false,
  };
}

export default config;
