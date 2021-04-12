import express from "express";
import { routes } from "./routes";

const PORT = process.env.port || 3000;

const app = express();

routes(app);

app.listen(PORT, () => console.log("Listening on port", PORT));
