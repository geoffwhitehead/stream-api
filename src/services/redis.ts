import { config } from "../config";
import redis, { RedisClient } from "redis";
import { promisify } from "util";

const client = redis.createClient(config.redisUrl);

client.on("error", (error) => {
  console.error(error);
});

client.on("connect", () => {
  console.log("Successfully connected to redis");
});

interface Client {
  getAsync: (key: string) => Promise<string | null>;
  setAsync: (key: string, value: string) => Promise<"OK" | null>;
  keysAsync: () => Promise<string[]>;
}

export const redisClient: Client = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
};
