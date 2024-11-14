export const AppConfig = {
  port: process?.env?.PORT || 3333,
  gatewayPort: +(process?.env?.GATEWAY_PORT || 3334),
  gatewayTimeout: +(process?.env?.GATEWAY_TIMEOUT || 60),
};
