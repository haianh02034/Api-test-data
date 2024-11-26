module.exports = {
  apps: [
    {
      name: "Bot Manager Web tele",
      script: "./dist/apps/api/main.js",
      env: {
        PORT: 3333,

        LOGGER_USE_CONSOLE: false,
        LOGGER_USE_FILE: true,

        GUARD_PASS_KEY: "(~E~)jmYS-F77v@7t&JXEyy.",
        GUARD_JWT_SECRET: "#UcI!I2tlJk8q{AOS~VG!3-iO8IZGKnK}J.c",

        MT_API_URL: "http://103.73.218.34:6868",
        MT_API_SERVER_HOST: "94.237.120.203",
        MT_API_SERVER_PORT: 443,
		
		DB_TYPE:"mongodb",
DB_POST:27099,
DB_HOST:"13.212.197.190",
DB_USERNAME:"",
DB_PASSWORD:"",
DB_DATABASE:"bot_telegram"
      },
      exec_mode: "cluster",
    },
    {
      name: "Web tele front End",
      script: "serve",
      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: "./dist/apps/back-end",
        PM2_SERVE_PORT: 10036,
        PM2_SERVE_SPA: "true",
      },
      exec_mode: "cluster",
    },
  ],
};
