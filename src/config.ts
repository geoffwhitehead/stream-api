type Config = {
  nodeEnv: string;
  port: number;
  maxStreams: number;
  redisUrl: string;
  debug: {
    slowdown: number;
  };
};

export const config: Config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 3000,
  maxStreams: parseInt(process.env.MAX_STREAMS, 10) || 3,
  redisUrl: process.env.REDIS_URL,
  debug: {
    slowdown: parseInt(process.env.SLOWDOWN, 10) || 10000,
  },
};
