import { randomUUID } from "node:crypto";
import { z } from "zod";

export type CategoryKind = "income" | "expense";

const schema = z.object({
  kind: z.enum(["income", "expense"]),
  name: z.string().min(1, "Category name is required."),
});

export type CategoryProps = {
  id?: string;
  userId: string;
  name: string;
  kind: CategoryKind;
  createdAt?: Date;
};

export class Category {
  public readonly id: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly kind: CategoryKind;
  public readonly createdAt: Date;

  private constructor(props: Required<CategoryProps>) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.kind = props.kind;
    this.createdAt = props.createdAt;
  }

  public static create(props: CategoryProps): Category {
    const name = props.name.trim();
    const kind = props.kind;

    const result = schema.safeParse({ name, kind });
    if (!result.success) {
      throw new Error(result.error.issues[0].message)
    }

    return new Category({
      id: props.id ?? randomUUID(),
      userId: props.userId,
      name: name,
      kind: kind,
      createdAt: props.createdAt ?? new Date(),
    });
  }
}
