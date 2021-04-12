import express from "express";
import { config } from "./config";
import { routes } from "./routes";

const app = express();

routes(app);

app.listen(config.port, () => console.log("Listening on port", config.port));
