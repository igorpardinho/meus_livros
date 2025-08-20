import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  if (err.errors) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "validação falhou",
        details: err.errors,
      });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
};
