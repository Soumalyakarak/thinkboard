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