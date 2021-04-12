import { config } from "../config";
import { redisClient } from "./redis";

class Store {
  client: typeof redisClient;
  store: Record<string, number>;
  maxStreams: number;

  constructor(client: typeof redisClient, maxStreams: number = 3) {
    this.client = client;
    this.maxStreams = maxStreams;
  }

  async currentStreams(userId: string): Promise<number> {
    const streams: null | string = await this.client.getAsync(userId);

    return parseInt(streams) || 0;
  }

  async incrementStreamCount(userId: string) {
    const streams = await this.currentStreams(userId);

    if (streams < this.maxStreams) {
      await this.client.setAsync(userId, String(streams + 1));
      return true;
    }

    return false;
  }

  async decrementStreamCount(userId: string) {
    const streams = await this.currentStreams(userId);

    await this.client.setAsync(userId, String(Math.max(streams - 1, 0)));
  }
}

const store = new Store(redisClient, config.maxStreams);

export { store };
