import express from "express";
import { requestAssetStream } from "./services/asset";
import { ReadStream } from "fs";
import { config } from "./config";

export const routes = (app: express.Application) => {
  app.get("/resource/:resourceId", async (req, res) => {
    let stream: ReadStream;
    try {
      stream = await requestAssetStream(
        req.params.resourceId,
        req.headers["x-user-id"] as string
      );
    } catch (e) {
      res.writeHead(400, e.message);
      return res.end();
    }

    stream.on("error", (e: any) => {
      if (e.code === "ENOENT") {
        res.writeHead(404, "Not found");
        res.end();
      } else {
        res.writeHead(500, "Server error");
        res.end();
      }
    });

    stream.on("data", (data) => {
      res.write(data);
    });

    stream.on("end", () => {
      setTimeout(() => {
        res.end();
      }, config.debug.slowdown);
    });
  });
};
