import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../../../../shared/http/AuthenticatedRequest.js";
import { NotImplementedError } from "../../../../../shared/errors/NotImplementedError.js";
import type { GetCategorySummaryUseCase } from "../../../application/use-cases/GetCategorySummaryUseCase.js";

export class GetCategorySummaryController {
  constructor(private readonly getCategorySummaryUseCase: GetCategorySummaryUseCase) {}

  public handle = async (request: Request, response: Response): Promise<Response> => {
    const req = request as AuthenticatedRequest;
    try {
      const report = await this.getCategorySummaryUseCase.execute({
        userId: req.auth.userId,
        month: Number(req.query.month),
        year: Number(req.query.year)
      });

      return response.status(200).json(report);
    } catch (error) {
      if (error instanceof NotImplementedError) {
        return response.status(500).json({ message: error.message });
      }

      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(500).json({ message: "Unexpected error." });
    }
  };
}
