import redis from "redis";
import { promisify } from "util";

class Store {
  client: redis.RedisClient;
  store: Record<string, number>;
  maxStreams: number;

  constructor(maxStreams: number = 3) {
    this.client = redis.createClient();
    this.maxStreams = maxStreams;

    this.client.on("error", (error) => {
      console.error(error);
    });
  }

  async currentStreams(userId: string): Promise<number> {
    const streams: null | string = await promisify(this.client.get)(userId);

    return parseInt(streams) || 0;
  }

  async incrementStreamCount(userId: string) {
    const streams = await this.currentStreams(userId);

    if (streams < this.maxStreams) {
      await promisify(this.client.set)(userId, String(streams + 1));
      return true;
    }
    return false;
  }
}

const store = new Store();

export { store };
