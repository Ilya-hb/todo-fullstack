import type { NextFunction, Request, Response } from "express";
import * as z from "zod";

export function validate(schema: z.ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success)
      return res.status(400).json(z.treeifyError(result.error));
    req.body = result.data;
    next();
  };
}
