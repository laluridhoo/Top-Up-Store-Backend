import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (err: ApiError | Error, _req: Request, res: Response, _next: NextFunction): void => {
  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = err.code === "P2025" ? 404 : 400;
    res.status(statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: {
        message: "Validation error",
        details: err.message,
      },
    });
    return;
  }

  // Custom API errors
  if ("statusCode" in err && err.statusCode) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  // Default server error
  res.status(500).json({
    error: {
      message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    },
  });
};
