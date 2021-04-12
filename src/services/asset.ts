import fs from "fs";

const assetMap: Record<string, string> = {
  a: "mtb.mp4",
};

export const requestAssetStream = (assetId: string): fs.ReadStream => {
  const asset = assetMap[assetId];
  if (asset) {
    const filePath = __dirname + "/../assets/" + assetMap[assetId];

    return fs.createReadStream(filePath);
  } else {
    throw new Error("Asset not found");
  }
};
