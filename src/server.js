const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "local";
const STARTED = new Date().toISOString();

app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html>
<head><title>My App</title>
<style>
  body{font-family:system-ui,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
  .card{background:#1e293b;padding:2.5rem 3rem;border-radius:12px;text-align:center}
  h1{margin:0 0 .5rem;color:#38bdf8}
  code{background:#334155;padding:2px 8px;border-radius:4px}
  p{margin:.4rem 0}
</style></head>
<body><div class="card">
  <h1>Deployed with CodePipeline</h1>
  <p>CodeBuild → ECR → CodeDeploy → EC2</p>
  <p>Version: <code>${VERSION}</code></p>
  <p>Host: <code>${os.hostname()}</code></p>
  <p>Started: <code>${STARTED}</code></p>
</div></body></html>`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", version: VERSION, uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`my-app ${VERSION} listening on port ${PORT}`);
});
