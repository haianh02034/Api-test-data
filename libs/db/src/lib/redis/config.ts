import { RedisClientOptions } from 'redis';

let url = 'redis://localhost:6379';
if (process?.env?.REDIS_URL?.length) {
  url = process?.env?.REDIS_URL;
} else if (process?.env?.REDIS_HOST?.length && process?.env?.REDIS_PORT?.length) {
  url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
}

const config: RedisClientOptions = {
  url,
};

export default config;
