import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../../../../shared/http/AuthenticatedRequest.js";
import { NotImplementedError } from "../../../../../shared/errors/NotImplementedError.js";
import type { TransactionType } from "../../../domain/entities/Transaction.js";
import type { ListTransactionsUseCase } from "../../../application/use-cases/ListTransactionsUseCase.js";

export class ListTransactionsController {
  constructor(private readonly listTransactionsUseCase: ListTransactionsUseCase) {}

  public handle = async (request: Request, response: Response): Promise<Response> => {
    const req = request as AuthenticatedRequest;
    try {
      const transactions = await this.listTransactionsUseCase.execute({
        userId: req.auth.userId,
        filters: {
          month: req.query.month ? Number(req.query.month) : undefined,
          year: req.query.year ? Number(req.query.year) : undefined,
          categoryId: req.query.categoryId ? String(req.query.categoryId) : undefined,
          type: req.query.type ? (String(req.query.type) as TransactionType) : undefined
        }
      });

      return response.status(200).json(transactions);
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
