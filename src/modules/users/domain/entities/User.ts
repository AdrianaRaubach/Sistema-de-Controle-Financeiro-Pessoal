import { randomUUID } from "node:crypto";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "User name is required."),
  email: z.string().email("A valid user email is required."),
});

export type UserProps = {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
};

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly createdAt: Date;

  private constructor(props: Required<UserProps>) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.createdAt = props.createdAt;
  }

  public static create(props: UserProps): User {
    const name = props.name.trim();
    const email = props.email.trim().toLocaleLowerCase();

    const result = schema.safeParse({ name, email });
    if (!result.success) {
      throw new Error(result.error.issues[0].message)
    }
    
    return new User({
      id: props.id ?? randomUUID(),
      name: name,
      email: email,
      passwordHash: props.passwordHash,
      createdAt: props.createdAt ?? new Date(),
    });
  }
}
