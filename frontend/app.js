// Reads window.APP_CONFIG from config.js (generated at build time) and calls the API on EC2
const config = window.APP_CONFIG || { API_URL: "http://localhost:3000", FRONTEND_VERSION: "local" };

document.getElementById("fe-version").textContent = config.FRONTEND_VERSION;

const statusEl = document.getElementById("api-status");
fetch(`${config.API_URL}/health`)
  .then((res) => res.json())
  .then((data) => {
    statusEl.textContent = data.status;
    statusEl.className = "ok";
    document.getElementById("api-version").textContent = data.version;
  })
  .catch(() => {
    statusEl.textContent = "unreachable";
    statusEl.className = "err";
  });
