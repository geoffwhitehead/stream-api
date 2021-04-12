type Config = {
  port: number;
  maxStreams: number;
  redisUrl: string;
};

export const config: Config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  maxStreams: parseInt(process.env.MAX_STREAMS, 10) || 3,
  redisUrl: process.env.REDIS_URL,
};
