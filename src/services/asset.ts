import fs from "fs";
import { store } from "./store";
import path from "path";
import { config } from "../config";

const assetMap: Record<string, string> = {
  a: "mtb.mp4",
};

export const requestAssetStream = async (
  assetId: string,
  userId: string
): Promise<fs.ReadStream> => {
  const asset = assetMap[assetId];

  if (asset) {
    const filePath = path.join(__dirname, "../../assets", asset);
    const isWithinAllowance = await store.incrementStreamCount(userId);

    if (isWithinAllowance) {
      const stream = fs.createReadStream(filePath);

      stream.on("error", async (e) => {
        await store.decrementStreamCount(userId);
      });
      stream.on("end", async () => {
        setTimeout(async () => {
          await store.decrementStreamCount(userId);
        }, config.debug.slowdown);
      });

      return stream;
    } else {
      throw new Error("Max simultaneous streams reached");
    }
  } else {
    throw new Error("Asset not found");
  }
};
