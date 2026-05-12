import client from "prom-client";

const register = new client.Registry();

//Add job label so Grafana can identify your app
register.setDefaultLabels({ job: "thinkboard-backend" });

client.collectDefaultMetrics({ register });

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

//Push using correct content type for Prometheus remote write
const pushMetrics = async () => {
  try {
    const metrics = await register.metrics();

    const credentials = Buffer.from(
      `${process.env.GRAFANA_USERNAME}:${process.env.GRAFANA_API_KEY}`
    ).toString("base64");

    const response = await fetch(process.env.GRAFANA_PUSH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain; version=0.0.4", 
        Authorization: `Basic ${credentials}`,
      },
      body: metrics,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Grafana push error:", response.status, errText);
    } else {
      console.log("Metrics pushed to Grafana");
    }
  } catch (err) {
    console.error("Grafana push failed:", err.message);
  }
};

setInterval(pushMetrics, 15000);