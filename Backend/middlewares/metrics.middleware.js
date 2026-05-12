import client from "prom-client";

const register = new client.Registry();
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

const pushMetrics = async () => {
  try {
    const metrics = await register.getMetricsAsJSON();
    const timeseries = [];

    for (const metric of metrics) {
      for (const value of metric.values) {
        const labels = {
          __name__: String(metric.name),
          job: "thinkboard-backend",
        };

        // ✅ Convert all label values to strings
        for (const [k, v] of Object.entries(value.labels || {})) {
          labels[String(k)] = String(v);
        }

        timeseries.push({
          labels,
          samples: [{ value: Number(value.value), timestamp: Date.now() }],
        });
      }
    }

    const credentials = Buffer.from(
      `${process.env.GRAFANA_USERNAME}:${process.env.GRAFANA_API_KEY}`
    ).toString("base64");

    const { pushTimeseries } = await import("prometheus-remote-write");

    await pushTimeseries(timeseries, {
      url: process.env.GRAFANA_PUSH_URL,
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    console.log("✅ Metrics pushed to Grafana");
  } catch (err) {
    console.error("❌ Grafana push failed:", err.message);
  }
};

setInterval(pushMetrics, 15000);
