import express from "express";
import serveStatic from "serve-static";
import path from "path";
const port = process.env.PORT || 8000;

const __dirname = path.resolve();
const app = express();

app.use("/", serveStatic(path.join(__dirname, "/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
app.listen(port);
