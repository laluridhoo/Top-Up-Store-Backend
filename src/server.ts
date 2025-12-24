import app from "./app";
import { env } from "./config/env";

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
  console.log(`📝 Environment: ${env.nodeEnv}`);
});

// Graceful shutdown
const gracefulShutdown = (): void => {
  console.log("\n⚠️  Shutting down gracefully...");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export default server;
