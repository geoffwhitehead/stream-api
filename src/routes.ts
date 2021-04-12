import express from "express";
import { requestAssetStream } from "./services/asset";

const SLOWDOWN = 1111;

export const routes = (app: express.Application) => {
  app.get("/resource/:resourceId", (req, res) => {
    console.log(`req.headers`, req.headers);

    let stream: ReturnType<typeof requestAssetStream>;
    try {
      stream = requestAssetStream(req.params.resourceId);
    } catch (e) {
      res.writeHead(404, "Not found");
      res.end();
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
      console.log("end");
      setTimeout(() => {
        res.end();
      }, SLOWDOWN);
    });
  });
};
