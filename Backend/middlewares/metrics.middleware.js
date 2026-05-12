import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom metric — HTTP requests
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const metricsMiddleware = (req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
};

export const metricsHandler = async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
};

const pushMetrics = async () => {
  try {
    const metrics = await register.metrics();

    const credentials = Buffer.from(
      `${process.env.GRAFANA_USERNAME}:${process.env.GRAFANA_API_KEY}`
    ).toString("base64");

    await fetch(process.env.GRAFANA_PUSH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${credentials}`,
      },
      body: metrics,
    });

    console.log("Metrics pushed to Grafana");
  } catch (err) {
    console.error("Grafana push failed:", err.message);
  }
};

setInterval(pushMetrics, 15000);