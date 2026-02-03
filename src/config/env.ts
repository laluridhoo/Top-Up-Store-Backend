import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "MIDTRANS_SERVER_KEY", "MIDTRANS_CLIENT_KEY"] as const;

const validateEnv = (): void => {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};

validateEnv();

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  midtrans: {
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    isProduction: process.env.NODE_ENV === "production",
  },
} as const;
