import Midtrans from "midtrans-client";
import { env } from "./env";

// Initialize Snap client
export const snap = new Midtrans.Snap({
  isProduction: env.midtrans.isProduction,
  serverKey: env.midtrans.serverKey,
  clientKey: env.midtrans.clientKey,
});

// Initialize Core API client (untuk keperluan lain jika diperlukan)
export const coreApi = new Midtrans.CoreApi({
  isProduction: env.midtrans.isProduction,
  serverKey: env.midtrans.serverKey,
  clientKey: env.midtrans.clientKey,
});


