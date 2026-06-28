import { ExpenseAlreadyPaidError } from "../../application/errors/ExpenseAlreadyPaidError.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export type TransactionType = "income" | "expense";
export type ExpenseStatus = "pending" | "paid";

const schema = z.object({
  type: z.enum(["income", "expense"]),
  description: z.string().min(1, "Description is required."),
  amount: z.number().min(0.01, "Transaction amount must be greater than zero."),
});

export type TransactionProps = {
  id?: string;
  userId: string;
  categoryId: string;
  type: TransactionType;
  description: string;
  amount: number;
  occurredAt: Date;
  status?: ExpenseStatus | null;
  paidAt?: Date | null;
  createdAt?: Date;
};

export class Transaction {
  static markAsPaid(arg0: { userId: string; transactionId: string; paidAt: Date | undefined; }) {
    throw new Error("Method not implemented.");
  }
  public readonly id: string;
  public readonly userId: string;
  public readonly categoryId: string;
  public readonly type: TransactionType;
  public readonly description: string;
  public readonly amount: number;
  public readonly occurredAt: Date;
  public readonly status: ExpenseStatus | null;
  public readonly paidAt: Date | null;
  public readonly createdAt: Date;

  private constructor(props: Required<TransactionProps>) {
    this.id = props.id;
    this.userId = props.userId;
    this.categoryId = props.categoryId;
    this.type = props.type;
    this.description = props.description;
    this.amount = props.amount;
    this.occurredAt = props.occurredAt;
    this.status = props.status;
    this.paidAt = props.paidAt;
    this.createdAt = props.createdAt;
  }

  public static create(props: TransactionProps): Transaction {
    const type = props.type;
    const description = props.description.trim();
    const amount = props.amount;
    const status = props.type === "expense" ? "pending" : null;


    const result = schema.safeParse({ type, description, amount });
    if (!result.success) {
      throw new Error(result.error.issues[0].message)
    }

    return new Transaction({
      id: props.id ?? randomUUID(),
      userId: props.userId,
      categoryId: props.categoryId,
      type: type,
      description: description,
      amount: amount,
      status: status,
      occurredAt: props.occurredAt,
      paidAt: null,
      createdAt: props.createdAt ?? new Date(),
    });
  }

  public static restore(props: Required<TransactionProps>): Transaction {
    return new Transaction(props);
  }

  public markAsPaid(paidAt?: Date): Transaction {
    if (this.type !== "expense") {
      throw new Error("Only expenses can be marked as paid.");
    }

    if (this.status === "paid") {
      throw new ExpenseAlreadyPaidError();
    }

    return new Transaction({
      id: this.id,
      userId: this.userId,
      categoryId: this.categoryId,
      type: this.type,
      description: this.description,
      amount: this.amount,
      occurredAt: this.occurredAt,
      status: "paid",
      paidAt: paidAt ?? new Date(),
      createdAt: this.createdAt,
    });
  }
}
