import express from "express";
import fs from "fs";

const PORT = 3000;

const app = express();
const SLOWDOWN = 1111;

app.get("/", (req, res) => res.sendFile(__dirname + "./src/index.html"));

app.get("/resource/:resourceId", (req, res) => {
  const resourceMap: Record<string, string> = {
    a: "mtb.mp4",
  };

  console.log(`req.headers`, req.headers);

  const filePath =
    __dirname + "/../assets/" + resourceMap[req.params.resourceId];

  const stream = fs.createReadStream(filePath);

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

app.listen(PORT, () => console.log("Listening on port", PORT));
